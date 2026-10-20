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
    { oldImport: '@sbb-esta/angular/core', newImport: '@sbb-esta/lyne-angular/core' },
  ];

  const rewrite = (source: string, options: ImportRewriteOptions[] = mappings) =>
    rewriteImportPaths('/src/app/app.component.ts', source, options);

  const migrate = async (files: Record<string, string>): Promise<Tree> => {
    const tree = new UnitTestTree(new HostTree());
    for (const [filePath, content] of Object.entries(files)) {
      tree.create(filePath, content);
    }
    return firstValueFrom(runner.callRule(createImportPathMigrationRule(mappings), tree));
  };

  describe('rewriteImportPaths function', () => {
    it('should rewrite import paths', () => {
      expect(rewrite("import { SbbButtonModule } from '@sbb-esta/angular/button';")).toBe(
        "import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';",
      );
    });

    it('should rewrite export declarations', () => {
      expect(rewrite("export { SbbButtonModule } from '@sbb-esta/angular/button';")).toBe(
        "export { SbbButtonModule } from '@sbb-esta/lyne-angular/button';",
      );
    });

    it('should rewrite every mapped import and export of a file', () => {
      expect(
        rewrite(
          [
            "import { SbbButton } from '@sbb-esta/angular/button';",
            "import { SbbCore } from '@sbb-esta/angular/core';",
            "import { Component } from '@angular/core';",
            "export * from '@sbb-esta/angular/button';",
          ].join('\n'),
        ),
      ).toBe(
        [
          "import { SbbButton } from '@sbb-esta/lyne-angular/button';",
          "import { SbbCore } from '@sbb-esta/lyne-angular/core';",
          "import { Component } from '@angular/core';",
          "export * from '@sbb-esta/lyne-angular/button';",
        ].join('\n'),
      );
    });

    it('should preserve the quote style', () => {
      expect(rewrite('import { SbbButton } from "@sbb-esta/angular/button";')).toBe(
        'import { SbbButton } from "@sbb-esta/lyne-angular/button";',
      );
    });

    it('should only rewrite exact module paths', () => {
      const source = [
        "import { SbbButton } from '@sbb-esta/angular/button/button';",
        "import { SbbOther } from '@sbb-esta/angular/button-other';",
        "import { SbbRoot } from '@sbb-esta/angular';",
      ].join('\n');

      expect(rewrite(source)).toBe(source);
    });

    it('should return the original content if no mapping matches', () => {
      const source = "import { Component } from '@angular/core';";

      expect(rewrite(source)).toBe(source);
    });

    it('should handle an empty mappings list', () => {
      const source = "import { SbbButton } from '@sbb-esta/angular/button';";

      expect(rewrite(source, [])).toBe(source);
    });
  });

  describe('schematic rule', () => {
    it('should update import paths across TypeScript files in the tree', async () => {
      const tree = await migrate({
        '/src/app/app.component.ts': "import { SbbButton } from '@sbb-esta/angular/button';",
        '/src/app/app.module.ts': "import { SbbCore } from '@sbb-esta/angular/core';",
      });

      expect(tree.readText('/src/app/app.component.ts')).toBe(
        "import { SbbButton } from '@sbb-esta/lyne-angular/button';",
      );
      expect(tree.readText('/src/app/app.module.ts')).toBe(
        "import { SbbCore } from '@sbb-esta/lyne-angular/core';",
      );
    });

    it('should ignore non-TypeScript files, declaration files and node_modules', async () => {
      const source = "import { SbbButton } from '@sbb-esta/angular/button';";
      const tree = await migrate({
        '/src/app/app.component.html': source,
        '/src/app/app.d.ts': source,
        '/node_modules/lib/index.ts': source,
      });

      expect(tree.readText('/src/app/app.component.html')).toBe(source);
      expect(tree.readText('/src/app/app.d.ts')).toBe(source);
      expect(tree.readText('/node_modules/lib/index.ts')).toBe(source);
    });
  });

  describe('project scope', () => {
    const scope: MigrationScope = {
      root: 'projects/app-a',
      excludedRoots: ['projects/app-a/lib'],
    };

    it('should only rewrite the imports of the given scope', async () => {
      const source = "import { SbbButtonModule } from '@sbb-esta/angular/button';";
      const tree = new UnitTestTree(new HostTree());
      for (const dir of ['projects/app-a/src', 'projects/app-a/lib/src', 'projects/app-b/src']) {
        tree.create(`/${dir}/app.component.ts`, source);
      }

      await firstValueFrom(runner.callRule(createImportPathMigrationRule(mappings, scope), tree));

      expect(tree.readText('/projects/app-a/src/app.component.ts')).toBe(
        "import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';",
      );
      expect(tree.readText('/projects/app-a/lib/src/app.component.ts')).toBe(source);
      expect(tree.readText('/projects/app-b/src/app.component.ts')).toBe(source);
    });
  });
});
