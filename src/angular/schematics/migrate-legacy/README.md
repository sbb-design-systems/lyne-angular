# Migration schematics for `sbb-angular`

This directory contains the migration schematic for converting `@sbb-esta/angular` usages to `@sbb-esta/lyne-angular`.

## Architecture

- **`index.cts`**
  Main orchestrator that resolves data for the selected modules and executes the migration scripts.
  Rules are called once after aggregating data from all the selected modules.
  It also retrieves the configured theme, which can be used in custom migration rules to handle theme-specific logic.

- **`modules/`**
  Per-module custom migration data; each module (e.g., `button.cts`, `checkbox.cts`, ... ) exports a `Partial<ModuleMigrations>` object
  which must be added to the `MODULE_REGISTRY` in `index.ts` to perform the custom transformations for that module.

- **`migrations/import-path-migration.cts`**
  Rule factory which rewrites import/export module specifiers in all TypeScript files of the workspace.

- **`migrations/comment-migration.cts`**
  Rule factory which adds comments to elements, attributes and TypeScript symbols. Can be used for components without a counterpart in the new library.

- **`migrations/type-migration.cts`**
  Rule factory which renames type/class/symbol usages in TypeScript files, e.g. `SbbBreadcrumbs` → `SbbBreadcrumbGroup`.
  Only files which import the legacy symbol are touched.

- **`migrations/attribute-migration.cts`**
  Rule factory which renames (or removes) attributes, inputs and outputs of given elements, e.g. `svgIcon` → `iconName` on `<sbb-button>`.
  Supports configuring a `defaultValue` to automatically inject an attribute if the legacy attribute is missing.

- **`migrations/template-selector-migration.cts`**
  Rule factory which replaces legacy selectors with a new element, in external templates (`templateUrl`) as well as in inline templates (`template`).
  It supports several selectors, including tags, classes, attributes, exclusions and any combinations.

- **`template-migration.cts`**
  Shared foundation of all template migrations: file traversal, inline template lookup, template parsing, selector parsing/matching, attribute removal and edit application.
  Concrete migrations only describe their edits.

- **`symbol-references.cts`**
  Shared lookup of imported TypeScript symbols (used by type and comment migrations).

- **`test-utils.cts`**
  Util class which exposes static methods to improve tests execution.

- **`schema.json` / `schema.d.ts`**
  CLI schema definition.

## Adding a Custom Module Migration

It is possible to generate the boilerplate code for a module migration running `npm run generate-migration <module name>`;
it generates both the basic migration script and the corresponding test file under the folder `migrate-legacy/modules`.

### 1. Create migration file

Create `modules/<module-name>.cts`, preferably declaratively by composing the shared rule factories:

```typescript
import { ImportRewriteOptions } from '../../utils.cjs';
import { AttributeMigration } from '../migrations/attribute-migration.cjs';
import { SelectorMigration } from '../migrations/template-selector-migration.cjs';
import { CommentMigration } from '../migrations/comment-migration.cjs';
import { TypeMigration } from '../migrations/type-migration.cjs';
import { ModuleMigrations } from '../index.cjs';

const importPaths: ImportRewriteOptions[] = [
  { oldImport: '@sbb-esta/angular/<module>', newImport: '@sbb-esta/lyne-angular/<module>' },
];

const comments: CommentMigration[] = [
  // Element: <!-- message --> above every <sbb-<module>>; the message is rendered as is
  { selector: 'sbb-<module>', message: 'FIXME: <sbb-module> has no counterpart in lyne-angular.' },
  // Symbol: // message above every usage (import included)
  { symbol: 'Sbb<module>Module', importedFrom: '@sbb-esta/angular/<module>', message: '...' },
];

const types: TypeMigration[] = [
  {
    from: 'Sbb<module>List',
    to: 'Sbb<module>Group',
    // Optional guard; list the legacy and the new path, because the import path migration can run first.
    importedFrom: ['@sbb-esta/angular/<module>', '@sbb-esta/lyne-angular/<module>'],
  },
];

const selectors: SelectorMigration[] = [
  // <button sbb-<module>>x</button> → <sbb-<module>>x</sbb-<module>>
  { selector: 'button[sbb-<module>]', replaceWith: 'sbb-<module>' },
];

const attributes: AttributeMigration[] = [
  {
    selector: 'sbb-<module>',
    attribute: 'svgIcon',
    replaceWith: 'iconName',
  },
];

export function createModuleMigrationRule1(scope?: MigrationScope): Rule {
  // custom rule #1
}

export function createModuleMigrationRule2(scope?: MigrationScope): Rule {
  // custom rule #2
}

/**
 * Migrate the button module from `@sbb-esta/angular` to `@sbb-esta/lyne-angular`.
 */
export const MODULE_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  selectors,
  attributes,
  customRules: [
    (scope: MigrationScope) => createModuleMigrationRule1(scope),
    (scope: MigrationScope) => createModuleMigrationRule2(scope),
  ],
};
```

Template-based custom rules should build on `createTemplateMigrationRule()` from `./template-migration.cjs`,
which provides the element traversal and applies the collected `MigrationEdit`s.

### 2. Register in orchestrator

Update `index.cts`:

```typescript
import { MODULE_MIGRATIONS } from './modules/<module>.cjs';

const MODULE_REGISTRY: Record<string, Partial<ModuleMigrations>> = {
  ...,
  <module>: MODULE_MIGRATIONS,
  ...,
}
```

### 3. Test your module migration

Create `test/<module-name>.spec.ts`;
to test the module in isolation, the rule chain must be rewritten passing the module's data.

The `MigrateLegacyTestUtils` class can be used to easily test a rule on an `HTML`/`TS` file;
it also handles the schematic and the test runner creation.

```ts
describe('sbb-<module>', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, attributes, selectors, customRules } = MODULE_MIGRATIONS;
    const scope = { root: '', excludedRoots: [] };
    return chain([
      createImportPathMigrationRule(importPaths, scope),
      createCommentMigrationRule(comments, scope),
      createTypeMigrationRule(types, scope),
      createAttributeMigrationRule(attributes, scope),
      createTemplateSelectorMigrationRule(selectors, scope),
      ...customRules.map((ruleFactory) => ruleFactory(scope)),
    ]);
  };

  describe('should migrate', () => {
    it('...', async () => {
      const migrated = await MigrateLegacyTestUtils.migrateHtmlFile(
        '<sbb-<module>></sbb-<module>>',
        defaultMigration,
      );
      const expected = '...';
      expect(migrated).toBe(expected);
    });
  });

  it('for inline selector and symbols', async () => {
    const migrated = await MigrateLegacyTestUtils.migrateTsFile(
      [
        "import { Component } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        "  template: '<sbb-<module>></sbb-<module>>',",
        '})',
        'export class AppComponent {}',
      ].join('\n'),
      defaultMigration,
    );

    const expected = ['...'].join('\n');

    expect(migrated).toBe(expected);
  });
});
```

## Usage

```bash
# Install lyne-angular with automatic setup
ng add @sbb-esta/lyne-angular

# Migrate all modules
ng generate @sbb-esta/lyne-angular:migrate-legacy

# Migrate specific project (for multi-application workspace).
ng generate @sbb-esta/lyne-angular:migrate-legacy --project my-project

# Migrate specific modules
ng generate @sbb-esta/lyne-angular:migrate-legacy --module button
ng generate @sbb-esta/lyne-angular:migrate-legacy --module button checkbox

# Usage with both parameters
ng generate @sbb-esta/lyne-angular:migrate-legacy --project my-project --module button
```

## Implementation Checklist

For each module, use this checklist:

- [ ] Create `modules/<module>.cts` with `<MODULE>_MIGRATIONS` object
  - [ ] Change import path
  - [ ] Manual migration comments
  - [ ] Type renames
  - [ ] Attribute renames
  - [ ] Template selector updates
  - [ ] Custom rules (can be built on `createTemplateMigrationRule(...)`)
- [ ] Register in `index.cts` registry
- [ ] Create test file: `test/<module>.spec.ts`

## Notes

- Each module's migration is isolated and can be run independently
- Only the files of the selected `--project` are migrated: `index.cts` resolves a `MigrationScope` (project root, minus nested projects) via `getProjectScope()`, which is applied to every rule.
- Migrations are idempotent (safe to run multiple times)
- `node_modules` and `*.d.ts` files are never migrated
- Templates which cannot be parsed, and elements without a closing tag, are skipped instead of being corrupted
- Edits are collected as `MigrationEdit`s and applied in reverse offset order, so offsets stay stable; every edit can carry a `log` callback
