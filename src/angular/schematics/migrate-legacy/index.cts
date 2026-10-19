import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

import { migrateButton } from './modules/button.cjs';
import { MigrateLegacyOptionsSchema } from './schema';
import { getProjectScope, isStandardThemeSet, MigrationScope } from '../utils.cjs';
import { migrateCaptcha } from './modules/captcha.cjs';
import { migrateTextarea } from './modules/textarea.cjs';
import { migrateUsermenu } from './modules/usermenu.cjs';

// TODO: Add more modules as they are implemented
const LEGACY_MODULES = [
  // 'accordion',
  // 'expansion-panel',
  // 'alert',
  // 'autocomplete',
  // 'badge',
  // 'breadcrumb',
  'button',
  'captcha',
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
  'textarea',
  'textexpand',
  // 'time-input',
  // 'toggle',
  // 'tooltip',
  'usermenu',
];

type LegacyModuleName = (typeof LEGACY_MODULES)[number];

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

/** Load migration rule for a specific legacy module. */
function loadModuleMigration(
  module: LegacyModuleName,
  scope: MigrationScope,
  isStandardTheme: boolean,
): Rule {
  // TODO: Add more modules as they are implemented
  switch (module) {
    case 'button':
      return migrateButton(scope, isStandardTheme);
    case 'captcha':
      return migrateCaptcha(scope);
    case 'textarea':
      return migrateTextarea(scope);
    case 'textexpand':
      return migrateTextarea(scope);
    case 'usermenu':
      return migrateUsermenu(scope);
    default:
      return noop();
  }
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

    return chain([
      ...resolveLegacyModules(options.module).map((module) =>
        loadModuleMigration(module, scope, isStandardTheme),
      ),
    ]);
  };
}
