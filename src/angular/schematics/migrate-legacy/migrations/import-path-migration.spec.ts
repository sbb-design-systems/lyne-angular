import type { Rule } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import type { ImportRewriteOptions } from '../common.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { createImportPathMigrationRule } from './import-path-migration.cjs';

describe('sbb-import-path-migration', () => {
  const mappings: ImportRewriteOptions[] = [
    { oldImport: '@sbb-esta/angular/button', newImport: '@sbb-esta/lyne-angular/button' },
    { oldImport: '@sbb-esta/angular/core', newImport: '@sbb-esta/lyne-angular/core' },
  ];
  const defaultPathRule: Rule = createImportPathMigrationRule(mappings);

  describe('schematic rule', () => {
    it('should update import paths across TypeScript files in the tree', async () => {
      const tree = await MigrateLegacyTestUtils.migrateFiles(
        {
          '/src/app/app.component.ts': "import { SbbButton } from '@sbb-esta/angular/button';",
          '/src/app/app.module.ts': "import { SbbCore } from '@sbb-esta/angular/core';",
        },
        defaultPathRule,
      );

      expect(tree.readText('/src/app/app.component.ts')).toBe(
        "import { SbbButton } from '@sbb-esta/lyne-angular/button';",
      );
      expect(tree.readText('/src/app/app.module.ts')).toBe(
        "import { SbbCore } from '@sbb-esta/lyne-angular/core';",
      );
    });

    it('should ignore non-TypeScript files, declaration files and node_modules', async () => {
      const source = "import { SbbButton } from '@sbb-esta/angular/button';";
      const tree = await MigrateLegacyTestUtils.migrateFiles(
        {
          '/src/app/app.component.html': source,
          '/src/app/app.d.ts': source,
          '/node_modules/lib/index.ts': source,
        },
        defaultPathRule,
      );

      expect(tree.readText('/src/app/app.component.html')).toBe(source);
      expect(tree.readText('/src/app/app.d.ts')).toBe(source);
      expect(tree.readText('/node_modules/lib/index.ts')).toBe(source);
    });
  });
});
