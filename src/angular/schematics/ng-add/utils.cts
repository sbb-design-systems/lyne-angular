import type { logging } from '@angular-devkit/core';
import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { SchematicsException } from '@angular-devkit/schematics';
import type {
  ProjectDefinition,
  TargetDefinition,
  WorkspaceDefinition,
} from '@schematics/angular/utility/workspace';
import { updateWorkspace } from '@schematics/angular/utility/workspace';

import type { NgAddOptionsSchema } from './schema';

export interface Package {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

export const LYNE_ELEMENTS = '@sbb-esta/lyne-elements';

/**
 * Gets the project name: takes the default name from cli, if not found gets it from the angular.json.
 */
export function getProjectName(options: NgAddOptionsSchema, workspace: WorkspaceDefinition) {
  return (
    options.project ||
    (workspace.extensions['defaultProject'] as string) ||
    Array.from(workspace.projects.keys())[0]
  );
}

/**
 * Gets the lyne-elements version from the lyne-angular package.json, where it's listed as peerDependency
 */
export function getLyneElementsVersion(tree: Tree, context: SchematicContext) {
  const lyneAngularPackage = tree.read('node_modules/@sbb-esta/lyne-angular/package.json');
  if (!lyneAngularPackage) {
    throw new SchematicsException(`@sbb-esta/lyne-angular has no package.json to read from.`);
  }
  const lyneAngularPackageJson: Package = JSON.parse(lyneAngularPackage.toString('utf-8'));
  const lyneElementsVersion = lyneAngularPackageJson.peerDependencies?.[LYNE_ELEMENTS];
  if (!lyneElementsVersion) {
    context.logger.warn(`${LYNE_ELEMENTS} not found. Latest version will be installed.`);
  } else {
    context.logger.info(`Found ${LYNE_ELEMENTS} with version: ${lyneElementsVersion}`);
  }
  return lyneElementsVersion;
}

/**
 * Sort the dependencies of the package.json
 */
export function sortDependencies(pkg: Package): Record<string, string> {
  return Object.keys(pkg.dependencies || {})
    .sort()
    .reduce((result: Record<string, string>, key: string): Record<string, string> => {
      result[key] = pkg.dependencies![key];
      return result;
    }, {});
}

/**
 * Validates that the specified project target is configured with the default builders which are
 * provided by the Angular CLI. If the configured builder does not match the default builder,
 * this function can either throw or just show a warning.
 */
export function validateDefaultTargetBuilder(
  project: ProjectDefinition,
  targetName: 'build' | 'test',
  logger: logging.LoggerApi,
): TargetDefinition | undefined {
  const target: TargetDefinition | undefined =
    targetName === 'test' ? project.targets.get('test') : project.targets.get('build');

  // Because the build setup for the Angular CLI can be customized by developers, we can't know
  // where to put the theme file in the workspace configuration if custom builders are being used.
  // In case the builder has been changed for the "build" target, we throw an error and exit
  // because setting up a theme is a primary goal of `ng-add`. Otherwise, if just the "test"
  // builder has been changed, we warn because a theme is not mandatory for running tests.
  // See: https://github.com/angular/components/issues/14176
  if (!target && targetName === 'build') {
    throw new SchematicsException(
      `Your project is not using the default builders for "${targetName}".
      The lyne-angular schematics cannot add a theme to the workspace configuration
      if the builder has been changed.`,
    );
  } else if (!target) {
    // For non-build targets we gracefully report the error without actually aborting the setup schematic.
    // This is because a theme is not mandatory for running tests.
    logger.warn(
      `Your project is not using the default builders for "${targetName}".
      This means that we cannot add the configured theme to the "${targetName}" target.`,
    );
  }

  return target;
}

export function addThemeToProject(
  projectName: string,
  targetName: 'build' | 'test',
  themePath: string,
  logger: logging.LoggerApi,
): Rule {
  return updateWorkspace((workspace: WorkspaceDefinition) => {
    const project: ProjectDefinition | undefined = workspace.projects.get(projectName);
    if (!project) {
      throw new SchematicsException(`Project ${projectName} does not exist.`);
    }
    if (!validateDefaultTargetBuilder(project, targetName, logger)) {
      return;
    }
    const target: TargetDefinition | undefined = project.targets.get(targetName);
    if (!target) {
      throw new SchematicsException(`Target ${targetName} not found`);
    }

    if (
      target.builder === '@angular/build:unit-test' ||
      target.builder === '@angular-devkit/build-angular:jest'
    ) {
      logger.info(`Modern test builder detected. Skipping 'styles' array injection.`);
    } else {
      if (!target.options) {
        target.options = {};
      }
      const styles = target.options['styles'] as (string | { input: string })[] | undefined;
      if (!styles) {
        target.options['styles'] = [themePath];
        return;
      } else if (styles.includes(themePath)) {
        logger.info(`Theme already present in project "${projectName}", skipping.`);
      } else {
        styles.unshift(themePath);
        logger.info(`"${themePath}" added to project "${projectName}".`);
      }
    }
  });
}
