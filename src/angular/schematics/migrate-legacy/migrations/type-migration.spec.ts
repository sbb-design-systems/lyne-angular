import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { HostTree } from '@angular-devkit/schematics';
import type { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { createTypeMigrationRule } from './type-migration.cjs';
import type { TypeMigration } from './type-migration.cjs';

describe('sbb-type-migration', () => {
  const tempCollectionPath = path.join(os.tmpdir(), 'lyne-angular-type-migration-collection.json');
  fs.writeFileSync(tempCollectionPath, JSON.stringify({ schematics: {} }));

  const runner = new SchematicTestRunner('test', tempCollectionPath);

  const BREADCRUMBS: TypeMigration[] = [
    { from: 'SbbBreadcrumbs', to: 'SbbBreadcrumbGroup', importedFrom: '@sbb-esta/angular' },
  ];

  const migrate = async (
    files: Record<string, string>,
    migrations: TypeMigration[] = BREADCRUMBS,
  ): Promise<Tree> => {
    const tree = new UnitTestTree(new HostTree());
    for (const [filePath, content] of Object.entries(files)) {
      tree.create(filePath, content);
    }
    return firstValueFrom(runner.callRule(createTypeMigrationRule(migrations), tree));
  };

  const migrateSource = async (
    source: string,
    migrations: TypeMigration[] = BREADCRUMBS,
  ): Promise<string> => {
    const tree = await migrate({ '/src/app/app.component.ts': source }, migrations);
    return tree.read('/src/app/app.component.ts')!.toString('utf-8');
  };

  describe('renaming', () => {
    it('should rename the import and all usages', async () => {
      const result = await migrateSource(
        [
          "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export class AppComponent {',
          '  breadcrumbs?: SbbBreadcrumbs;',
          '  create(): SbbBreadcrumbs {',
          '    return new SbbBreadcrumbs();',
          '  }',
          '}',
        ].join('\n'),
      );

      expect(result).toBe(
        [
          "import { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export class AppComponent {',
          '  breadcrumbs?: SbbBreadcrumbGroup;',
          '  create(): SbbBreadcrumbGroup {',
          '    return new SbbBreadcrumbGroup();',
          '  }',
          '}',
        ].join('\n'),
      );
    });

    it('should rename type-only imports and generic usages', async () => {
      const result = await migrateSource(
        [
          "import type { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export const items: Array<SbbBreadcrumbs> = [];',
          'export type Maybe = SbbBreadcrumbs | null;',
        ].join('\n'),
      );

      expect(result).toContain('import type { SbbBreadcrumbGroup }');
      expect(result).toContain('Array<SbbBreadcrumbGroup>');
      expect(result).toContain('SbbBreadcrumbGroup | null');
    });

    it('should rename usages in decorators and viewChild queries', async () => {
      const result = await migrateSource(
        [
          "import { ViewChild } from '@angular/core';",
          "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export class AppComponent {',
          '  @ViewChild(SbbBreadcrumbs) breadcrumbs!: SbbBreadcrumbs;',
          '}',
        ].join('\n'),
      );

      expect(result).toContain('@ViewChild(SbbBreadcrumbGroup) breadcrumbs!: SbbBreadcrumbGroup;');
    });

    it('should rename a re-export', async () => {
      expect(
        await migrateSource("export { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';"),
      ).toBe("export { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';");
    });

    it('should rename a local re-export of an imported symbol', async () => {
      const result = await migrateSource(
        [
          "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export { SbbBreadcrumbs };',
        ].join('\n'),
      );

      expect(result).toBe(
        [
          "import { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export { SbbBreadcrumbGroup };',
        ].join('\n'),
      );
    });

    it('should rename namespace usages', async () => {
      const result = await migrateSource(
        [
          "import * as sbb from '@sbb-esta/angular/breadcrumb';",
          '',
          'export const x: sbb.SbbBreadcrumbs | null = null;',
          'export const y: sbb.SbbBreadcrumb | null = null;',
        ].join('\n'),
      );

      expect(result).toContain('sbb.SbbBreadcrumbGroup | null');
      expect(result).toContain('sbb.SbbBreadcrumb | null');
    });

    it('should only rename the imported name of an aliased import', async () => {
      const result = await migrateSource(
        [
          "import { SbbBreadcrumbs as Legacy } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export const x: Legacy | null = null;',
        ].join('\n'),
      );

      expect(result).toBe(
        [
          "import { SbbBreadcrumbGroup as Legacy } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export const x: Legacy | null = null;',
        ].join('\n'),
      );
    });

    it('should support multiple migrations in one file', async () => {
      const result = await migrateSource(
        [
          "import { SbbBreadcrumbs, SbbBreadcrumb } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export const a: SbbBreadcrumbs | null = null;',
          'export const b: SbbBreadcrumb | null = null;',
        ].join('\n'),
        [
          { from: 'SbbBreadcrumbs', to: 'SbbBreadcrumbGroup' },
          { from: 'SbbBreadcrumb', to: 'SbbBreadcrumbItem' },
        ],
      );

      expect(result).toContain(
        'import { SbbBreadcrumbGroup, SbbBreadcrumbItem } from ' +
          "'@sbb-esta/angular/breadcrumb';",
      );
      expect(result).toContain('export const a: SbbBreadcrumbGroup | null = null;');
      expect(result).toContain('export const b: SbbBreadcrumbItem | null = null;');
    });

    it('should be idempotent', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        '',
        'export const x: SbbBreadcrumbs | null = null;',
      ].join('\n');

      const once = await migrateSource(source);
      expect(await migrateSource(once)).toBe(once);
    });
  });

  describe('safety', () => {
    it('should not touch files without a matching import', async () => {
      const source = [
        "import { SbbBreadcrumbs } from './local-breadcrumbs';",
        '',
        'export const x: SbbBreadcrumbs | null = null;',
      ].join('\n');

      expect(await migrateSource(source)).toBe(source);
    });

    it('should respect the importedFrom filter', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@other/package';",
        '',
        'export const x: SbbBreadcrumbs | null = null;',
      ].join('\n');

      expect(await migrateSource(source)).toBe(source);
    });

    it('should migrate from any module when importedFrom is omitted', async () => {
      const result = await migrateSource(
        [
          "import { SbbBreadcrumbs } from './local-breadcrumbs';",
          '',
          'export const x: SbbBreadcrumbs | null = null;',
        ].join('\n'),
        [{ from: 'SbbBreadcrumbs', to: 'SbbBreadcrumbGroup' }],
      );

      expect(result).toContain("import { SbbBreadcrumbGroup } from './local-breadcrumbs';");
      expect(result).toContain('export const x: SbbBreadcrumbGroup | null = null;');
    });

    it('should not rename member names, object keys or strings', async () => {
      const result = await migrateSource(
        [
          "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export class AppComponent {',
          '  SbbBreadcrumbs = 1;',
          "  name = 'SbbBreadcrumbs';",
          '  config = { SbbBreadcrumbs: true };',
          '  read(host: { SbbBreadcrumbs: number }) {',
          '    return host.SbbBreadcrumbs;',
          '  }',
          '  value: SbbBreadcrumbs | null = null;',
          '}',
        ].join('\n'),
      );

      expect(result).toContain('  SbbBreadcrumbs = 1;');
      expect(result).toContain("  name = 'SbbBreadcrumbs';");
      expect(result).toContain('  config = { SbbBreadcrumbs: true };');
      expect(result).toContain('host: { SbbBreadcrumbs: number }');
      expect(result).toContain('return host.SbbBreadcrumbs;');
      // Only the real type usage and the import are migrated.
      expect(result).toContain('  value: SbbBreadcrumbGroup | null = null;');
      expect(result).toContain('import { SbbBreadcrumbGroup }');
    });

    it('should skip shorthand properties', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        '',
        'export const registry = { SbbBreadcrumbs };',
      ].join('\n');

      const result = await migrateSource(source);
      // The import is migrated, the shorthand stays untouched and is reported.
      expect(result).toContain('import { SbbBreadcrumbGroup }');
      expect(result).toContain('export const registry = { SbbBreadcrumbs };');
    });

    it('should not touch node_modules or declaration files', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        'export declare const x: SbbBreadcrumbs;',
      ].join('\n');

      const tree = await migrate({
        '/node_modules/some-lib/index.ts': source,
        '/src/app/app.d.ts': source,
      });

      expect(tree.read('/node_modules/some-lib/index.ts')!.toString('utf-8')).toBe(source);
      expect(tree.read('/src/app/app.d.ts')!.toString('utf-8')).toBe(source);
    });

    it('should not touch html files', async () => {
      const template = '<sbb-breadcrumbs>SbbBreadcrumbs</sbb-breadcrumbs>';
      const tree = await migrate({ '/src/app/app.component.html': template });
      expect(tree.read('/src/app/app.component.html')!.toString('utf-8')).toBe(template);
    });
  });
});
