import { chain, type Rule } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { STATUS_MIGRATIONS, statusMessageMigration } from './status.cjs';

describe('sbb-status', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, attributes } = STATUS_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createAttributeMigrationRule(attributes),
      statusMessageMigration(),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('import paths', () => {
    it('should rewrite status imports', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbStatusModule } from '@sbb-esta/angular/status';",
          "import { SbbIconModule } from '@sbb-esta/angular/icon';",
        ].join('\n'),
      );

      expect(content).toContain("import { SbbStatusModule } from '@sbb-esta/lyne-angular/status';");
      expect(content).toContain("from '@sbb-esta/angular/icon';");
    });
  });

  describe('type', () => {
    it('should rename valid to success', async () => {
      expect(await migrateTemplate('<sbb-status type="valid"></sbb-status>')).toBe(
        '<sbb-status type="success"></sbb-status>',
      );
    });

    it('should rename invalid to error', async () => {
      expect(await migrateTemplate('<sbb-status type="invalid"></sbb-status>')).toBe(
        '<sbb-status type="error"></sbb-status>',
      );
    });

    it('should rename a bound literal', async () => {
      expect(await migrateTemplate(`<sbb-status [type]="'valid'"></sbb-status>`)).toBe(
        '<sbb-status type="success"></sbb-status>',
      );
    });

    it('should keep other types', async () => {
      const template = '<sbb-status type="warning"></sbb-status>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });

  describe('message', () => {
    it('should move a static message into the content', async () => {
      expect(await migrateTemplate('<sbb-status message="Text"></sbb-status>')).toBe(
        '<sbb-status>Text</sbb-status>',
      );
    });

    it('should move a bound message into the content', async () => {
      expect(await migrateTemplate('<sbb-status [message]="msg"></sbb-status>')).toBe(
        '<sbb-status>{{ msg }}</sbb-status>',
      );
    });

    it('should keep other attributes', async () => {
      expect(await migrateTemplate('<sbb-status type="valid" message="Text"></sbb-status>')).toBe(
        '<sbb-status type="success">Text</sbb-status>',
      );
    });

    it('should handle a self-closing tag', async () => {
      expect(await migrateTemplate('<sbb-status type="warning" message="Text" />')).toBe(
        '<sbb-status type="warning">Text</sbb-status>',
      );
    });
  });
});
