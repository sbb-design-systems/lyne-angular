import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

import {
  getProjectScope,
  ImportRewriteOptions,
  isStandardThemeSet,
  MigrationScope,
} from '../utils.cjs';
import { MigrateLegacyOptionsSchema } from './schema';
import { CommentMigration, createCommentMigrationRule } from './migrations/comment-migration.cjs';
import {
  AttributeMigration,
  createAttributeMigrationRule,
} from './migrations/attribute-migration.cjs';
import { createImportPathMigrationRule } from './migrations/import-path-migration.cjs';
import {
  createTemplateSelectorMigrationRule,
  SelectorMigration,
} from './migrations/template-selector-migration.cjs';
import { createTypeMigrationRule, TypeMigration } from './migrations/type-migration.cjs';
import { BUTTON_MIGRATIONS } from './modules/button.cjs';
import { CAPTCHA_MIGRATIONS } from './modules/captcha.cjs';
import { TEXTAREA_MIGRATIONS } from './modules/textarea.cjs';
import { TEXTEXPAND_MIGRATIONS } from './modules/textexpand.cjs';
import { USERMENU_MIGRATIONS } from './modules/usermenu.cjs';

export interface ModuleMigrations {
  importPaths: ImportRewriteOptions[];
  comments: CommentMigration[];
  types: TypeMigration[];
  selectors: SelectorMigration[];
  attributes: AttributeMigration[];
  customRules: ((scope: MigrationScope, isStandardTheme?: boolean) => Rule)[];
}

// TODO: Add more migrations as they are implemented
const MODULE_REGISTRY: Record<string, Partial<ModuleMigrations>> = {
  // 'accordion',
  // 'expansion-panel',
  // 'alert',
  // 'autocomplete',
  // 'badge',
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
};

export type LegacyModuleName = keyof typeof MODULE_REGISTRY;

const LEGACY_MODULES = Object.keys(MODULE_REGISTRY) as LegacyModuleName[];

function resolveLegacyModules(module: string[] | undefined): LegacyModuleName[] {
  const requestedModules = module ?? [];

  if (requestedModules.length === 0) {
    return [...LEGACY_MODULES];
  }

  const invalidModules = requestedModules.filter(
    (value): value is string => !LEGACY_MODULES.includes(value as LegacyModuleName),
  );
  if (invalidModules.length > 0) {
    throw new Error(
      `Unknown legacy module(s): ${invalidModules.join(', ')}. Supported modules: ${LEGACY_MODULES.join(', ')}.`,
    );
  }

  return [...new Set(requestedModules)] as LegacyModuleName[];
}

export function migrateLegacy(options: MigrateLegacyOptionsSchema): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const isStandardTheme = await isStandardThemeSet(tree, context, options.project);
    // Only the files of the selected project are migrated, not the whole workspace.
    const scope = await getProjectScope(tree, options.project);
    context.logger.info(
      `Migrating project ${options.project} (${scope.root || 'workspace root'}` +
        `${scope.excludedRoots.length ? `, excluding ${scope.excludedRoots.join(', ')}` : ''}).`,
    );
    const aggregatedMigrations: ModuleMigrations = resolveLegacyModules(
      options.module,
    ).reduce<ModuleMigrations>(
      (acc, moduleName) => {
        const moduleData = MODULE_REGISTRY[moduleName] ?? {};
        return {
          importPaths: [...acc.importPaths, ...(moduleData.importPaths ?? [])],
          comments: [...acc.comments, ...(moduleData.comments ?? [])],
          types: [...acc.types, ...(moduleData.types ?? [])],
          selectors: [...acc.selectors, ...(moduleData.selectors ?? [])],
          attributes: [...acc.attributes, ...(moduleData.attributes ?? [])],
          customRules: [...acc.customRules, ...(moduleData.customRules ?? [])],
        };
      },
      {
        importPaths: [],
        types: [],
        comments: [],
        selectors: [],
        attributes: [],
        customRules: [],
      },
    );
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
