import type { CssSelector } from '@angular/compiler';
import { noop, Rule } from '@angular-devkit/schematics';

import type { MigrationScope } from '../../utils.cjs';
import {
  createTemplateMigrationRule,
  matchSelector,
  ParsedSelector,
  parseSelector,
  queueAttributeRemovals,
  selectorAttributes,
} from '../template-migration.cjs';

export type { RemovableAttribute } from '../template-migration.cjs';

export interface SelectorMigration {
  /**
   * CSS-like selector of the legacy element, using the Angular selector syntax. Examples:
   * - `'sbb-usermenu'`                     — tag name
   * - `'[sbb-button]'`                     — attribute on any tag
   * - `'button[sbb-button]'`               — tag name combined with an attribute
   * - `'a.link'`                           — class
   * - `'a[href=foo].link'`                 — attribute value and class
   * - `'a:not(.link)'`                     — excluding a class
   * - `'a:not([download])'`                — excluding an attribute
   * - `'a:not([href="/"])'`                — excluding an attribute value
   * - `'a.link[sbb-link]:not([download])'` — any combination of the above
   * - `'a[sbb-link], button[sbb-link]'`    — list of alternatives
   */
  selector: string;
  /** Tag name of the new element, e.g. `'sbb-button'`. */
  replaceWith: string;
  /**
   * Whether to remove the attributes required by the selector from the migrated element, e.g.
   * `sbb-button` for `'button[sbb-button]'`, because they are the tag name now.
   *
   * Defaults to `false`: the attributes are kept.
   * Attributes inside `:not(...)` are never removed, and classes are never removed either.
   */
  removeSelectorAttributes?: boolean;
}

type ParsedSelectorMigration = SelectorMigration & { parsedSelector: ParsedSelector };

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
      insertion: migration.replaceWith,
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

    // Drop the attributes of the selector (they are the tag now), but only if requested.
    if (migration.removeSelectorAttributes) {
      queueAttributeRemovals(
        element,
        selectorAttributes(matchedAlternative),
        content,
        baseOffset,
        edits,
        nextIndex,
      );
    }
  }, scope);
}
