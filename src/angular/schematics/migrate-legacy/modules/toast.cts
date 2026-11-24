import type {
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  TypeMigration,
} from '../common.cjs';

const NEW_PATH = '@sbb-esta/lyne-angular/toast';

const importPaths: ImportRewriteOptions[] = [
  {
    oldImport: '@sbb-esta/angular/notification-toast',
    newImport: NEW_PATH,
  },
];

const comments: CommentMigration[] = [
  {
    symbol: 'SbbNotificationToast',
    importedFrom: NEW_PATH,
    message:
      'FIXME: the toast service API changed (e.g. openFromComponent/openFromTemplate => open, ' +
      'dismiss => close). Check the documentation.',
  },
  {
    symbol: 'SbbNotificationToastConfig',
    importedFrom: NEW_PATH,
    message: 'FIXME: the sbb-toast config changed. Check the documentation.',
  },
  ...[
    'SBB_NOTIFICATION_TOAST_DEFAULT_OPTIONS',
    'SBB_NOTIFICATION_TOAST_DEFAULT_OPTIONS_FACTORY',
    'SbbNotificationToastContainer',
  ].map((symbol): CommentMigration => ({
    symbol,
    importedFrom: NEW_PATH,
    message: `FIXME: ${symbol} does not exist in Lyne.`,
  })),
];

const types: TypeMigration[] = [
  { from: 'SbbNotificationToast', to: 'SbbToastService' },
  { from: 'SbbNotificationToastModule', to: 'SbbToastModule' },
  { from: 'SbbNotificationToastRef', to: 'SbbToastRef' },
  { from: 'SbbNotificationToastConfig', to: 'SbbToastConfig' },
  { from: 'SBB_NOTIFICATION_TOAST_DATA', to: 'SBB_TOAST_DATA' },
];

/**
 * Migrate the notification-toast module (now `toast`)
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Rename service, module, ref, config and data token
 * 3. ✓ Mark removed symbols with a FIXME comment
 * 4. ✓ Mark the service and the config with a "check the documentation" comment
 */
export const TOAST_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
};
