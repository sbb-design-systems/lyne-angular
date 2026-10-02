import { chain, noop, Rule } from '@angular-devkit/schematics';

import { addDependenciesRule, setupLyneTheme } from '../setup-lyne.cjs';
import { migrateButton } from './modules/button.cjs';
import { MigrateLegacyOptionsSchema } from './schema';

const LEGACY_MODULES = [
  'accordion',
  'expansion-panel',
  'alert',
  'autocomplete',
  'badge',
  'breadcrumb',
  'button',
  'captcha',
  'checkbox',
  'checkbox-panel',
  'chips',
  'datepicker',
  'dialog',
  'file-selector',
  'form-field',
  'header-lean',
  'icon',
  'input',
  'lightbox',
  'loading-indicator',
  'menu',
  'notification',
  'notification-toast',
  'pagination',
  'processflow',
  'radio-button',
  'radio-button-panel',
  'search',
  'select',
  'sidebar',
  'status',
  'tabs',
  'table',
  'tag',
  'textexpand',
  'textarea',
  'time-input',
  'toggle',
  'tooltip',
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
function loadModuleMigration(module: LegacyModuleName): Rule {
  // TODO: Add more modules as they are implemented
  switch (module) {
    case 'button':
      return migrateButton();
    default:
      return noop();
  }
}

export function migrateLegacy(options: MigrateLegacyOptionsSchema): Rule {
  return chain([
    addDependenciesRule(),
    setupLyneTheme(),
    ...resolveLegacyModules(options.module).map((module) => loadModuleMigration(module)),
  ]);
}
