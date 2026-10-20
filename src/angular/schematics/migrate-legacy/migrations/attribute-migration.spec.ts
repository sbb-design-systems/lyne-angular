import type { Rule } from '@angular-devkit/schematics';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { type AttributeMigration, createAttributeMigrationRule } from './attribute-migration.cjs';

describe('sbb-attribute-migration', () => {
  const rename: AttributeMigration[] = [
    { selector: 'sbb-button', attribute: 'svgIcon', replaceWith: 'iconName' },
  ];
  const basicAttributeRule: Rule = createAttributeMigrationRule(rename);

  describe('renaming', () => {
    it('should rename a static attribute', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button svgIcon="arrow">A</sbb-button>',
          basicAttributeRule,
        ),
      ).toBe('<sbb-button iconName="arrow">A</sbb-button>');
    });

    it('should rename a bound input', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button [svgIcon]="icon">A</sbb-button>',
          basicAttributeRule,
        ),
      ).toBe('<sbb-button [iconName]="icon">A</sbb-button>');
    });

    it('should keep the dash-case spelling', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button svg-icon="arrow">A</sbb-button>',
          basicAttributeRule,
        ),
      ).toBe('<sbb-button icon-name="arrow">A</sbb-button>');
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button [svg-icon]="icon">A</sbb-button>',
          basicAttributeRule,
        ),
      ).toBe('<sbb-button [icon-name]="icon">A</sbb-button>');
    });

    it('should rename a two-way binding exactly once', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button [(svgIcon)]="icon">A</sbb-button>',
          basicAttributeRule,
        ),
      ).toBe('<sbb-button [(iconName)]="icon">A</sbb-button>');
    });

    it('should rename an output', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button (svgIconChange)="onChange($event)">A</sbb-button>',
          createAttributeMigrationRule([
            {
              selector: 'sbb-button',
              attribute: 'svgIconChange',
              replaceWith: 'iconNameChange',
            },
          ]),
        ),
      ).toBe('<sbb-button (iconNameChange)="onChange($event)">A</sbb-button>');
    });

    it('should rename every occurrence in a template', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button svgIcon="a">A</sbb-button>\n<sbb-button [svgIcon]="b">B</sbb-button>',
          basicAttributeRule,
        ),
      ).toBe('<sbb-button iconName="a">A</sbb-button>\n<sbb-button [iconName]="b">B</sbb-button>');
    });

    it('should not touch other elements', async () => {
      const template = '<sbb-icon svgIcon="arrow"></sbb-icon>';
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(template, basicAttributeRule)).toBe(
        template,
      );
    });

    it('should not touch other attributes or the value', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button class="svgIcon" svgIcon="svgIcon" [disabled]="svgIcon">svgIcon</sbb-button>',
          basicAttributeRule,
        ),
      ).toBe(
        '<sbb-button class="svgIcon" iconName="svgIcon" [disabled]="svgIcon">svgIcon</sbb-button>',
      );
    });

    it('should support multiple selectors and migrations', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button svgIcon="a"></sbb-button><sbb-secondary-button svgIcon="b"></sbb-secondary-button>',
          createAttributeMigrationRule([
            {
              selector: ['sbb-button', 'sbb-secondary-button'],
              attribute: 'svgIcon',
              replaceWith: 'iconName',
            },
          ]),
        ),
      ).toBe(
        '<sbb-button iconName="a"></sbb-button><sbb-secondary-button iconName="b"></sbb-secondary-button>',
      );
    });

    it('should support attribute selectors', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<button sbb-button svgIcon="a">A</button>',
          createAttributeMigrationRule([
            {
              selector: 'button[sbb-button]',
              attribute: 'svgIcon',
              replaceWith: 'iconName',
            },
          ]),
        ),
      ).toBe('<button sbb-button iconName="a">A</button>');
    });

    it('should be idempotent', async () => {
      const once = await MigrateLegacyTestUtils.migrateHtmlFile(
        '<sbb-button svgIcon="arrow">A</sbb-button>',
        basicAttributeRule,
      );
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(once, basicAttributeRule)).toBe(once);
    });

    it('should skip the rename when the target attribute already exists', async () => {
      const template = '<sbb-button svgIcon="a" iconName="b">A</sbb-button>';
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(template, basicAttributeRule)).toBe(
        template,
      );
    });

    it('should migrate elements inside control flow blocks', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          ['@if (visible) {', '  <sbb-button svgIcon="a">A</sbb-button>', '}'].join('\n'),
          basicAttributeRule,
        ),
      ).toBe(['@if (visible) {', '  <sbb-button iconName="a">A</sbb-button>', '}'].join('\n'));
    });
  });

  describe('removal', () => {
    const removal: Rule = createAttributeMigrationRule([
      { selector: 'sbb-button', attribute: 'svgIcon' },
    ]);

    it('should remove a static attribute', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button svgIcon="arrow">A</sbb-button>',
          removal,
        ),
      ).toBe('<sbb-button>A</sbb-button>');
    });

    it('should remove a bound input', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button [svgIcon]="icon">A</sbb-button>',
          removal,
        ),
      ).toBe('<sbb-button>A</sbb-button>');
    });

    it('should remove the whole line in multiline tags', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          ['<sbb-button', '  svgIcon="arrow"', '  [disabled]="d"', '>A</sbb-button>'].join('\n'),
          removal,
        ),
      ).toBe(['<sbb-button', '  [disabled]="d"', '>A</sbb-button>'].join('\n'));
    });
  });

  describe('inline templates', () => {
    it('should migrate inline templates', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  template: `',
          '    <sbb-button svgIcon="arrow" (click)="go()">Go</sbb-button>',
          '  `,',
          '})',
          'export class AppComponent {',
          "  svgIcon = 'arrow';",
          '}',
        ].join('\n'),
        basicAttributeRule,
      );

      expect(content).toContain('<sbb-button iconName="arrow" (click)="go()">Go</sbb-button>');
      // Class members are not templates and therefore untouched.
      expect(content).toContain("svgIcon = 'arrow';");
    });

    it('should not touch files without a matching element', async () => {
      const source = [
        "import { Component } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  template: \'<sbb-icon svgIcon="arrow"></sbb-icon>\',',
        '})',
        'export class AppComponent {}',
      ].join('\n');

      expect(await MigrateLegacyTestUtils.migrateTsFile(source, basicAttributeRule)).toBe(source);
    });
  });

  describe('inline template quoting', () => {
    const component = (templateLiteral: string): string =>
      [
        "import { Component } from '@angular/core';",
        '',
        `@Component({ selector: 'app-root', template: ${templateLiteral} })`,
        'export class AppComponent {}',
      ].join('\n');

    const expectValidTypeScript = (source: string): void => {
      expect(ts.transpileModule(source, { reportDiagnostics: true }).diagnostics).toEqual([]);
    };

    const defaultFor = (defaultValue: string): Rule =>
      createAttributeMigrationRule([
        {
          selector: 'button[sbb-button]',
          attribute: 'svgIcon',
          replaceWith: 'iconName',
          defaultValue,
        },
      ]);

    it('should escape an inserted default for a double-quoted template', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        component(String.raw`"<button sbb-button>Go</button>"`),
        defaultFor('arrow-right-small'),
      );

      expect(result).toBe(
        component(String.raw`"<button iconName=\"arrow-right-small\" sbb-button>Go</button>"`),
      );
      expectValidTypeScript(result);
    });

    it('should not escape double quotes for a single-quoted template', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        component(String.raw`'<button sbb-button>Go</button>'`),
        defaultFor('arrow-right-small'),
      );

      expect(result).toBe(
        component(String.raw`'<button iconName="arrow-right-small" sbb-button>Go</button>'`),
      );
      expectValidTypeScript(result);
    });

    it('should escape the enclosing quote and backslashes of an inserted default', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        component(String.raw`'<button sbb-button>Go</button>'`),
        defaultFor(String.raw`it's a\b`),
      );

      expect(result).toBe(
        component(String.raw`'<button iconName="it\'s a\\b" sbb-button>Go</button>'`),
      );
      expectValidTypeScript(result);
    });

    it('should escape substitutions of an inserted default in a template literal', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        component('`<button sbb-button>Go</button>`'),
        defaultFor('a${b}`c'),
      );

      expect(result).toBe(component('`<button iconName="a\\${b}\\`c" sbb-button>Go</button>`'));
      expectValidTypeScript(result);
    });

    it('should rename escaped bindings in a double-quoted template', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        component(String.raw`"<sbb-button [svgIcon]=\"icon\" class=\"a\">A</sbb-button>"`),
        basicAttributeRule,
      );

      expect(result).toBe(
        component(String.raw`"<sbb-button [iconName]=\"icon\" class=\"a\">A</sbb-button>"`),
      );
      expectValidTypeScript(result);
    });

    it('should remove an attribute between escaped quotes', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        component(
          String.raw`"<sbb-button class=\"a\" svgIcon=\"x\" [disabled]=\"d\">A</sbb-button>"`,
        ),
        createAttributeMigrationRule([{ selector: 'sbb-button', attribute: 'svgIcon' }]),
      );

      expect(result).toBe(
        component(String.raw`"<sbb-button class=\"a\" [disabled]=\"d\">A</sbb-button>"`),
      );
      expectValidTypeScript(result);
    });

    it('should remove the whole line of a template written with `\\n` escapes', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        component(String.raw`'<sbb-button\n  svgIcon="a"\n  [disabled]="d"\n>A</sbb-button>'`),
        createAttributeMigrationRule([{ selector: 'sbb-button', attribute: 'svgIcon' }]),
      );

      expect(result).toBe(component(String.raw`'<sbb-button\n  [disabled]="d"\n>A</sbb-button>'`));
    });

    it('should map offsets behind unicode escapes back to the source', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        component(String.raw`"\u00e4\u{1F600} <sbb-button svgIcon=\"a\">A</sbb-button>"`),
        basicAttributeRule,
      );

      expect(result).toBe(
        component(String.raw`"\u00e4\u{1F600} <sbb-button iconName=\"a\">A</sbb-button>"`),
      );
    });

    it('should keep CRLF line breaks of template literals', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateTsFile(
          component('`\r\n  <sbb-button svgIcon="a">A</sbb-button>\r\n`'),
          basicAttributeRule,
        ),
      ).toBe(component('`\r\n  <sbb-button iconName="a">A</sbb-button>\r\n`'));

      expect(
        await MigrateLegacyTestUtils.migrateTsFile(
          component('`<sbb-button\r\n  svgIcon="a"\r\n  [disabled]="d"\r\n>A</sbb-button>`'),
          createAttributeMigrationRule([{ selector: 'sbb-button', attribute: 'svgIcon' }]),
        ),
      ).toBe(component('`<sbb-button\r\n  [disabled]="d"\r\n>A</sbb-button>`'));
    });

    it('should migrate escaped bindings in subsequent passes', async () => {
      const first = await MigrateLegacyTestUtils.migrateTsFile(
        component(String.raw`"<sbb-button [svgIcon]=\"icon\">A</sbb-button>"`),
        basicAttributeRule,
      );
      const second = await MigrateLegacyTestUtils.migrateTsFile(
        first,
        createAttributeMigrationRule([
          { selector: 'sbb-button', attribute: 'iconName', replaceWith: 'name' },
        ]),
      );

      expect(second).toBe(component(String.raw`"<sbb-button [name]=\"icon\">A</sbb-button>"`));
    });

    it('should be idempotent for an inserted default', async () => {
      const once = await MigrateLegacyTestUtils.migrateTsFile(
        component(String.raw`"<button sbb-button>Go</button>"`),
        defaultFor('arrow-right-small'),
      );

      expect(
        await MigrateLegacyTestUtils.migrateTsFile(once, defaultFor('arrow-right-small')),
      ).toBe(once);
    });

    it('should leave templates with malformed escapes untouched', async () => {
      const source = component(String.raw`"<sbb-button svgIcon=\"a\">\x</sbb-button>"`);

      expect(await MigrateLegacyTestUtils.migrateTsFile(source, basicAttributeRule)).toBe(source);
    });
  });

  describe('default value', () => {
    const migrationWithDefault: AttributeMigration[] = [
      {
        selector: 'sbb-button',
        attribute: 'svgIcon',
        replaceWith: 'iconName',
        defaultValue: 'default-icon',
      },
    ];
    const migrationWithDefaultRule: Rule = createAttributeMigrationRule(migrationWithDefault);

    it('should add the default attribute when the legacy attribute is missing', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button>A</sbb-button>',
          migrationWithDefaultRule,
        ),
      ).toBe('<sbb-button iconName="default-icon">A</sbb-button>');
    });

    it('should rename the legacy attribute instead of adding default when present', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button svgIcon="arrow">A</sbb-button>',
          migrationWithDefaultRule,
        ),
      ).toBe('<sbb-button iconName="arrow">A</sbb-button>');
    });

    it('should skip adding the default attribute if the target attribute already exists', async () => {
      const template = '<sbb-button iconName="existing">A</sbb-button>';
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(template, migrationWithDefaultRule)).toBe(
        template,
      );
    });

    it('should add distinct defaults to the same element', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-button>A</sbb-button>',
          createAttributeMigrationRule([
            ...migrationWithDefault,
            {
              selector: 'sbb-button',
              attribute: 'mode',
              replaceWith: 'size',
              defaultValue: 'm',
            },
          ]),
        ),
      ).toBe('<sbb-button iconName="default-icon" size="m">A</sbb-button>');
    });
  });
});
