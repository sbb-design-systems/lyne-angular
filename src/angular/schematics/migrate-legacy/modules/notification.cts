import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
  TypeMigration,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  {
    oldImport: '@sbb-esta/angular/notification',
    newImport: '@sbb-esta/lyne-angular/notification',
  },
];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-notification[jumpMarks]',
    message:
      "FIXME: 'jumpMarks' has no counterpart in Lyne. You can slot `sbb-link` elements instead",
  },
  {
    selector: 'sbb-notification-icon',
    message:
      "FIXME: 'sbb-notification-icon' has no counterpart in Lyne. You can use the `iconName` input or the icon slot.",
  },
  {
    symbol: 'SbbNotificationType',
    importedFrom: '@sbb-esta/lyne-angular/notification',
    message: "FIXME: 'SbbNotificationType' has no counterpart in Lyne.",
  },
];

const types: TypeMigration[] = [{ from: 'SbbNotificationEvent', to: 'Event', skipImports: true }];

const selectors: SelectorMigration[] = [
  // The default type was `success` in the old library and is `info` now.
  {
    selector: 'sbb-notification:not([type])',
    replaceWith: 'sbb-notification',
    addAttributes: 'type="success"',
  },
];

const attributes: AttributeMigration[] = [
  { action: 'rename', selector: 'sbb-notification', attribute: 'svgIcon', replaceWith: 'iconName' },
  {
    action: 'rename',
    selector: 'sbb-notification',
    attribute: 'readonly',
    replaceWith: 'readOnly',
  },
  {
    action: 'replace',
    selector: 'sbb-notification',
    attribute: 'type',
    attributeValue: 'info-light',
    replaceWith: 'type="info"',
  },
  {
    action: 'rename',
    selector: 'sbb-notification',
    attribute: 'dismissed',
    replaceWith: 'close',
    onlyOutputs: true,
  },
];

/**
 * Migrate the notification module (the toast is migrated separately)
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ `SbbNotificationEvent` → `Event`
 * 3. ✓ Keep the old default type: `sbb-notification` without `type` gets `type="success"`
 * 4. ✓ `svgIcon` → `iconName`, `readonly` → `readOnly`, `info-light` → `info`, `(dismissed)` → `(close)`
 * 5. ✓ Mark `jumpMarks`, `sbb-notification-icon`, `(dismissed)` and removed symbols with a comment
 */
export const NOTIFICATION_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  selectors,
  attributes,
};
