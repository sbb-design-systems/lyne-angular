import type { CommentMigration, ModuleMigrations } from '../common.cjs';

const comments: CommentMigration[] = [
  {
    selector: 'sbb-search',
    message:
      'FIXME: the `sbb-search` has no counterpart in Lyne. Use a `form-field` with a suffix icon instead.',
  },
  {
    selector: 'button[sbbHeaderSearch]',
    message: 'FIXME: `sbbHeaderSearch` has no counterpart in Lyne.',
  },
  {
    symbol: 'SbbSearchModule',
    importedFrom: '@sbb-esta/angular/search',
    message: 'FIXME: `SbbSearchModule` has no counterpart in Lyne.',
  },
];

/**
 * Migrate the search component from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 * It has no counterpart, so its usages are only marked.
 */
export const SEARCH_MIGRATIONS: Partial<ModuleMigrations> = { comments };
