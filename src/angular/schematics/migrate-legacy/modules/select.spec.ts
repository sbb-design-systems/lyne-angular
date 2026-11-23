import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { SELECT_MIGRATIONS } from './select.cjs';

describe('sbb-select', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, attributes } = SELECT_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createAttributeMigrationRule(attributes),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  it('should rewrite the import path', async () => {
    const content = await migrateTsFile(
      "import { SbbSelectModule } from '@sbb-esta/angular/select';",
    );
    expect(content).toContain("from '@sbb-esta/lyne-angular/select';");
  });

  describe('attributes', () => {
    it('should rename readonly', async () => {
      expect(await migrateTemplate('<sbb-select readonly></sbb-select>')).toBe(
        '<sbb-select readOnly></sbb-select>',
      );
      expect(await migrateTemplate('<sbb-select [readonly]="r"></sbb-select>')).toBe(
        '<sbb-select [readOnly]="r"></sbb-select>',
      );
    });

    it('should rename the outputs', async () => {
      expect(await migrateTemplate('<sbb-select (opened)="a()" (closed)="b()"></sbb-select>')).toBe(
        '<sbb-select (open)="a()" (close)="b()"></sbb-select>',
      );
    });
  });

  describe('comments', () => {
    it.each([
      'panelClass',
      'sortComparator',
      'errorStateMatcher',
      'canSelectNullableOptions',
      'disableOptionCentering',
    ])('should comment %s', async (attribute) => {
      expect(await migrateTemplate(`<sbb-select [${attribute}]="x"></sbb-select>`)).toBe(
        `<!-- FIXME: '${attribute}' has no counterpart in Lyne. -->\n<sbb-select [${attribute}]="x"></sbb-select>`,
      );
    });

    it('should not comment a plain select', async () => {
      const template = '<sbb-select multiple></sbb-select>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });
});
