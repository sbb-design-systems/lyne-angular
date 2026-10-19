import { chain, Rule } from '@angular-devkit/schematics';

import { MigrationScope } from '../../utils.cjs';
import { CommentMigration, createCommentMigrationRule } from '../migrations/comment-migration.cjs';

const COMMENTS: CommentMigration[] = [
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
export function migrateTextexpand(scope: MigrationScope): Rule {
  return chain([createCommentMigrationRule(COMMENTS, scope)]);
}
