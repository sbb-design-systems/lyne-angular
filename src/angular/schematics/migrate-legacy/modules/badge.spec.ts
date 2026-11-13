import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { BADGE_MIGRATIONS, DEPRECATED_BADGE_ATTRIBUTES } from './badge.cjs';

describe('sbb-badge', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, attributes } = BADGE_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createAttributeMigrationRule(attributes),
    ]);
  };

  describe('should migrate', () => {
    it('should migrate imports', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        "import { SbbBadgeModule } from '@sbb-esta/angular/badge';",
        defaultMigration,
      );

      expect(content).toContain("import { SbbBadgeModule } from '@sbb-esta/lyne-angular/badge';");
    });

    it.each(DEPRECATED_BADGE_ATTRIBUTES)('should add comment for %s', async (attribute) => {
      const content = await MigrateLegacyTestUtils.migrateHtmlFile(
        `<h3 sbbBadge="4" [${attribute}]="true">Text with a badge</h3>`,
        defaultMigration,
      );
      expect(content).toContain(
        `<!-- FIXME: the attribute \`${attribute}\` does not exist anymore. -->`,
      );
    });
    it('should add comments for sbbBadgePosition', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<h3 sbbBadge="4" sbbBadgePosition="above">Text with a badge</h3>',
          defaultMigration,
        ),
      ).toContain(
        '<!-- FIXME: the `sbbBadgePosition` attribute now accepts only `before` and `after`. -->',
      );
    });

    it('should migrate attribute', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<h3 sbbBadge="4">Text with a badge</h3>',
          defaultMigration,
        ),
      ).toBe('<h3 sbb-badge="4">Text with a badge</h3>');
    });

    it('should migrate in inline templates', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  template: \'<button sbbBadge="1" [sbbBadgeDisabled]="true">Go</button>\',',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        defaultMigration,
      );

      expect(content).toContain(
        '// FIXME: the attribute `sbbBadgeDisabled` does not exist anymore.',
      );
      expect(content).toContain('<button sbb-badge="1" [sbbBadgeDisabled]="true">Go</button>');
    });
  });
});
