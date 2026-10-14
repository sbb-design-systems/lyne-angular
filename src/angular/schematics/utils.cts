import {
  TmplAstDeferredBlock,
  TmplAstElement,
  TmplAstForLoopBlock,
  TmplAstIfBlock,
  TmplAstNode,
  TmplAstSwitchBlock,
  TmplAstTemplate,
} from '@angular/compiler';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import type { logging } from '@angular-devkit/core';
import {
  type Rule,
  type SchematicContext,
  SchematicsException,
  type Tree,
} from '@angular-devkit/schematics';
import {
  getWorkspace,
  type ProjectDefinition,
  type TargetDefinition,
  updateWorkspace,
  type WorkspaceDefinition,
} from '@schematics/angular/utility/workspace';

export interface ImportRewriteOptions {
  /** Old import path to replace (e.g., '@sbb-esta/angular/button') */
  oldImport: string;
  /** New import path (e.g., '@sbb-esta/lyne-angular/button') */
  newImport: string;
}

/**
 * A single, position based source edit.
 *
 * `length` characters are removed at `offset`, then `insertion` (if any) is
 * inserted at the very same offset. `index` is a monotonically increasing
 * counter used as a stable tiebreaker when multiple edits share an offset.
 */
export interface MigrationEdit {
  offset: number;
  index: number;
  length: number;
  insertion?: string;
  log?: () => void;
}

interface Package {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

type LyneThemeKind = 'standard' | 'lean';

const LYNE_THEME_REGEX =
  /(?:^|[/~])@sbb-esta\/lyne-elements\/(lean-(?:off-brand-|safety-)?theme|(?:standard|off-brand|safety)-theme)(?:\.css)?$/;

/** Only files which can actually be authored by a consumer are migrated. */
export function isMigratableFile(filePath: string): boolean {
  return !filePath.includes('/node_modules/') && !filePath.startsWith('node_modules/');
}

/** Whether the given file is a TypeScript source file (declaration files excluded). */
export function isTypeScriptFile(filePath: string): boolean {
  return isMigratableFile(filePath) && filePath.endsWith('.ts') && !filePath.endsWith('.d.ts');
}

/** Whether the given file is an external (`templateUrl`) template. */
export function isHtmlFile(filePath: string): boolean {
  return isMigratableFile(filePath) && filePath.endsWith('.html');
}

/**
 * Gets the project name: takes the default name from cli, if not found gets it from the angular.json.
 */
export function getProjectName<T extends { project?: string }>(
  options: T,
  workspace: WorkspaceDefinition,
) {
  return (
    options.project ||
    (workspace.extensions['defaultProject'] as string) ||
    Array.from(workspace.projects.keys())[0]
  );
}

/**
 * Gets the lyne-elements version from the lyne-angular package.json, where it's listed as peerDependency
 */
export function getPackageVersion(tree: Tree, context: SchematicContext, packageName: string) {
  const lyneAngularPackage = tree.read('node_modules/@sbb-esta/lyne-angular/package.json');
  if (!lyneAngularPackage) {
    throw new SchematicsException(`@sbb-esta/lyne-angular has no package.json to read from.`);
  }
  const lyneAngularPackageJson: Package = JSON.parse(lyneAngularPackage.toString('utf-8'));
  const packageVersion = lyneAngularPackageJson.peerDependencies?.[packageName];
  if (!packageVersion) {
    context.logger.warn(`${packageName} not found. Latest version will be installed.`);
  } else {
    context.logger.info(`Found ${packageName} with version: ${packageVersion}`);
  }
  return packageVersion;
}

/** Adds a package to the package.json in the given host tree. */
export function addPackageToPackageJson(
  tree: Tree,
  depName: string,
  version: string,
  logger: logging.LoggerApi,
): void {
  if (tree.exists('package.json')) {
    const pkgBuffer = tree.read('package.json');
    if (!pkgBuffer) {
      throw new SchematicsException(`Could not find package.json. Are you in an Angular project?`);
    }
    const pkg: Package = JSON.parse(pkgBuffer.toString('utf-8'));
    if (!pkg.dependencies) {
      pkg.dependencies = {};
    }
    if (!pkg.dependencies[depName]) {
      pkg.dependencies[depName] = version;
      pkg.dependencies = sortDependencies(pkg);
      tree.overwrite('package.json', JSON.stringify(pkg, null, 2));
      logger.info(`Added ${depName} to dependencies with version ${version}.`);
    } else {
      logger.info(`${depName} already in dependencies, skipping.`);
    }
  }
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

/** Classifies an import specifier or `styles` entry as a Lyne theme, if it is one. */
function lyneThemeKind(specifier: string): LyneThemeKind | undefined {
  const match = specifier.trim().match(LYNE_THEME_REGEX);
  if (!match) {
    return undefined;
  }
  return match[1].startsWith('lean-') ? 'lean' : 'standard';
}

/** Extracts the `@import`, `@use` and `@forward` specifiers of a stylesheet, ignoring comments. */
function stylesheetImports(content: string): string[] {
  const withoutComments = content.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
  const specifiers: string[] = [];

  for (const [, args] of withoutComments.matchAll(/@(?:import|use|forward)\s+([^;\n]+)/g)) {
    // `@import 'a', 'b';`, `@import url("a");`, `@use 'a' as b;`
    for (const [, , quoted, url] of args.matchAll(/(['"])(.+?)\1|url\(\s*([^'")\s]+)\s*\)/g)) {
      specifiers.push(quoted ?? url);
    }
  }

  return specifiers;
}

/**
 * It checks whether a non-lean Lyne theme is configured for the project,
 * first in the `angular.json` file (`styles` property under `build` target), then
 * in the imports of the default global stylesheet.
 */
export async function isStandardThemeSet(
  tree: Tree,
  context: SchematicContext,
  projectName: string,
): Promise<boolean> {
  const workspace = await getWorkspace(tree);
  const project = workspace.projects.get(projectName);

  if (!project) {
    throw new SchematicsException(
      `Could not find project ${projectName}; please check your \`angular.json.\``,
    );
  }

  const buildTarget = project.targets.get('build');
  if (!buildTarget || !buildTarget.options) {
    throw new SchematicsException(
      `Could not find build configuration for project ${projectName}; please check your \`angular.json.\``,
    );
  }

  const styles = (
    (project.targets.get('build')?.options?.['styles'] as
      (string | { input: string; [key: string]: any })[] | undefined) ?? []
  )
    .map((style) => (typeof style === 'string' ? style : style?.input))
    .filter((style): style is string => !!style);

  let themes = styles.map(lyneThemeKind).filter((theme): theme is LyneThemeKind => Boolean(theme));

  if (themes.length === 0) {
    context.logger.info(
      `No \`@sbb-esta/lyne-elements\` theme found in the \`angular.json\` file for project ${projectName}.`,
    );
    const globalStylePath =
      styles.find((style) => /styles\.(css|scss|sass)$/.test(style)) ?? styles[0];
    const content = globalStylePath ? tree.read(globalStylePath)?.toString('utf-8') : undefined;

    themes = content
      ? stylesheetImports(content)
          .map(lyneThemeKind)
          .filter((theme): theme is LyneThemeKind => Boolean(theme))
      : [];
  }

  if (themes.includes('lean')) {
    context.logger.info(`Lean theme found for project ${projectName}.`);
    return false;
  } else if (themes.includes('standard')) {
    context.logger.info(`Standard theme found for project ${projectName}.`);
    return true;
  } else {
    context.logger.warn(
      `No \`@sbb-esta/lyne-elements\` theme found in the global styles of project ${projectName}; assuming the standard theme.`,
    );
    return true;
  }
}

/** Part of the workspace a migration is limited to. */
export interface MigrationScope {
  /** Root directory of the project, relative to the workspace (`''` for the workspace root). */
  root: string;
  /** Roots of other projects nested inside `root` (e.g. `projects/lib` of a root app), which are skipped. */
  excludedRoots: string[];
}

/** Normalizes a project root: forward slashes, no leading `./` or `/`, no trailing `/`. */
function normalizeRoot(root: string | undefined): string {
  return (root ?? '')
    .replace(/\\/g, '/')
    .replace(/^\.\//, '')
    .replace(/^\/+|\/+$/g, '');
}

/** Whether the workspace relative `filePath` is `directory` or lies within it. */
function isWithin(filePath: string, directory: string): boolean {
  return directory === '' || filePath === directory || filePath.startsWith(`${directory}/`);
}

/**
 * Resolves the files of the given project: its root directory, without
 * the directories of other projects nested inside it.
 */
export async function getProjectScope(tree: Tree, projectName: string): Promise<MigrationScope> {
  const workspace = await getWorkspace(tree);
  const project = workspace.projects.get(projectName);

  if (!project) {
    throw new SchematicsException(
      `Could not find project ${projectName}; please check your \`angular.json.\``,
    );
  }

  const root = normalizeRoot(project.root);
  const excludedRoots = [...workspace.projects.entries()]
    .filter(([name]) => name !== projectName)
    .map(([, other]) => normalizeRoot(other.root))
    .filter((otherRoot) => otherRoot !== root && isWithin(otherRoot, root));

  return { root, excludedRoots };
}

/**
 * Visits the files of the given scope, or of the whole workspace when no scope is given.
 * `visitor` receives the absolute tree path (e.g. `/src/app/app.component.ts`).
 */
export function visitScopedFiles(
  tree: Tree,
  scope: MigrationScope | undefined,
  visitor: (filePath: string) => void,
): void {
  if (!scope) {
    tree.visit((filePath) => visitor(filePath));
    return;
  }

  tree.getDir(`/${scope.root}`).visit((filePath) => {
    const relativePath = filePath.replace(/^\/+/, '');
    if (!scope.excludedRoots.some((excluded) => isWithin(relativePath, excluded))) {
      visitor(filePath);
    }
  });
}

export function addThemeToProject(
  projectName: string,
  targetName: 'build' | 'test',
  themePath: string,
  logger: logging.LoggerApi,
): Rule {
  return updateWorkspace((workspace: WorkspaceDefinition) => {
    const project: ProjectDefinition = getProjectFromWorkspace(workspace, projectName);
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
      logger.info(
        `    Modern test builder detected. Skipping 'styles' array injection for 'test' setup.`,
      );
    } else {
      if (!target.options) {
        target.options = {};
      }

      const styles = target.options['styles'] as
        (string | { input: string; [key: string]: any })[] | undefined;

      if (!styles) {
        target.options['styles'] = [themePath];
        return;
      }

      const legacyThemeRegex = /^node_modules\/@sbb-esta\/lyne-elements\/.*-theme\.css$/;
      let replacedLegacy = false;
      const updatedStyles = styles.map((style) => {
        if (typeof style === 'string') {
          if (legacyThemeRegex.test(style)) {
            replacedLegacy = true;
            return themePath;
          }
          return style;
        } else if (style && typeof style.input === 'string') {
          if (legacyThemeRegex.test(style.input)) {
            replacedLegacy = true;
            return { ...style, input: themePath };
          }
          return style;
        }
        return style;
      });

      if (replacedLegacy) {
        logger.info(
          `    Replaced legacy lyne-elements theme with "${themePath}" in project "${projectName}".`,
        );
        target.options['styles'] = updatedStyles;
        return;
      }

      const themeAlreadyExists = updatedStyles.some((style) => {
        const pathToCheck = typeof style === 'string' ? style : style?.input;
        return pathToCheck === themePath;
      });

      if (themeAlreadyExists) {
        logger.info(`    Theme already present in project "${projectName}", skipping.`);
      } else {
        updatedStyles.unshift(themePath);
        logger.info(`    "${themePath}" added to project "${projectName}".`);
        target.options['styles'] = updatedStyles;
      }
    }
  });
}

/**
 * Recursively walks Angular template AST nodes and invokes `cb` for every
 * `TmplAstElement` found, descending into:
 *
 * - `TmplAstTemplate`      — hosts of `*ngIf`, `*ngFor`, `*ngSwitch` structural directives
 * - `TmplAstIfBlock`       — `@if` / `@else if` / `@else` branches
 * - `TmplAstForLoopBlock`  — `@for` body and `@empty` fallback
 * - `TmplAstSwitchBlock`   — `@switch` cases
 * - `TmplAstDeferredBlock` — `@defer` primary body, `@placeholder`, `@loading`, `@error`
 */
export function visitElements(nodes: TmplAstNode[], cb: (el: TmplAstElement) => void): void {
  for (const node of nodes) {
    if (node instanceof TmplAstElement) {
      cb(node);
      visitElements(node.children, cb);
    } else if (node instanceof TmplAstTemplate) {
      // Structural-directive host: *ngIf, *ngFor, *ngSwitch, etc.
      visitElements(node.children, cb);
    } else if (node instanceof TmplAstIfBlock) {
      // @if / @else if / @else — each branch has its own children array.
      for (const branch of node.branches) {
        visitElements(branch.children, cb);
      }
    } else if (node instanceof TmplAstForLoopBlock) {
      // @for body + optional @empty fallback.
      visitElements(node.children, cb);
      if (node.empty) {
        visitElements(node.empty.children, cb);
      }
    } else if (node instanceof TmplAstSwitchBlock) {
      // @switch — groups hold one or more consecutive @case/@default expressions
      // that share a single body; descend into each group's children.
      for (const group of node.groups) {
        visitElements(group.children, cb);
      }
    } else if (node instanceof TmplAstDeferredBlock) {
      // @defer primary body + placeholder / loading / error blocks.
      visitElements(node.children, cb);
      if (node.placeholder) {
        visitElements(node.placeholder.children, cb);
      }
      if (node.loading) {
        visitElements(node.loading.children, cb);
      }
      if (node.error) {
        visitElements(node.error.children, cb);
      }
    }
  }
}

/**
 * Applies the given edits to `content` and invokes the (optional) `log`
 * callback of every applied edit.
 *
 * Edits are applied in reverse offset order so that earlier edits never shift
 * the offsets of edits which still have to be applied.
 */
export function applyEdits(content: string, edits: MigrationEdit[]): string {
  let result = content;

  for (const edit of [...edits].sort((a, b) => b.offset - a.offset || b.index - a.index)) {
    result =
      result.slice(0, edit.offset) +
      (edit.insertion ?? '') +
      result.slice(edit.offset + edit.length);
    edit.log?.();
  }

  return result;
}
