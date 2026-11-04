import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
  TypeMigration,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/breadcrumb', newImport: '@sbb-esta/lyne-angular/breadcrumb' },
];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-breadcrumbs:not([aria-label])',
    message:
      'FIXME: It is strongly recommended to place an aria-label attribute on the <sbb-breadcrumb-group>.',
  },
];

const types: TypeMigration[] = [{ from: 'SbbBreadcrumbs', to: 'SbbBreadcrumbGroup' }];

const selectors: SelectorMigration[] = [
  { selector: 'sbb-breadcrumbs', replaceWith: 'sbb-breadcrumb-group' },
  {
    selector: 'sbb-breadcrumb[sbb-breadcrumb-root]',
    replaceWith: 'sbb-breadcrumb',
    addAttributes: 'iconName="house-small"',
  },
  {
    selector: 'sbb-link[sbb-breadcrumb-root]',
    replaceWith: 'sbb-breadcrumb',
    addAttributes: 'iconName="house-small"',
  },
  {
    selector: 'a[sbb-breadcrumb-root]',
    replaceWith: 'sbb-breadcrumb',
    addAttributes: 'iconName="house-small"',
  },
];

const attributes: AttributeMigration[] = [
  {
    selector: 'sbb-breadcrumb',
    attribute: 'sbb-breadcrumb-root',
  },
];

export const BREADCRUMB_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  selectors,
  attributes,
};
