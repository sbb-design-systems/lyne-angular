import { describe, expect, it } from 'vitest';

import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { migrateBadge } from './badge.cjs';

describe('sbb-badge', () => {
  const defaultMigration = migrateBadge({ root: '', excludedRoots: [] });

  describe('should migrate', () => {
    it('should migrate imports', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        "import { SbbBadgeModule } from '@sbb-esta/angular/badge';",
        defaultMigration,
      );

      expect(content).toContain("import { SbbBadgeModule } from '@sbb-esta/lyne-angular/badge';");
    });

    it('should add comments', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<h3 sbbBadge="4" sbbBadgeDescription="Test">Text with a badge</h3>',
          defaultMigration,
        ),
      ).toContain('<!-- FIXME: the attribute `sbbBadgeDescription` does not exist anymore. -->');

      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<h3 sbbBadge="4" [sbbBadgeDisabled]="true">Text with a badge</h3>',
          defaultMigration,
        ),
      ).toContain('<!-- FIXME: the attribute `sbbBadgeDisabled` does not exist anymore. -->');

      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<h3 sbbBadge="4" [sbbBadgeHidden]="true">Text with a badge</h3>',
          defaultMigration,
        ),
      ).toContain('<!-- FIXME: the attribute `sbbBadgeHidden` does not exist anymore. -->');

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
