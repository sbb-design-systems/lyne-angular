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
  createTemplateMigrationRule,
  elementMatches,
  hasAttribute,
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
 * Comments in templates:
 * - external templates: an HTML comment above the line of the element
 * - inline templates: a `//` comment above the `template:` property, because a comment cannot be safely inserted into a string literal
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
      if (
        !migration.selectors.some((selector) => elementMatches(element, selector)) ||
        (migration.attribute && !hasAttribute(element, migration.attribute))
      ) {
        continue;
      }

      const target = migration.attribute
        ? `'${migration.attribute}' on <${element.name}>`
        : `<${element.name}>`;

      queueComment(
        fileContent,
        anchor,
        inline ? TS_DELIMITERS : HTML_DELIMITERS,
        migration.message,
        fileEdits,
        nextIndex(),
        () => logger.info(`  → Added comment for ${target} in ${filePath}`),
      );
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
