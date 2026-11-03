import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/autocomplete', newImport: '@sbb-esta/lyne-angular/autocomplete' },
];

const comments: CommentMigration[] = [
  {
    selector: '[sbbAutocompleteConnectedTo]',
    message:
      'FIXME: the `sbbAutocompleteConnectedTo` input does not exist in Lyne. You can set the `origin` on the `sbb-autocomplete` component instead.',
  },
  {
    selector: '[sbbAutocompletePosition]',
    message:
      'FIXME: the `sbbAutocompletePosition` input does not exist in Lyne. You can set the `position` on the `sbb-autocomplete` component instead.',
  },
  {
    selector: '[sbbAutocompleteDisabled]',
    message: 'FIXME: the `sbbAutocompleteDisabled` input does not exist in Lyne.',
  },
  {
    selector: 'sbb-autocomplete[optionActivated]',
    message: 'FIXME: the `optionActivated` event does not exist in Lyne.',
  },
  {
    selector: 'sbb-autocomplete[localeNormalizer]',
    message: 'FIXME: the `localeNormalizer` input does not exist in Lyne.',
  },
  {
    selector: 'sbb-autocomplete[panelWidth]',
    message: 'FIXME: the `panelWidth` input does not exist in Lyne.',
  },
  {
    selector: 'sbb-autocomplete[showHintIfNoOptions]',
    message: 'FIXME: the `showHintIfNoOptions` input does not exist in Lyne.',
  },
];

const attributes: AttributeMigration[] = [
  { selector: 'sbb-autocomplete', attribute: 'opened', replaceWith: 'open' },
  { selector: 'sbb-autocomplete', attribute: 'closed', replaceWith: 'close' },
];

/**
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 2. ✓ Add comments for unsupported features
 * 3. ✓ Output migration 'opened/closed' → 'open/close'
 */
export const AUTOCOMPLETE_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  attributes,
};
