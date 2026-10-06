import { chain, Rule } from '@angular-devkit/schematics';

import { ImportRewriteOptions } from '../../utils.cjs';
import {
  AttributeMigration,
  createAttributeMigrationRule,
} from '../common/attribute-migration.cjs';
import { createImportPathMigrationRule } from '../common/import-path-migration.cjs';
import {
  createTemplateSelectorMigrationRule,
  SelectorMigration,
} from '../common/template-selector-migration.cjs';

const IMPORT_PATHS: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/button', newImport: '@sbb-esta/lyne-angular/button' },
];

const SELECTORS: SelectorMigration[] = [
  { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
  { selector: 'button[sbb-secondary-button]', replaceWith: 'sbb-secondary-button' },
  { selector: 'button[sbb-alt-button]', replaceWith: 'sbb-accent-button' },
  { selector: 'button[sbb-ghost-button]', replaceWith: 'sbb-transparent-button' },
  { selector: 'button[sbb-frameless-button]', replaceWith: 'sbb-transparent-button' },
];

/** All Lyne elements the legacy buttons are migrated to. */
const BUTTON_ELEMENTS = [...new Set(SELECTORS.map((selector) => selector.replaceWith))];

const ATTRIBUTES: AttributeMigration[] = [
  { selector: BUTTON_ELEMENTS, attribute: 'svgIcon', replaceWith: 'iconName' },
];

/**
 * Migrate the button module from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Replace attribute selectors with the Lyne elements
 *      (`<button sbb-button>` → `<sbb-button>`)
 * 3. ✓ Rename inputs (`svgIcon` → `iconName`)
 * 4. TODO: Migrate `<a sbb-button>` link buttons
 * 5. TODO: Add FIXME comments for cases which cannot be migrated automatically
 */
export function migrateButton(): Rule {
  return chain([
    createImportPathMigrationRule(IMPORT_PATHS),
    // The selector migration runs first, so that the attribute migration can
    // already target the new Lyne elements.
    createTemplateSelectorMigrationRule(SELECTORS),
    createAttributeMigrationRule(ATTRIBUTES),
  ]);
}
