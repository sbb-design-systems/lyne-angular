import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';

import { NgAddOptionsSchema } from './schema';
import { addLyneDependencies } from '../setup-lyne.cjs';

export function ngAdd(options: NgAddOptionsSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Setting up @sbb-esta/lyne-angular...');

    context.logger.info('Adding dependencies...');
    addLyneDependencies(tree, context);

    context.logger.info('Scheduling libraries install...');
    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
  };
}
