import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { HostTree, type Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { type CommentMigration, createCommentMigrationRule } from './comment-migration.cjs';

describe('sbb-comment-migration', () => {
  const tempCollectionPath = path.join(
    os.tmpdir(),
    'lyne-angular-comment-migration-collection.json',
  );
  fs.writeFileSync(tempCollectionPath, JSON.stringify({ schematics: {} }));

  const runner = new SchematicTestRunner('test', tempCollectionPath);

  const migrate = async (
    files: Record<string, string>,
    migrations: CommentMigration[],
  ): Promise<Tree> => {
    const tree = new UnitTestTree(new HostTree());
    for (const [filePath, content] of Object.entries(files)) {
      tree.create(filePath, content);
    }
    return firstValueFrom(runner.callRule(createCommentMigrationRule(migrations), tree));
  };

  const migrateFile = async (
    filePath: string,
    content: string,
    migrations: CommentMigration[],
  ): Promise<string> => {
    const tree = await migrate({ [filePath]: content }, migrations);
    return tree.read(filePath)!.toString('utf-8');
  };

  const CAPTCHA: CommentMigration[] = [
    {
      selector: 'sbb-captcha',
      message: 'FIXME: sbb-captcha has no Lyne counterpart.',
    },
  ];

  describe('elements in external templates', () => {
    const migrateHtml = (template: string, migrations: CommentMigration[] = CAPTCHA) =>
      migrateFile('/src/app/app.component.html', template, migrations);

    it('should add a FIXME comment above the element', async () => {
      expect(
        await migrateHtml(['<div>', '  <sbb-captcha></sbb-captcha>', '</div>'].join('\n')),
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
        await migrateHtml(template, [{ selector: 'sbb-captcha', message: 'Plain message.' }]),
      ).toBe(`<!-- Plain message. -->\n${template}`);
    });

    it('should render multiline messages', async () => {
      expect(
        await migrateHtml('<sbb-captcha></sbb-captcha>', [
          {
            selector: 'sbb-captcha',
            message: 'FIXME: First line.\nSecond line.',
          },
        ]),
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
        await migrateHtml(
          [
            '<sbb-captcha></sbb-captcha>',
            '<div>',
            '  <button sbb-lightbox>x</button>',
            '</div>',
          ].join('\n'),
          [
            ...CAPTCHA,
            {
              selector: '[sbb-lightbox]',
              message: 'TODO: Lightbox is not available.',
            },
          ],
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
        await migrateHtml('<sbb-captcha></sbb-captcha><sbb-captcha></sbb-captcha>', [
          ...CAPTCHA,
          { selector: 'sbb-captcha', message: 'TODO: Second hint.' },
        ]),
      ).toBe(
        [
          '<!-- FIXME: sbb-captcha has no Lyne counterpart. -->',
          '<!-- TODO: Second hint. -->',
          '<sbb-captcha></sbb-captcha><sbb-captcha></sbb-captcha>',
        ].join('\n'),
      );
    });

    it('should be idempotent', async () => {
      const once = await migrateHtml('<div>\n  <sbb-captcha></sbb-captcha>\n</div>');
      expect(await migrateHtml(once)).toBe(once);
    });

    it('should comment elements inside control flow blocks', async () => {
      expect(await migrateHtml(['@if (show) {', '  <sbb-captcha />', '}'].join('\n'))).toBe(
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
    const migrateHtml = (template: string) =>
      migrateFile('/src/app/app.component.html', template, MODE);

    it('should comment static attributes, inputs and outputs', async () => {
      const expected = (tag: string) => `<!-- FIXME: mode has been removed. -->\n${tag}`;

      for (const tag of [
        '<sbb-button mode="ghost"></sbb-button>',
        '<sbb-button [mode]="m"></sbb-button>',
        '<sbb-button (mode)="m()"></sbb-button>',
        '<sbb-button [(mode)]="m"></sbb-button>',
      ]) {
        expect(await migrateHtml(tag)).toBe(expected(tag));
      }
    });
  });

  describe('inline templates', () => {
    it('should add a // comment above the template property', async () => {
      const result = await migrateFile(
        '/src/app/app.component.ts',
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
        CAPTCHA,
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
    const MODULE: CommentMigration[] = [
      {
        symbol: 'SbbCaptchaModule',
        importedFrom: '@sbb-esta/angular/captcha',
        message: 'FIXME: SbbCaptchaModule has no Lyne counterpart.',
      },
    ];
    const migrateTs = (source: string, migrations: CommentMigration[] = MODULE) =>
      migrateFile('/src/app/app.component.ts', source, migrations);

    it('should comment the import and every usage', async () => {
      expect(
        await migrateTs(
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
