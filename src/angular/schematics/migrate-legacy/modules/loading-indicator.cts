import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  {
    oldImport: '@sbb-esta/angular/loading-indicator',
    newImport: '@sbb-esta/lyne-angular/loading-indicator',
  },
];

const comments: CommentMigration[] = [
  ...['fullbox', 'inline'].map((mode): CommentMigration => ({
    selector: `sbb-loading-indicator[mode=${mode}]`,
    message: `FIXME: the \`${mode}\` mode does not exist in Lyne.`,
  })),
  {
    symbol: 'SbbLoadingIndicatorMode',
    importedFrom: '@sbb-esta/lyne-angular/loading-indicator',
    message: 'FIXME: SbbLoadingIndicatorMode does not exist in Lyne.',
  },
];

const selectors: SelectorMigration[] = [
  {
    // The default mode was `medium`, which is now `xxl`.
    selector: 'sbb-loading-indicator:not([mode]):not([size])',
    replaceWith: 'sbb-loading-indicator',
    addAttributes: 'size="xxl"',
  },
];

const SIZES: Record<string, string> = { tiny: 's', small: 'l', medium: 'xxl', big: 'xxxl' };

const attributes: AttributeMigration[] = [
  ...Object.entries(SIZES).map(([mode, size]): AttributeMigration => ({
    action: 'replace',
    selector: 'sbb-loading-indicator',
    attribute: 'mode',
    attributeValue: mode,
    replaceWith: `size="${size}"`,
  })),
];

/**
 * Migrate the loading-indicator module
 *
 * 1. ✓ Rewrite import paths
 * 2. ✓ `mode` => `size` (tiny => s, small => l, medium => xxl, big => xxxl)
 * 3. ✓ Default `size="xxl"` (old default mode was medium)
 * 4. ✓ FIXME for the `fullbox` and `inline` modes
 */
export const LOADING_INDICATOR_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  selectors,
  attributes,
};
