import {
  ASTWithSource,
  LiteralPrimitive,
  type ParseSourceSpan,
  parseTemplate,
  TmplAstBoundAttribute,
  TmplAstElement,
} from '@angular/compiler';
import type { Rule } from '@angular-devkit/schematics';
import { noop, SchematicsException } from '@angular-devkit/schematics';

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

/** The value of an attribute as written: the text of a static attribute, or the unquoted literal / source of a binding. */
function attributeValueOf(
  node: ReturnType<typeof attributeNodes>[number] | TmplAstElement['references'][number],
): string | undefined {
  const { value, handler } = node as { value?: unknown; handler?: unknown };
  if (typeof value === 'string') {
    return value;
  }
  const bound = (value ?? handler) as
    { source?: string | null; ast?: { value?: unknown } } | undefined;
  return typeof bound?.ast?.value === 'string' ? bound.ast.value : bound?.source?.trim();
}

/** Resolves a single verbatim replacement's name so duplicates can be prevented. */
function replacementName(replacement: string): string | undefined {
  const content = `<sbb-migration ${replacement}></sbb-migration>`;
  const parsed = parseTemplate(content, 'wildcard-replacement.html');
  const element = parsed.nodes[0];
  if (parsed.errors?.length || parsed.nodes.length !== 1 || !(element instanceof TmplAstElement)) {
    return undefined;
  }
  const nodes = attributeNodes(element).filter(
    (node) =>
      content.slice(node.sourceSpan.start.offset, node.sourceSpan.end.offset) ===
      replacement.trim(),
  );
  const names = new Set(
    nodes
      .filter((node) => {
        const span = resolveKeySpan(node, node.name, content);
        return span && content.slice(span.start, span.end) === node.name;
      })
      .map((node) => node.name),
  );
  if (names.size !== 1) {
    return undefined;
  }
  return [...names][0];
}

/**
 * Creates a rule which renames (or removes) attributes, inputs and outputs of legacy elements,
 * both in external templates (`templateUrl`) and in inline templates (`template`).
 *
 * ```ts
 * createAttributeMigrationRule([
 *   // Update attribute
 *   { action: 'rename', selector: 'sbb-button', attribute: 'svgIcon', replaceWith: 'iconName' },
 *   // Remove attribute
 *   { action: 'remove', selector: 'sbb-button', attribute: 'obsoleteFlag' },
 *   // Add attribute if not present
 *   { action: 'rename-or-add', selector: 'sbb-button', attribute: 'svgIcon', replaceWith: 'iconName', defaultValue: 'arrow-right-small' },
 *   // Replace attribute
 *   { action: 'replace', selector: 'sbb-status', attribute: 'type', attributeValue: 'valid', replaceWith: 'type="success"' },
 *   // Update the export of any template reference
 *   { action: 'replace-value', selector: 'sbb-menu', attribute: '*', attributeValue: 'sbbHeaderMenu', replaceValueWith: 'sbbMenu' },
 * ]);
 * ```
 *
 * `attribute: '*'` matches all supported attributes with the required `attributeValue`.
 * `attributeValue` restricts a migration to attributes with that value (static, or the literal / source of a binding).
 * `action: 'replace'` replaces the whole attribute with `replaceWith`, verbatim; .
 * `replaceValueWith` changes the value without changing the attribute or template reference name.
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
  const parsedMigrations: ParsedAttributeMigration[] = migrations.map((migration) => {
    const action = migration.action;
    const requiresName = action === 'rename' || action === 'rename-or-add' || action === 'replace';
    const validAction = requiresName || action === 'remove' || action === 'replace-value';
    if (
      !validAction ||
      (requiresName
        ? typeof migration.replaceWith !== 'string' || !migration.replaceWith
        : migration.replaceWith !== undefined) ||
      (action === 'replace-value'
        ? typeof migration.replaceValueWith !== 'string'
        : migration.replaceValueWith !== undefined) ||
      (action === 'rename-or-add'
        ? typeof migration.defaultValue !== 'string'
        : migration.defaultValue !== undefined)
    ) {
      throw new SchematicsException(
        'Invalid attribute migration action or options. Check your migration object.',
      );
    }
    if (
      migration.action === 'replace-value' &&
      (/['"&<>\\]/.test(migration.replaceValueWith) ||
        [...migration.replaceValueWith].some((char) => {
          const code = char.charCodeAt(0);
          return code < 32 || code === 127;
        }))
    ) {
      throw new SchematicsException(
        "'replaceValueWith' does not support HTML or expression special characters.",
      );
    }
    const parsedSelectors = (
      Array.isArray(migration.selector) ? migration.selector : [migration.selector]
    ).map(parseSelector);
    if (migration.attribute === '*') {
      if (
        parsedSelectors.some((selector) =>
          selector.alternatives.some(
            (alternative) =>
              (!alternative.element || alternative.element === '*') &&
              !alternative.classNames.length &&
              !alternative.attrs.length &&
              !alternative.notSelectors.length,
          ),
        )
      ) {
        throw new SchematicsException(
          "An attribute wildcard cannot be combined with a universal element selector '*'.",
        );
      }
      if (migration.attributeValue === undefined) {
        throw new SchematicsException("An attribute wildcard requires 'attributeValue'.");
      }
      if (action === 'rename-or-add') {
        throw new SchematicsException("An attribute wildcard does not support 'defaultValue'.");
      }
      if (action === 'replace' && !replacementName(migration.replaceWith)) {
        throw new SchematicsException('A wildcard replacement must contain one valid attribute.');
      }
    }
    return { ...migration, parsedSelectors };
  });

  return createTemplateMigrationRule((element, context) => {
    if (!parsedMigrations.length) {
      return;
    }

    const { content, baseOffset, filePath, edits, nextIndex, logger } = context;
    // Several bindings can share a key span (e.g. the input and the output of a `[(x)]` two-way binding); every span must only be edited once.
    const handledOffsets = new Set<number>();
    const reservedTargets = new Set<string>();

    for (const migration of parsedMigrations) {
      if (!migration.parsedSelectors.some((selector) => elementMatches(element, selector))) {
        continue;
      }
      const tagAttributeForLogger = element.name;

      const wildcard = migration.attribute === '*';
      const variants = wildcard ? [] : attributeNameVariants(migration.attribute);
      const nodes = migration.onlyOutputs
        ? [...element.outputs]
        : [
            ...attributeNodes(element, migration.excludeOutputs),
            ...(migration.action === 'replace-value' ? element.references : []),
          ];
      const matchingNodes = nodes.filter(
        (node) =>
          (wildcard || variants.includes(node.name)) &&
          (migration.attributeValue === undefined ||
            migration.attributeValue === attributeValueOf(node)),
      );
      const candidates = wildcard ? matchingNodes : matchingNodes.slice(0, 1);
      const writtenNodes = candidates.flatMap((node) => {
        const keySpan = resolveKeySpan(node, node.name, content);
        if (!keySpan) {
          return [];
        }
        const writtenKey = content.slice(keySpan.start, keySpan.end);
        return (wildcard ? writtenKey === node.name : variants.includes(writtenKey))
          ? [{ node, keySpan, writtenKey }]
          : [];
      });
      const distinctNodes = writtenNodes.filter(
        ({ keySpan }, index) =>
          writtenNodes.findIndex((candidate) => candidate.keySpan.start === keySpan.start) ===
          index,
      );

      if (
        wildcard &&
        (migration.action === 'rename' || migration.action === 'replace') &&
        distinctNodes.length > 1
      ) {
        logger.warn(
          `  ⚠ Skipped wildcard replacement on '${tagAttributeForLogger}' in '${filePath}': multiple attributes would use the same target.`,
        );
        continue;
      }

      for (const { node: matchingNode, keySpan, writtenKey } of distinctNodes) {
        if (handledOffsets.has(keySpan.start)) {
          continue;
        }

        if (migration.action === 'replace-value') {
          const valueSpan =
            'valueSpan' in matchingNode
              ? matchingNode.valueSpan
              : 'handlerSpan' in matchingNode
                ? matchingNode.handlerSpan
                : undefined;
          const start = valueSpan?.start.offset ?? matchingNode.sourceSpan.end.offset;
          const end = valueSpan?.end.offset ?? start;
          const quote = valueSpan ? content[start - 1] : undefined;
          let value = migration.replaceValueWith;
          if (
            matchingNode instanceof TmplAstBoundAttribute &&
            matchingNode.value instanceof ASTWithSource &&
            matchingNode.value.ast instanceof LiteralPrimitive &&
            typeof matchingNode.value.ast.value === 'string'
          ) {
            value = quote === "'" ? `"${value}"` : `'${value}'`;
          }
          const insertion = valueSpan
            ? quote === "'" || quote === '"'
              ? value
              : `"${value}"`
            : `="${value}"`;
          if (content.slice(start, end) === insertion) {
            continue;
          }
          handledOffsets.add(keySpan.start);
          edits.push({
            offset: baseOffset + start,
            index: nextIndex(),
            length: end - start,
            insertion,
            log: () =>
              logger.info(
                `  → Replaced value of '${writtenKey}' on '${tagAttributeForLogger}' in '${filePath}'`,
              ),
          });
          continue;
        }

        if (migration.action === 'remove') {
          handledOffsets.add(keySpan.start);

          queueAttributeRemoval(
            content,
            baseOffset,
            matchingNode.sourceSpan.start.offset,
            matchingNode.sourceSpan.end.offset,
            edits,
            nextIndex,
            () => logger.info(`  → Removed '${writtenKey}' in '${filePath}'`),
          );
          continue;
        }

        if (migration.action === 'replace') {
          const { start, end } = matchingNode.sourceSpan;
          if (content.slice(start.offset, end.offset) === migration.replaceWith) {
            continue;
          }
          const targetName = replacementName(migration.replaceWith);
          if (targetName) {
            const targetVariants = attributeNameVariants(targetName);
            if (
              (wildcard &&
                attributeNodes(element).some(
                  (node) => node !== matchingNode && targetVariants.includes(node.name),
                )) ||
              targetVariants.some((name) => reservedTargets.has(name))
            ) {
              logger.warn(
                `  ⚠ Skipped replacement on '${tagAttributeForLogger}' in '${filePath}': '${targetName}' already exists.`,
              );
              continue;
            }
            targetVariants.forEach((name) => reservedTargets.add(name));
          }
          handledOffsets.add(keySpan.start);
          edits.push({
            offset: baseOffset + start.offset,
            index: nextIndex(),
            length: end.offset - start.offset,
            insertion: migration.replaceWith,
            log: () =>
              logger.info(
                `  → Replaced '${writtenKey}' with '${migration.replaceWith}' on '${tagAttributeForLogger}' in '${filePath}'`,
              ),
          });
          continue;
        }

        // Only another node counts: the node being renamed may match the target spelling (`sbbBadge` vs `sbb-badge`).
        const targetVariants = attributeNameVariants(migration.replaceWith);
        const targetNodes = wildcard ? attributeNodes(element) : nodes;
        if (
          targetNodes.some((node) => node !== matchingNode && targetVariants.includes(node.name)) ||
          targetVariants.some((name) => reservedTargets.has(name))
        ) {
          logger.warn(
            `  ⚠ Skipped renaming '${migration.attribute}' to '${migration.replaceWith}' in ` +
              `'${filePath}': '${tagAttributeForLogger}' already uses '${migration.replaceWith}'.`,
          );
          continue;
        }

        // Same name in another spelling (`sbbBadge` -> `sbb-badge`): the spelling IS the change, use it as given.
        // Otherwise, keep the spelling the consumer used.
        // A dash-case target (e.g. `sbb-tooltip-open-delay`) is an exact alias and has no camelCase form.
        const replacement =
          attributeNameVariants(writtenKey).includes(migration.replaceWith) ||
          migration.replaceWith.includes('-')
            ? migration.replaceWith
            : writtenKey.includes('-')
              ? toDashCase(migration.replaceWith)
              : toCamelCase(migration.replaceWith);
        if (replacement === writtenKey) {
          continue;
        }

        handledOffsets.add(keySpan.start);
        targetVariants.forEach((name) => reservedTargets.add(name));
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
      if (!matchingNodes.length && migration.action === 'rename-or-add') {
        // Don't add default if already migrated
        const targetVariants = attributeNameVariants(migration.replaceWith);
        if (
          hasAttribute(element, migration.replaceWith) ||
          targetVariants.some((name) => reservedTargets.has(name))
        ) {
          continue;
        }
        targetVariants.forEach((name) => reservedTargets.add(name));

        const tagStartOffset = element.startSourceSpan.start.offset;
        const tagName = element.name;
        const insertionOffset = tagStartOffset + 1 + tagName.length;

        const replacement = migration.attribute.includes('-')
          ? toDashCase(migration.replaceWith)
          : toCamelCase(migration.replaceWith);

        const insertionText = ` ${replacement}="${migration.defaultValue}"`;

        const index = nextIndex();
        // A removal can start where the default is inserted. Apply that removal first.
        for (const edit of edits) {
          if (edit.offset === baseOffset + insertionOffset && edit.length > 0) {
            edit.index = nextIndex();
          }
        }
        edits.push({
          offset: baseOffset + insertionOffset,
          index,
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
