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

- **`schema.json` / `schema.d.ts`**
  CLI schema definition

## Adding a Custom Module Migration

### 1. Create migration file

Create `modules/<module-name>.cts`:

```typescript
import { Rule, Tree } from '@angular-devkit/schematics';

import { rewriteImportPaths } from '../../utils.cjs';

const OLD_IMPORT = '@sbb-esta/angular/<module>';
const NEW_IMPORT = '@sbb-esta/lyne-angular/<module>';

/**
 * Migrate <Module> module from @sbb-esta/angular to @sbb-esta/lyne-angular.
 */
export function migrate<Module>(): Rule {
  return (tree: Tree) => {
    tree.visit((filePath) => {
      // do stuff
    });
  };
}
```

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

Create `test/modules/<module-name>.spec.ts` using the `SchematicTestRunner` pattern from `migrate-legacy.spec.ts`.

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
  - [ ] Change import path (using `rewriteImportPaths()`)
  - [ ] Component class renames
  - [ ] Template selector updates
  - [ ] Input/output binding renames
  - [ ] CSS class/token updates
  - [ ] Manual migration comments
- [ ] Register in `index.cts` switch statement
- [ ] Create test file: `test/modules/<module>.spec.ts`

## Notes

- Migrations run AFTER dependency setup and theme configuration
- Each module's migration is isolated and can be run independently
- Migrations are idempotent (safe to run multiple times)
- Use `tree.visit()` to iterate and modify source files
- Reuse `rewriteImportPaths()` from utils for common import path transformations
- For complex transformations, extend the TypeScript AST visitor pattern used in shared utils
