import { describe, expect, it } from 'vitest';

import type { SelectorMigration } from '../common.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { createTemplateSelectorMigrationRule } from './template-selector-migration.cjs';

describe('sbb-template-selector-migration', () => {
  const defaultMigrations: SelectorMigration[] = [
    { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
    { selector: 'sbb-usermenu', replaceWith: 'sbb-user-menu' },
  ];

  const migrate = (
    template: string,
    migrations: SelectorMigration[] = defaultMigrations,
  ): Promise<string> =>
    MigrateLegacyTestUtils.migrateHtmlFile(
      template,
      createTemplateSelectorMigrationRule(migrations),
    );

  /**
   * Migrates every line of `template` on its own and returns the 1-based numbers of the lines
   * whose element has been replaced, e.g. `'1,3'`, or `'-'` if none.
   */
  const matchedLines = async (selector: string, template: string[]): Promise<string> => {
    const result = (await migrate(template.join('\n'), [{ selector, replaceWith: 'x-el' }])).split(
      '\n',
    );
    const matched = result.flatMap((line, index) => (line.startsWith('<x-el') ? [index + 1] : []));
    return matched.length ? matched.join(',') : '-';
  };

  describe('tag replacement', () => {
    it('should replace the tag for a tag + attribute selector', async () => {
      expect(await migrate('<button sbb-button>Click me</button>')).toBe(
        '<sbb-button sbb-button>Click me</sbb-button>',
      );
    });

    it('should rename simple custom element tag names', async () => {
      expect(await migrate('<sbb-usermenu>Menu</sbb-usermenu>')).toBe(
        '<sbb-user-menu>Menu</sbb-user-menu>',
      );
    });

    it('should support attribute-only selectors', async () => {
      expect(
        await migrate('<div sbb-legacy-card>Content</div>', [
          {
            selector: '[sbb-legacy-card]',
            replaceWith: 'sbb-card',
          },
        ]),
      ).toBe('<sbb-card sbb-legacy-card>Content</sbb-card>');
    });

    it('should preserve attributes and structural directives on the element', async () => {
      expect(
        await migrate(
          '<button sbb-button *ngIf="show" class="primary" [disabled]="isDisabled">Click</button>',
        ),
      ).toBe(
        '<sbb-button sbb-button *ngIf="show" class="primary" [disabled]="isDisabled">Click</sbb-button>',
      );
    });

    it('should handle self-closing / void elements correctly', async () => {
      expect(
        await migrate('<input sbb-input />', [
          {
            selector: 'input[sbb-input]',
            replaceWith: 'sbb-input',
          },
        ]),
      ).toBe('<sbb-input sbb-input />');
    });

    it('should migrate nested elements and multiple occurrences', async () => {
      const template = [
        '<sbb-usermenu>',
        '  <button sbb-button>Action 1</button>',
        '  <button sbb-button>Action 2</button>',
        '</sbb-usermenu>',
      ].join('\n');

      const expected = [
        '<sbb-user-menu>',
        '  <sbb-button sbb-button>Action 1</sbb-button>',
        '  <sbb-button sbb-button>Action 2</sbb-button>',
        '</sbb-user-menu>',
      ].join('\n');

      expect(await migrate(template)).toBe(expected);
    });

    it('should migrate elements inside control flow blocks', async () => {
      const template = ['@if (visible) {', '  <button sbb-button>Label</button>', '}'].join('\n');
      const expected = ['@if (visible) {', '  <sbb-button sbb-button>Label</sbb-button>', '}'].join(
        '\n',
      );
      expect(await migrate(template)).toBe(expected);
    });

    it('should migrate elements inside structural directives', async () => {
      expect(
        await migrate(
          '<ng-container *ngIf="a"><button sbb-button *ngIf="b">X</button></ng-container>',
        ),
      ).toBe(
        '<ng-container *ngIf="a"><sbb-button sbb-button *ngIf="b">X</sbb-button></ng-container>',
      );
    });

    it('should leave non-matching elements untouched', async () => {
      const template = '<button class="regular">Normal Button</button>';
      expect(await migrate(template)).toBe(template);
    });

    it('should be idempotent', async () => {
      const once = await migrate('<button sbb-button>Click me</button>');
      expect(await migrate(once)).toBe(once);
    });

    it('should use the first matching migration', async () => {
      expect(
        await migrate('<a sbb-link>Go</a>', [
          { selector: 'a[sbb-link]', replaceWith: 'first-link' },
          { selector: '[sbb-link]', replaceWith: 'second-link' },
        ]),
      ).toBe('<first-link sbb-link>Go</first-link>');
    });
  });

  describe('selector attributes', () => {
    it('should keep the attributes of the selector', async () => {
      expect(await migrate('<button sbb-button type="button">Go</button>')).toBe(
        '<sbb-button sbb-button type="button">Go</sbb-button>',
      );
    });

    it('should keep bound and multiline attributes untouched', async () => {
      expect(
        await migrate(
          ['<button', '  [sbb-button]="on"', '  (click)="go()"', '>Go</button>'].join('\n'),
        ),
      ).toBe(
        ['<sbb-button', '  [sbb-button]="on"', '  (click)="go()"', '>Go</sbb-button>'].join('\n'),
      );
    });
  });

  describe('added attributes', () => {
    it('should add the attributes after the tag name', async () => {
      expect(
        await migrate('<div class="vertical" id="x">Go</div>', [
          {
            selector: 'div.vertical',
            replaceWith: 'sbb-group',
            addAttributes: 'orientation="vertical"',
          },
        ]),
      ).toBe('<sbb-group orientation="vertical" class="vertical" id="x">Go</sbb-group>');
    });

    it('should add several attributes and bindings', async () => {
      expect(
        await migrate('<button sbb-button>Go</button>', [
          {
            selector: 'button[sbb-button]',
            replaceWith: 'sbb-button',
            addAttributes: 'size="s" [disabled]="x"',
          },
        ]),
      ).toBe('<sbb-button size="s" [disabled]="x" sbb-button>Go</sbb-button>');
    });

    it('should add the attributes to elements without other attributes', async () => {
      expect(
        await migrate('<sbb-usermenu></sbb-usermenu>', [
          { selector: 'sbb-usermenu', replaceWith: 'sbb-user-menu', addAttributes: 'size="s"' },
        ]),
      ).toBe('<sbb-user-menu size="s"></sbb-user-menu>');
    });
  });

  describe('css selectors', () => {
    describe('classes', () => {
      const template = [
        '<a class="link" href="foo">1</a>',
        '<a class="other" href="foo">2</a>',
        '<a class="big link">3</a>',
        '<a>4</a>',
        '<button class="link">5</button>',
      ];

      it('should match a class', async () => {
        expect(await matchedLines('a.link', template)).toBe('1,3');
      });

      it('should match every class of a selector', async () => {
        expect(await matchedLines('a.big.link', template)).toBe('3');
      });

      it('should match a class on any tag', async () => {
        expect(await matchedLines('.link', template)).toBe('1,3,5');
      });

      it('should combine a class and an attribute value', async () => {
        expect(await matchedLines('a[href=foo].link', template)).toBe('1');
      });

      it('should not match a partial class name', async () => {
        expect(await matchedLines('a.lin', template)).toBe('-');
      });

      it('should not match a class which is bound', async () => {
        expect(await matchedLines('a.link', ['<a [class]="cls">1</a>'])).toBe('-');
      });
    });

    describe('exclusions', () => {
      const template = [
        '<a class="link" href="foo" sbb-link>1</a>',
        '<a class="other" href="foo">2</a>',
        '<a download class="link">3</a>',
        '<a data-custom="true" class="x">4</a>',
        '<a data-custom="false" class="x">5</a>',
        '<a>6</a>',
      ];

      it('should exclude a class', async () => {
        expect(await matchedLines('a:not(.link)', template)).toBe('2,4,5,6');
      });

      it('should exclude an attribute', async () => {
        expect(await matchedLines('a:not([download])', template)).toBe('1,2,4,5,6');
      });

      it('should exclude an attribute value', async () => {
        expect(await matchedLines("a:not([data-custom='true'])", template)).toBe('1,2,3,5,6');
        expect(await matchedLines('a:not([data-custom="true"])', template)).toBe('1,2,3,5,6');
        expect(await matchedLines('a:not([data-custom=true])', template)).toBe('1,2,3,5,6');
        expect(await matchedLines('a:not([data-custom])', template)).toBe('1,2,3,6');
      });

      it('should combine a required attribute with an exclusion', async () => {
        expect(await matchedLines('a[sbb-link]:not([download])', template)).toBe('1');
        expect(await matchedLines('a[sbb-link]:not(.link)', template)).toBe('-');
      });

      it('should combine a class with an exclusion', async () => {
        expect(await matchedLines('a.link:not([download])', template)).toBe('1');
        expect(await matchedLines('a.link:not([href])', template)).toBe('3');
      });

      it('should require all of several exclusions to hold', async () => {
        expect(await matchedLines('a:not(.link):not([data-custom])', template)).toBe('2,6');
        expect(await matchedLines('a.link:not([download]):not([sbb-link])', template)).toBe('-');
      });

      it('should exclude a tag', async () => {
        expect(
          await matchedLines(':not(button)', ['<a>1</a>', '<button>2</button>', '<span>3</span>']),
        ).toBe('1,3');
      });

      it('should match an anchor with neither class nor attribute of the exclusions', async () => {
        expect(await matchedLines('a:not(.reset):not([sbb-link])', ['<a>1</a>'])).toBe('1');
        expect(
          await matchedLines('a:not(.reset):not([sbb-link])', [
            '<a class="reset">1</a>',
            '<a sbb-link>2</a>',
            '<a class="other">3</a>',
          ]),
        ).toBe('3');
      });

      it('should treat a bound attribute as present', async () => {
        expect(await matchedLines('a:not([download])', ['<a [download]="file">1</a>'])).toBe('-');
        expect(await matchedLines('a[sbb-link]', ['<a [sbb-link]="x">1</a>'])).toBe('1');
      });

      it('should not treat a bound attribute as a value match', async () => {
        // The bound value is not known statically: `[data-custom]="x"` never equals `true`.
        expect(await matchedLines('a[data-custom=true]', ['<a [data-custom]="x">1</a>'])).toBe('-');
      });
    });

    describe('selector lists', () => {
      const template = [
        '<a sbb-link>1</a>',
        '<button sbb-btn>2</button>',
        '<a>3</a>',
        '<a class="link" download>4</a>',
      ];

      it('should match any alternative', async () => {
        expect(await matchedLines('a[sbb-link], button[sbb-btn]', template)).toBe('1,2');
      });

      it('should support exclusions in alternatives', async () => {
        expect(await matchedLines('a.link:not([download]), button[sbb-btn]', template)).toBe('2');
        expect(await matchedLines('a.link[download], button[sbb-btn]', template)).toBe('2,4');
      });

      it('should not split at a comma inside an attribute value', async () => {
        expect(await matchedLines('a[title="x,y"]', ['<a title="x,y">1</a>', '<a>2</a>'])).toBe(
          '1',
        );
      });
    });

    it('should apply different migrations to different variants of one tag', async () => {
      const migrations: SelectorMigration[] = [
        { selector: 'a.primary:not([download])', replaceWith: 'sbb-primary-link' },
        { selector: 'a:not(.primary):not([download])', replaceWith: 'sbb-link' },
        { selector: 'a[download]', replaceWith: 'sbb-download-link' },
      ];
      expect(
        await migrate(
          [
            '<a class="primary">1</a>',
            '<a>2</a>',
            '<a download>3</a>',
            '<a class="primary" download>4</a>',
          ].join('\n'),
          migrations,
        ),
      ).toBe(
        [
          '<sbb-primary-link class="primary">1</sbb-primary-link>',
          '<sbb-link>2</sbb-link>',
          '<sbb-download-link download>3</sbb-download-link>',
          '<sbb-download-link class="primary" download>4</sbb-download-link>',
        ].join('\n'),
      );
    });

    it('should be idempotent for selectors with exclusions', async () => {
      const migration: SelectorMigration[] = [
        {
          selector: 'a[sbb-link]:not([download])',
          replaceWith: 'sbb-link',
        },
      ];
      const once = await migrate('<a sbb-link>Go</a>', migration);
      expect(once).toBe('<sbb-link sbb-link>Go</sbb-link>');
      expect(await migrate(once, migration)).toBe(once);
    });

    describe('unsupported selectors', () => {
      it.each([
        ['a b', 'descendant combinator'],
        ['a > b', 'child combinator'],
        ['a + b', 'sibling combinator'],
        ['a:hover', 'pseudo class'],
        ['a:not(b c)', 'combinator in exclusion'],
        ['a:not(b:not(c))', 'nested exclusion'],
        ['a[b', 'unbalanced bracket'],
        ['a, ', 'empty alternative'],
        ['', 'empty selector'],
      ])('should reject "%s" (%s)', (selector) => {
        expect(() =>
          createTemplateSelectorMigrationRule([{ selector, replaceWith: 'x-el' }]),
        ).toThrow(/Unsupported selector/);
      });
    });
  });

  describe('edge cases', () => {
    it('should skip migration if element has no closing tag to prevent template corruption', async () => {
      // Unclosed tag <button sbb-button>
      const unclosedTemplate = '<button sbb-button>Unclosed';
      expect(await migrate(unclosedTemplate)).toBe(unclosedTemplate);
    });

    it('should do nothing without migrations', async () => {
      const template = '<button sbb-button>Go</button>';
      expect(await migrate(template, [])).toBe(template);
    });
  });

  describe('inline templates', () => {
    it('should migrate inline templates in component files', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  template: `',
          '    <button sbb-button (click)="go()">Go</button>',
          '  `,',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        createTemplateSelectorMigrationRule(defaultMigrations),
      );

      expect(content).toContain('<sbb-button sbb-button (click)="go()">Go</sbb-button>');
    });

    it('should migrate class and exclusion selectors in inline templates', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  template: `',
          '    <a class="link" sbb-link href="x">One</a>',
          '    <a class="link" sbb-link download>Two</a>',
          '  `,',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        createTemplateSelectorMigrationRule([
          {
            selector: 'a.link[sbb-link]:not([download])',
            replaceWith: 'sbb-link',
          },
        ]),
      );

      expect(content).toContain('<sbb-link class="link" sbb-link href="x">One</sbb-link>');
      expect(content).toContain('<a class="link" sbb-link download>Two</a>');
    });

    it('should match quoted attribute values in single quoted inline templates', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  template: \'<a data-custom="true">A</a><a data-custom="false">B</a>\',',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        createTemplateSelectorMigrationRule([
          { selector: "a:not([data-custom='true'])", replaceWith: 'sbb-link' },
        ]),
      );

      expect(content).toContain(
        'template: \'<a data-custom="true">A</a><sbb-link data-custom="false">B</sbb-link>\',',
      );
    });

    it('should not modify TypeScript files without matching selectors', async () => {
      const source = [
        "import { Component } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        "  template: '<div>Unrelated</div>',",
        '})',
        'export class AppComponent {}',
      ].join('\n');

      const content = await MigrateLegacyTestUtils.migrateTsFile(
        source,
        createTemplateSelectorMigrationRule(defaultMigrations),
      );
      expect(content).toBe(source);
    });
  });
});
