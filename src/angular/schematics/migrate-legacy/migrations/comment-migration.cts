import type { TmplAstElement } from '@angular/compiler';
import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import ts from 'typescript';

import {
  CommentDelimiters,
  formatComment,
  getCommentLinesAbove,
  getIndent,
  getLineStart,
  HTML_DELIMITERS,
  TS_DELIMITERS,
} from '../../comment-utils.cjs';
import {
  applyEdits,
  isTypeScriptFile,
  MigrationEdit,
  MigrationScope,
  visitScopedFiles,
} from '../../utils.cjs';
import { findSymbolReferences } from '../symbol-references.cjs';
import {
  attributeNameVariants,
  createTemplateMigrationRule,
  elementMatches,
  ParsedSelector,
  parseSelector,
} from '../template-migration.cjs';

interface CommentMigrationBase {
  /**
   * Text of the comment. Multiline text is rendered as multiple comment lines.
   */
  message: string;
}

/**
 * Comments a template element, or an attribute of it, e.g. `<sbb-captcha>`.
 */
export interface ElementCommentMigration extends CommentMigrationBase {
  /**
   * Selector(s) of the targeted elements, e.g. `'sbb-captcha'`,
   * `['sbb-usermenu', 'sbb-usermenu-item']` or `'button[sbb-button]'`.
   */
  selector: string | string[];
  /**
   * Only comment elements which use this attribute, input or output (in any spelling or binding syntax).
   * When omitted, every matched element is commented.
   */
  attribute?: string;
}

/** Comments every usage of a TypeScript symbol, e.g. `SbbCaptchaModule`. */
export interface SymbolCommentMigration extends CommentMigrationBase {
  /** Exported name of the symbol. */
  symbol: string;
  /**
   * Only comment the symbol when it is imported from this module (exact match or sub-path).
   * When omitted, any import of `symbol` is considered.
   */
  importedFrom?: string | string[];
}

export type CommentMigration = ElementCommentMigration | SymbolCommentMigration;

type ParsedElementCommentMigration = ElementCommentMigration & {
  parsedSelectors: ParsedSelector[];
  attributeVariants?: string[];
};

function isElementCommentMigration(
  migration: CommentMigration,
): migration is ElementCommentMigration {
  return 'selector' in migration;
}

/**
 * Tracks the comments queued per file and line, so a line never receives the same comment twice,
 * even if several matches share it.
 */
class QueuedComments {
  private readonly _lines = new Map<number, Set<string>>();

  /** Returns `false` if the comment has already been queued for the line. */
  add(lineStart: number, text: string): boolean {
    let texts = this._lines.get(lineStart);
    if (!texts) {
      texts = new Set<string>();
      this._lines.set(lineStart, texts);
    }
    if (texts.has(text)) {
      return false;
    }
    texts.add(text);
    return true;
  }
}

/**
 * Queues a comment above the line containing `anchorOffset`.
 *
 * Nothing is queued if the very same comment is already placed directly above the line
 * (e.g. by a previous run), so the migration stays idempotent.
 */
function queueComment(
  fileContent: string,
  anchorOffset: number,
  delimiters: CommentDelimiters,
  text: string,
  queued: QueuedComments,
  edits: MigrationEdit[],
  index: number,
  log: () => void,
): void {
  const lineStart = getLineStart(fileContent, anchorOffset);
  if (!queued.add(lineStart, text)) {
    return;
  }

  const comment = formatComment(getIndent(fileContent, lineStart), delimiters, text);
  const existing = getCommentLinesAbove(fileContent, lineStart, delimiters);
  if (comment.split('\n').every((line) => existing.has(line.trim()))) {
    return;
  }

  edits.push({
    offset: lineStart,
    index,
    length: 0,
    insertion: `${comment}\n`,
    log,
  });
}

/** Start of a block with parameters (`@if (`, `@else if (`, ...) or of an `@let` declaration. */
const BLOCK_START = /@(?:let\s+[\w$]+\s*=|[a-zA-Z]+(?:\s+[a-zA-Z]+)?\s*\()/y;

/** A `[start, end)` range of the template in which no comment can be inserted. */
type OpaqueRange = readonly [start: number, end: number];

/**
 * Finds the parts of an HTML template in which an inserted comment would corrupt the template:
 * tags (including attribute values), comments, interpolations, block parameters and `@let`
 * declarations. Their boundaries are safe positions, everything strictly inside is not.
 *
 * The scan is deliberately conservative; an unterminated construct extends to the end of the
 * template. Misjudging a position as unsafe only changes where the comment is placed.
 */
function findOpaqueRanges(content: string): OpaqueRange[] {
  const ranges: OpaqueRange[] = [];
  const length = content.length;

  /** Index right after the closing `terminator`, skipping quoted strings; `length` if unterminated. */
  const skipTo = (from: number, terminator: (char: string) => boolean): number => {
    let quote = '';
    for (let i = from; i < length; i++) {
      const char = content[i];
      if (quote) {
        quote = char === quote ? '' : quote;
      } else if (char === '"' || char === "'") {
        quote = char;
      } else if (terminator(char)) {
        return i + 1;
      }
    }
    return length;
  };

  let i = 0;
  while (i < length) {
    const char = content[i];
    let end = -1;

    if (content.startsWith('<!--', i)) {
      const close = content.indexOf('-->', i + 4);
      end = close < 0 ? length : close + 3;
    } else if (content.startsWith('{{', i)) {
      const close = content.indexOf('}}', i + 2);
      end = close < 0 ? length : close + 2;
    } else if (char === '<' && /[a-zA-Z/!?]/.test(content[i + 1] ?? '')) {
      end = skipTo(i + 1, (c) => c === '>');
    } else if (char === '@') {
      BLOCK_START.lastIndex = i;
      const block = BLOCK_START.exec(content);
      if (block) {
        const isLet = block[0].startsWith('@let');
        let depth = isLet ? 0 : 1;
        end = skipTo(i + block[0].length, (c) => {
          depth += c === '(' ? 1 : c === ')' ? -1 : 0;
          return isLet ? c === ';' : depth === 0;
        });
      }
    }

    if (end < 0) {
      i++;
    } else {
      ranges.push([i, end]);
      i = Math.max(end, i + 1);
    }
  }

  return ranges;
}

/** Whether a comment can be inserted at `offset` without breaking a tag, comment or expression. */
function isSafeOffset(ranges: readonly OpaqueRange[], offset: number): boolean {
  return !ranges.some(([start, end]) => start < offset && offset < end);
}

/**
 * The trimmed comments which directly precede `offset`, with nothing but whitespace in between.
 * Used to recognize comments which have been inserted right before an element.
 */
function getCommentsDirectlyBefore(content: string, offset: number): Set<string> {
  const comments = new Set<string>();
  let end = offset;

  for (;;) {
    const trimmed = content.slice(0, end).trimEnd();
    if (!trimmed.endsWith('-->')) {
      return comments;
    }
    const start = trimmed.lastIndexOf('<!--');
    if (start < 0) {
      return comments;
    }
    comments.add(trimmed.slice(start).trim());
    end = start;
  }
}

/**
 * Queues a comment for an element of an external template.
 *
 * The comment goes above the line of the element, unless that line does not start at a safe
 * boundary of the template: with markup in front of the element, the line start can lie inside
 * a still open tag (`<div\n  class="a"><sbb-link>`), a comment or an expression. The comment is then
 * inserted immediately before the element, which always is a safe boundary.
 */
function queueHtmlElementComment(
  fileContent: string,
  elementStart: number,
  ranges: readonly OpaqueRange[],
  text: string,
  queued: QueuedComments,
  edits: MigrationEdit[],
  index: number,
  log: () => void,
): void {
  const lineStart = getLineStart(fileContent, elementStart);
  if (fileContent.slice(lineStart, elementStart).trim() === '' || isSafeOffset(ranges, lineStart)) {
    queueComment(fileContent, elementStart, HTML_DELIMITERS, text, queued, edits, index, log);
    return;
  }

  // An element start differs from every line start which is queued above, so both share `queued`.
  if (!queued.add(elementStart, text)) {
    return;
  }

  // No line break, which would add whitespace to the rendered content between the elements.
  const comments = formatComment('', HTML_DELIMITERS, text).split('\n');
  const existing = getCommentsDirectlyBefore(fileContent, elementStart);
  if (comments.every((comment) => existing.has(comment.trim()))) {
    return;
  }

  edits.push({ offset: elementStart, index, length: 0, insertion: comments.join(''), log });
}

function hasAttribute(element: TmplAstElement, variants: string[]): boolean {
  return [...element.attributes, ...element.inputs, ...element.outputs].some((node) =>
    variants.includes(node.name),
  );
}

/**
 * Comments in templates:
 * - external templates: an HTML comment directly above the element line
 * - inline templates: a `//` comment above the `template:` property, because a comment cannot be safely inserted into a string literal
 */
function createElementCommentRule(
  migrations: ElementCommentMigration[],
  scope: MigrationScope | undefined,
): Rule {
  const parsedMigrations: ParsedElementCommentMigration[] = migrations.map((migration) => ({
    ...migration,
    parsedSelectors: (Array.isArray(migration.selector)
      ? migration.selector
      : [migration.selector]
    ).map(parseSelector),
    attributeVariants: migration.attribute ? attributeNameVariants(migration.attribute) : undefined,
  }));
  // Keyed by the per-file edit list, so the state is automatically scoped per file.
  const queuedPerFile = new WeakMap<MigrationEdit[], QueuedComments>();
  const opaqueRangesPerFile = new WeakMap<MigrationEdit[], OpaqueRange[]>();

  return createTemplateMigrationRule((element, context) => {
    // Comments are placed outside of the template text, so they are file edits.
    const { fileContent, baseOffset, inline, filePath, fileEdits, nextIndex, logger } = context;

    for (const migration of parsedMigrations) {
      if (
        !migration.parsedSelectors.some((selector) => elementMatches(element, selector)) ||
        (migration.attributeVariants && !hasAttribute(element, migration.attributeVariants))
      ) {
        continue;
      }

      let queued = queuedPerFile.get(fileEdits);
      if (!queued) {
        queued = new QueuedComments();
        queuedPerFile.set(fileEdits, queued);
      }

      const target = migration.attribute
        ? `'${migration.attribute}' on <${element.name}>`
        : `<${element.name}>`;

      const log = () => logger.info(`  → Added comment for ${target} in ${filePath}`);

      if (inline) {
        queueComment(
          fileContent,
          baseOffset,
          TS_DELIMITERS,
          migration.message,
          queued,
          fileEdits,
          nextIndex(),
          log,
        );
        continue;
      }

      let ranges = opaqueRangesPerFile.get(fileEdits);
      if (!ranges) {
        ranges = findOpaqueRanges(fileContent);
        opaqueRangesPerFile.set(fileEdits, ranges);
      }

      queueHtmlElementComment(
        fileContent,
        baseOffset + element.startSourceSpan.start.offset,
        ranges,
        migration.message,
        queued,
        fileEdits,
        nextIndex(),
        log,
      );
    }
  }, scope);
}

/**
 * Returns the offset the comment of a TS reference is anchored to.
 *
 * A reference inside a `${}` substitution of a multiline template literal would
 * otherwise place the comment within the literal text, so the comment is moved
 * above the start of the outermost template literal instead.
 */
function getTsAnchorOffset(node: ts.Node, sourceFile: ts.SourceFile): number {
  let anchor = node.getStart(sourceFile);
  for (let current = node.parent; current; current = current.parent) {
    if (ts.isTemplateExpression(current)) {
      anchor = Math.min(anchor, current.getStart(sourceFile));
    }
  }
  return anchor;
}

/** Comments every usage of the given symbols in TypeScript files with a `//` comment. */
function createSymbolCommentRule(
  migrations: SymbolCommentMigration[],
  scope: MigrationScope | undefined,
): Rule {
  const targets = migrations.map((migration) => ({
    name: migration.symbol,
    importedFrom: migration.importedFrom,
    migration,
  }));

  return (tree: Tree, context: SchematicContext) => {
    visitScopedFiles(tree, scope, (filePath) => {
      if (!isTypeScriptFile(filePath)) {
        return;
      }

      const buffer = tree.read(filePath);
      if (!buffer) {
        return;
      }

      const original = buffer.toString('utf-8');
      // Cheap pre-check: nothing to do when no symbol name occurs at all.
      if (!targets.some((target) => original.includes(target.name))) {
        return;
      }

      const sourceFile = ts.createSourceFile(filePath, original, ts.ScriptTarget.Latest, true);
      const queued = new QueuedComments();
      const edits: MigrationEdit[] = [];
      let index = 0;

      for (const { node, target } of findSymbolReferences(sourceFile, targets)) {
        queueComment(
          original,
          getTsAnchorOffset(node, sourceFile),
          TS_DELIMITERS,
          target.migration.message,
          queued,
          edits,
          index++,
          () => context.logger.info(`  → Added comment for '${target.name}' in ${filePath}`),
        );
      }

      const updated = applyEdits(original, edits);
      if (updated !== original) {
        tree.overwrite(filePath, updated);
      }
    });
  };
}

/**
 * Creates a rule which adds comments to legacy usages without a counterpart in the new library.
 *
 * ```ts
 * createCommentMigrationRule([
 *   // Element: comment above every <sbb-captcha>
 *   { selector: 'sbb-captcha', message: 'FIXME: sbb-captcha has no Lyne counterpart.' },
 *   // Attribute: comment above every <sbb-button> using `mode`
 *   { selector: 'sbb-button', attribute: 'mode', message: 'TODO: ...' },
 *   // Symbol: comment above every usage of SbbCaptchaModule
 *   { symbol: 'SbbCaptchaModule', importedFrom: '@sbb-esta/angular/captcha', message: '...' },
 * ]);
 * ```
 *
 * Every line receives a comment only once per message, and comments which are
 * already present directly above a line are not added again.
 */
export function createCommentMigrationRule(
  migrations: CommentMigration[],
  scope?: MigrationScope,
): Rule {
  const elementMigrations = migrations.filter(isElementCommentMigration);
  const symbolMigrations = migrations.filter(
    (migration): migration is SymbolCommentMigration => !isElementCommentMigration(migration),
  );

  return chain([
    ...(elementMigrations.length ? [createElementCommentRule(elementMigrations, scope)] : []),
    ...(symbolMigrations.length ? [createSymbolCommentRule(symbolMigrations, scope)] : []),
  ]);
}
