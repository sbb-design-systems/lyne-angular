import {
  createMigrationSchematicRule,
  NullableDevkitMigration,
  TargetVersion,
  UpgradeData,
} from '@angular/cdk/schematics';
import { chain, Rule, SchematicContext } from '@angular-devkit/schematics';

import { MigrateImportPaths } from './migrate-import-paths.cjs';
import { MigrateTableStriped } from './migrate-table-striped.cjs';
import { FormFieldOptionalMigration } from './form-field-optional.cjs';
import { TitleMarginBlockMigration } from './title-margin-block.cjs';
import { RemoveTypesMigration } from './removed-types.cjs';
import { CalendarWideMigration } from './calendar-wide.cjs';

const sbbUpgradeData: UpgradeData = {
  attributeSelectors: {},
  classNames: {},
  cssTokens: {},
  constructorChecks: {},
  cssSelectors: {
    [TargetVersion.V22]: [
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/issues/4847',
        changes: [
          { replace: '--sbb-title-text-color-normal', replaceWith: '--sbb-title-color' },
          { replace: '--sbb-title-text-color-normal-override', replaceWith: '--sbb-title-color' },
        ],
      },
    ],
  },
  elementSelectors: {},
  inputNames: {
    [TargetVersion.V22]: [
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/pull/4916',
        changes: [
          {
            replace: 'listAccessibilityLabel',
            replaceWith: 'accessibilityLabel',
            limitedTo: {
              elements: ['sbb-tag-group'],
            },
          },
        ],
      },
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/issues/4940',
        changes: [
          {
            replace: 'selected',
            replaceWith: 'value',
            limitedTo: {
              elements: ['sbb-calendar'],
            },
          },
        ],
      },
    ],
  },
  methodCallChecks: {},
  outputNames: {},
  propertyNames: {
    [TargetVersion.V22]: [
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/pull/4916',
        changes: [
          {
            replace: 'listAccessibilityLabel',
            replaceWith: 'accessibilityLabel',
            limitedTo: {
              classes: ['SbbTagGroup'],
            },
          },
        ],
      },
      {
        pr: 'https://github.com/sbb-design-systems/lyne-components/pull/4940',
        changes: [
          {
            replace: 'selected',
            replaceWith: 'value',
            limitedTo: {
              classes: ['SbbCalendar'],
            },
          },
        ],
      },
    ],
  },
  symbolRemoval: {},
};

const migrations: NullableDevkitMigration[] = [
  FormFieldOptionalMigration,
  RemoveTypesMigration,
  TitleMarginBlockMigration,
  CalendarWideMigration,
  MigrateImportPaths,
  MigrateTableStriped,
];

export function migrate(): Rule {
  return chain([
    createMigrationSchematicRule(
      TargetVersion.V22,
      migrations,
      sbbUpgradeData,
      onMigrationComplete,
    ),
  ]);
}

/** Function that will be called when the migration completed. */
function onMigrationComplete(
  context: SchematicContext,
  targetVersion: TargetVersion,
  hasFailures: boolean,
) {
  context.logger.info('');
  context.logger.info(`  ✓  Updated Lyne Angular to ${targetVersion}`);
  context.logger.info('');

  if (hasFailures) {
    context.logger.warn(
      '  ⚠  Some issues were detected but could not be fixed automatically. Please check the ' +
        'output above and fix these issues manually.',
    );
  }
}
