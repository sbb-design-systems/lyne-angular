import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { chain, noop, SchematicsException } from '@angular-devkit/schematics';

import type { ModuleMigrations } from './common.cjs';
import { getProjectScope, isStandardThemeSet } from './common.cjs';
import { createAttributeMigrationRule } from './migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from './migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from './migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from './migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from './migrations/type-migration.cjs';
import { BADGE_MIGRATIONS } from './modules/badge.cjs';
import { BUTTON_MIGRATIONS } from './modules/button.cjs';
import { CAPTCHA_MIGRATIONS } from './modules/captcha.cjs';
import { TEXTAREA_MIGRATIONS } from './modules/textarea.cjs';
import { TEXTEXPAND_MIGRATIONS } from './modules/textexpand.cjs';
import { USERMENU_MIGRATIONS } from './modules/usermenu.cjs';
import type { MigrateLegacyOptionsSchema } from './schema';

// TODO: Add more migrations as they are implemented
const MODULE_REGISTRY = {
  // 'accordion',
  // 'expansion-panel',
  // 'alert',
  // 'autocomplete',
  badge: BADGE_MIGRATIONS,
  // 'breadcrumb',
  button: BUTTON_MIGRATIONS,
  captcha: CAPTCHA_MIGRATIONS,
  // 'checkbox',
  // 'checkbox-panel',
  // 'chips',
  // 'datepicker',
  // 'dialog',
  // 'file-selector',
  // 'form-field',
  // 'header-lean',
  // 'icon',
  // 'input',
  // 'lightbox',
  // 'loading-indicator',
  // 'menu',
  // 'notification',
  // 'notification-toast',
  // 'pagination',
  // 'processflow',
  // 'radio-button',
  // 'radio-button-panel',
  // 'search',
  // 'select',
  // 'sidebar',
  // 'status',
  // 'tabs',
  // 'table',
  // 'tag',
  textarea: TEXTAREA_MIGRATIONS,
  textexpand: TEXTEXPAND_MIGRATIONS,
  // 'time-input',
  // 'toggle',
  // 'tooltip',
  usermenu: USERMENU_MIGRATIONS,
} satisfies Record<string, Partial<ModuleMigrations>>;

export type LegacyModuleName = keyof typeof MODULE_REGISTRY;

const LEGACY_MODULES = Object.keys(MODULE_REGISTRY) as LegacyModuleName[];

function isLegacyModule(value: string): value is LegacyModuleName {
  return (LEGACY_MODULES as string[]).includes(value);
}

function resolveLegacyModules(module: string[] | undefined): LegacyModuleName[] {
  const requestedModules = module ?? [];

  if (requestedModules.length === 0) {
    return [...LEGACY_MODULES];
  }

  const invalidModules = requestedModules.filter((value) => !isLegacyModule(value));
  if (invalidModules.length > 0) {
    throw new SchematicsException(
      `Unknown legacy module(s): ${invalidModules.join(', ')}. Supported modules: ${LEGACY_MODULES.join(', ')}.`,
    );
  }

  return [...new Set(requestedModules)].filter(isLegacyModule);
}

/** Concatenates one kind of migration over all selected modules, in registry order. */
function collect<K extends keyof ModuleMigrations>(
  modules: LegacyModuleName[],
  key: K,
): ModuleMigrations[K] {
  return modules.flatMap(
    (moduleName) =>
      ((MODULE_REGISTRY[moduleName] as Partial<ModuleMigrations>)[key] ?? []) as unknown[],
  ) as ModuleMigrations[K];
}

export function migrateLegacy(options: MigrateLegacyOptionsSchema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const [isStandardTheme, scope] = await Promise.all([
      isStandardThemeSet(tree, context, options.project),
      // Only the files of the selected project are migrated, not the whole workspace.
      getProjectScope(tree, options.project),
    ]);
    context.logger.info(
      `Migrating project ${options.project} (${scope.root || 'workspace root'}` +
        `${scope.excludedRoots.length ? `, excluding ${scope.excludedRoots.join(', ')}` : ''}).`,
    );
    const modules = resolveLegacyModules(options.module);
    const aggregatedMigrations: ModuleMigrations = {
      importPaths: collect(modules, 'importPaths'),
      comments: collect(modules, 'comments'),
      types: collect(modules, 'types'),
      selectors: collect(modules, 'selectors'),
      attributes: collect(modules, 'attributes'),
      customRules: collect(modules, 'customRules'),
    };
    return chain([
      aggregatedMigrations.importPaths.length > 0
        ? createImportPathMigrationRule(aggregatedMigrations.importPaths, scope)
        : noop(),
      aggregatedMigrations.comments.length > 0
        ? createCommentMigrationRule(aggregatedMigrations.comments, scope)
        : noop(),
      aggregatedMigrations.types.length > 0
        ? createTypeMigrationRule(aggregatedMigrations.types, scope)
        : noop(),
      aggregatedMigrations.attributes.length > 0
        ? createAttributeMigrationRule(aggregatedMigrations.attributes, scope)
        : noop(),
      aggregatedMigrations.selectors.length > 0
        ? createTemplateSelectorMigrationRule(aggregatedMigrations.selectors, scope)
        : noop(),
      ...aggregatedMigrations.customRules.map((ruleFactory) => ruleFactory(scope, isStandardTheme)),
    ]);
  };
}
