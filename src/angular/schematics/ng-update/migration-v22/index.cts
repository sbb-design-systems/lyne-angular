import { createMigrationSchematicRule, TargetVersion } from '@angular/cdk/schematics';
import type { Rule, SchematicContext } from '@angular-devkit/schematics';

export function migrate(context: SchematicContext): Rule {
  return () => {
    const a = createMigrationSchematicRule;
    const b = TargetVersion.V22;
    context.logger.info('Running @sbb-esta/lyne-angular migration to v21.');
  };
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
