import { chain, Rule } from '@angular-devkit/schematics';

import { ImportRewriteOptions } from '../../utils.cjs';
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

const BUTTON_SELECTORS: SelectorMigration[] = [
  { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
  { selector: 'button[sbb-secondary-button]', replaceWith: 'sbb-secondary-button' },
  { selector: 'button[sbb-ghost-button]', replaceWith: 'sbb-accent-button' },
  { selector: 'button[sbb-frameless-button]', replaceWith: 'sbb-transparent-button' },
  { selector: 'a[sbb-button]', replaceWith: 'sbb-button-link' },
  { selector: 'a[sbb-secondary-button]', replaceWith: 'sbb-secondary-button-link' },
  { selector: 'a[sbb-ghost-button]', replaceWith: 'sbb-accent-button-link' },
  { selector: 'a[sbb-frameless-button]', replaceWith: 'sbb-transparent-button-link' },
];

const LINK_SELECTORS: SelectorMigration[] = [
  { selector: 'button[sbb-link]', replaceWith: 'sbb-link-button' },
  { selector: 'a[sbb-link]', replaceWith: 'sbb-link' },
];

const BUTTON_ELEMENTS = BUTTON_SELECTORS.map((selector) => selector.replaceWith);
const LINK_ELEMENTS = LINK_SELECTORS.map((selector) => selector.replaceWith);

/** All Lyne elements the legacy buttons are migrated to. */

/** The selector migration runs first, so that the attribute migration can already target the new Lyne elements. */
const ATTRIBUTES: (hasStandardTheme: boolean) => AttributeMigration[] = (
  hasStandardTheme: boolean,
) =>
  hasStandardTheme
    ? [
        {
          selector: [
            'sbb-button',
            'sbb-secondary-button',
            'sbb-button-link',
            'sbb-secondary-button-link',
          ],
          attribute: 'svgIcon',
          replaceWith: 'iconName',
          defaultValue: 'arrow-right-small',
        },
        {
          selector: ['sbb-transparent-button', 'sbb-transparent-button-link'],
          attribute: 'svgIcon',
          replaceWith: 'iconName',
          defaultValue: 'plus-small',
        },
        {
          selector: ['sbb-accent-button', 'sbb-accent-button-link'],
          attribute: 'svgIcon',
          replaceWith: 'iconName',
        },
        // Links in lyne-angular have no icon - only block link have.
        { selector: LINK_ELEMENTS, attribute: 'svgIcon' },
      ]
    : [
        { selector: BUTTON_ELEMENTS, attribute: 'svgIcon', replaceWith: 'iconName' },
        { selector: LINK_ELEMENTS, attribute: 'svgIcon' },
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
export function migrateButton(hasStandardTheme: boolean): Rule {
  return chain([
    createImportPathMigrationRule(IMPORT_PATHS),
    createTemplateSelectorMigrationRule([...BUTTON_SELECTORS, ...LINK_SELECTORS]),
    createAttributeMigrationRule(ATTRIBUTES(hasStandardTheme)),
    createCommentMigrationRule(COMMENTS),
  ]);
}
