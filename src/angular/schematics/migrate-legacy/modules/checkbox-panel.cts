import type {
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  {
    oldImport: '@sbb-esta/angular/checkbox-panel',
    newImport: '@sbb-esta/lyne-angular/checkbox-panel',
  },
];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-checkbox-panel[labelPosition]',
    message: 'FIXME: the `labelPosition` input does not exist in lyne.',
  },
  {
    selector: 'sbb-checkbox-panel[indeterminateChange]',
    message: 'FIXME: the `indeterminateChange` event does not exist in lyne.',
  },
  {
    selector: '.sbb-checkbox-panel-group',
    message: 'FIXME: Consider using a `sbb-checkbox-group`.',
  },
];

const selectors: SelectorMigration[] = [
  {
    selector: 'sbb-checkbox-panel-subtitle',
    replaceWith: 'span',
    addAttributes: 'slot="subtext"',
  },
  { selector: 'sbb-checkbox-panel-warning', replaceWith: 'span', addAttributes: 'slot="suffix"' },
  { selector: 'sbb-checkbox-panel-note', replaceWith: 'span', addAttributes: 'slot="suffix"' },
];

/**
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Add comments for unsupported inputs, outputs and symbols
 * 3. ✓ `sbb-checkbox-panel-subtitle` → `span[slot="subtext"]`
 * 4. ✓ `sbb-checkbox-panel-warning` → `span[slot="suffix"]`
 * 5. ✓ `sbb-checkbox-panel-note` → `span[slot="suffix"]`
 */
export const CHECKBOX_PANEL_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  selectors,
};
