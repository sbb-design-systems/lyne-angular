import { TmplAstTemplate } from '@angular/compiler';

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
  { oldImport: '@sbb-esta/angular/tabs', newImport: '@sbb-esta/lyne-angular/tabs' },
];

const noCounterpart = (selector: string, name: string): CommentMigration => ({
  selector,
  message: `FIXME: '${name}' has no counterpart in lyne-angular.`,
});

const comments: CommentMigration[] = [
  {
    selector: 'sbb-tab-group[selectedIndexChange]',
    message:
      "FIXME: 'selectedIndex' is now 'initialSelectedIndex' and is not a two-way binding anymore. Use '(tabChange)' to react to changes.",
  },
  {
    selector: 'sbb-tab-group[preserveContent]',
    message:
      "FIXME: 'preserveContent' has no counterpart in lyne-angular. The content is preserved by default.",
  },
  noCounterpart('sbb-tab-group[animationDuration]', 'animationDuration'),
  noCounterpart('sbb-tab-group[disablePagination]', 'disablePagination'),
  noCounterpart('sbb-tab-group[focusChange]', 'focusChange'),
  noCounterpart('sbb-tab-group[animationDone]', 'animationDone'),
  {
    selector: 'sbb-tab-group[selectedTabChange]',
    message: "FIXME: 'selectedTabChange' is now 'tabChange'; Check the new documentation.",
  },
  noCounterpart('sbb-tab[labelClass]', 'labelClass'),
  noCounterpart('sbb-tab[bodyClass]', 'bodyClass'),
  {
    symbol: 'SbbTabChangeEvent',
    importedFrom: '@sbb-esta/lyne-angular/tabs',
    message: 'FIXME: the event changed, check the new documentation.',
  },
];

const selectors: SelectorMigration[] = [
  {
    selector: 'sbb-tab-group:not([dynamicHeight])',
    replaceWith: 'sbb-tab-group',
    addAttributes: 'fixedHeight',
  },
  {
    selector: '[sbb-tab-label]',
    replaceWith: 'sbb-tab-label',
  },
];

const attributes: AttributeMigration[] = [
  { selector: 'sbb-tab-group', attribute: 'selectedIndex', replaceWith: 'initialSelectedIndex' },
  { selector: 'sbb-tab-group', attribute: 'selectedTabChange', replaceWith: 'tabChange' },
  { selector: 'sbb-tab-group', attribute: 'dynamicHeight' },
  { selector: 'sbb-tab-label', attribute: 'sbb-tab-label' },
];

const TAB = 'sbb-tab';
const LABEL = 'sbb-tab-label';

/**
 * Moves `label` and `disabled` of `<sbb-tab>` to a new `<sbb-tab-label>` placed before the tab.
 */
export const tabLabelMigration = (scope?: MigrationScope) =>
  createTemplateMigrationRule((element, context) => {
    if (element.name !== TAB) {
      return;
    }

    const attr = (name: string) =>
      element.attributes.find((a) => a.name === name) ??
      element.inputs.find((i) => i.name === name);
    const label = attr('label');
    const start = element.startSourceSpan.start.offset;
    if (!label) {
      return;
    }

    const text = label.valueSpan
      ? context.content.slice(label.valueSpan.start.offset, label.valueSpan.end.offset)
      : '';
    const content = element.inputs.includes(label as never) ? `{{ ${text} }}` : text;

    const disabled = attr('disabled');
    const disabledSource = disabled
      ? context.content.slice(disabled.sourceSpan.start.offset, disabled.sourceSpan.end.offset)
      : '';

    const linePrefix = context.content.slice(
      context.content.lastIndexOf('\n', start - 1) + 1,
      start,
    );
    const separator = /^\s*$/.test(linePrefix) ? `\n${linePrefix}` : ' ';

    context.edits.push({
      offset: context.baseOffset + start,
      index: context.nextIndex(),
      length: 0,
      insertion: `<${LABEL}${disabledSource ? ' ' + disabledSource : ''}>${content}</${LABEL}>${separator}`,
      log: () => context.logger.info(`  → Created '${LABEL}' in ${context.filePath}`),
    });

    for (const node of [label, disabled]) {
      if (node) {
        queueAttributeRemoval(
          context.content,
          context.baseOffset,
          node.sourceSpan.start.offset,
          node.sourceSpan.end.offset,
          context.edits,
          context.nextIndex,
        );
      }
    }
  }, scope);

/**
 * Migrate the tabs module (`sbb-tab-group` and `sbb-tab`; the nav bar is not migrated yet)
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Mark inputs, outputs and label templates without a counterpart with a comment
 * 3. ✓ Rename `selectedIndex` → `initialSelectedIndex` and `selectedTabChange` → `tabChange`
 * 4. ✓ `<ng-template sbb-tab-label>x</ng-template>` => `<sbb-tab-label>x</sbb-tab-label>`
 * 5. ✓ `<sbb-tab label="x" disabled>` → `<sbb-tab-label disabled>x</sbb-tab-label><sbb-tab>`
 */
export const TABS_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  selectors,
  attributes,
  customRules: [tabLabelMigration],
};
