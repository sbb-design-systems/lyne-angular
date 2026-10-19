import { chain, Rule } from '@angular-devkit/schematics';

import { MigrationScope } from '../../utils.cjs';
import { CommentMigration, createCommentMigrationRule } from '../migrations/comment-migration.cjs';

const COMMENTS: CommentMigration[] = [
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
export function migrateCaptcha(scope: MigrationScope): Rule {
  return chain([createCommentMigrationRule(COMMENTS, scope)]);
}
