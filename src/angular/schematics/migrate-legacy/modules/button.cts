import { chain, Rule } from '@angular-devkit/schematics';

import { ImportRewriteOptions, MigrationScope } from '../../utils.cjs';
import {
  AttributeMigration,
  createAttributeMigrationRule,
} from '../migrations/attribute-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import {
  createTemplateSelectorMigrationRule,
  SelectorMigration,
} from '../migrations/template-selector-migration.cjs';
import { CommentMigration, createCommentMigrationRule } from '../migrations/comment-migration.cjs';

const IMPORT_PATHS: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/button', newImport: '@sbb-esta/lyne-angular/button' },
];

const COMMENTS: CommentMigration[] = [
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

const MIGRATIONS: SelectorMigration[] = [
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
].map((e) => ({ ...e, removeSelectorAttributes: true }));

const ATTRIBUTES: AttributeMigration[] = [
  {
    selector: MIGRATIONS.map((selector) => selector.selector),
    attribute: 'svgIcon',
    replaceWith: 'iconName',
  },
];

/**
 * Migrate the button module from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 *
 * Transformations:
 * 1. Rewrite import paths
 * 2. Add comments for cases which cannot be migrated automatically
 * 3. Replace attribute selectors with the Lyne elements
 * 4. Rename selectors
 */
export function migrateButton(scope: MigrationScope): Rule {
  return chain([
    createImportPathMigrationRule(IMPORT_PATHS, scope),
    createCommentMigrationRule(COMMENTS, scope),
    createAttributeMigrationRule(ATTRIBUTES, scope),
    createTemplateSelectorMigrationRule(MIGRATIONS, scope),
  ]);
}
