import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
} from '../common.cjs';

export const DEPRECATED_ICON_ATTRIBUTES = ['fontIcon', 'fontSet', 'inline'];

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/icon', newImport: '@sbb-esta/lyne-angular/icon' },
];

const comments: CommentMigration[] = DEPRECATED_ICON_ATTRIBUTES.map<CommentMigration>((attr) => ({
  selector: `sbb-icon[${attr}]`,
  message: `FIXME: the attribute \`${attr}\` is not supported by Lyne's \`sbb-icon\`.`,
})).concat({
  symbol: 'SbbIconRegistry',
  message:
    'The `SbbIconRegistry` is not available in Lyne. Please check the `mergeConfig` documentation to know how to register namespaces and/or interceptors',
});

const attributes: AttributeMigration[] = [
  { action: 'rename', selector: 'sbb-icon', attribute: 'svgIcon', replaceWith: 'name' },
];

export const ICON_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  attributes,
};
