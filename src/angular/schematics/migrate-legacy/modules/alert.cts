import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/alert', newImport: '@sbb-esta/lyne-angular/alert' },
];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-alert-outlet',
    message: 'FIXME: this component has no counterpart in lyne-angular.',
  },
  {
    selector: 'a[SbbAlert]',
    message: `FIXME: Anchor alerts are not supported in lyne-angular. You can slot an \`<sbb-button-link>\` into the alert instead.`,
  },
  {
    symbol: 'SbbAlertService',
    message: 'FIXME: SbbAlertService is not supported in lyne-angular.',
  },
];

const selectors: SelectorMigration[] = [{ selector: 'a[SbbAlert]', replaceWith: 'sbb-alert' }];

const attributes: AttributeMigration[] = [
  { selector: 'sbb-alert', attribute: 'svgIcon', replaceWith: 'iconName' },
  { selector: 'sbb-alert', attribute: 'dismissed', replaceWith: 'close' },
  { selector: 'sbb-alert', attribute: 'SbbAlert' },
];

/**
 * Migrate the alert module from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Attribute migration 'svgIcon' → 'iconName'
 * 3. ✓ Output migration 'dismissed' → 'close'
 * 4. ✓ <a SbbAlert> not supported anymore
 * 5. ✓ <sbb-alert-outlet> and SbbAlertService not supported anymore
 * 6. x [Not doable] Method migration 'dismiss()' → 'close()'
 */
export const ALERT_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  attributes,
  selectors,
};
