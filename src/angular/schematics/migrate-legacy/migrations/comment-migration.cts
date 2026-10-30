import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { chain, noop } from '@angular-devkit/schematics';
import ts from 'typescript';

import type { CommentDelimiters } from '../../comment-utils.cjs';
import {
  formatComment,
  getCommentLinesAbove,
  getIndent,
  getLineStart,
  HTML_DELIMITERS,
  TS_DELIMITERS,
} from '../../comment-utils.cjs';
import type { MigrationEdit, MigrationScope } from '../../utils.cjs';
import type {
  CommentMigration,
  ElementCommentMigration,
  SymbolCommentMigration,
} from '../common.cjs';
import { applyEdits, isTypeScriptFile, visitScopedFiles } from '../common.cjs';
import { findSymbolReferences } from '../symbol-references.cjs';
import {
  createTemplateMigrationRule,
  elementMatches,
  parseSelector,
} from '../template-migration.cjs';

const COMMENT_OPEN = '<!--';

function isElementCommentMigration(
  migration: CommentMigration,
): migration is ElementCommentMigration {
  return 'selector' in migration;
}

/**
 * Queues a comment above the line containing `offset`.
 *
 * Nothing is queued if the same comment is already queued for that line or already placed
 * directly above it (e.g. by a previous run), so the migration stays idempotent.
 */
function queueComment(
  content: string,
  offset: number,
  delimiters: CommentDelimiters,
  message: string,
  edits: MigrationEdit[],
  index: number,
  log: () => void,
): void {
  const lineStart = getLineStart(content, offset);
  const comment = formatComment(getIndent(content, lineStart), delimiters, message);
  const insertion = `${comment}\n`;

  const existing = getCommentLinesAbove(content, lineStart, delimiters);
  const isPresent = comment.split('\n').every((line) => existing.has(line.trim()));
  const isQueued = edits.some((edit) => edit.offset === lineStart && edit.insertion === insertion);

  if (!isPresent && !isQueued) {
    edits.push({ offset: lineStart, index, length: 0, insertion, log });
  }
}

/**
 * Whether `offset` lies within a tag (or an HTML comment),
 * e.g. at the start of the line `  ><a` in `<span\n  ><a>`.
 * A comment must not be inserted there.
 */
function isInsideTag(content: string, offset: number): boolean {
  let quote: string | undefined;
  let inTag = false;
  let i = 0;

  while (i < offset) {
    const char = content[i];

    if (inTag) {
      if (quote) {
        quote = char === quote ? undefined : quote;
      } else if (char === '"' || char === "'") {
        quote = char;
      } else if (char === '>') {
        inTag = false;
      }
      i++;
    } else if (content.startsWith(COMMENT_OPEN, i)) {
      const close = content.indexOf('-->', i + COMMENT_OPEN.length);
      if (close === -1 || close + 3 > offset) {
        return true;
      }
      i = close + 3;
    } else {
      // `<a` and `</a` open a tag; `a < b` and `<` followed by anything else are text.
      inTag = char === '<' && /^\/?[a-zA-Z]/.test(content.slice(i + 1, i + 3));
      i++;
    }
  }

  return inTag;
}

/**
 * Queues an HTML comment on its own line directly in front of the element at `offset`,
 * which is moved to a new line as well.
 *
 * Used when the line of the element begins inside a tag of an enclosing element (e.g. `  ><a`),
 * so a comment above that line would end up in the middle of that tag.
 * Afterward the element starts its own line, so a next run finds the comment above it like for any other element.
 */
function queueCommentOnNewLine(
  content: string,
  offset: number,
  message: string,
  edits: MigrationEdit[],
  index: number,
  log: () => void,
): void {
  const indent = getIndent(content, getLineStart(content, offset));
  // The first comment moves everything to a new line, every comment leaves the next line ready,
  // so the element ends up on its own line behind all comments (edits at one offset keep their order).
  const isFirst = !edits.some((edit) => edit.offset === offset);
  const comment = formatComment(indent, HTML_DELIMITERS, message).trimStart();
  const insertion = `${isFirst ? `\n${indent}` : ''}${comment}\n${indent}`;

  if (!edits.some((edit) => edit.offset === offset && edit.insertion?.includes(comment))) {
    edits.push({ offset, index, length: 0, insertion, log });
  }
}

/**
 * Comments in templates:
 * - external templates: an HTML comment above the line of the element, or on its own line directly in front of the element when that line begins inside a tag;
 * - inline templates: a `//` comment above the `template:` property, because a comment cannot be safely inserted into a string literal.
 */
function createElementCommentRule(
  migrations: ElementCommentMigration[],
  scope: MigrationScope | undefined,
): Rule {
  const parsed = migrations.map((migration) => ({
    ...migration,
    selectors: [migration.selector].flat().map(parseSelector),
  }));

  return createTemplateMigrationRule((element, context) => {
    const { fileContent, baseOffset, inline, filePath, fileEdits, nextIndex, logger } = context;
    const anchor = inline ? baseOffset : baseOffset + element.startSourceSpan.start.offset;

    for (const migration of parsed) {
      if (!migration.selectors.some((selector) => elementMatches(element, selector))) {
        continue;
      }

      const target = `${element.name}`;
      const log = (): void => logger.info(`  → Added comment for '${target}' in '${filePath}'`);

      if (!inline && isInsideTag(fileContent, getLineStart(fileContent, anchor))) {
        queueCommentOnNewLine(fileContent, anchor, migration.message, fileEdits, nextIndex(), log);
      } else {
        queueComment(
          fileContent,
          anchor,
          inline ? TS_DELIMITERS : HTML_DELIMITERS,
          migration.message,
          fileEdits,
          nextIndex(),
          log,
        );
      }
    }
  }, scope);
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
      const original = isTypeScriptFile(filePath) ? tree.read(filePath)?.toString('utf-8') : null;
      // Cheap pre-check: nothing to do when no symbol name occurs at all.
      if (!original || !targets.some((target) => original.includes(target.name))) {
        return;
      }

      const sourceFile = ts.createSourceFile(filePath, original, ts.ScriptTarget.Latest, true);
      const edits: MigrationEdit[] = [];
      let index = 0;

      for (const { node, target } of findSymbolReferences(sourceFile, targets)) {
        queueComment(
          original,
          node.getStart(sourceFile),
          TS_DELIMITERS,
          target.migration.message,
          edits,
          index++,
          () => context.logger.info(`  → Added comment for '${target.name}' in '${filePath}'`),
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
 *   { selector: 'sbb-button[mode]', message: 'TODO: ...' },
 *   // Symbol: comment above every usage of SbbCaptchaModule
 *   { symbol: 'SbbCaptchaModule', importedFrom: '@sbb-esta/angular/captcha', message: '...' },
 * ]);
 * ```
 *
 * Every line receives a comment only once per message, and comments which are
 * already present directly above a line are not added again.
 */
export function createCommentMigrationRule(
  migrations?: CommentMigration[],
  scope?: MigrationScope,
): Rule {
  if (!migrations || migrations.length === 0) {
    return noop();
  }
  const elementMigrations = migrations.filter(isElementCommentMigration);
  const symbolMigrations = migrations.filter(
    (migration): migration is SymbolCommentMigration => !isElementCommentMigration(migration),
  );

  return chain([
    ...(elementMigrations.length ? [createElementCommentRule(elementMigrations, scope)] : []),
    ...(symbolMigrations.length ? [createSymbolCommentRule(symbolMigrations, scope)] : []),
  ]);
}
