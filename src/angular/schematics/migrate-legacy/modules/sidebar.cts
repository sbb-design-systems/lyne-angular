import { TmplAstElement } from '@angular/compiler';

import type { MigrationScope } from '../../utils.cjs';
import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
} from '../common.cjs';
import { createTemplateMigrationRule, queueAttributeRemoval } from '../template-migration.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/sidebar', newImport: '@sbb-esta/lyne-angular/sidebar' },
];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-sidebar[collapsible]',
    message:
      "FIXME: 'collapsible' does not exist anymore. Consider slotting a 'sbb-sidebar-close-button' inside the sidebar.",
  },
  {
    selector: 'sbb-sidebar[collapsibleTitle]',
    message:
      "FIXME: 'collapsibleTitle' does not exist anymore. Consider slotting a 'sbb-sidebar-title' instead.",
  },
  {
    selector: 'sbb-sidebar[triggerSvgIcon]',
    message: "FIXME: 'triggerSvgIcon' has no counterpart in Lyne.",
  },
  {
    selector: 'sbb-icon-sidebar[expanded]',
    message: "FIXME: 'expanded' has no counterpart in Lyne.",
  },
  {
    selector: 'sbb-icon-sidebar[position]',
    message:
      "FIXME: 'position' has no counterpart in Lyne. The position depends from the DOM order.",
  },
];

const selectors: SelectorMigration[] = [
  { selector: 'a[sbbSidebarLink]', replaceWith: 'sbb-block-link' },
];

const attributes: AttributeMigration[] = [
  { selector: 'sbb-block-link', attribute: 'sbbSidebarLink' },
  { selector: 'sbb-sidebar', attribute: 'opened', replaceWith: 'open', onlyOutputs: true },
  { selector: 'sbb-sidebar', attribute: 'closed', replaceWith: 'close', onlyOutputs: true },
  {
    selector: 'sbb-sidebar',
    attribute: 'openedStart',
    replaceWith: 'beforeOpen',
    onlyOutputs: true,
  },
  {
    selector: 'sbb-sidebar',
    attribute: 'closedStart',
    replaceWith: 'beforeClose',
    onlyOutputs: true,
  },
];

const ICON_SIDEBAR_ITEM = 'sbbIconSidebarItem';
const ICON_SIDEBAR_LINK = 'sbb-icon-sidebar-link';

/**
 * `<a sbbIconSidebarItem label="x"><sbb-icon/></a>` =>
 * `<sbb-icon-sidebar-link sbb-tooltip="x" accessibilityLabel="x"><sbb-icon slot="icon"/></sbb-icon-sidebar-link>`
 */
export const iconSidebarItemMigration = (scope?: MigrationScope) =>
  createTemplateMigrationRule((element, context) => {
    const { content, baseOffset, edits, nextIndex, logger, filePath } = context;
    const marker = element.attributes.find((a) => a.name === ICON_SIDEBAR_ITEM);
    if (element.name !== 'a' || !marker || !element.endSourceSpan) {
      return;
    }

    const log = () => logger.info(`  → Migrated '${ICON_SIDEBAR_ITEM}' in '${filePath}'`);
    const rename = (offset: number, length: number, insertion: string) =>
      edits.push({ offset: baseOffset + offset, index: nextIndex(), length, insertion, log });

    rename(element.startSourceSpan.start.offset + 1, 1, ICON_SIDEBAR_LINK);
    rename(element.endSourceSpan.start.offset + 2, 1, ICON_SIDEBAR_LINK);
    queueAttributeRemoval(
      content,
      baseOffset,
      marker.sourceSpan.start.offset,
      marker.sourceSpan.end.offset,
      edits,
      nextIndex,
    );

    const label = element.attributes.find((a) => a.name === 'label');
    const boundLabel = element.inputs.find((i) => i.name === 'label');
    if (label) {
      const { start, end } = label.sourceSpan;
      const value = JSON.stringify(label.value).slice(1, -1);
      rename(
        start.offset,
        end.offset - start.offset,
        `sbb-tooltip="${value}" accessibilityLabel="${value}"`,
      );
    } else if (boundLabel?.valueSpan) {
      const { start, end } = boundLabel.sourceSpan;
      const source = content.slice(
        boundLabel.valueSpan.start.offset,
        boundLabel.valueSpan.end.offset,
      );
      rename(
        start.offset,
        end.offset - start.offset,
        `[sbb-tooltip]="${source}" [accessibilityLabel]="${source}"`,
      );
    }

    for (const child of element.children) {
      if (
        child instanceof TmplAstElement &&
        child.name === 'sbb-icon' &&
        !child.attributes.some((a) => a.name === 'slot')
      ) {
        rename(child.startSourceSpan.start.offset + 1 + child.name.length, 0, ' slot="icon"');
      }
    }
  }, scope);

/**
 * Migrate the sidebar module
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Mark removed inputs and outputs, and the initial-only `opened`
 * 3. ✓ `a[sbbSidebarLink]` => `sbb-block-link`
 * 4. ✓ Outputs `opened` => `open`, `closed` => `close`,
 *      `openedStart` => `beforeOpen`, `closedStart` => `beforeClose`
 * 5. ✓ Mark `expanded` and `position` of `sbb-icon-sidebar`
 * 6. ✓ `a[sbbIconSidebarItem]` => `sbb-icon-sidebar-link`, `label` => `sbb-tooltip` and
 *      `accessibilityLabel`, `slot="icon"` on the inner `sbb-icon`
 */
export const SIDEBAR_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  selectors,
  attributes,
  customRules: [iconSidebarItemMigration],
};
