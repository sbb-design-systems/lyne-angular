import { chain, Rule } from '@angular-devkit/schematics';

import { MigrationScope } from '../../utils.cjs';
import { CommentMigration, createCommentMigrationRule } from '../migrations/comment-migration.cjs';

const COMMENTS: CommentMigration[] = [
  {
    selector: 'sbb-textarea',
    message:
      'FIXME: this component has no direct counterpart in lyne-angular; use sbb-form-field with a textarea.',
  },
  {
    symbol: 'SbbTextareaModule',
    message:
      'FIXME: this component has no direct counterpart in lyne-angular; use sbb-form-field with a textarea.',
  },
];

/**
 * Migrate the textarea component from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 */
export function migrateTextarea(scope: MigrationScope): Rule {
  return chain([createCommentMigrationRule(COMMENTS, scope)]);
}
