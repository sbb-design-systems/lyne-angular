import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { HostTree, type Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import type { MigrationScope } from '../../utils.cjs';

import { createTypeMigrationRule, type TypeMigration } from './type-migration.cjs';

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

    it('should handle shorthand properties', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        '',
        'export const registry = { SbbBreadcrumbs };',
      ].join('\n');

      const result = await migrateSource(source);
      // The import is migrated, the shorthand stays untouched and is reported.
      expect(result).toContain('import { SbbBreadcrumbGroup }');
      expect(result).toContain('export const registry = { SbbBreadcrumbs: SbbBreadcrumbGroup };');
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

    it('should ignore local variables and parameters that shadow the imported symbol name', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        '',
        'export function process(SbbBreadcrumbs: string) {',
        '  return SbbBreadcrumbs.toLowerCase();',
        '}',
        '',
        'export class AppComponent {',
        '  test() {',
        '    const SbbBreadcrumbs = "local";',
        '    console.log(SbbBreadcrumbs);',
        '  }',
        '  realUsage: SbbBreadcrumbs | null = null;',
        '}',
      ].join('\n');

      const result = await migrateSource(source);

      // Import and real case should be migrated
      expect(result).toContain(
        "import { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
      );
      expect(result).toContain('realUsage: SbbBreadcrumbGroup | null = null;');

      // Parameter and shadowed local variable should not be touched
      expect(result).toContain('export function process(SbbBreadcrumbs: string)');
      expect(result).toContain('return SbbBreadcrumbs.toLowerCase();');
      expect(result).toContain('const SbbBreadcrumbs = "local";');
      expect(result).toContain('console.log(SbbBreadcrumbs);');
    });

    it('should ignore shadowed symbols inside destructuring parameters and patterns', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        '',
        'export function handle({ SbbBreadcrumbs }: { SbbBreadcrumbs: string }) {',
        '  return SbbBreadcrumbs;',
        '}',
      ].join('\n');

      const result = await migrateSource(source);

      expect(result).toContain(
        "import { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
      );
      // Parameter's key and shadowed destructured identifier should not be touched
      expect(result).toContain(
        'export function handle({ SbbBreadcrumbs }: { SbbBreadcrumbs: string })',
      );
      expect(result).toContain('return SbbBreadcrumbs;');
    });

    it('should ignore loop variables that shadow the imported symbol name', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        '',
        'export function run(values: string[], registry: unknown[]) {',
        '  for (const SbbBreadcrumbs of values) { registry.push({ SbbBreadcrumbs }); }',
        '  for (const SbbBreadcrumbs in registry) { registry.push(SbbBreadcrumbs); }',
        '  for (let SbbBreadcrumbs = 0; SbbBreadcrumbs < 1; SbbBreadcrumbs++) {}',
        '  return registry.push(SbbBreadcrumbs);',
        '}',
      ].join('\n');

      const result = await migrateSource(source);

      expect(result).toContain(
        'for (const SbbBreadcrumbs of values) { registry.push({ SbbBreadcrumbs }); }',
      );
      expect(result).toContain(
        'for (const SbbBreadcrumbs in registry) { registry.push(SbbBreadcrumbs); }',
      );
      expect(result).toContain(
        'for (let SbbBreadcrumbs = 0; SbbBreadcrumbs < 1; SbbBreadcrumbs++) {}',
      );
      // Outside the loops the import is referenced again.
      expect(result).toContain('return registry.push(SbbBreadcrumbGroup);');
    });

    it('should ignore switch-scoped declarations that shadow the imported symbol name', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        '',
        'export function run(mode: number) {',
        '  switch (mode) {',
        '    case 1:',
        '      const SbbBreadcrumbs = "local";',
        '      return SbbBreadcrumbs;',
        '    default:',
        '      return { SbbBreadcrumbs };',
        '  }',
        '}',
        'export const real = SbbBreadcrumbs;',
      ].join('\n');

      const result = await migrateSource(source);

      expect(result).toContain('const SbbBreadcrumbs = "local";');
      expect(result).toContain('return SbbBreadcrumbs;');
      expect(result).toContain('return { SbbBreadcrumbs };');
      expect(result).toContain('export const real = SbbBreadcrumbGroup;');
    });

    it('should ignore the name of a named function expression inside its body', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        '',
        'export const fn = function SbbBreadcrumbs() { return SbbBreadcrumbs; };',
      ].join('\n');

      const result = await migrateSource(source);

      expect(result).toContain('function SbbBreadcrumbs() { return SbbBreadcrumbs; }');
    });

    it('should ignore hoisted var declarations nested in blocks of a function', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        '',
        'export function run(flag: boolean, local: string) {',
        '  console.log(SbbBreadcrumbs);',
        '  if (flag) {',
        '    for (;;) { var SbbBreadcrumbs = local; break; }',
        '  }',
        '  return SbbBreadcrumbs;',
        '}',
        'export const real = SbbBreadcrumbs;',
      ].join('\n');

      const result = await migrateSource(source);

      expect(result).toContain('  console.log(SbbBreadcrumbs);');
      expect(result).toContain('var SbbBreadcrumbs = local;');
      expect(result).toContain('  return SbbBreadcrumbs;');
      expect(result).toContain('export const real = SbbBreadcrumbGroup;');
    });

    it('should keep let and const declarations block-scoped', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        '',
        'export function run(flag: boolean) {',
        '  if (flag) { const SbbBreadcrumbs = 1; console.log(SbbBreadcrumbs); }',
        '  return SbbBreadcrumbs;',
        '}',
      ].join('\n');

      const result = await migrateSource(source);

      expect(result).toContain('const SbbBreadcrumbs = 1; console.log(SbbBreadcrumbs);');
      expect(result).toContain('  return SbbBreadcrumbGroup;');
    });

    it('should not hoist var declarations out of nested functions', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        '',
        'export function run() {',
        '  const inner = () => { if (true) { var SbbBreadcrumbs = 1; } return SbbBreadcrumbs; };',
        '  return SbbBreadcrumbs;',
        '}',
      ].join('\n');

      const result = await migrateSource(source);

      expect(result).toContain('var SbbBreadcrumbs = 1; } return SbbBreadcrumbs; };');
      expect(result).toContain('  return SbbBreadcrumbGroup;');
    });
  });

  describe('name conflicts', () => {
    it('should drop the legacy specifier when the new symbol is already imported', async () => {
      const result = await migrateSource(
        [
          "import { SbbBreadcrumbs, SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
          'export const a: SbbBreadcrumbs | SbbBreadcrumbGroup = null!;',
        ].join('\n'),
      );

      expect(result).toBe(
        [
          "import { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
          'export const a: SbbBreadcrumbGroup | SbbBreadcrumbGroup = null!;',
        ].join('\n'),
      );
    });

    it('should drop the legacy specifier when it is the last one of the list', async () => {
      const result = await migrateSource(
        "import { SbbBreadcrumbGroup, SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
      );

      expect(result).toBe("import { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';");
    });

    it('should drop the whole legacy import when the new symbol is imported elsewhere', async () => {
      const result = await migrateSource(
        [
          "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
          "import { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
          'export const a = { SbbBreadcrumbs };',
        ].join('\n'),
      );

      expect(result).toBe(
        [
          "import { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
          'export const a = { SbbBreadcrumbs: SbbBreadcrumbGroup };',
        ].join('\n'),
      );
    });

    it('should keep a default import when dropping the legacy specifier', async () => {
      const result = await migrateSource(
        [
          "import Default, { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
          "import { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
        ].join('\n'),
      );

      expect(result).toBe(
        [
          "import Default from '@sbb-esta/angular/breadcrumb';",
          "import { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
        ].join('\n'),
      );
    });

    it('should alias the import when the new name is declared locally', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        'class SbbBreadcrumbGroup {}',
        'export const a: SbbBreadcrumbs = new SbbBreadcrumbGroup();',
        'export const b = { SbbBreadcrumbs };',
      ].join('\n');

      const result = await migrateSource(source);

      expect(result).toBe(
        source.replace(
          'import { SbbBreadcrumbs }',
          'import { SbbBreadcrumbGroup as SbbBreadcrumbs }',
        ),
      );
    });

    it('should alias the import when the new name is imported from another module', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        "import { SbbBreadcrumbGroup } from 'other-lib';",
        'export type T = SbbBreadcrumbs | SbbBreadcrumbGroup;',
      ].join('\n');

      const result = await migrateSource(source);

      expect(result).toBe(
        source.replace(
          'import { SbbBreadcrumbs }',
          'import { SbbBreadcrumbGroup as SbbBreadcrumbs }',
        ),
      );
    });

    it('should not conflict for aliased legacy imports', async () => {
      const result = await migrateSource(
        [
          "import { SbbBreadcrumbs as Legacy } from '@sbb-esta/angular/breadcrumb';",
          'class SbbBreadcrumbGroup {}',
        ].join('\n'),
      );

      expect(result).toContain(
        "import { SbbBreadcrumbGroup as Legacy } from '@sbb-esta/angular/breadcrumb';",
      );
    });

    it('should be idempotent after resolving a conflict', async () => {
      const source = [
        "import { SbbBreadcrumbs, SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
        'export type T = SbbBreadcrumbs;',
      ].join('\n');

      const once = await migrateSource(source);
      expect(await migrateSource(once)).toBe(once);
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

    it('should only rename the types of the given scope', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        'export type T = SbbBreadcrumbs;',
      ].join('\n');
      const tree = createScopedTree('app.component.ts', source);

      await firstValueFrom(
        runner.callRule(
          createTypeMigrationRule([{ from: 'SbbBreadcrumbs', to: 'SbbBreadcrumbGroup' }], scope),
          tree,
        ),
      );

      expectOnlyScopedFile(tree, 'app.component.ts', source, (content) => {
        expect(content).toContain(
          "import { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
        );
        expect(content).toContain('export type T = SbbBreadcrumbGroup;');
      });
    });
  });
});
