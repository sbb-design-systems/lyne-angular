import type { ParseSourceSpan } from '@angular/compiler';
import type { Rule } from '@angular-devkit/schematics';
import { noop } from '@angular-devkit/schematics';

import type { MigrationScope } from '../../utils.cjs';
import type { AttributeMigration, ParsedAttributeMigration, Span } from '../common.cjs';
import {
  attributeNameVariants,
  attributeNodes,
  createTemplateMigrationRule,
  elementMatches,
  hasAttribute,
  parseSelector,
  queueAttributeRemoval,
  toCamelCase,
  toDashCase,
} from '../template-migration.cjs';

/**
 * Resolves the span of the attribute name itself (without binding syntax and value).
 * Falls back to a lookup inside the full attribute span for parser versions which do not provide a `keySpan`.
 */
export function resolveKeySpan(
  node: { sourceSpan: ParseSourceSpan; keySpan?: ParseSourceSpan },
  name: string,
  content: string,
): Span | undefined {
  if (node.keySpan) {
    return { start: node.keySpan.start.offset, end: node.keySpan.end.offset };
  }

  const start = content.indexOf(name, node.sourceSpan.start.offset);
  return start >= 0 && start < node.sourceSpan.end.offset
    ? { start, end: start + name.length }
    : undefined;
}

/**
 * Creates a rule which renames (or removes) attributes, inputs and outputs of legacy elements,
 * both in external templates (`templateUrl`) and in inline templates (`template`).
 *
 * ```ts
 * createAttributeMigrationRule([
 *   // Update attribute
 *   { selector: 'sbb-button', attribute: 'svgIcon', replaceWith: 'iconName' },
 *   // Remove attribute
 *   { selector: 'sbb-button', attribute: 'obsoleteFlag' },
 *   // Add attribute if not present
 *   { selector: 'sbb-button', attribute: 'svgIcon', replaceWith: 'iconName', defaultValue: 'arrow-right-small' },
 * ]);
 * ```
 *
 * Handled spellings: `svgIcon="x"`, `svg-icon="x"`, `[svgIcon]="x"` and `(svgIconChange)="x"`.
 * Bindings whose written name does not literally match the legacy attribute
 * (e.g. the synthetic `xChange` output of a `[(x)]` two-way binding)
 * are only migrated once, through their written key.
 */
export function createAttributeMigrationRule(
  migrations?: AttributeMigration[],
  scope?: MigrationScope,
): Rule {
  if (!migrations || migrations.length === 0) {
    return noop();
  }
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
      if (!migration.parsedSelectors.some((selector) => elementMatches(element, selector))) {
        continue;
      }
      const tagAttributeForLogger = element.name;

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
            () => logger.info(`  → Removed '${migration.attribute}' in '${filePath}'`),
          );
          continue;
        }

        if (handledOffsets.has(keySpan.start)) {
          continue;
        }
        handledOffsets.add(keySpan.start);

        // Only another node counts: the node being renamed may match the target spelling (`sbbBadge` vs `sbb-badge`).
        const targetVariants = attributeNameVariants(migration.replaceWith);
        if (nodes.some((node) => node !== matchingNode && targetVariants.includes(node.name))) {
          logger.warn(
            `  ⚠ Skipped renaming '${migration.attribute}' to '${migration.replaceWith}' in ` +
              `'${filePath}': '${tagAttributeForLogger}' already uses '${migration.replaceWith}'.`,
          );
          continue;
        }

        // Same name in another spelling (`sbbBadge` -> `sbb-badge`): the spelling IS the change, use it as given.
        // Otherwise, keep the spelling the consumer used.
        const replacement = variants.includes(migration.replaceWith)
          ? migration.replaceWith
          : writtenKey.includes('-')
            ? toDashCase(migration.replaceWith)
            : toCamelCase(migration.replaceWith);
        if (replacement === writtenKey) {
          continue;
        }

        edits.push({
          offset: baseOffset + keySpan.start,
          index: nextIndex(),
          length: keySpan.end - keySpan.start,
          insertion: replacement,
          log: () =>
            logger.info(
              `  → Renamed '${writtenKey}' to '${replacement}' on '${tagAttributeForLogger}' in '${filePath}'`,
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
              `  → Added default '${replacement}="${migration.defaultValue}"' to '${tagAttributeForLogger}' in '${filePath}'`,
            ),
        });
      }
    }
  }, scope);
}
