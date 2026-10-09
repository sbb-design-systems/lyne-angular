import type { TmplAstElement } from '@angular/compiler';
import type { ParseSourceSpan } from '@angular/compiler';
import type { Rule } from '@angular-devkit/schematics';

import {
  attributeNameVariants,
  createTemplateMigrationRule,
  elementMatches,
  ParsedSelector,
  parseSelector,
  queueAttributeRemoval,
  resolveKeySpan,
  toCamelCase,
  toDashCase,
} from '../template-migration.cjs';

export interface AttributeMigration {
  /**
   * Selector(s) of the elements owning the attribute, e.g. `'sbb-button'`,
   * `['sbb-button', 'sbb-secondary-button']` or `'button[sbb-button]'`.
   */
  selector: string | string[];
  /**
   * Legacy attribute, input or output name. Both the camelCase and the
   * dash-case spelling are matched, the original spelling is preserved.
   */
  attribute: string;
  /** New name. When omitted, the attribute is removed instead of renamed. */
  replaceWith?: string;
}

type ParsedAttributeMigration = AttributeMigration & { parsedSelectors: ParsedSelector[] };

/** Static attribute, bound input or output of an element. */
type AttributeNode = { name: string; sourceSpan: ParseSourceSpan; keySpan?: ParseSourceSpan };

function attributeNodes(element: TmplAstElement): AttributeNode[] {
  return [...element.attributes, ...element.inputs, ...element.outputs];
}

/** Whether the element already uses the target name, which would create a duplicate. */
function hasAttribute(element: TmplAstElement, name: string): boolean {
  const variants = attributeNameVariants(name);
  return attributeNodes(element).some((node) => variants.includes(node.name));
}

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
export function createAttributeMigrationRule(migrations: AttributeMigration[]): Rule {
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

      const variants = attributeNameVariants(migration.attribute);

      for (const node of attributeNodes(element)) {
        if (!variants.includes(node.name)) {
          continue;
        }

        const keySpan = resolveKeySpan(node, node.name, content);
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
          if (handledOffsets.has(node.sourceSpan.start.offset)) {
            continue;
          }
          handledOffsets.add(node.sourceSpan.start.offset);

          queueAttributeRemoval(
            content,
            baseOffset,
            node.sourceSpan.start.offset,
            node.sourceSpan.end.offset,
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
              `${filePath}: <${element.name}> already uses '${migration.replaceWith}'.`,
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
              `  → Renamed '${writtenKey}' to '${replacement}' on <${element.name}> in ${filePath}`,
            ),
        });
      }
    }
  });
}
