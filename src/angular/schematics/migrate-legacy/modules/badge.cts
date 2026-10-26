import { chain, Rule } from '@angular-devkit/schematics';

import { ImportRewriteOptions, MigrationScope } from '../../utils.cjs';
import {
  AttributeMigration,
  createAttributeMigrationRule,
} from '../migrations/attribute-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { CommentMigration, createCommentMigrationRule } from '../migrations/comment-migration.cjs';

const IMPORT_PATHS: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/badge', newImport: '@sbb-esta/lyne-angular/badge' },
];

const COMMENTS: CommentMigration[] = ['sbbBadgeDescription', 'sbbBadgeDisabled', 'sbbBadgeHidden']
  .map((attr) => ({
    selector: `[sbbBadge][${attr}]`,
    message: `FIXME: the attribute \`${attr}\` does not exist anymore.`,
  }))
  .concat({
    selector: '[sbbBadge][sbbBadgePosition="above"]',
    message: 'FIXME: the `sbbBadgePosition` attribute now accepts only `before` and `after`.',
  });

const ATTRIBUTES: AttributeMigration[] = [
  {
    selector: '*',
    attribute: 'sbbBadge',
    replaceWith: 'sbb-badge',
  },
];

/**
 * Migrate the badge module from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 */
export function migrateBadge(scope: MigrationScope): Rule {
  return chain([
    createImportPathMigrationRule(IMPORT_PATHS, scope),
    createCommentMigrationRule(COMMENTS, scope),
    createAttributeMigrationRule(ATTRIBUTES, scope),
  ]);
}
