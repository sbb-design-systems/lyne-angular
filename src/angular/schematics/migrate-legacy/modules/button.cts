import { chain, Rule } from '@angular-devkit/schematics';

import { ImportRewriteOptions } from '../../utils.cjs';
import { createImportPathMigrationRule } from '../common/import-path-migration.cjs';
import {
  createTemplateSelectorMigrationRule,
  RemovableAttribute,
  SelectorMigration,
} from '../common/template-selector-migration.cjs';

const IMPORT_PATHS: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/button', newImport: '@sbb-esta/lyne-angular/button' },
];

/** `type="button"` is the default of the Lyne buttons and therefore redundant. */
const REDUNDANT_ATTRIBUTES: RemovableAttribute[] = [{ name: 'type', value: 'button' }];

const SELECTORS: SelectorMigration[] = [
  { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
  { selector: 'button[sbb-secondary-button]', replaceWith: 'sbb-secondary-button' },
  { selector: 'button[sbb-alt-button]', replaceWith: 'sbb-accent-button' },
  { selector: 'button[sbb-ghost-button]', replaceWith: 'sbb-transparent-button' },
].map((selector) => ({ ...selector, removeAttributes: REDUNDANT_ATTRIBUTES }));

/**
 * Migrate the button module from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Replace attribute selectors with the Lyne elements
 *      (`<button type="button" sbb-button>` → `<sbb-button>`)
 * 3. TODO: Migrate `<a sbb-button>` link buttons
 * 4. TODO: Migrate icon only buttons (`sbb-icon-button`)
 * 5. TODO: Update input/output binding names
 * 6. TODO: Update CSS class names
 * 7. TODO: Add FIXME comments for cases which cannot be migrated automatically
 */
export function migrateButton(): Rule {
  return chain([
    createImportPathMigrationRule(IMPORT_PATHS),
    createTemplateSelectorMigrationRule(SELECTORS),
  ]);
}
