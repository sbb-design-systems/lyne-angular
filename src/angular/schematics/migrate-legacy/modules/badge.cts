import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/badge', newImport: '@sbb-esta/lyne-angular/badge' },
];

const comments: CommentMigration[] = ['sbbBadgeDescription', 'sbbBadgeDisabled', 'sbbBadgeHidden']
  .map((attr) => ({
    selector: `[sbbBadge][${attr}]`,
    message: `FIXME: the attribute \`${attr}\` does not exist anymore.`,
  }))
  .concat({
    selector: '[sbbBadge][sbbBadgePosition="above"]',
    message: 'FIXME: the `sbbBadgePosition` attribute now accepts only `before` and `after`.',
  });

const attributes: AttributeMigration[] = [
  {
    selector: '*',
    attribute: 'sbbBadge',
    replaceWith: 'sbb-badge',
  },
];

/**
 * Migrate the badge module from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 */
export const BADGE_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  attributes,
};
