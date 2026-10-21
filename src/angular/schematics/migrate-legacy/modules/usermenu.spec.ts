import { describe, expect, it } from 'vitest';

import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { migrateUsermenu } from './usermenu.cjs';

describe('sbb-usermenu', () => {
  const defaultMigration = migrateUsermenu({ root: '', excludedRoots: [] });

  describe('should add comments', () => {
    it('for selector', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-usermenu></sbb-usermenu>',
          defaultMigration,
        ),
      ).toContain(
        "FIXME: this component has no direct counterpart in lyne-angular; you can replace it with a 'sbb-header-button' adapting its properties.",
      );
    });

    it('for inline selector and symbols', async () => {
      const source = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          "import { SbbUsermenuModule } from '@sbb-esta/angular/captcha';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  imports: [SbbUsermenuModule],',
          "  template: '<sbb-usermenu></sbb-usermenu>',",
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        defaultMigration,
      );

      const content = [
        "import { Component } from '@angular/core';",
        '// FIXME: this component has no direct counterpart in lyne-angular.',
        "import { SbbUsermenuModule } from '@sbb-esta/angular/captcha';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  // FIXME: this component has no direct counterpart in lyne-angular.',
        '  imports: [SbbUsermenuModule],',
        "  // FIXME: this component has no direct counterpart in lyne-angular; you can replace it with a 'sbb-header-button' adapting its properties.",
        "  template: '<sbb-usermenu></sbb-usermenu>',",
        '})',
        'export class AppComponent {}',
      ].join('\n');

      expect(source).toBe(content);
    });
  });
});
