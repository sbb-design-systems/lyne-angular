import { describe, expect, it } from 'vitest';

import type { CommentMigration } from '../common.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { createCommentMigrationRule } from './comment-migration.cjs';

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

  describe('elements which do not start their line', () => {
    const LINK: CommentMigration[] = [{ selector: 'a', message: 'FIXME: link.' }];

    it('should not break the tag of the parent when its line starts inside it', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          [
            '<span',
            '  ><a',
            '    [href]="',
            '      url',
            '    "',
            '    target="_blank"',
            '    >{{ label }}</a',
            '  >',
            '</span>',
          ].join('\n'),
          createCommentMigrationRule(LINK),
        ),
      ).toBe(
        [
          '<span',
          '  >',
          '  <!-- FIXME: link. -->',
          '  <a',
          '    [href]="',
          '      url',
          '    "',
          '    target="_blank"',
          '    >{{ label }}</a',
          '  >',
          '</span>',
        ].join('\n'),
      );
    });

    it('should handle a line which starts inside a closing tag', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          ['<b>x</b', '  ><a>y</a>'].join('\n'),
          createCommentMigrationRule(LINK),
        ),
      ).toBe(['<b>x</b', '  >', '  <!-- FIXME: link. -->', '  <a>y</a>'].join('\n'));
    });

    it('should not be confused by quoted `>` and `<` in attribute values', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          ['<span title="a > b" data-x=\'<a\'', '  ><a>y</a></span>'].join('\n'),
          createCommentMigrationRule(LINK),
        ),
      ).toBe(
        [
          '<span title="a > b" data-x=\'<a\'',
          '  >',
          '  <!-- FIXME: link. -->',
          '  <a>y</a></span>',
        ].join('\n'),
      );
    });

    it('should place several messages next to each other', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          ['<span', '  ><a>y</a></span>'].join('\n'),
          createCommentMigrationRule([...LINK, { selector: 'a', message: 'TODO: second.' }]),
        ),
      ).toBe(
        [
          '<span',
          '  >',
          '  <!-- FIXME: link. -->',
          '  <!-- TODO: second. -->',
          '  <a>y</a></span>',
        ].join('\n'),
      );
    });

    it('should be idempotent', async () => {
      const rule = createCommentMigrationRule([
        ...LINK,
        { selector: 'a', message: 'TODO: second.' },
      ]);
      const once = await MigrateLegacyTestUtils.migrateHtmlFile(
        ['<span', '  ><a>y</a></span>'].join('\n'),
        rule,
      );
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(once, rule)).toBe(once);
    });

    it('should keep commenting above the line when the line starts outside of a tag', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          [
            '<p>1 < 2 and text <a>x</a></p>',
            '<!-- <span -->',
            '<div title="<b">',
            '  <a>y</a>',
            '</div>',
          ].join('\n'),
          createCommentMigrationRule(LINK),
        ),
      ).toBe(
        [
          '<!-- FIXME: link. -->',
          '<p>1 < 2 and text <a>x</a></p>',
          '<!-- <span -->',
          '<div title="<b">',
          '  <!-- FIXME: link. -->',
          '  <a>y</a>',
          '</div>',
        ].join('\n'),
      );
    });
  });

  describe('attributes', () => {
    const MODE: CommentMigration[] = [
      {
        selector: 'sbb-button[mode]',
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

    it('should comment an attribute among other attributes and in multiline tags', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          [
            '<div>',
            '  <sbb-button',
            '    type="button"',
            '    (mode)="m()"',
            '  ></sbb-button>',
            '</div>',
          ].join('\n'),
          createCommentMigrationRule(MODE),
        ),
      ).toBe(
        [
          '<div>',
          '  <!-- FIXME: mode has been removed. -->',
          '  <sbb-button',
          '    type="button"',
          '    (mode)="m()"',
          '  ></sbb-button>',
          '</div>',
        ].join('\n'),
      );
    });

    it('should only comment the elements which match the exclusions of a selector', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          [
            '<sbb-button mode="a"></sbb-button>',
            '<sbb-button mode="a" class="keep"></sbb-button>',
            '<sbb-button mode="a" (done)="d()"></sbb-button>',
          ].join('\n'),
          createCommentMigrationRule([
            { selector: 'sbb-button[mode]:not(.keep):not([done])', message: 'FIXME: mode.' },
          ]),
        ),
      ).toBe(
        [
          '<!-- FIXME: mode. -->',
          '<sbb-button mode="a"></sbb-button>',
          '<sbb-button mode="a" class="keep"></sbb-button>',
          '<sbb-button mode="a" (done)="d()"></sbb-button>',
        ].join('\n'),
      );
    });

    it('should support selector lists and classes', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          ['<a class="legacy">1</a>', '<sbb-button mode="a">2</sbb-button>', '<a>3</a>'].join('\n'),
          createCommentMigrationRule([
            { selector: ['a.legacy', 'sbb-button[mode]'], message: 'FIXME: legacy.' },
          ]),
        ),
      ).toBe(
        [
          '<!-- FIXME: legacy. -->',
          '<a class="legacy">1</a>',
          '<!-- FIXME: legacy. -->',
          '<sbb-button mode="a">2</sbb-button>',
          '<a>3</a>',
        ].join('\n'),
      );
    });

    it('should be idempotent for attribute selectors', async () => {
      const rule = createCommentMigrationRule(MODE);
      const once = await MigrateLegacyTestUtils.migrateHtmlFile(
        '<sbb-button mode="m"></sbb-button>',
        rule,
      );
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(once, rule)).toBe(once);
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
