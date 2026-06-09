import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';

import { NgAddOptionsSchema } from './schema';
import { addPackageToPackageJson, getPackageVersion } from '../utils.cjs';

const PACKAGE_FALLBACK_VERSION = 'latest';

export function ngAdd(options: NgAddOptionsSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Setting up @sbb-esta/lyne-angular...');

    context.logger.info('Adding dependencies...');
    addPackageToPackageJson(
      tree,
      '@sbb-esta/lyne-elements',
      getPackageVersion(tree, context, '@sbb-esta/lyne-elements') || PACKAGE_FALLBACK_VERSION,
      context.logger,
    );
    addPackageToPackageJson(
      tree,
      '@angular/cdk',
      getPackageVersion(tree, context, '@angular/cdk') || PACKAGE_FALLBACK_VERSION,
      context.logger,
    );

    context.logger.info('Scheduling libraries install...');
    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
  };
}
