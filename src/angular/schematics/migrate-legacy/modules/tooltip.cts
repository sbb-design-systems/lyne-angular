import {
  ImplicitReceiver,
  PropertyRead,
  TmplAstTemplate,
  type TmplAstNode,
} from '@angular/compiler';

import type { MigrationScope } from '../../utils.cjs';
import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  TypeMigration,
} from '../common.cjs';
import {
  attributeNodes,
  createTemplateMigrationRule,
  queueAttributeRemoval,
} from '../template-migration.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/tooltip', newImport: '@sbb-esta/lyne-angular/tooltip' },
];

const comments: CommentMigration[] = [
  {
    selector: ['sbb-tooltip[position]', '[sbbTooltipPosition]'],
    message:
      'FIXME: the `position` input behaves differently in Lyne. Check the documentation for more info.',
  },
  {
    selector: '[sbbTooltipClass]',
    message: 'FIXME: the `sbbTooltipClass` input does not exist in Lyne.',
  },
  {
    selector: '[sbbTooltipPanelClass]',
    message: 'FIXME: the `sbbTooltipPanelClass` input does not exist in Lyne.',
  },
  {
    selector: '[sbbTooltipTouchGestures]',
    message: 'FIXME: the `sbbTooltipTouchGestures` input does not exist in Lyne.',
  },
  {
    selector: '[sbbTooltipDisabled]',
    message: 'FIXME: the `sbbTooltipDisabled` input does not exist in Lyne.',
  },
  {
    selector: 'sbb-tooltip[disabled]',
    message: 'FIXME: the `disabled` input does not exist in Lyne.',
  },
  {
    symbol: 'SBB_TOOLTIP_DEFAULT_OPTIONS',
    message: 'FIXME: SBB_TOOLTIP_DEFAULT_OPTIONS does not exist in Lyne.',
  },
];

const types: TypeMigration[] = [{ from: 'SbbTooltipChangeEvent', to: 'Event', skipImports: true }];

const attributes: AttributeMigration[] = [
  { selector: 'sbb-tooltip', attribute: 'svgIcon', replaceWith: 'iconName' },
  { selector: 'sbb-tooltip', attribute: 'hoverShowDelay', replaceWith: 'openDelay' },
  { selector: 'sbb-tooltip', attribute: 'hoverHideDelay', replaceWith: 'closeDelay' },
  { selector: 'sbb-tooltip', attribute: 'opened', replaceWith: 'open' },
  { selector: 'sbb-tooltip', attribute: 'dismissed', replaceWith: 'close' },
  {
    selector: 'sbb-tooltip',
    attribute: 'trigger',
    attributeValue: 'hover',
    replaceWith: 'hoverTrigger',
    fullyReplace: true,
  },
  { selector: 'sbb-tooltip', attribute: 'trigger', attributeValue: 'click' },

  {
    selector: '*[sbbTooltip]',
    attribute: 'sbbTooltipShowDelay',
    replaceWith: 'sbb-tooltip-open-delay',
  },
  {
    selector: '*[sbbTooltip]',
    attribute: 'sbbTooltipHideDelay',
    replaceWith: 'sbb-tooltip-close-delay',
  },
];

const TOOLTIP = 'sbb-tooltip';
const POPOVER = 'sbb-popover';
const DEFAULT_ICON = 'circle-information-small';

/**
 * `<sbb-tooltip>` => `<sbb-mini-button [sbbPopover]="popover" iconName="..."> + <sbb-popover #popover>`.
 * The `iconName` moves to the button, all other attributes stay on the popover.
 */
export const tooltipToPopoverMigration = (scope?: MigrationScope) => {
  // Template variables must be unique within a template.
  const counters = new Map<string, number>();

  return createTemplateMigrationRule((element, context) => {
    // A reference to `sbbTooltip` marks an already migrated `<sbb-tooltip>`.
    if (element.name !== TOOLTIP || element.references.some((ref) => ref.value === 'sbbTooltip')) {
      return;
    }

    // Calculate a unique template variable name for the popover. First is `popover`, then `popover-{i}`
    const count = (counters.get(context.filePath) ?? 0) + 1;
    counters.set(context.filePath, count);
    const variable = count === 1 ? 'popover' : `popover${count}`;

    // Move the `iconName` to the button, all other attributes stay on the popover.
    const icon = attributeNodes(element).find((node) => node.name === 'iconName');
    const iconSource = icon
      ? context.content.slice(icon.sourceSpan.start.offset, icon.sourceSpan.end.offset)
      : `iconName="${DEFAULT_ICON}"`;

    const start = element.startSourceSpan.start.offset;
    const lineStart = context.content.lastIndexOf('\n', start - 1) + 1;
    const indent = context.content.slice(lineStart, start);
    const separator = /^[ \t]*$/.test(indent) ? `\n${indent}` : ' ';

    // Insert the mini-button before the tooltip
    context.edits.push({
      offset: context.baseOffset + start,
      index: context.nextIndex(),
      length: 0,
      insertion: `<sbb-mini-button [sbbPopover]="${variable}" ${iconSource}></sbb-mini-button>${separator}`,
      log: () =>
        context.logger.info(`  → Replaced '${TOOLTIP}' with a popover in ${context.filePath}`),
    });

    // Replace the tooltip with a popover
    context.edits.push({
      offset: context.baseOffset + start + 1,
      index: context.nextIndex(),
      length: TOOLTIP.length,
      insertion: `${POPOVER} #${variable}="sbbPopover"`,
    });
    const end = element.endSourceSpan;
    if (end && end.start.offset !== start && context.content.startsWith('</', end.start.offset)) {
      context.edits.push({
        offset: context.baseOffset + end.start.offset + 2,
        index: context.nextIndex(),
        length: TOOLTIP.length,
        insertion: POPOVER,
      });
    }

    if (icon) {
      // The icon is now on the button.
      queueAttributeRemoval(
        context.content,
        context.baseOffset,
        icon.sourceSpan.start.offset,
        icon.sourceSpan.end.offset,
        context.edits,
        context.nextIndex,
      );
    }
  }, scope);
};

/** Finds all `<ng-template>`s of a template, at any depth. */
function findNgTemplates(nodes: TmplAstNode[], found: TmplAstTemplate[] = []): TmplAstTemplate[] {
  for (const node of nodes) {
    if (node instanceof TmplAstTemplate && node.tagName === 'ng-template') {
      found.push(node);
    }
    const nested = node as unknown as Record<string, unknown>;
    findNgTemplates((nested['children'] as TmplAstNode[] | undefined) ?? [], found);
    for (const branch of (nested['branches'] ?? nested['groups'] ?? []) as {
      children: TmplAstNode[];
    }[]) {
      findNgTemplates(branch.children, found);
    }
  }
  return found;
}

/**
 * `[sbbTooltip]="ref"` + `<ng-template #ref>` => `<sbb-tooltip #ref="sbbTooltip">`.
 * Only template references are migrated, text values stay as they are.
 */
export const tooltipTemplateRefMigration = (scope?: MigrationScope) => {
  const migrated = new Set<string>();

  return createTemplateMigrationRule((element, context) => {
    const input = element.inputs.find((candidate) => candidate.name === 'sbbTooltip');
    const ast = (input?.value as { ast?: unknown } | undefined)?.ast;
    if (!(ast instanceof PropertyRead) || !(ast.receiver instanceof ImplicitReceiver)) {
      return;
    }

    const name = ast.name;
    const template = findNgTemplates(context.rootNodes).find(
      (candidate) =>
        candidate.references.some((ref) => ref.name === name && !ref.value) &&
        !candidate.variables.length &&
        candidate.endSourceSpan,
    );
    const key = `${context.filePath}:${template?.sourceSpan.start.offset}`;
    if (!template || migrated.has(key)) {
      return;
    }
    migrated.add(key);

    const reference = template.references.find((ref) => ref.name === name)!;
    const end = template.endSourceSpan!;
    const push = (offset: number, length: number, insertion: string, log?: () => void) =>
      context.edits.push({
        offset: context.baseOffset + offset,
        index: context.nextIndex(),
        length,
        insertion,
        log,
      });

    push(template.startSourceSpan.start.offset + 1, 'ng-template'.length, TOOLTIP, () =>
      context.logger.info(
        `  → Replaced '<ng-template #${name}>' with '${TOOLTIP}' in ${context.filePath}`,
      ),
    );
    push(
      reference.sourceSpan.start.offset,
      reference.sourceSpan.end.offset - reference.sourceSpan.start.offset,
      `#${name}="sbbTooltip"`,
    );
    if (context.content.startsWith('</', end.start.offset)) {
      push(end.start.offset + 2, 'ng-template'.length, TOOLTIP);
    }
  }, scope);
};

/**
 * Migrate the tooltip module (including expansion-panel)
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Mark unsupported inputs with a FIXME comment
 * 3. ✓ Convert inputs to new names
 * 4. ✓ Convert `<sbb-tooltip>` => `<sbb-mini-button> + <sbb-popover>`
 * 5. ✓ Convert `[sbbTooltip]="templateRef"` => Transform the template ref into`<sbb-tooltip #templateRef="sbbTooltip">...</sbb-tooltip>`
 * 6. x `[sbbTooltip]="'string'"` => can stay as is
 */
export const TOOLTIP_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  attributes,
  customRules: [tooltipToPopoverMigration, tooltipTemplateRefMigration],
};
