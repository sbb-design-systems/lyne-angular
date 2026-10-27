import { CommentMigration } from '../migrations/comment-migration.cjs';
import { ModuleMigrations } from '../index.cjs';

const comments: CommentMigration[] = [
  {
    selector: 'sbb-captcha',
    message: 'FIXME: this component has no counterpart in lyne-angular.',
  },
  {
    symbol: 'SbbCaptchaModule',
    message: 'FIXME: this component has no counterpart in lyne-angular.',
  },
];

/**
 * Migrate the captcha component from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 */
export const CAPTCHA_MIGRATIONS: Partial<ModuleMigrations> = { comments };
