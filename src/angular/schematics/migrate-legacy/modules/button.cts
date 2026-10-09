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

const SELECTORS: SelectorMigration[] = [
  { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
  { selector: 'button[sbb-secondary-button]', replaceWith: 'sbb-secondary-button' },
  { selector: 'button[sbb-ghost-button]', replaceWith: 'sbb-accent-button' },
  { selector: 'button[sbb-frameless-button]', replaceWith: 'sbb-transparent-button' },
  { selector: 'a[sbb-button]', replaceWith: 'sbb-button-link' },
  { selector: 'a[sbb-secondary-button]', replaceWith: 'sbb-secondary-button-link' },
  { selector: 'a[sbb-ghost-button]', replaceWith: 'sbb-accent-button-link' },
  { selector: 'a[sbb-frameless-button]', replaceWith: 'sbb-transparent-button-link' },
  { selector: 'button[sbb-link]', replaceWith: 'sbb-link-button' },
  { selector: 'a[sbb-link]', replaceWith: 'sbb-link' },
];

/** All Lyne elements the legacy buttons are migrated to. */
const BUTTON_ELEMENTS = [...new Set(SELECTORS.map((selector) => selector.replaceWith))];

/** The selector migration runs first, so that the attribute migration can already target the new Lyne elements. */
const ATTRIBUTES: AttributeMigration[] = [
  { selector: BUTTON_ELEMENTS, attribute: 'svgIcon', replaceWith: 'iconName' },
];

const COMMENTS: CommentMigration[] = [
  {
    selector: '[sbb-alt-button]',
    message: 'FIXME: this component has no counterpart in lyne-angular.',
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
export function migrateButton(): Rule {
  return chain([
    createImportPathMigrationRule(IMPORT_PATHS),
    createTemplateSelectorMigrationRule(SELECTORS),
    createAttributeMigrationRule(ATTRIBUTES),
    createCommentMigrationRule(COMMENTS),
  ]);
}
