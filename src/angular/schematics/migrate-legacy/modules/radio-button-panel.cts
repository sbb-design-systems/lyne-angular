import type { ImportRewriteOptions, ModuleMigrations, SelectorMigration } from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  {
    oldImport: '@sbb-esta/angular/radio-button-panel',
    newImport: '@sbb-esta/lyne-angular/radio-button-panel',
  },
];

const selectors: SelectorMigration[] = [
  {
    selector: 'sbb-radio-button-panel-subtitle',
    replaceWith: 'span',
    addAttributes: 'slot="subtext"',
  },
  {
    selector: 'sbb-radio-button-panel-warning',
    replaceWith: 'span',
    addAttributes: 'slot="suffix"',
  },
  { selector: 'sbb-radio-button-panel-note', replaceWith: 'span', addAttributes: 'slot="suffix"' },
];

/**
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ `sbb-radio-button-panel-subtitle` → `span[slot="subtext"]`
 * 3. ✓ `sbb-radio-button-panel-warning` → `span[slot="suffix"]`
 * 4. ✓ `sbb-radio-button-panel-note` → `span[slot="suffix"]`
 */
export const RADIO_BUTTON_PANEL_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  selectors,
};
