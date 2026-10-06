# Migration schematics for `sbb-angular`

This directory contains the migration schematic for converting `@sbb-esta/angular` usages to `@sbb-esta/lyne-angular`.

## Architecture

- **`index.cts`**
  Main orchestrator that handles:
  - Resolving selected modules
  - Adding Lyne dependencies
  - Setting up theme
  - Loading and running per-module custom migrations

- **`modules/`**
  Per-module custom migration implementations; each module (e.g., `button.cts`, `checkbox.cts`, ... ) exports a `migrate<Module>()` function which performs custom transformations for that module.

- **`common/import-path-migration.cts`**
  Reusable rule factory which rewrites import/export module specifiers (including sub-paths) in all TypeScript files of the workspace.

- **`common/template-migration.cts`**
  Shared foundation of all template migrations: file traversal, inline template lookup, template parsing, selector parsing/matching, attribute removal and edit application. Concrete migrations only describe their edits.

- **`common/template-selector-migration.cts`**
  Reusable rule factory which replaces legacy selectors (`'tag[attribute]'`, `'tag'` or `'[attribute]'`) with a new element, in external templates (`templateUrl`) as well as in inline templates (`template`). Optionally removes attributes which became obsolete.

- **`common/attribute-migration.cts`**
  Reusable rule factory which renames (or removes) attributes, inputs and outputs of given elements, e.g. `svgIcon` → `iconName` on `<sbb-button>`.

- **`schema.json` / `schema.d.ts`**
  CLI schema definition

## Adding a Custom Module Migration

### 1. Create migration file

Create `modules/<module-name>.cts`, preferably declaratively by composing the shared rule factories:

```typescript
import { chain, Rule } from '@angular-devkit/schematics';

import { ImportRewriteOptions } from '../../utils.cjs';
import {
  AttributeMigration,
  createAttributeMigrationRule,
} from '../common/attribute-migration.cjs';
import { createImportPathMigrationRule } from '../common/import-path-migration.cjs';
import {
  createTemplateSelectorMigrationRule,
  SelectorMigration,
} from '../common/template-selector-migration.cjs';

const IMPORT_PATHS: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/<module>', newImport: '@sbb-esta/lyne-angular/<module>' },
];

const SELECTORS: SelectorMigration[] = [
  // <button sbb-button>x</button> → <sbb-button>x</sbb-button>
  { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
  // Optionally, attributes which became obsolete can be dropped as well:
  // { selector: 'sbb-foo', replaceWith: 'sbb-bar', removeAttributes: ['legacyFlag'] },
];

const ATTRIBUTES: AttributeMigration[] = [
  // <sbb-button svgIcon="x"> → <sbb-button iconName="x">
  { selector: 'sbb-button', attribute: 'svgIcon', replaceWith: 'iconName' },
  // Without `replaceWith` the attribute is removed:
  // { selector: 'sbb-button', attribute: 'obsoleteFlag' },
];

/**
 * Migrate <Module> module from @sbb-esta/angular to @sbb-esta/lyne-angular.
 */
export function migrate<Module>(): Rule {
  return chain([
    createImportPathMigrationRule(IMPORT_PATHS),
    // The selector migration runs first, so the attribute migration can
    // already target the new Lyne elements.
    createTemplateSelectorMigrationRule(SELECTORS),
    createAttributeMigrationRule(ATTRIBUTES),
  ]);
}
```

For transformations which cannot be expressed declaratively, add a custom `Rule` to the `chain()`. Template based rules should build on `createTemplateMigrationRule()` from `../common/template-migration.cjs`, which provides the element traversal and applies the collected `MigrationEdit`s.

### 2. Register in orchestrator

Update `index.cts`:

```typescript
import { migrate<Module> } from './modules/<module-name>.cjs';

function loadModuleMigration(module: LegacyModuleName): Rule {
  switch (module) {
    case '<module>':
      return migrate<Module>();
    // ... other cases
    default:
      return noop();
  }
}
```

### 3. Test your module migration

Create `test/<module-name>.spec.ts` using the `SchematicTestRunner` pattern from `test/button.spec.ts`.

## Usage

```bash
# Migrate all modules (add Lyne dependencies and theme)
ng generate @sbb-esta/lyne-angular:migrate-legacy

# Migrate specific modules
ng generate @sbb-esta/lyne-angular:migrate-legacy --module button
ng generate @sbb-esta/lyne-angular:migrate-legacy --module button checkbox
```

## Implementation Checklist

For each module, use this checklist:

- [ ] Create `modules/<module>.cts` with `migrate<Module>()` function
- [ ] Transformation list:
  - [ ] Change import path (using `createImportPathMigrationRule()`)
  - [ ] Template selector updates (using `createTemplateSelectorMigrationRule()`)
  - [ ] Attribute/input/output renames (using `createAttributeMigrationRule()`)
  - [ ] Component class renames
  - [ ] Input/output binding renames
  - [ ] CSS class/token updates
  - [ ] Manual migration comments
- [ ] Register in `index.cts` switch statement
- [ ] Create test file: `test/<module>.spec.ts`

## Notes

- Migrations run AFTER dependency setup and theme configuration
- Each module's migration is isolated and can be run independently
- Migrations are idempotent (safe to run multiple times)
- `node_modules` and `*.d.ts` files are never migrated
- Templates which cannot be parsed, and elements without a closing tag, are skipped instead of being corrupted
- Edits are collected as `MigrationEdit`s and applied in reverse offset order, so offsets stay stable; every edit can carry a `log` callback
