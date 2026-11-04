import type { CssSelector, ParseSourceSpan } from '@angular/compiler';
import type { Rule } from '@angular-devkit/schematics';
import { noop } from '@angular-devkit/schematics';

import type { MigrationScope } from '../../utils.cjs';
import type { ParsedSelectorMigration, SelectorMigration } from '../common.cjs';
import {
  createTemplateMigrationRule,
  matchSelector,
  parseSelector,
} from '../template-migration.cjs';

/** Minimal shape shared by the template nodes. */
interface SpannedNode {
  sourceSpan: ParseSourceSpan;
  endSourceSpan?: ParseSourceSpan | null;
  children?: SpannedNode[];
}

/** Offset where the content of a node ends, also for elements which the parser closed by itself. */
function getContentEnd(node: SpannedNode): number {
  const lastChild = node.children?.at(-1);
  if (node.endSourceSpan) {
    return node.endSourceSpan.end.offset;
  }
  return lastChild ? getContentEnd(lastChild) : node.sourceSpan.end.offset;
}

/**
 * Creates a rule which replaces legacy template selectors with their Lyne
 * counterpart, both in external templates (`templateUrl`) and in inline
 * templates (`template`).
 *
 * ```ts
 * createTemplateSelectorMigrationRule([
 *   { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
 * ]);
 * ```
 *
 * The `addAttributes` can be used to add attributes to the migrated element, written as in a template and inserted verbatim.
 * Using the `transformToPairedTag` flag allows to change void tags to paired ones.
 */
export function createTemplateSelectorMigrationRule(
  migrations?: SelectorMigration[],
  scope?: MigrationScope,
): Rule {
  if (!migrations || migrations.length === 0) {
    return noop();
  }
  const parsedMigrations: ParsedSelectorMigration[] = migrations.map((migration) => ({
    ...migration,
    parsedSelector: parseSelector(migration.selector),
  }));

  return createTemplateMigrationRule((element, context) => {
    if (!parsedMigrations.length) {
      return;
    }

    let migration: ParsedSelectorMigration | undefined;
    let matchedAlternative: CssSelector | undefined;
    for (const candidate of parsedMigrations) {
      matchedAlternative = matchSelector(element, candidate.parsedSelector);
      if (matchedAlternative) {
        migration = candidate;
        break;
      }
    }
    if (!migration || !matchedAlternative) {
      return;
    }

    const { content, baseOffset, filePath, edits, nextIndex, logger } = context;
    const legacyName = element.name;
    const startSpan = element.startSourceSpan;
    const endSpan = element.endSourceSpan;
    const startTag = content.slice(startSpan.start.offset, startSpan.end.offset);
    const isSelfClosing = /\/\s*>$/.test(startTag);
    // A self-closing element reports its start tag as end tag, so it is no closing tag.
    const closingTag = endSpan && content.startsWith('</', endSpan.start.offset) ? endSpan : null;

    // Without an end span (void element, or closed by the parser), renaming only the opening tag would corrupt the template.
    // The paired-tag option provides the missing closing tag.
    if (!endSpan && !migration.transformToPairedTag) {
      logger.warn(
        `  ⚠ Skipped '${migration.selector}' in '${filePath}': the element has no closing tag.`,
      );
      return;
    }

    // Rename the opening tag (`<button` → `<sbb-button`).
    edits.push({
      offset: baseOffset + startSpan.start.offset + 1,
      index: nextIndex(),
      length: legacyName.length,
      insertion: migration.addAttributes
        ? `${migration.replaceWith} ${migration.addAttributes}`
        : migration.replaceWith,
      log: () =>
        logger.info(
          `  → Replaced '${migration.selector}' with '${migration.replaceWith}' in '${filePath}'`,
        ),
    });

    if (migration.transformToPairedTag && !closingTag) {
      if (isSelfClosing) {
        // Remove the slash and the blanks in front of it: `<a href="x" />` → `<a href="x">`.
        const slash = startTag.lastIndexOf('/');
        const blanks = /[ \t]*$/.exec(startTag.slice(0, slash))![0].length;
        edits.push({
          offset: baseOffset + startSpan.start.offset + slash - blanks,
          index: nextIndex(),
          length: blanks + 1,
        });
      }

      // A void element is closed right after its start tag.
      // An element which the parser closed by itself (`<li>` before the next `<li>`) is closed behind its content, without the blanks.
      const contentStart = startSpan.end.offset;
      const contentEnd =
        contentStart + content.slice(contentStart, getContentEnd(element)).trimEnd().length;
      edits.push({
        offset: baseOffset + contentEnd,
        index: nextIndex(),
        length: 0,
        insertion: `</${migration.replaceWith}>`,
      });
      return;
    }

    // Rename the closing tag, unless the element is self-closing or void.
    if (closingTag) {
      edits.push({
        offset: baseOffset + closingTag.start.offset + 2,
        index: nextIndex(),
        length: legacyName.length,
        insertion: migration.replaceWith,
      });
    }
  }, scope);
}
