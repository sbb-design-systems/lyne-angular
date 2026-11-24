import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/select', newImport: '@sbb-esta/lyne-angular/select' },
];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-select[panelClass]',
    message: "FIXME: 'panelClass' has no counterpart in Lyne.",
  },
  {
    selector: 'sbb-select[sortComparator]',
    message: "FIXME: 'sortComparator' has no counterpart in Lyne.",
  },
  {
    selector: 'sbb-select[errorStateMatcher]',
    message: "FIXME: 'errorStateMatcher' has no counterpart in Lyne.",
  },
  {
    selector: 'sbb-select[canSelectNullableOptions]',
    message: "FIXME: 'canSelectNullableOptions' has no counterpart in Lyne.",
  },
  {
    selector: 'sbb-select[disableOptionCentering]',
    message: "FIXME: 'disableOptionCentering' has no counterpart in Lyne.",
  },
];

const attributes: AttributeMigration[] = [
  { action: 'rename', selector: 'sbb-select', attribute: 'readonly', replaceWith: 'readOnly' },
  { action: 'rename', selector: 'sbb-select', attribute: 'opened', replaceWith: 'open' },
  { action: 'rename', selector: 'sbb-select', attribute: 'closed', replaceWith: 'close' },
];

/**
 * Migrate the select module
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Mark removed inputs
 * 3. ✓ `readonly` => `readOnly`, outputs `opened` => `open`, `closed` => `close`
 */
export const SELECT_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  attributes,
};
