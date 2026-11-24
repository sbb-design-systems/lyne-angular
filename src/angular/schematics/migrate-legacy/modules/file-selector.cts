import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  {
    oldImport: '@sbb-esta/angular/file-selector',
    newImport: '@sbb-esta/lyne-angular/file-selector',
  },
];

const comments: CommentMigration[] = [
  {
    symbol: 'SbbFileSelectorTypesService',
    message: 'FIXME: the `SbbFileSelectorTypesService` does not exist anymore in Lyne.',
  },
  {
    symbol: 'SbbFileSelectorOptions',
    message: 'FIXME: the `SbbFileSelectorOptions` interface does not exist anymore in Lyne.',
  },
  {
    symbol: 'FileTypeCategory',
    message: 'FIXME: the `FileTypeCategory` type does not exist anymore in Lyne.',
  },
  {
    selector: 'sbb-file-selector[capture]',
    message: 'FIXME: the `capture` attribute on `sbb-file-selector` does not exist anymore.',
  },
];

const attributes: AttributeMigration[] = [
  {
    action: 'rename',
    selector: 'sbb-file-selector',
    attribute: 'filesList',
    replaceWith: 'files',
  },
];

export const FILE_SELECTOR_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  attributes,
};
