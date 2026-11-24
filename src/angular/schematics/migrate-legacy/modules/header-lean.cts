import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
  TypeMigration,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/header-lean', newImport: '@sbb-esta/lyne-angular/header' },
];

const comments: CommentMigration[] = [
  'collapseBreakpoint',
  'label',
  'subtitle',
  'closedStart',
  'openedStart',
  'openedChange',
]
  .map((input) => ({
    selector: `sbb-header-lean[${input}]`,
    message: `FIXME: the attribute \`${input}\` does not exist anymore.`,
  }))
  .concat([
    {
      selector: 'sbb-app-chooser-section',
      message:
        'FIXME: the `sbb-app-chooser-section` does not exist anymore. Check the `sbb-navigation` documentation for a possible replacement.',
    },
    {
      selector: 'sbb-header-menu',
      message:
        'FIXME: the `sbb-header-menu` has been replaced by `sbb-menu`. Import the `SbbMenuModule` from "@sbb-esta/lyne-angular/menu".',
    },
    {
      selector: 'sbb-header-icon-actions',
      message:
        'FIXME: the `sbb-header-icon-actions` does not exist anymore. You can use `sbb-header-button` or `sbb-header-link` without a wrapper component.',
    },
  ]);

const types: TypeMigration[] = [
  { from: 'SbbHeaderLeanModule', to: 'SbbHeaderModule' },
  { from: 'SbbHeaderMenu', to: 'SbbMenu' },
];

const selectors: SelectorMigration[] = [
  { selector: 'sbb-header-lean', replaceWith: 'sbb-header' },
  { selector: 'sbb-header-menu', replaceWith: 'sbb-menu' },
  { selector: 'a[sbbHeaderMenuItem]', replaceWith: 'sbb-link' },
];

const attributes: AttributeMigration[] = [
  {
    action: 'remove',
    selector: ['sbb-link[sbbHeaderMenuItem]'],
    attribute: 'sbbHeaderMenuItem',
  },
  { action: 'rename', selector: '*', attribute: 'sbbHeaderMenu', replaceWith: 'sbbMenu' },
  {
    action: 'replace-value',
    selector: 'sbb-menu',
    attribute: '*',
    attributeValue: 'sbbHeaderMenu',
    replaceValueWith: 'sbbMenu',
  },
];

export const HEADER_LEAN_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  selectors,
  attributes,
};
