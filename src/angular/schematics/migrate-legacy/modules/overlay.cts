import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
  TypeMigration,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/lightbox', newImport: '@sbb-esta/lyne-angular/overlay' },
];

const docsComment = (what: string) => `FIXME: the ${what} API changed. Check the documentation.`;

const comments: CommentMigration[] = [
  {
    selector: 'sbb-lightbox-title[closeAriaLabel]',
    message:
      'FIXME: the `closeAriaLabel` input does not exist, use `accessibilityCloseLabel` on `<sbb-overlay>`.',
  },
  { symbol: 'SbbLightbox', message: docsComment('service') },
  { symbol: 'SbbLightboxRef', message: docsComment('ref') },
  { symbol: 'SbbLightboxConfig', message: docsComment('config') },
  ...['SBB_LIGHTBOX_DEFAULT_OPTIONS', 'SBB_LIGHTBOX_SCROLL_STRATEGY'].map(
    (symbol): CommentMigration => ({
      symbol,
      message: `FIXME: ${symbol} does not exist in Lyne.`,
    }),
  ),
];

const types: TypeMigration[] = [
  { from: 'SbbLightboxModule', to: 'SbbOverlayModule' },
  { from: 'SbbLightbox', to: 'SbbOverlayService' },
  { from: 'SbbLightboxRef', to: 'SbbOverlayRef' },
  { from: 'SbbLightboxConfig', to: 'SbbOverlayConfig' },
  { from: 'SBB_LIGHTBOX_DATA', to: 'SBB_OVERLAY_DATA' },
];

const selectors: SelectorMigration[] = [
  { selector: 'sbb-lightbox-title', replaceWith: 'sbb-title' },
  { selector: 'sbb-lightbox-content', replaceWith: 'div' },
  { selector: 'sbb-lightbox-actions', replaceWith: 'sbb-action-group' },
];

const attributes: AttributeMigration[] = [
  {
    action: 'rename',
    selector: '*',
    attribute: 'sbbLightboxClose',
    replaceWith: 'sbbOverlayClose',
  },
  { action: 'remove', selector: '*', attribute: 'sbbLightboxTitle' },
  { action: 'remove', selector: '*', attribute: 'sbbLightboxContent' },
  { action: 'remove', selector: '*', attribute: 'sbbLightboxActions' },
];

/**
 * Migrate the lightbox module (now `overlay`)
 *
 * 1. ✓ Rewrite import paths
 * 2. ✓ Rename service, module, ref, config and data token
 * 3. ✓ "Check the documentation" comments on service, ref and config
 * 4. ✓ `sbb-lightbox-title` => `sbb-title`, `-content` => `div`, `-actions` => `sbb-action-group`
 * 5. ✓ Remove the `[sbbLightboxTitle|Content|Actions]` attributes, `sbbLightboxClose` => `sbbOverlayClose`
 */
export const OVERLAY_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  selectors,
  attributes,
};
