import { createMigrationSchematicRule, TargetVersion, UpgradeData } from '@angular/cdk/schematics';
import { chain, Rule, SchematicContext } from '@angular-devkit/schematics';

import { TypeFixmeMigration } from './add-fixme-removed-types.cjs';

const sbbUpgradeData: UpgradeData = {
  attributeSelectors: {},
  classNames: {},
  cssTokens: {},
  constructorChecks: {},
  cssSelectors: {},
  elementSelectors: {},
  inputNames: {},
  methodCallChecks: {},
  outputNames: {},
  propertyNames: {},
  symbolRemoval: {},
};

export function migrate(): Rule {
  return chain([
    createMigrationSchematicRule(
      TargetVersion.V22,
      [TypeFixmeMigration],
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
  context.logger.info(`  ✓  Updated Sbb Angular to ${targetVersion}`);
  context.logger.info('');

  if (hasFailures) {
    context.logger.warn(
      '  ⚠  Some issues were detected but could not be fixed automatically. Please check the ' +
        'output above and fix these issues manually.',
    );
  }
}
