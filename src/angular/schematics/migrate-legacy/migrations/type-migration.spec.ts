import { describe, expect, it } from 'vitest';

import type { TypeMigration } from '../common.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { createTypeMigrationRule } from './type-migration.cjs';

describe('sbb-type-migration', () => {
  const BREADCRUMBS: TypeMigration[] = [
    { from: 'SbbBreadcrumbs', to: 'SbbBreadcrumbGroup', importedFrom: '@sbb-esta/angular' },
  ];
  const defaultMigrationType = createTypeMigrationRule(BREADCRUMBS);

  describe('renaming', () => {
    it('should rename the import and all usages', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
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
        defaultMigrationType,
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
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import type { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export const items: Array<SbbBreadcrumbs> = [];',
          'export type Maybe = SbbBreadcrumbs | null;',
        ].join('\n'),
        defaultMigrationType,
      );

      expect(result).toContain('import type { SbbBreadcrumbGroup }');
      expect(result).toContain('Array<SbbBreadcrumbGroup>');
      expect(result).toContain('SbbBreadcrumbGroup | null');
    });

    it('should rename usages in decorators and viewChild queries', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { ViewChild } from '@angular/core';",
          "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export class AppComponent {',
          '  @ViewChild(SbbBreadcrumbs) breadcrumbs!: SbbBreadcrumbs;',
          '}',
        ].join('\n'),
        defaultMigrationType,
      );

      expect(result).toContain('@ViewChild(SbbBreadcrumbGroup) breadcrumbs!: SbbBreadcrumbGroup;');
    });

    it('should support multiple migrations in one file', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { SbbBreadcrumbs, SbbBreadcrumb } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export const a: SbbBreadcrumbs | null = null;',
          'export const b: SbbBreadcrumb | null = null;',
        ].join('\n'),
        createTypeMigrationRule([
          { from: 'SbbBreadcrumbs', to: 'SbbBreadcrumbGroup' },
          { from: 'SbbBreadcrumb', to: 'SbbBreadcrumbItem' },
        ]),
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

      const once = await MigrateLegacyTestUtils.migrateTsFile(source, defaultMigrationType);
      expect(await MigrateLegacyTestUtils.migrateTsFile(once, defaultMigrationType)).toBe(once);
    });
  });

  describe('safety', () => {
    it('should not touch files without a matching import', async () => {
      const source = [
        "import { SbbBreadcrumbs } from './local-breadcrumbs';",
        '',
        'export const x: SbbBreadcrumbs | null = null;',
      ].join('\n');

      expect(await MigrateLegacyTestUtils.migrateTsFile(source, defaultMigrationType)).toBe(source);
    });

    it('should respect the importedFrom filter', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@other/package';",
        '',
        'export const x: SbbBreadcrumbs | null = null;',
      ].join('\n');

      expect(await MigrateLegacyTestUtils.migrateTsFile(source, defaultMigrationType)).toBe(source);
    });

    it('should migrate from any module when importedFrom is omitted', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { SbbBreadcrumbs } from './local-breadcrumbs';",
          '',
          'export const x: SbbBreadcrumbs | null = null;',
        ].join('\n'),
        createTypeMigrationRule([{ from: 'SbbBreadcrumbs', to: 'SbbBreadcrumbGroup' }]),
      );

      expect(result).toContain("import { SbbBreadcrumbGroup } from './local-breadcrumbs';");
      expect(result).toContain('export const x: SbbBreadcrumbGroup | null = null;');
    });

    it('should not rename member names, object keys or strings', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
          '',
          'export class AppComponent {',
          '  SbbBreadcrumbs = 1;',
          "  name = 'SbbBreadcrumbs';",
          '  config = { SbbBreadcrumbs: true };',
          '  value: SbbBreadcrumbs | null = null;',
          '}',
        ].join('\n'),
        defaultMigrationType,
      );

      expect(result).toContain('  SbbBreadcrumbs = 1;');
      expect(result).toContain("  name = 'SbbBreadcrumbs';");
      expect(result).toContain('  config = { SbbBreadcrumbs: true };');
      expect(result).toContain('  value: SbbBreadcrumbGroup | null = null;');
      expect(result).toContain('import { SbbBreadcrumbGroup }');
    });

    it('should not touch node_modules or declaration files', async () => {
      const source = [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        'export declare const x: SbbBreadcrumbs;',
      ].join('\n');

      const tree = await MigrateLegacyTestUtils.migrateFiles(
        {
          '/node_modules/some-lib/index.ts': source,
          '/src/app/app.d.ts': source,
        },
        defaultMigrationType,
      );

      expect(tree.read('/node_modules/some-lib/index.ts')!.toString('utf-8')).toBe(source);
      expect(tree.read('/src/app/app.d.ts')!.toString('utf-8')).toBe(source);
    });

    it('should not touch html files', async () => {
      const template = '<sbb-breadcrumbs>SbbBreadcrumbs</sbb-breadcrumbs>';
      const content = await MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigrationType);
      expect(content).toBe(template);
    });
  });

  describe('name conflicts', () => {
    it('should drop the legacy specifier when the new symbol is already imported', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { SbbBreadcrumbs, SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
          'export const a: SbbBreadcrumbs | SbbBreadcrumbGroup = null!;',
        ].join('\n'),
        defaultMigrationType,
      );

      expect(result).toBe(
        [
          "import { SbbBreadcrumbGroup } from '@sbb-esta/angular/breadcrumb';",
          'export const a: SbbBreadcrumbGroup | SbbBreadcrumbGroup = null!;',
        ].join('\n'),
      );
    });
  });
});
