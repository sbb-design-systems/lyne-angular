import type {
  AttributeMigration,
  CommentMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
  TypeMigration,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/dialog', newImport: '@sbb-esta/lyne-angular/dialog' },
];

const comments: CommentMigration[] = [
  {
    symbol: 'SbbDialogPosition',
    message: 'FIXME: the `SbbDialogPosition` interface does not exist anymore.',
  },
  {
    symbol: 'SbbDialogRole',
    message: 'FIXME: the `SbbDialogRole` interface does not exist anymore.',
  },
];

const types: TypeMigration[] = [{ from: 'SbbDialog', to: 'SbbDialogService' }];

const selectors: SelectorMigration[] = [
  { selector: '[sbbDialogTitle]', replaceWith: 'sbb-dialog-title' },
  { selector: '[sbbDialogContent]', replaceWith: 'sbb-dialog-content' },
  { selector: '[sbbDialogActions]', replaceWith: 'sbb-dialog-actions' },
];

const attributes: AttributeMigration[] = [
  { selector: '*', attribute: 'sbbDialogTitle' },
  { selector: '*', attribute: 'sbbDialogContent' },
  { selector: '*', attribute: 'sbbDialogActions' },
];

export const DIALOG_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  selectors,
  attributes,
};
