import { chain, type Rule } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { addStripedClassMigration, TABLE_MIGRATIONS } from './table.cjs';

describe('sbb-table', () => {
  const defaultMigration: Rule = () =>
    chain([
      createImportPathMigrationRule(TABLE_MIGRATIONS.importPaths),
      addStripedClassMigration(),
    ]);

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('import paths', () => {
    it('should rewrite table imports', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbTableModule } from '@sbb-esta/angular/table';",
          "import { SbbIconModule } from '@sbb-esta/angular/icon';",
        ].join('\n'),
      );

      expect(content).toContain("import { SbbTableModule } from '@sbb-esta/lyne-angular/table';");
      expect(content).toContain("from '@sbb-esta/angular/icon';");
    });
  });

  describe('striped class', () => {
    it('should add the class to table[sbb-table]', async () => {
      expect(await migrateTemplate('<table sbb-table [dataSource]="d"></table>')).toBe(
        '<table class="sbb-table--striped" sbb-table [dataSource]="d"></table>',
      );
    });

    it('should add the class to sbb-table', async () => {
      expect(await migrateTemplate('<sbb-table></sbb-table>')).toBe(
        '<sbb-table class="sbb-table--striped"></sbb-table>',
      );
    });

    it('should append to an existing class', async () => {
      expect(await migrateTemplate('<table sbb-table class="a b"></table>')).toBe(
        '<table sbb-table class="a b sbb-table--striped"></table>',
      );
    });

    it('should fill an empty class', async () => {
      expect(await migrateTemplate('<table sbb-table class=""></table>')).toBe(
        '<table sbb-table class="sbb-table--striped"></table>',
      );
    });

    it('should not add the class twice', async () => {
      const template = '<table sbb-table class="sbb-table--striped"></table>';
      expect(await migrateTemplate(template)).toBe(template);
    });

    it('should keep a bound class and add a static one', async () => {
      expect(await migrateTemplate('<table sbb-table [class.a]="x"></table>')).toBe(
        '<table class="sbb-table--striped" sbb-table [class.a]="x"></table>',
      );
    });

    it('should not touch other tables', async () => {
      const template = '<table class="a"></table><div sbb-table></div>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });
});
