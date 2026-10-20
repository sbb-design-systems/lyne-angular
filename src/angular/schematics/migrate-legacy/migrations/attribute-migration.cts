import type { Rule } from '@angular-devkit/schematics';

import type { MigrationScope } from '../../utils.cjs';
import {
  attributeNameVariants,
  attributeNodes,
  createTemplateMigrationRule,
  elementMatches,
  hasAttribute,
  ParsedSelector,
  parseSelector,
  queueAttributeRemoval,
  resolveKeySpan,
  toCamelCase,
  toDashCase,
} from '../template-migration.cjs';

export interface AttributeMigration {
  /**
   * Selector(s) of the elements owning the attribute, e.g.
   *  - `'sbb-button'`
   *  - `['sbb-button', 'sbb-secondary-button']`
   *  - `'button[sbb-button]'`.
   */
  selector: string | string[];
  /**
   * Legacy attribute, input or output name. Both the camelCase and the
   * dash-case spelling are matched, the original spelling is preserved.
   */
  attribute: string;
  /** New name. When omitted, the attribute is removed instead of renamed. */
  replaceWith?: string;
  /**
   * If attribute is not found, add a new `replaceWith` attribute with this value set.
   * NOTE: defaultValue is inserted verbatim between double quotes, so it must be valid attribute-value HTML.
   */
  defaultValue?: string;
}

type ParsedAttributeMigration = AttributeMigration & { parsedSelectors: ParsedSelector[] };

/**
 * Creates a rule which renames (or removes) attributes, inputs and outputs of legacy elements,
 * both in external templates (`templateUrl`) and in inline templates (`template`).
 *
 * ```ts
 * createAttributeMigrationRule([
 *   { selector: 'sbb-button', attribute: 'svgIcon', replaceWith: 'iconName' },
 *   { selector: 'sbb-button', attribute: 'obsoleteFlag' }, // removed
 * ]);
 * ```
 *
 * Handled spellings: `svgIcon="x"`, `svg-icon="x"`, `[svgIcon]="x"` and `(svgIconChange)="x"`.
 * Bindings whose written name does not literally match the legacy attribute
 * (e.g. the synthetic `xChange` output of a `[(x)]` two-way binding)
 * are only migrated once, through their written key.
 */
export function createAttributeMigrationRule(
  migrations: AttributeMigration[],
  scope?: MigrationScope,
): Rule {
  const parsedMigrations: ParsedAttributeMigration[] = migrations.map((migration) => ({
    ...migration,
    parsedSelectors: (Array.isArray(migration.selector)
      ? migration.selector
      : [migration.selector]
    ).map(parseSelector),
  }));

  return createTemplateMigrationRule((element, context) => {
    if (!parsedMigrations.length) {
      return;
    }

    const { content, baseOffset, filePath, edits, nextIndex, logger } = context;
    // Several bindings can share a key span (e.g. the input and the output of a `[(x)]` two-way binding); every span must only be edited once.
    const handledOffsets = new Set<number>();

    for (const migration of parsedMigrations) {
      const parsedSelector = migration.parsedSelectors.find((selector) =>
        elementMatches(element, selector),
      );
      if (!parsedSelector) {
        continue;
      }
      const tagAttributeForLogger = `${parsedSelector.tag}${!!parsedSelector.attribute ? `[${parsedSelector.attribute}]` : ''}`;

      const variants = attributeNameVariants(migration.attribute);
      const nodes = attributeNodes(element);
      const matchingNode = nodes.find((node) => variants.includes(node.name));

      // The legacy attributes exists in the element to migrate.
      if (matchingNode) {
        const keySpan = resolveKeySpan(matchingNode, matchingNode.name, content);
        if (!keySpan) {
          continue;
        }

        // The written key has to match literally, otherwise a synthetic name
        // (e.g. `xChange` of `[(x)]`) or an unsupported syntax is at play.
        const writtenKey = content.slice(keySpan.start, keySpan.end);
        if (!variants.includes(writtenKey)) {
          continue;
        }

        if (!migration.replaceWith) {
          if (handledOffsets.has(matchingNode.sourceSpan.start.offset)) {
            continue;
          }
          handledOffsets.add(matchingNode.sourceSpan.start.offset);

          queueAttributeRemoval(
            content,
            baseOffset,
            matchingNode.sourceSpan.start.offset,
            matchingNode.sourceSpan.end.offset,
            edits,
            nextIndex,
            () => logger.info(`  → Removed '${migration.attribute}' in ${filePath}`),
          );
          continue;
        }

        if (handledOffsets.has(keySpan.start)) {
          continue;
        }
        handledOffsets.add(keySpan.start);

        if (hasAttribute(element, migration.replaceWith)) {
          logger.warn(
            `  ⚠ Skipped renaming '${migration.attribute}' to '${migration.replaceWith}' in ` +
              `${filePath}: ${tagAttributeForLogger} already uses '${migration.replaceWith}'.`,
          );
          continue;
        }

        // Keep the spelling the consumer used.
        const replacement = writtenKey.includes('-')
          ? toDashCase(migration.replaceWith)
          : toCamelCase(migration.replaceWith);

        edits.push({
          offset: baseOffset + keySpan.start,
          index: nextIndex(),
          length: keySpan.end - keySpan.start,
          insertion: replacement,
          log: () =>
            logger.info(
              `  → Renamed '${writtenKey}' to '${replacement}' on ${tagAttributeForLogger} in ${filePath}`,
            ),
        });
      }
      // The legacy attributes doesn't exist in the element to migrate, but a defaultValue is required.
      else if (migration.replaceWith && migration.defaultValue !== undefined) {
        // Don't add default if already migrated
        if (hasAttribute(element, migration.replaceWith)) {
          continue;
        }

        const tagStartOffset = element.startSourceSpan.start.offset;
        const tagName = element.name;
        const insertionOffset = tagStartOffset + 1 + tagName.length;

        const replacement = migration.attribute.includes('-')
          ? toDashCase(migration.replaceWith)
          : toCamelCase(migration.replaceWith);

        const insertionText = ` ${replacement}="${migration.defaultValue}"`;

        edits.push({
          offset: baseOffset + insertionOffset,
          index: nextIndex(),
          length: 0,
          insertion: insertionText,
          log: () =>
            logger.info(
              `  → Added default '${replacement}="${migration.defaultValue}"' to ${tagAttributeForLogger} in ${filePath}`,
            ),
        });
      }
    }
  }, scope);
}
