import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { HostTree, type Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import type { ImportRewriteOptions, MigrationScope } from '../../utils.cjs';

import { createImportPathMigrationRule, rewriteImportPaths } from './import-path-migration.cjs';

describe('sbb-import-path-migration', () => {
  const tempCollectionPath = path.join(
    os.tmpdir(),
    'lyne-angular-import-path-migration-collection.json',
  );
  fs.writeFileSync(tempCollectionPath, JSON.stringify({ schematics: {} }));

  const runner = new SchematicTestRunner('test', tempCollectionPath);

  const mappings: ImportRewriteOptions[] = [
    { oldImport: '@sbb-esta/angular/button', newImport: '@sbb-esta/lyne-angular/button' },
    { oldImport: '@sbb-esta/angular', newImport: '@sbb-esta/lyne-angular' },
  ];

  const migrate = async (
    files: Record<string, string>,
    options: ImportRewriteOptions | ImportRewriteOptions[] = mappings,
  ): Promise<Tree> => {
    const tree = new UnitTestTree(new HostTree());
    for (const [filePath, content] of Object.entries(files)) {
      tree.create(filePath, content);
    }
    return firstValueFrom(runner.callRule(createImportPathMigrationRule(options), tree));
  };

  describe('rewriteImportPaths function', () => {
    it('should rewrite exact import paths correctly', () => {
      const source = "import { SbbButtonModule } from '@sbb-esta/angular/button';";
      const result = rewriteImportPaths('/src/app/app.component.ts', source, mappings);

      expect(result).toBe("import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';");
    });

    it('should rewrite sub-paths correctly', () => {
      const source = "import { SbbButton } from '@sbb-esta/angular/button/button';";
      const result = rewriteImportPaths('/src/app/app.component.ts', source, mappings);

      expect(result).toBe("import { SbbButton } from '@sbb-esta/lyne-angular/button';");
    });

    it('should rewrite export declarations as well as imports', () => {
      const source = "export { SbbButtonModule } from '@sbb-esta/angular/button';";
      const result = rewriteImportPaths('/src/app/app.component.ts', source, mappings);

      expect(result).toBe("export { SbbButtonModule } from '@sbb-esta/lyne-angular/button';");
    });

    it('should preserve original quote styles (single and double quotes)', () => {
      const sourceDouble = 'import { SbbButton } from "@sbb-esta/angular/button";';
      const resultDouble = rewriteImportPaths('/src/app/app.component.ts', sourceDouble, mappings);

      expect(resultDouble).toBe('import { SbbButton } from "@sbb-esta/lyne-angular/button";');
    });

    it('should return original content if no mappings match', () => {
      const source = "import { Component } from '@angular/core';";
      const result = rewriteImportPaths('/src/app/app.component.ts', source, mappings);

      expect(result).toBe(source);
    });

    it('should handle empty mappings list', () => {
      const source = "import { SbbButton } from '@sbb-esta/angular/button';";
      const result = rewriteImportPaths('/src/app/app.component.ts', source, []);

      expect(result).toBe(source);
    });
  });

  describe('schematic rule', () => {
    it('should update import paths across TypeScript files in the tree', async () => {
      const tree = await migrate(
        {
          '/src/app/app.component.ts': "import { SbbButton } from '@sbb-esta/angular/button';",
          '/src/app/app.module.ts': "import { SbbCore } from '@sbb-esta/angular';",
        },
        mappings,
      );

      expect(tree.read('/src/app/app.component.ts')!.toString('utf-8')).toBe(
        "import { SbbButton } from '@sbb-esta/lyne-angular/button';",
      );
      expect(tree.read('/src/app/app.module.ts')!.toString('utf-8')).toBe(
        "import { SbbCore } from '@sbb-esta/lyne-angular';",
      );
    });

    it('should ignore non-TypeScript files and declaration files', async () => {
      const source = "import { SbbButton } from '@sbb-esta/angular/button';";
      const tree = await migrate(
        {
          '/src/app/app.component.html': source,
          '/src/app/app.d.ts': source,
          '/node_modules/lib/index.ts': source,
        },
        mappings,
      );

      expect(tree.read('/src/app/app.component.html')!.toString('utf-8')).toBe(source);
      expect(tree.read('/src/app/app.d.ts')!.toString('utf-8')).toBe(source);
      expect(tree.read('/node_modules/lib/index.ts')!.toString('utf-8')).toBe(source);
    });
  });

  describe('project scope', () => {
    const scope: MigrationScope = {
      root: 'projects/app-a',
      excludedRoots: ['projects/app-a/lib'],
    };
    const scopedDirs = ['projects/app-a/src', 'projects/app-a/lib/src', 'projects/app-b/src'];

    /** Creates the same file in the scoped project, a nested project and a sibling project. */
    const createScopedTree = (fileName: string, content: string): UnitTestTree => {
      const tree = new UnitTestTree(new HostTree());
      for (const scopedDir of scopedDirs) {
        tree.create(`/${scopedDir}/${fileName}`, content);
      }
      return tree;
    };

    /** Asserts that only the file of the scoped project changed. */
    const expectOnlyScopedFile = (
      tree: Tree,
      fileName: string,
      original: string,
      assert: (content: string) => void,
    ): void => {
      assert(tree.readText(`/projects/app-a/src/${fileName}`));
      expect(tree.readText(`/projects/app-a/lib/src/${fileName}`)).toBe(original);
      expect(tree.readText(`/projects/app-b/src/${fileName}`)).toBe(original);
    };

    it('should only rewrite the imports of the given scope', async () => {
      const source = "import { SbbButtonModule } from '@sbb-esta/angular/button';";
      const tree = createScopedTree('app.component.ts', source);

      await firstValueFrom(runner.callRule(createImportPathMigrationRule(mappings, scope), tree));

      expectOnlyScopedFile(tree, 'app.component.ts', source, (content) =>
        expect(content).toBe("import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';"),
      );
    });
  });
});
