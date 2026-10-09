import type { Rule } from '@angular-devkit/schematics';

import {
  createTemplateMigrationRule,
  elementMatches,
  ParsedSelector,
  parseSelector,
  queueAttributeRemovals,
  RemovableAttribute,
} from '../template-migration.cjs';

export type { RemovableAttribute } from '../template-migration.cjs';

export interface SelectorMigration {
  /**
   * CSS-like selector of the legacy element. Supported forms:
   * - `'button[sbb-button]'` — tag name combined with an attribute
   * - `'sbb-usermenu'`       — plain tag name
   * - `'[sbb-button]'`       — attribute on any tag
   */
  selector: string;
  /** Tag name of the new element, e.g. `'sbb-button'`. */
  replaceWith: string;
  /**
   * Additional attributes to remove during the migration, e.g. an attribute
   * which became obsolete through the replacement.
   */
  removeAttributes?: RemovableAttribute[];
}

type ParsedSelectorMigration = SelectorMigration & { parsed: ParsedSelector };

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
export function createTemplateSelectorMigrationRule(migrations: SelectorMigration[]): Rule {
  const parsedMigrations: ParsedSelectorMigration[] = migrations.map((migration) => ({
    ...migration,
    parsed: parseSelector(migration.selector),
  }));

  return createTemplateMigrationRule((element, context) => {
    if (!parsedMigrations.length) {
      return;
    }

    const migration = parsedMigrations.find((candidate) =>
      elementMatches(element, candidate.parsed),
    );
    if (!migration) {
      return;
    }

    const { content, baseOffset, filePath, edits, nextIndex, logger } = context;
    const legacyName = element.name;
    const endSpan = element.endSourceSpan;

    // Without an end span the element was never closed; renaming only the
    // opening tag would corrupt the template, so it is skipped.
    if (!endSpan) {
      logger.warn(
        `  ⚠ Skipped '${migration.selector}' in ${filePath}: the element has no closing tag.`,
      );
      return;
    }

    // 1. Rename the opening tag (`<button` → `<sbb-button`).
    edits.push({
      offset: baseOffset + element.startSourceSpan.start.offset + 1,
      index: nextIndex(),
      length: legacyName.length,
      insertion: migration.replaceWith,
      log: () =>
        logger.info(
          `  → Replaced '${migration.selector}' with '${migration.replaceWith}' in ${filePath}`,
        ),
    });

    // 2. Rename the closing tag, unless the element is self-closing or void.
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

    // 3. Drop the marker attribute of the selector (it is the tag now) plus any
    //    attribute which became obsolete through the replacement.
    const removals: RemovableAttribute[] = [
      ...(migration.parsed.attribute ? [migration.parsed.attribute] : []),
      ...(migration.removeAttributes ?? []),
    ];
    queueAttributeRemovals(element, removals, content, baseOffset, edits, nextIndex);
  });
}
