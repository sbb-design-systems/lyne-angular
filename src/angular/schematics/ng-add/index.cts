import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { NgAddOptionsSchema } from './schema';

const LYNE_ELEMENTS_PACKAGE = '@sbb-esta/lyne-elements';
const LYNE_ELEMENTS_VERSION = 'latest'; // FIXME
const THEME_PATH_PREFIX = 'node_modules/@sbb-esta/lyne-elements';

function sortObjectByKeys(obj: Record<string, string>): Record<string, string> {
  const sorted: Record<string, string> = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = obj[key];
    });
  return sorted;
}

function addLyneElementsDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const pkgPath = 'package.json';
    if (tree.exists(pkgPath)) {
      const pkgBuffer = tree.read(pkgPath);
      const pkg = JSON.parse(pkgBuffer.toString('utf-8'));
      if (!pkg.dependencies) {
        pkg.dependencies = {};
      }

      if (!pkg.dependencies[LYNE_ELEMENTS_PACKAGE]) {
        pkg.dependencies[LYNE_ELEMENTS_PACKAGE] = LYNE_ELEMENTS_VERSION;
        pkg.dependencies = sortObjectByKeys(pkg.dependencies);
        tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
        context.logger.info(`Added ${LYNE_ELEMENTS_PACKAGE} to dependencies.`);
      } else {
        context.logger.info(`${LYNE_ELEMENTS_PACKAGE} already in dependencies, skipping.`);
      }
    }
    return tree;
  };
}

function installDependencies(): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.info('Scheduling npm install...');
  };
}

function addSelectedTheme(options: NgAddOptionsSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Add theme to angular.json
    const workspacePath = 'angular.json';
    const workspaceBuffer = tree.read(workspacePath).toString('utf-8');
    if (!workspaceBuffer) {
      throw new Error('Could not find angular.json. Are you in an Angular project?');
    }

    const workspace = JSON.parse(workspaceBuffer);
    const themePath = `${THEME_PATH_PREFIX}/${options.theme}-theme.css`;

    let patched = false;
    for (const projectName of Object.keys(workspace.projects)) {
      const project = workspace.projects[projectName];
      const buildOptions = project?.architect?.build?.options;

      if (!buildOptions) continue;

      if (!Array.isArray(buildOptions.styles)) {
        buildOptions.styles = [];
      }

      if (!buildOptions.styles.includes(themePath)) {
        buildOptions.styles.unshift(themePath);
        context.logger.info(`Added theme "${options.theme}" to project "${projectName}".`);
        patched = true;
      } else {
        context.logger.info(`Theme already present in project "${projectName}", skipping.`);
      }
    }

    if (!patched) {
      context.logger.warn('No buildable projects found in angular.json.');
      return tree;
    }

    tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2));
    return tree;
  };
}

export function ngAdd(options: NgAddOptionsSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Setting up @sbb-esta/lyne-angular...');

    return chain([addLyneElementsDependencies(), installDependencies(), addSelectedTheme(options)])(
      tree,
      context,
    );
  };
}
