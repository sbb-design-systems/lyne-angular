import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { DEPRECATED_ICON_ATTRIBUTES, ICON_MIGRATIONS } from './icon.cjs';

describe('sbb-icon', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, attributes } = ICON_MIGRATIONS;
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

  describe('should migrate', () => {
    it('should rewrite icon imports', async () => {
      const content = await migrateTsFile(
        ["import { SbbIconModule } from '@sbb-esta/angular/icon';"].join('\n'),
      );

      expect(content).toContain("import { SbbIconModule } from '@sbb-esta/lyne-angular/icon';");
    });

    it.each(DEPRECATED_ICON_ATTRIBUTES)('should add a comment for %s', async (attribute) => {
      const content = await migrateTemplate(`<sbb-icon ${attribute}="value"></sbb-icon>`);

      expect(content).toContain(
        `<!-- FIXME: the attribute \`${attribute}\` is not supported by Lyne's \`sbb-icon\`. -->`,
      );
    });

    it('should add a comment for SbbIconRegistry', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbIconRegistry } from '@sbb-esta/angular/icon';",
          'export class AppComponent {',
          '  registry: SbbIconRegistry;',
          '}',
        ].join('\n'),
      );

      expect(content).toContain(
        '// The `SbbIconRegistry` is not available in Lyne. Please check the `mergeConfig` documentation to know how to register namespaces and/or interceptors',
      );
    });

    it('should rename svgIcon to name', async () => {
      expect(await migrateTemplate('<sbb-icon svgIcon="arrow"></sbb-icon>')).toBe(
        '<sbb-icon name="arrow"></sbb-icon>',
      );
      expect(await migrateTemplate('<sbb-icon [svgIcon]="icon"></sbb-icon>')).toBe(
        '<sbb-icon [name]="icon"></sbb-icon>',
      );
    });
  });
});
