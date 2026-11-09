import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
  TypeMigration,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/tag', newImport: '@sbb-esta/lyne-angular/tag' },
];

const comments: CommentMigration[] = [
  {
    selector: 'sbb-tags',
    message:
      'FIXME: the "All" tag is not automatically added anymore, and `totalAmount` does not exist. Check the documentation for the new usage.',
  },
  {
    selector: `sbb-tag[sbbBadgeDescription]`,
    message: `FIXME: 'sbbBadgeDescription' has no counterpart in Lyne.`,
  },
  {
    selector: `sbb-tag[labelPosition]`,
    message: `FIXME: 'labelPosition' has no counterpart in Lyne.`,
  },
  {
    selector: 'a[sbb-tag-link]',
    message: 'FIXME: `sbb-tag-link` has no counterpart in Lyne.',
  },
];

const types: TypeMigration[] = [{ from: 'SbbTags', to: 'SbbTagGroup' }];

const selectors: SelectorMigration[] = [
  { selector: 'sbb-tags', replaceWith: 'sbb-tag-group', addAttributes: 'multiple' },
];

const attributes: AttributeMigration[] = [
  { selector: 'sbb-tag', attribute: 'svgIcon', replaceWith: 'iconName' },
];

/**
 * Migrate the tag module
 *
 * Transformations:
 * 1. ✓ Rewrite import paths
 * 4. ✓ Mark for the "All" tag, unsupported inputs and `sbb-tag-link`
 * 2. ✓ `sbb-tags` => `sbb-tag-group` with `multiple` attribute
 * 3. ✓ `svgIcon` => `iconName` on `sbb-tag`
 */
export const TAG_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  selectors,
  attributes,
};
