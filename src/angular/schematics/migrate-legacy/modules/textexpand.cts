import type { CommentMigration, ModuleMigrations } from '../common.cjs';

const comments: CommentMigration[] = [
  {
    selector: 'sbb-textexpand',
    message: 'FIXME: this component has no direct counterpart in lyne-angular.',
  },
  {
    symbol: 'SbbTextexpandModule',
    message: 'FIXME: this component has no direct counterpart in lyne-angular.',
  },
];

/**
 * Migrate the textexpand component from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 */
export const TEXTEXPAND_MIGRATIONS: Partial<ModuleMigrations> = { comments };
