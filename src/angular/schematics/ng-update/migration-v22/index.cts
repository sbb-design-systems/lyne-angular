import type { NullableDevkitMigration } from '@angular/cdk/schematics';
import { createMigrationSchematicRule, TargetVersion } from '@angular/cdk/schematics';
import type { Rule, SchematicContext } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';

import { CalendarWideMigration } from './calendar-wide.cjs';
import { FormFieldOptionalMigration } from './form-field-optional.cjs';
import { MigrateActionGroupProperties } from './migrate-action-group-properties.cjs';
import { MigrateButtonAlignSelf } from './migrate-buttons-align-self.cjs';
import { MigrateHeaderActionExpandFrom } from './migrate-header-action-expand-from.cjs';
import { MigrateImportPaths } from './migrate-import-paths.cjs';
import { MigrateJourneyHeaderSize } from './migrate-journey-header-size.cjs';
import { handleLeanThemeConfiguration, LeanClassMigration } from './migrate-lean-theme.cjs';
import { MigrateNavigationActionSize } from './migrate-navigation-action-size.cjs';
import { MigratePopoverCloseButton } from './migrate-popover-close-button.cjs';
import { MigrateTableStriped } from './migrate-table-striped.cjs';
import { OverlayConfigMigration } from './overlay-config.cjs';
import { RemoveTypesMigration } from './removed-types.cjs';
import { SBB_UPGRADE_DATA } from './sbb-upgrade-data.cjs';
import { TitleMarginBlockMigration } from './title-margin-block.cjs';

const migrations: NullableDevkitMigration[] = [
  FormFieldOptionalMigration,
  RemoveTypesMigration,
  TitleMarginBlockMigration,
  CalendarWideMigration,
  LeanClassMigration,
  OverlayConfigMigration,
  MigrateImportPaths,
  MigrateTableStriped,
  MigrateNavigationActionSize,
  MigrateJourneyHeaderSize,
  MigrateHeaderActionExpandFrom,
  MigrateActionGroupProperties,
  MigratePopoverCloseButton,
  MigrateButtonAlignSelf,
];

export function migrate(): Rule {
  return chain([
    handleLeanThemeConfiguration(),
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
