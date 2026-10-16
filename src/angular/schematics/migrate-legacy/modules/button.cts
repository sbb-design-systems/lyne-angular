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

const BUTTON_MIGRATIONS: SelectorMigration[] = [
  { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
  { selector: 'button[sbb-secondary-button]', replaceWith: 'sbb-secondary-button' },
  { selector: 'button[sbb-ghost-button]', replaceWith: 'sbb-accent-button' },
  { selector: 'button[sbb-frameless-button]', replaceWith: 'sbb-transparent-button' },
  { selector: 'a[sbb-button]', replaceWith: 'sbb-button-link' },
  { selector: 'a[sbb-secondary-button]', replaceWith: 'sbb-secondary-button-link' },
  { selector: 'a[sbb-ghost-button]', replaceWith: 'sbb-accent-button-link' },
  { selector: 'a[sbb-frameless-button]', replaceWith: 'sbb-transparent-button-link' },
];

const LINK_MIGRATIONS: SelectorMigration[] = [
  { selector: 'button[sbb-link]', replaceWith: 'sbb-link-button' },
  { selector: 'a[sbb-link]', replaceWith: 'sbb-link' },
];

/** Selectors for template migrations. */
const TEMPLATE_MIGRATION_SELECTORS = [...BUTTON_MIGRATIONS, ...LINK_MIGRATIONS];

/** The attribute migration runs first, so it has to target the old elements. */
const BUTTON_SELECTORS = BUTTON_MIGRATIONS.map((selector) => selector.selector);
const LINK_SELECTORS = LINK_MIGRATIONS.map((selector) => selector.selector);
const ATTRIBUTES: (hasStandardTheme: boolean) => AttributeMigration[] = (
  hasStandardTheme: boolean,
) =>
  hasStandardTheme
    ? [
        {
          selector: [
            'button[sbb-button]',
            'button[sbb-secondary-button]',
            'a[sbb-button]',
            'a[sbb-secondary-button]',
          ],
          attribute: 'svgIcon',
          replaceWith: 'iconName',
          defaultValue: 'arrow-right-small',
        },
        {
          selector: ['button[sbb-frameless-button]', 'a[sbb-frameless-button]'],
          attribute: 'svgIcon',
          replaceWith: 'iconName',
          defaultValue: 'plus-small',
        },
        {
          selector: ['button[sbb-ghost-button]', 'a[sbb-ghost-button]'],
          attribute: 'svgIcon',
          replaceWith: 'iconName',
        },
        // Links in lyne-angular have no icon - only block link have.
        { selector: LINK_SELECTORS, attribute: 'svgIcon' },
      ]
    : [
        { selector: BUTTON_SELECTORS, attribute: 'svgIcon', replaceWith: 'iconName' },
        { selector: LINK_SELECTORS, attribute: 'svgIcon' },
      ];

const COMMENTS: CommentMigration[] = [
  {
    selector: '[sbb-alt-button]',
    message: 'FIXME: this component has no counterpart in lyne-angular.',
  },
  {
    selector: ['sbb-link', 'sbb-link-button'],
    message:
      "FIXME: links are now imported from `SbbLinkModule` under `@sbb-esta/lyne-angular/link`. Check the component's imports.",
  },
  {
    symbol: 'SbbAnchor',
    message:
      'FIXME: links are now imported from `SbbLinkModule` under `@sbb-esta/lyne-angular/link`. Check the different link variants in the documentation.',
  },
];

/**
 * Migrate the button module from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 *
 * Transformations:
 * 1. Rewrite import paths
 * 2. Replace attribute selectors with the Lyne elements
 * 3. Rename inputs
 * 4. Add comments for cases which cannot be migrated automatically
 */
export function migrateButton(hasStandardTheme: boolean, scope?: MigrationScope): Rule {
  return chain([
    createImportPathMigrationRule(IMPORT_PATHS, scope),
    createAttributeMigrationRule(ATTRIBUTES(hasStandardTheme), scope),
    createTemplateSelectorMigrationRule(TEMPLATE_MIGRATION_SELECTORS, scope),
    createCommentMigrationRule(COMMENTS, scope),
  ]);
}
