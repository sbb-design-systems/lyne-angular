import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { CAPTCHA_MIGRATIONS } from './captcha.cjs';

describe('sbb-captcha', () => {
  const defaultMigration: Rule = () =>
    chain([
      createCommentMigrationRule(CAPTCHA_MIGRATIONS.comments, { root: '', excludedRoots: [] }),
    ]);

  describe('should add comments', () => {
    it('for selector', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-captcha></sbb-captcha>',
          defaultMigration,
        ),
      ).toContain('FIXME: this component has no counterpart in lyne-angular.');
    });

    it('for inline selector and symbols', async () => {
      const source = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          "import { SbbCaptchaModule } from '@sbb-esta/angular/captcha';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  imports: [SbbCaptchaModule],',
          "  template: '<sbb-captcha></sbb-captcha>',",
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        defaultMigration,
      );

      const content = [
        "import { Component } from '@angular/core';",
        '// FIXME: this component has no counterpart in lyne-angular.',
        "import { SbbCaptchaModule } from '@sbb-esta/angular/captcha';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  // FIXME: this component has no counterpart in lyne-angular.',
        '  imports: [SbbCaptchaModule],',
        '  // FIXME: this component has no counterpart in lyne-angular.',
        "  template: '<sbb-captcha></sbb-captcha>',",
        '})',
        'export class AppComponent {}',
      ].join('\n');

      expect(source).toBe(content);
    });
  });
});
