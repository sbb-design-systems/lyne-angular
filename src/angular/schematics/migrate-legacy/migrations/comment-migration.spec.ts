import { describe, expect, it } from 'vitest';

import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { type CommentMigration, createCommentMigrationRule } from './comment-migration.cjs';

describe('sbb-comment-migration', () => {
  const CAPTCHA: CommentMigration[] = [
    {
      selector: 'sbb-captcha',
      message: 'FIXME: sbb-captcha has no Lyne counterpart.',
    },
  ];
  const basicMigrationRule = createCommentMigrationRule(CAPTCHA);

  describe('elements in external templates', () => {
    it('should add a FIXME comment above the element', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          ['<div>', '  <sbb-captcha></sbb-captcha>', '</div>'].join('\n'),
          basicMigrationRule,
        ),
      ).toBe(
        [
          '<div>',
          '  <!-- FIXME: sbb-captcha has no Lyne counterpart. -->',
          '  <sbb-captcha></sbb-captcha>',
          '</div>',
        ].join('\n'),
      );
    });

    it('should render the message as is', async () => {
      const template = '<sbb-captcha></sbb-captcha>';

      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          template,
          createCommentMigrationRule([{ selector: 'sbb-captcha', message: 'Plain message.' }]),
        ),
      ).toBe(`<!-- Plain message. -->\n${template}`);
    });

    it('should render multiline messages', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-captcha></sbb-captcha>',
          createCommentMigrationRule([
            {
              selector: 'sbb-captcha',
              message: 'FIXME: First line.\nSecond line.',
            },
          ]),
        ),
      ).toBe(
        [
          '<!-- FIXME: First line. -->',
          '<!--  Second line. -->',
          '<sbb-captcha></sbb-captcha>',
        ].join('\n'),
      );
    });

    it('should comment every matching element and support attribute selectors', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          [
            '<sbb-captcha></sbb-captcha>',
            '<div>',
            '  <button sbb-lightbox>x</button>',
            '</div>',
          ].join('\n'),
          createCommentMigrationRule([
            ...CAPTCHA,
            {
              selector: '[sbb-lightbox]',
              message: 'TODO: Lightbox is not available.',
            },
          ]),
        ),
      ).toBe(
        [
          '<!-- FIXME: sbb-captcha has no Lyne counterpart. -->',
          '<sbb-captcha></sbb-captcha>',
          '<div>',
          '  <!-- TODO: Lightbox is not available. -->',
          '  <button sbb-lightbox>x</button>',
          '</div>',
        ].join('\n'),
      );
    });

    it('should add each message only once per line', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-captcha></sbb-captcha><sbb-captcha></sbb-captcha>',
          createCommentMigrationRule([
            ...CAPTCHA,
            { selector: 'sbb-captcha', message: 'TODO: Second hint.' },
          ]),
        ),
      ).toBe(
        [
          '<!-- FIXME: sbb-captcha has no Lyne counterpart. -->',
          '<!-- TODO: Second hint. -->',
          '<sbb-captcha></sbb-captcha><sbb-captcha></sbb-captcha>',
        ].join('\n'),
      );
    });

    it('should be idempotent', async () => {
      const once = await MigrateLegacyTestUtils.migrateHtmlFile(
        '<div>\n  <sbb-captcha></sbb-captcha>\n</div>',
        basicMigrationRule,
      );
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(once, basicMigrationRule)).toBe(once);
    });

    it('should comment elements inside control flow blocks', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          ['@if (show) {', '  <sbb-captcha />', '}'].join('\n'),
          basicMigrationRule,
        ),
      ).toBe(
        [
          '@if (show) {',
          '  <!-- FIXME: sbb-captcha has no Lyne counterpart. -->',
          '  <sbb-captcha />',
          '}',
        ].join('\n'),
      );
    });
  });

  describe('attributes', () => {
    const MODE: CommentMigration[] = [
      {
        selector: 'sbb-button',
        attribute: 'mode',
        message: 'FIXME: mode has been removed.',
      },
    ];

    it('should comment static attributes, inputs and outputs', async () => {
      const expected = (tag: string) => `<!-- FIXME: mode has been removed. -->\n${tag}`;

      for (const tag of [
        '<sbb-button mode="ghost"></sbb-button>',
        '<sbb-button [mode]="m"></sbb-button>',
        '<sbb-button (mode)="m()"></sbb-button>',
        '<sbb-button [(mode)]="m"></sbb-button>',
      ]) {
        expect(
          await MigrateLegacyTestUtils.migrateHtmlFile(tag, createCommentMigrationRule(MODE)),
        ).toBe(expected(tag));
      }
    });
  });

  describe('inline templates', () => {
    it('should add a // comment above the template property', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  template: `',
          '    <sbb-captcha></sbb-captcha>',
          '  `,',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        basicMigrationRule,
      );

      expect(result).toBe(
        [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  // FIXME: sbb-captcha has no Lyne counterpart.',
          '  template: `',
          '    <sbb-captcha></sbb-captcha>',
          '  `,',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
      );
    });
  });

  describe('symbols', () => {
    it('should comment the import and every usage', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateTsFile(
          [
            "import { SbbCaptchaModule } from '@sbb-esta/angular/captcha';",
            '',
            '@Component({',
            '  imports: [',
            '    SbbCaptchaModule,',
            '  ],',
            '})',
            'export class AppComponent {}',
          ].join('\n'),
          createCommentMigrationRule([
            {
              symbol: 'SbbCaptchaModule',
              importedFrom: '@sbb-esta/angular/captcha',
              message: 'FIXME: SbbCaptchaModule has no Lyne counterpart.',
            },
          ]),
        ),
      ).toBe(
        [
          '// FIXME: SbbCaptchaModule has no Lyne counterpart.',
          "import { SbbCaptchaModule } from '@sbb-esta/angular/captcha';",
          '',
          '@Component({',
          '  imports: [',
          '    // FIXME: SbbCaptchaModule has no Lyne counterpart.',
          '    SbbCaptchaModule,',
          '  ],',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
      );
    });
  });
});
