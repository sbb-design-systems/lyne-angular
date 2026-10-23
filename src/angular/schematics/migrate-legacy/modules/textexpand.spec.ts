import { describe, expect, it } from 'vitest';

import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { migrateTextexpand } from './textexpand.cjs';

describe('sbb-textexpand', () => {
  const defaultMigration = migrateTextexpand({ root: '', excludedRoots: [] });

  describe('should add comments', () => {
    it('for selector', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-textexpand></sbb-textexpand>',
          defaultMigration,
        ),
      ).toContain('FIXME: this component has no direct counterpart in lyne-angular.');
    });

    it('for inline selector and symbols', async () => {
      const source = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          "import { SbbTextexpandModule } from '@sbb-esta/angular/captcha';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  imports: [SbbTextexpandModule],',
          "  template: '<sbb-textexpand></sbb-textexpand>',",
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        defaultMigration,
      );

      const content = [
        "import { Component } from '@angular/core';",
        '// FIXME: this component has no direct counterpart in lyne-angular.',
        "import { SbbTextexpandModule } from '@sbb-esta/angular/captcha';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  // FIXME: this component has no direct counterpart in lyne-angular.',
        '  imports: [SbbTextexpandModule],',
        '  // FIXME: this component has no direct counterpart in lyne-angular.',
        "  template: '<sbb-textexpand></sbb-textexpand>',",
        '})',
        'export class AppComponent {}',
      ].join('\n');

      expect(source).toBe(content);
    });
  });
});
