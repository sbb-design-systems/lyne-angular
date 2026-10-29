import type { CssSelector } from '@angular/compiler';
import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { SchematicsException } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';

import type { MigrationEdit, MigrationScope } from '../utils.cjs';

type LyneThemeKind = 'standard' | 'lean';

const LYNE_THEME_REGEX =
  /(?:^|[/~])@sbb-esta\/lyne-elements\/(lean-(?:off-brand-|safety-)?theme|(?:standard|off-brand|safety)-theme)(?:\.css)?$/;

/**
 * Interface for import path migrations.
 */
export interface ImportRewriteOptions {
  /** Old import path to replace (e.g., '@sbb-esta/angular/button') */
  oldImport: string;
  /** New import path (e.g., '@sbb-esta/lyne-angular/button') */
  newImport: string;
}

/**
 * Base comment interface, used for both templates and symbols.
 */
interface CommentMigrationBase {
  /** Text of the comment. Multiline text is rendered as multiple comment lines. */
  message: string;
}

/**
 * Comments a template element, or an attribute of it, e.g. `<sbb-captcha>`.
 */
export interface ElementCommentMigration extends CommentMigrationBase {
  /**
   * CSS-like selector of the target element, using the Angular selector syntax. Examples:
   * - `'sbb-usermenu'`                     — tag name
   * - `'[sbb-button]'`                     — attribute on any tag
   * - `'button[sbb-button]'`               — tag name combined with an attribute
   * - `'a.link'`                           — class
   * - `'a[href=foo].link'`                 — attribute value and class
   * - `'a:not(.link)'`                     — excluding a class
   * - `'a:not([download])'`                — excluding an attribute
   * - `'a:not([href="/"])'`                — excluding an attribute value
   * - `'a.link[sbb-link]:not([download])'` — any combination of the above
   * - `'a[sbb-link], button[sbb-link]'`    — list of alternatives
   */
  selector: string | string[];
}

/**
 * Comments every usage of a TypeScript symbol, e.g. `SbbCaptchaModule`.
 */
export interface SymbolCommentMigration extends CommentMigrationBase {
  /** Exported name of the symbol. */
  symbol: string;
  /**
   * Only comment the symbol when it is imported from this module (exact match or sub-path).
   * When omitted, any import of `symbol` is considered.
   */
  importedFrom?: string | string[];
}

export type CommentMigration = ElementCommentMigration | SymbolCommentMigration;

/** An attribute which should be dropped, optionally only for a specific value. */
export type RemovableAttribute = string | { name: string; value?: string };

/** Attribute span. */
export interface Span {
  start: number;
  end: number;
}

/**
 * Interface used for attribute migrations.
 */
export interface AttributeMigration {
  /**
   * CSS-like selector of the element owning the attribute, using the Angular selector syntax. Examples:
   * - `'*'`                                - every element
   * - `'sbb-usermenu'`                     — tag name
   * - `'[sbb-button]'`                     — attribute on any tag
   * - `'button[sbb-button]'`               — tag name combined with an attribute
   * - `'a.link'`                           — class
   * - `'a[href=foo].link'`                 — attribute value and class
   * - `'a:not(.link)'`                     — excluding a class
   * - `'a:not([download])'`                — excluding an attribute
   * - `'a:not([href="/"])'`                — excluding an attribute value
   * - `'a.link[sbb-link]:not([download])'` — any combination of the above
   * - `'a[sbb-link], button[sbb-link]'`    — list of alternatives
   */
  selector: string | string[];
  /**
   * Legacy attribute, input or output name.
   * Both the camelCase and the dash-case spelling are matched, the original spelling is preserved.
   */
  attribute: string;
  /** New name. When omitted, the attribute is removed instead of renamed. */
  replaceWith?: string;
  /**
   * If attribute is not found, add a new `replaceWith` attribute with this value set.
   * NOTE: defaultValue is inserted verbatim between double quotes, so it must be valid attribute-value HTML.
   */
  defaultValue?: string;
}

/**
 * A parsed CSS selector. A comma separated selector list yields one alternative per entry;
 * an element matches if it matches any of them.
 */
export interface ParsedSelector {
  /** The selector as it has been written. */
  source: string;
  alternatives: CssSelector[];
}

export type ParsedAttributeMigration = AttributeMigration & { parsedSelectors: ParsedSelector[] };

/**
 * Interface used for tags migrations.
 * The selected element tag is replaced with the `replaceWith` value
 */
export interface SelectorMigration {
  /**
   * CSS-like selector of the legacy element, using the Angular selector syntax. Examples:
   * - `'sbb-usermenu'`                     — tag name
   * - `'[sbb-button]'`                     — attribute on any tag
   * - `'button[sbb-button]'`               — tag name combined with an attribute
   * - `'a.link'`                           — class
   * - `'a[href=foo].link'`                 — attribute value and class
   * - `'a:not(.link)'`                     — excluding a class
   * - `'a:not([download])'`                — excluding an attribute
   * - `'a:not([href="/"])'`                — excluding an attribute value
   * - `'a.link[sbb-link]:not([download])'` — any combination of the above
   * - `'a[sbb-link], button[sbb-link]'`    — list of alternatives
   */
  selector: string;
  /**
   * Tag name of the new element, e.g. `'sbb-button'`.
   */
  replaceWith: string;
  /**
   * Attributes to add to the migrated element, written as in a template and inserted verbatim
   * right after the tag name, e.g. `'orientation="vertical"'` or `'size="s" [disabled]="x"'`.
   */
  addAttributes?: string;
}

export type ParsedSelectorMigration = SelectorMigration & { parsedSelector: ParsedSelector };

/**
 * Interface for types migrations.
 */
export interface TypeMigration {
  /** Legacy symbol name, e.g. `'SbbBreadcrumbs'`. */
  from: string;
  /** New symbol name, e.g. `'SbbBreadcrumbGroup'`. */
  to: string;
  /**
   * Only migrate the symbol when it is imported from this module (exact match
   * or sub-path). When omitted, any import of `from` is migrated.
   */
  importedFrom?: string | string[];
}

/**
 * General interface for migration; it collects all the possible transformation, including custom rules.
 */
export interface ModuleMigrations {
  importPaths: ImportRewriteOptions[];
  comments: CommentMigration[];
  types: TypeMigration[];
  selectors: SelectorMigration[];
  attributes: AttributeMigration[];
  customRules: ((scope?: MigrationScope, isStandardTheme?: boolean) => Rule)[];
}

/**
 * It checks whether a non-lean Lyne theme is configured for the project,
 * first in the `angular.json` file (`styles` property under `build` target), then
 * in the imports of the default global stylesheets.
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
  if (!buildTarget) {
    throw new SchematicsException(
      `Could not find build configuration for project ${projectName}; please check your \`angular.json.\``,
    );
  }

  // Styles of the default configuration win, the target options are the fallback.
  const defaultConfiguration = buildTarget.defaultConfiguration;
  const configurationStyles = defaultConfiguration
    ? styleInputs(buildTarget.configurations?.[defaultConfiguration]?.['styles'])
    : [];
  const styles = configurationStyles.length
    ? configurationStyles
    : styleInputs(buildTarget.options?.['styles']);

  let themes = styles.map(lyneThemeKind).filter((theme): theme is LyneThemeKind => Boolean(theme));

  if (themes.length === 0) {
    context.logger.info(
      `No \`@sbb-esta/lyne-elements\` theme found in the \`angular.json\` file for project ${projectName}.`,
    );
    themes = styles.flatMap((style) => {
      const content = tree.read(style)?.toString('utf-8');
      return content
        ? stylesheetImports(content)
            .map(lyneThemeKind)
            .filter((theme): theme is LyneThemeKind => Boolean(theme))
        : [];
    });
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

/** Whether the given file is a TypeScript source file (declaration files excluded). */
export function isTypeScriptFile(filePath: string): boolean {
  return isMigratableFile(filePath) && filePath.endsWith('.ts') && !filePath.endsWith('.d.ts');
}

/** Whether the given file is an external (`templateUrl`) template. */
export function isHtmlFile(filePath: string): boolean {
  return isMigratableFile(filePath) && filePath.endsWith('.html');
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

function styleInputs(value: unknown): string[] {
  if (!value || !Array.isArray(value)) {
    return [];
  }
  return value
    .map((style) => {
      if (typeof style === 'string') {
        return style;
      }
      if (typeof style === 'object' && style !== null && 'input' in style) {
        return style.input;
      }
      return undefined;
    })
    .filter((style): style is string => typeof style === 'string' && style.length > 0);
}

/** Only files which can actually be authored by a consumer are migrated. */
function isMigratableFile(filePath: string): boolean {
  return !filePath.includes('/node_modules/') && !filePath.startsWith('node_modules/');
}

/** Whether the workspace relative `filePath` is `directory` or lies within it. */
function isWithin(filePath: string, directory: string): boolean {
  return directory === '' || filePath === directory || filePath.startsWith(`${directory}/`);
}

/** Normalizes a project root: forward slashes, no leading `./` or `/`, no trailing `/`. */
function normalizeRoot(root: string | undefined): string {
  return (root ?? '')
    .replace(/\\/g, '/')
    .replace(/^\.\//, '')
    .replace(/^\/+|\/+$/g, '');
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
