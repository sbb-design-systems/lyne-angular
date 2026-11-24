import type {
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
  TypeMigration,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  {
    oldImport: '@sbb-esta/angular/pagination',
    newImport: '@sbb-esta/lyne-angular/paginator',
  },
];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-navigation',
    message:
      'FIXME: the old `sbb-navigation` does not exist anymore. `sbb-navigation` is now a different component.',
  },
  {
    symbol: 'SBB_PAGINATOR_DEFAULT_OPTIONS',
    importedFrom: '@sbb-esta/lyne-angular/paginator',
    message: 'FIXME: SBB_PAGINATOR_DEFAULT_OPTIONS has no counterpart in Lyne.',
  },
];

const types: TypeMigration[] = [
  { from: 'SbbPaginationModule', to: 'SbbPaginatorModule' },
  { from: 'SbbPageEvent', to: 'SbbPaginatorPageEvent', skipImports: true },
];

const selectors: SelectorMigration[] = [
  // The default page size was 50 in the old library and is 10 now.
  {
    selector: 'sbb-paginator:not([pageSize])',
    replaceWith: 'sbb-paginator',
    addAttributes: '[pageSize]="50"',
  },
];

/**
 * Migrate the pagination module
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ `SbbPaginationModule` → `SbbPaginatorModule`, `SbbPageEvent` → `SbbPaginatorPageEvent`
 * 3. ✓ Mark the old `sbb-navigation` and the removed default options with a comment
 * 4. ✓ Keep the old default page size: `sbb-paginator` without `pageSize` gets `[pageSize]="50"`
 */
export const PAGINATOR_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  selectors,
};
