import type {
  AttributeMigration,
  ImportRewriteOptions,
  ModuleMigrations,
  SelectorMigration,
} from '../common.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/time-input', newImport: '@sbb-esta/lyne-angular/time-input' },
];

const selectors: SelectorMigration[] = [
  {
    selector: 'input[sbbTimeInput]',
    replaceWith: 'sbb-time-input',
    transformToPairedTag: true,
  },
];

const attributes: AttributeMigration[] = [
  { selector: 'sbb-time-input[sbbInput]', attribute: 'sbbInput' },
  { selector: 'sbb-time-input[sbbTimeInput]', attribute: 'sbbTimeInput' },
];

export const TIME_INPUT_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  selectors,
  attributes,
};
