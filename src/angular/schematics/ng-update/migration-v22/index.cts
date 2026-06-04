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
import { MigrateNavigationActionSize } from './migrate-navigation-action-size.cjs';
import { MigrateJourneyHeaderSize } from './migrate-journey-header-size.cjs';
import { MigrateHeaderActionExpandFrom } from './migrate-header-action-expand-from.cjs';
import { MigrateActionGroupProperties } from './migrate-action-group-properties.cjs';

import { SBB_UPGRADE_DATA } from './sbb-upgrade-data.cjs';

const migrations: NullableDevkitMigration[] = [
  FormFieldOptionalMigration,
  RemoveTypesMigration,
  TitleMarginBlockMigration,
  CalendarWideMigration,
  MigrateImportPaths,
  MigrateTableStriped,
  MigrateNavigationActionSize,
  MigrateJourneyHeaderSize,
  MigrateHeaderActionExpandFrom,
  MigrateActionGroupProperties,
];

export function migrate(): Rule {
  return chain([
    createMigrationSchematicRule(
      TargetVersion.V22,
      migrations,
      SBB_UPGRADE_DATA,
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
  context.logger.info(`  ✓ Updated Lyne Angular to ${targetVersion}`);
  context.logger.info('');

  if (hasFailures) {
    context.logger.warn(
      '  ⚠ Some issues were detected but could not be fixed automatically. Please check the ' +
        'output above and fix these issues manually.',
    );
  }
}
