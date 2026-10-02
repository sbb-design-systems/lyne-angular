import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace, WorkspaceDefinition } from '@schematics/angular/utility/workspace';

import {
  addPackageToPackageJson,
  addThemeToProject,
  getPackageVersion,
  getProjectName,
} from './utils.cjs';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export const LYNE_ELEMENTS_FALLBACK_VERSION = 'latest';
export const LYNE_ELEMENTS_FALLBACK_THEME = 'standard';
export const LYNE_THEME_PATH_PREFIX = 'node_modules/@sbb-esta/lyne-elements';

export function addDependenciesRule(): Rule {
  return (tree, context) => {
    addLyneDependencies(tree, context);
    context.addTask(new NodePackageInstallTask());
    return tree;
  };
}

export function addLyneDependencies(tree: Tree, context: SchematicContext): void {
  addPackageToPackageJson(
    tree,
    '@sbb-esta/lyne-elements',
    getPackageVersion(tree, context, '@sbb-esta/lyne-elements') || LYNE_ELEMENTS_FALLBACK_VERSION,
    context.logger,
  );
  addPackageToPackageJson(
    tree,
    '@angular/cdk',
    getPackageVersion(tree, context, '@angular/cdk') || LYNE_ELEMENTS_FALLBACK_VERSION,
    context.logger,
  );
}

export function setupLyneTheme(
  options: { project?: string } = {},
  theme = LYNE_ELEMENTS_FALLBACK_THEME,
): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace: WorkspaceDefinition = await getWorkspace(tree);
    const themePath = `${LYNE_THEME_PATH_PREFIX}/${theme}-theme.css`;
    return chain([
      addThemeToProject(getProjectName(options, workspace), 'build', themePath, context.logger),
      // If karma is used as test runner, the theme is added in its configuration target.
      addThemeToProject(getProjectName(options, workspace), 'test', themePath, context.logger),
    ]);
  };
}
