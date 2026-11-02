import type { CssSelector } from '@angular/compiler';
import type { Rule } from '@angular-devkit/schematics';
import { noop } from '@angular-devkit/schematics';

import type { MigrationScope } from '../../utils.cjs';
import type { ParsedSelectorMigration, SelectorMigration } from '../common.cjs';
import {
  createTemplateMigrationRule,
  matchSelector,
  parseSelector,
} from '../template-migration.cjs';

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
    const endSpan = element.endSourceSpan;

    // Without an end span the element was never closed; renaming only the
    // opening tag would corrupt the template, so it is skipped.
    if (!endSpan) {
      logger.warn(
        `  ⚠ Skipped '${migration.selector}' in '${filePath}': the element has no closing tag.`,
      );
      return;
    }

    // Rename the opening tag (`<button` → `<sbb-button`).
    edits.push({
      offset: baseOffset + element.startSourceSpan.start.offset + 1,
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

    // Rename the closing tag, unless the element is self-closing or void.
    if (
      endSpan.start.offset !== element.startSourceSpan.start.offset &&
      content.startsWith('</', endSpan.start.offset)
    ) {
      edits.push({
        offset: baseOffset + endSpan.start.offset + 2,
        index: nextIndex(),
        length: legacyName.length,
        insertion: migration.replaceWith,
      });
    }
  }, scope);
}
