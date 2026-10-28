import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/button', newImport: '@sbb-esta/lyne-angular/button' },
];

const comments: CommentMigration[] = [
  {
    selector: '[sbb-alt-button]',
    message: 'FIXME: this component has no counterpart in lyne-angular.',
  },
  {
    selector: '[sbb-link]',
    message:
      "FIXME: links are now imported from `SbbLinkModule` under `@sbb-esta/lyne-angular/link`. Check the component's imports.",
  },
  {
    symbol: 'SbbAnchor',
    message:
      'FIXME: links are now imported from `SbbLinkModule` under `@sbb-esta/lyne-angular/link`. Check the different link variants in the documentation.',
  },
];

const selectors: SelectorMigration[] = [
  { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
  { selector: 'button[sbb-secondary-button]', replaceWith: 'sbb-secondary-button' },
  { selector: 'button[sbb-ghost-button]', replaceWith: 'sbb-accent-button' },
  { selector: 'button[sbb-frameless-button]', replaceWith: 'sbb-transparent-button' },
  { selector: 'a[sbb-button]', replaceWith: 'sbb-button-link' },
  { selector: 'a[sbb-secondary-button]', replaceWith: 'sbb-secondary-button-link' },
  { selector: 'a[sbb-ghost-button]', replaceWith: 'sbb-accent-button-link' },
  { selector: 'a[sbb-frameless-button]', replaceWith: 'sbb-transparent-button-link' },
  { selector: 'button[sbb-link]', replaceWith: 'sbb-block-link-button' },
  { selector: 'a[sbb-link]', replaceWith: 'sbb-block-link' },
  { selector: 'a:not([sbb-link]):not(.sbb-link-reset)', replaceWith: 'sbb-link' },
];

const attributes: AttributeMigration[] = [
  {
    selector: selectors.map((selector) => selector.selector),
    attribute: 'svgIcon',
    replaceWith: 'iconName',
  },
];

/**
 * Migrate the button module from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 */
export const BUTTON_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  selectors,
  attributes,
};
