import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { PAGINATOR_MIGRATIONS } from './paginator.cjs';

describe('sbb-paginator', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, selectors } = PAGINATOR_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
      createTemplateSelectorMigrationRule(selectors),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('typescript', () => {
    it('should rewrite the import path and rename the module', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbPaginationModule } from '@sbb-esta/angular/pagination';",
          'export const m = SbbPaginationModule;',
        ].join('\n'),
      );
      expect(content).toContain(
        "import { SbbPaginatorModule } from '@sbb-esta/lyne-angular/paginator';",
      );
      expect(content).toContain('export const m = SbbPaginatorModule;');
    });

    it('should rename SbbPageEvent and drop its import', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbPageEvent } from '@sbb-esta/angular/pagination';",
          'export function onPage(event: SbbPageEvent) {}',
        ].join('\n'),
      );
      expect(content).toContain('export function onPage(event: SbbPaginatorPageEvent) {}');
      expect(content).not.toContain('import');
    });

    it('should comment SBB_PAGINATOR_DEFAULT_OPTIONS', async () => {
      const content = await migrateTsFile(
        [
          `import { SBB_PAGINATOR_DEFAULT_OPTIONS } from '@sbb-esta/angular/pagination';`,
          `export const x = SBB_PAGINATOR_DEFAULT_OPTIONS;`,
        ].join('\n'),
      );
      expect(content).toContain('// FIXME');
    });
  });

  describe('templates', () => {
    it('should comment sbb-navigation', async () => {
      expect(
        await migrateTemplate('<sbb-navigation [nextPage]="n" (pageChange)="c($event)" />'),
      ).toContain('FIXME: the old `sbb-navigation` does not exist anymore.');
    });

    it('should add the old default page size', async () => {
      expect(await migrateTemplate('<sbb-paginator [length]="l"></sbb-paginator>')).toBe(
        '<sbb-paginator [pageSize]="50" [length]="l"></sbb-paginator>',
      );
    });

    it.each([
      '<sbb-paginator [pageSize]="s"></sbb-paginator>',
      '<sbb-paginator pageSize="20"></sbb-paginator>',
    ])('should keep an existing page size: %s', async (template) => {
      expect(await migrateTemplate(template)).toBe(template);
    });
  });
});
