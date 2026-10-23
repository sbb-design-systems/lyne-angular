import { chain, Rule } from '@angular-devkit/schematics';

import { MigrationScope } from '../../utils.cjs';
import { CommentMigration, createCommentMigrationRule } from '../migrations/comment-migration.cjs';

const COMMENTS: CommentMigration[] = [
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
export function migrateUsermenu(scope: MigrationScope): Rule {
  return chain([createCommentMigrationRule(COMMENTS, scope)]);
}
