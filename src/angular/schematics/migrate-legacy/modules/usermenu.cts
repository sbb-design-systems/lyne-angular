import type { CommentMigration, ModuleMigrations } from '../common.cjs';

const comments: CommentMigration[] = [
  {
    selector: 'sbb-usermenu',
    message: `FIXME: this component has no direct counterpart in lyne-angular; you can replace it with a 'sbb-header-button' adapting its properties.`,
  },
  {
    symbol: 'SbbUsermenuModule',
    message: 'FIXME: this component has no direct counterpart in lyne-angular.',
  },
];

/**
 * Migrate the usermenu component from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 */
export const USERMENU_MIGRATIONS: Partial<ModuleMigrations> = { comments };
