import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { getWorkspace, WorkspaceDefinition } from '@schematics/angular/utility/workspace';

import { NgAddOptionsSchema } from './schema';
import {
  addThemeToProject,
  getLyneElementsVersion,
  getProjectName,
  LYNE_ELEMENTS,
  Package,
  sortDependencies,
} from './utils.cjs';

const THEME_PATH_PREFIX = 'node_modules/@sbb-esta/lyne-elements';
const LYNE_ELEMENTS_FALLBACK_VERSION = 'latest';

/**
 * Adds lyne-elements as dependency.
 * Version is fetched from the lyne-angular's package.json, where it is listed as peerDependency.
 */
function addLyneElementsDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const pkgPath = 'package.json';
    if (tree.exists(pkgPath)) {
      const pkgBuffer = tree.read(pkgPath);
      if (!pkgBuffer) {
        throw new SchematicsException(`Could not find ${pkgPath}. Are you in an Angular project?`);
      }
      const pkg: Package = JSON.parse(pkgBuffer.toString('utf-8'));
      if (!pkg.dependencies) {
        pkg.dependencies = {};
      }

      if (!pkg.dependencies[LYNE_ELEMENTS]) {
        pkg.dependencies[LYNE_ELEMENTS] =
          getLyneElementsVersion(tree, context) || LYNE_ELEMENTS_FALLBACK_VERSION;
        pkg.dependencies = sortDependencies(pkg);
        tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
        context.logger.info(`Added ${LYNE_ELEMENTS} to dependencies.`);
      } else {
        context.logger.info(`${LYNE_ELEMENTS} already in dependencies, skipping.`);
      }
    }
    return tree;
  };
}

/**
 * Schedules a package manager install.
 */
function installDependencies(): Rule {
  return (_tree: Tree, context: SchematicContext): void => {
    context.addTask(new NodePackageInstallTask());
    context.logger.info('Scheduling libraries install...');
  };
}

/**
 * Adds the selected theme to the project's angular.json.
 */
function addSelectedTheme(options: NgAddOptionsSchema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace: WorkspaceDefinition = await getWorkspace(tree);
    const themePath = `${THEME_PATH_PREFIX}/${options.theme}-theme.css`;
    return chain([
      addThemeToProject(getProjectName(options, workspace), 'build', themePath, context.logger),
      // If karma is used as test runner, the theme is added in its configuration target.
      addThemeToProject(getProjectName(options, workspace), 'test', themePath, context.logger),
    ]);
  };
}

export function ngAdd(options: NgAddOptionsSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Setting up @sbb-esta/lyne-angular...');

    return chain([addLyneElementsDependencies(), addSelectedTheme(options), installDependencies()])(
      tree,
      context,
    );
  };
}
