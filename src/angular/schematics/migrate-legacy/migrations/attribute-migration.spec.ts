import { ASTWithSource, LiteralPrimitive, parseTemplate, TmplAstElement } from '@angular/compiler';
import type { Rule } from '@angular-devkit/schematics';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import type { AttributeMigration } from '../common.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { createAttributeMigrationRule } from './attribute-migration.cjs';

describe('sbb-attribute-migration', () => {
  const rename: AttributeMigration[] = [
    { action: 'rename', selector: 'sbb-button', attribute: 'svgIcon', replaceWith: 'iconName' },
  ];
  const basicAttributeRule: Rule = createAttributeMigrationRule(rename);

  it('should enforce action-specific migration options', () => {
    const valid: AttributeMigration[] = [
      { action: 'remove', selector: '*', attribute: 'old' },
      { action: 'rename', selector: '*', attribute: 'old', replaceWith: 'new' },
      {
        action: 'rename-or-add',
        selector: '*',
        attribute: 'old',
        replaceWith: 'new',
        defaultValue: '',
      },
      { action: 'replace', selector: '*', attribute: 'old', replaceWith: 'new="value"' },
      {
        action: 'replace-value',
        selector: 'sbb-x',
        attribute: '*',
        attributeValue: 'old',
        replaceValueWith: 'new',
      },
    ];
    // @ts-expect-error A rename requires its replacement name.
    const missingName: AttributeMigration = { action: 'rename', selector: '*', attribute: 'old' };
    // @ts-expect-error A removal cannot specify a replacement.
    const removalWithReplacement: AttributeMigration = {
      action: 'remove',
      selector: '*',
      attribute: 'old',
      replaceWith: 'new',
    };
    // @ts-expect-error A value replacement cannot also rename the attribute.
    const incompatible: AttributeMigration = {
      action: 'replace-value',
      selector: '*',
      attribute: 'old',
      replaceValueWith: 'new',
      replaceWith: 'name',
    };
    expect(valid).toHaveLength(5);
    for (const invalid of [
      missingName,
      removalWithReplacement,
      incompatible,
      { action: 'unknown' },
    ]) {
      expect(() => Reflect.apply(createAttributeMigrationRule, undefined, [[invalid]])).toThrow(
        'Invalid attribute migration action or options.',
      );
    }
  });

  describe('attribute wildcard', () => {
    const removal = createAttributeMigrationRule([
      { action: 'remove', selector: 'sbb-x', attribute: '*', attributeValue: 'legacy' },
    ]);

    it('should reject universal selectors with a wildcard attribute', () => {
      for (const selector of ['*', ['sbb-x', '*'], 'sbb-x, *', '*, sbb-x']) {
        expect(() =>
          createAttributeMigrationRule([
            { action: 'remove', selector, attribute: '*', attributeValue: 'legacy' },
          ]),
        ).toThrow(
          "An attribute wildcard cannot be combined with a universal element selector '*'.",
        );
      }
    });

    it('should allow constrained selectors with a wildcard attribute', async () => {
      for (const selector of ['sbb-x', '*[marker]', ['sbb-x', 'sbb-y'], 'sbb-x, sbb-y']) {
        const rule = createAttributeMigrationRule([
          { action: 'remove', selector, attribute: '*', attributeValue: 'legacy' },
        ]);
        expect(
          await MigrateLegacyTestUtils.migrateHtmlFile('<sbb-x marker old="legacy"></sbb-x>', rule),
        ).toBe('<sbb-x marker></sbb-x>');
      }
    });

    it('should allow a universal selector with a named attribute', async () => {
      const rule = createAttributeMigrationRule([
        { action: 'remove', selector: '*', attribute: 'old', attributeValue: 'legacy' },
      ]);
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-x old="legacy"></sbb-x><sbb-y old="legacy"></sbb-y>',
          rule,
        ),
      ).toBe('<sbb-x></sbb-x><sbb-y></sbb-y>');
    });

    it('should remove every matching attribute and binding on selected elements', async () => {
      const html =
        `<sbb-x first="legacy" second="legacy" keep="other" [third]="'legacy'" [fourth]="legacy" (done)="legacy"></sbb-x>` +
        '<sbb-y first="legacy"></sbb-y>';
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(html, removal)).toBe(
        '<sbb-x keep="other"></sbb-x><sbb-y first="legacy"></sbb-y>',
      );
    });

    it('should match empty values rather than every value', async () => {
      const rule = createAttributeMigrationRule([
        { action: 'remove', selector: 'sbb-x', attribute: '*', attributeValue: '' },
      ]);
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-x empty="" flag keep="value"></sbb-x>',
          rule,
        ),
      ).toBe('<sbb-x keep="value"></sbb-x>');
      const named = createAttributeMigrationRule([
        { action: 'remove', selector: '*', attribute: 'empty', attributeValue: '' },
      ]);
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile('<sbb-x empty="value"></sbb-x>', named),
      ).toBe('<sbb-x empty="value"></sbb-x>');
    });

    it('should preserve output filters and handle two-way bindings once', async () => {
      const onlyOutputs = createAttributeMigrationRule([
        {
          action: 'remove',
          selector: 'sbb-x',
          attribute: '*',
          attributeValue: 'legacy',
          onlyOutputs: true,
        },
      ]);
      const excludeOutputs = createAttributeMigrationRule([
        {
          action: 'remove',
          selector: 'sbb-x',
          attribute: '*',
          attributeValue: 'legacy',
          excludeOutputs: true,
        },
      ]);
      const html = '<sbb-x [(model)]="legacy" (done)="legacy" static="legacy"></sbb-x>';
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(html, onlyOutputs)).toBe(
        '<sbb-x [(model)]="legacy" static="legacy"></sbb-x>',
      );
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(html, excludeOutputs)).toBe(
        '<sbb-x (done)="legacy"></sbb-x>',
      );
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(html, removal)).toBe('<sbb-x></sbb-x>');
    });

    it('should not migrate unsupported binding syntax or runtime values', async () => {
      const html = `<sbb-x [attr.title]="'legacy'" [property]="dynamic"></sbb-x>`;
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(html, removal)).toBe(html);
    });

    it('should rename one match and preserve its spelling and value', async () => {
      const rule = createAttributeMigrationRule([
        {
          action: 'rename',
          selector: 'sbb-x',
          attribute: '*',
          attributeValue: 'legacy',
          replaceWith: 'newName',
        },
      ]);
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-x old-name="legacy" keep="other"></sbb-x>',
          rule,
        ),
      ).toBe('<sbb-x new-name="legacy" keep="other"></sbb-x>');
    });

    it('should skip replacement when multiple matches or an existing target would collide', async () => {
      for (const action of ['rename', 'replace'] as const) {
        const rule = createAttributeMigrationRule([
          {
            action,
            selector: 'sbb-x',
            attribute: '*',
            attributeValue: 'legacy',
            replaceWith: action === 'replace' ? 'newName="new"' : 'newName',
          },
        ]);
        for (const html of [
          '<sbb-x first="legacy" second="legacy"></sbb-x>',
          '<sbb-x first="legacy" newName="other"></sbb-x>',
        ]) {
          expect(await MigrateLegacyTestUtils.migrateHtmlFile(html, rule)).toBe(html);
        }
      }
    });

    it('should fully replace one match and be idempotent', async () => {
      const rule = createAttributeMigrationRule([
        {
          action: 'replace',
          selector: 'sbb-x',
          attribute: '*',
          attributeValue: 'legacy',
          replaceWith: 'newName="new"',
        },
      ]);
      const once = await MigrateLegacyTestUtils.migrateHtmlFile(
        `<sbb-x [old]="'legacy'"></sbb-x>`,
        rule,
      );
      expect(once).toBe('<sbb-x newName="new"></sbb-x>');
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(once, rule)).toBe(once);
    });

    it('should not edit one attribute twice or create targets reserved by another migration', async () => {
      const rule = createAttributeMigrationRule([
        { action: 'rename', selector: '*', attribute: 'first', replaceWith: 'target' },
        {
          action: 'rename',
          selector: 'sbb-x',
          attribute: '*',
          attributeValue: 'legacy',
          replaceWith: 'target',
        },
      ]);
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-x first="other" second="legacy"></sbb-x>',
          rule,
        ),
      ).toBe('<sbb-x target="other" second="legacy"></sbb-x>');
      const overlapping = createAttributeMigrationRule([
        { action: 'rename', selector: '*', attribute: 'first', replaceWith: 'target' },
        { action: 'remove', selector: 'sbb-x', attribute: '*', attributeValue: 'legacy' },
      ]);
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-x first="legacy" second="legacy"></sbb-x>',
          overlapping,
        ),
      ).toBe('<sbb-x target="legacy"></sbb-x>');

      const fullyReplaced = createAttributeMigrationRule([
        { action: 'replace', selector: '*', attribute: 'first', replaceWith: 'target="new"' },
        {
          action: 'rename',
          selector: 'sbb-x',
          attribute: '*',
          attributeValue: 'legacy',
          replaceWith: 'target',
        },
      ]);
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-x first="other" second="legacy"></sbb-x>',
          fullyReplaced,
        ),
      ).toBe('<sbb-x target="new" second="legacy"></sbb-x>');
    });

    it('should handle adjacent multiline removals and inline templates', async () => {
      const source = [
        "import { Component } from '@angular/core';",
        '@Component({',
        '  template: `<sbb-x',
        '    first="legacy"',
        '    second="legacy"',
        '    keep="other"',
        '  ></sbb-x>`,',
        '})',
        'export class AppComponent {}',
      ].join('\n');
      expect(await MigrateLegacyTestUtils.migrateTsFile(source, removal)).toBe(
        source.replace('    first="legacy"\n    second="legacy"\n', ''),
      );
    });

    it('should preserve a default inserted at the start of a removed attribute', async () => {
      const remove: AttributeMigration = {
        action: 'remove',
        selector: 'sbb-x',
        attribute: '*',
        attributeValue: 'legacy',
      };
      const add: AttributeMigration = {
        action: 'rename-or-add',
        selector: 'sbb-x',
        attribute: 'missing',
        replaceWith: 'newName',
        defaultValue: 'new',
      };
      for (const migrations of [
        [remove, add],
        [add, remove],
      ]) {
        const rule = createAttributeMigrationRule(migrations);
        expect(
          await MigrateLegacyTestUtils.migrateHtmlFile('<sbb-x first="legacy"></sbb-x>', rule),
        ).toBe('<sbb-x newName="new"></sbb-x>');
      }
    });

    it('should reject incomplete or unsafe wildcard configurations', () => {
      expect(() =>
        createAttributeMigrationRule([{ action: 'remove', selector: 'sbb-x', attribute: '*' }]),
      ).toThrow("An attribute wildcard requires 'attributeValue'.");
      expect(() =>
        createAttributeMigrationRule([
          {
            action: 'rename-or-add',
            selector: 'sbb-x',
            attribute: '*',
            attributeValue: '',
            replaceWith: 'x',
            defaultValue: 'x',
          },
        ]),
      ).toThrow("An attribute wildcard does not support 'defaultValue'.");
      expect(() =>
        createAttributeMigrationRule([
          {
            action: 'replace',
            selector: 'sbb-x',
            attribute: '*',
            attributeValue: 'x',
            replaceWith: 'first="a" second="b"',
          },
        ]),
      ).toThrow('A wildcard replacement must contain one valid attribute.');
    });
  });

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
              action: 'rename',
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
              action: 'rename',
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
              action: 'rename',
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

    describe('spelling-only rename', () => {
      const spellingRule = createAttributeMigrationRule([
        { action: 'rename', selector: 'h3', attribute: 'sbbBadge', replaceWith: 'sbb-badge' },
      ]);

      it('should rename camelCase to dash-case', async () => {
        expect(
          await MigrateLegacyTestUtils.migrateHtmlFile(
            '<h3 sbbBadge="4" [sbbBadgeHidden]="hidden">Text with a badge</h3>',
            spellingRule,
          ),
        ).toBe('<h3 sbb-badge="4" [sbbBadgeHidden]="hidden">Text with a badge</h3>');
      });

      it('should be idempotent', async () => {
        const template = '<h3 sbb-badge="4"></h3>';
        expect(await MigrateLegacyTestUtils.migrateHtmlFile(template, spellingRule)).toBe(template);
      });

      it('should skip when the target is on another node', async () => {
        const template = '<h3 sbbBadge="4" [sbb-badge]="x"></h3>';
        expect(await MigrateLegacyTestUtils.migrateHtmlFile(template, spellingRule)).toBe(template);
      });
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
      { action: 'remove', selector: 'sbb-button', attribute: 'svgIcon' },
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
          action: 'rename-or-add',
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
        createAttributeMigrationRule([
          { action: 'remove', selector: 'sbb-button', attribute: 'svgIcon' },
        ]),
      );

      expect(result).toBe(
        component(String.raw`"<sbb-button class=\"a\" [disabled]=\"d\">A</sbb-button>"`),
      );
      expectValidTypeScript(result);
    });

    it('should remove the whole line of a template written with `\\n` escapes', async () => {
      const result = await MigrateLegacyTestUtils.migrateTsFile(
        component(String.raw`'<sbb-button\n  svgIcon="a"\n  [disabled]="d"\n>A</sbb-button>'`),
        createAttributeMigrationRule([
          { action: 'remove', selector: 'sbb-button', attribute: 'svgIcon' },
        ]),
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
          createAttributeMigrationRule([
            { action: 'remove', selector: 'sbb-button', attribute: 'svgIcon' },
          ]),
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
          { action: 'rename', selector: 'sbb-button', attribute: 'iconName', replaceWith: 'name' },
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
        action: 'rename-or-add',
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
              action: 'rename-or-add',
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

  describe('fully replace', () => {
    const rule = createAttributeMigrationRule([
      { action: 'replace', selector: 'sbb-x', attribute: 'old', replaceWith: 'new="v"' },
    ]);
    const migrate = (html: string) => MigrateLegacyTestUtils.migrateHtmlFile(html, rule);

    it('should replace a static attribute with its value', async () => {
      expect(await migrate('<sbb-x old="a" id="i"></sbb-x>')).toBe(
        '<sbb-x new="v" id="i"></sbb-x>',
      );
    });

    it('should replace a bound input with its binding syntax', async () => {
      expect(await migrate('<sbb-x [old]="expr"></sbb-x>')).toBe('<sbb-x new="v"></sbb-x>');
    });

    it('should replace an output', async () => {
      expect(await migrate('<sbb-x (old)="fn()"></sbb-x>')).toBe('<sbb-x new="v"></sbb-x>');
    });

    it('should be idempotent', async () => {
      const once = await migrate('<sbb-x old="a"></sbb-x>');
      expect(await migrate(once)).toBe(once);
    });
  });

  describe('attribute value', () => {
    const rule = createAttributeMigrationRule([
      {
        action: 'rename',
        selector: 'sbb-x',
        attribute: 'mode',
        attributeValue: 'a',
        replaceWith: 'kind',
      },
      { action: 'remove', selector: 'sbb-y', attribute: 'mode', attributeValue: 'b' },
      {
        action: 'replace',
        selector: 'sbb-z',
        attribute: 'mode',
        attributeValue: 'a',
        replaceWith: `kind="a"`,
      },
    ]);
    const migrate = (html: string) => MigrateLegacyTestUtils.migrateHtmlFile(html, rule);

    it('should migrate only a matching static value', async () => {
      expect(await migrate('<sbb-x mode="a"></sbb-x><sbb-x mode="c"></sbb-x>')).toBe(
        '<sbb-x kind="a"></sbb-x><sbb-x mode="c"></sbb-x>',
      );
    });

    it('should match a quoted literal binding', async () => {
      expect(await migrate(`<sbb-x [mode]="'a'"></sbb-x><sbb-x [mode]="expr"></sbb-x>`)).toBe(
        `<sbb-x [kind]="'a'"></sbb-x><sbb-x [mode]="expr"></sbb-x>`,
      );
    });

    it('should remove only when matching the value', async () => {
      expect(await migrate('<sbb-y mode="b"></sbb-y><sbb-y mode="c"></sbb-y>')).toBe(
        '<sbb-y></sbb-y><sbb-y mode="c"></sbb-y>',
      );
    });

    it('should work with the replace action', async () => {
      expect(await migrate('<sbb-z mode="a"></sbb-z>')).toBe('<sbb-z kind="a"></sbb-z>');
    });
  });

  describe('value replacement', () => {
    const rule = createAttributeMigrationRule([
      {
        action: 'replace-value',
        selector: 'sbb-menu',
        attribute: '*',
        attributeValue: 'sbbHeaderMenu',
        replaceValueWith: 'sbbMenu',
      },
    ]);

    it('should replace reference values without changing reference names', async () => {
      const source =
        `<sbb-menu #menu="sbbHeaderMenu" #another='sbbHeaderMenu' ` +
        'ref-third=sbbHeaderMenu #unchanged="other"></sbb-menu>' +
        '<other-element #menu="sbbHeaderMenu"></other-element>';
      const expected =
        `<sbb-menu #menu="sbbMenu" #another='sbbMenu' ` +
        'ref-third="sbbMenu" #unchanged="other"></sbb-menu>' +
        '<other-element #menu="sbbHeaderMenu"></other-element>';
      const once = await MigrateLegacyTestUtils.migrateHtmlFile(source, rule);
      expect(once).toBe(expected);
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(once, rule)).toBe(expected);
    });

    it('should replace all matching values and preserve binding semantics', async () => {
      const source =
        `<sbb-menu #menu="sbbHeaderMenu" text="sbbHeaderMenu" ` +
        `[literal]="'sbbHeaderMenu'" [expression]="sbbHeaderMenu" ` +
        `(event)="sbbHeaderMenu" [(model)]="sbbHeaderMenu"></sbb-menu>`;
      expect(await MigrateLegacyTestUtils.migrateHtmlFile(source, rule)).toBe(
        `<sbb-menu #menu="sbbMenu" text="sbbMenu" ` +
          `[literal]="'sbbMenu'" [expression]="sbbMenu" ` +
          `(event)="sbbMenu" [(model)]="sbbMenu"></sbb-menu>`,
      );
    });

    it('should preserve string literal semantics in both quote styles', async () => {
      const literalRule = createAttributeMigrationRule([
        {
          action: 'replace-value',
          selector: 'sbb-menu',
          attribute: '*',
          attributeValue: 'old',
          replaceValueWith: 'new',
        },
      ]);
      const source = `<sbb-menu [first]="'old'" [second]='"old"'></sbb-menu>`;
      const migrated = await MigrateLegacyTestUtils.migrateHtmlFile(source, literalRule);
      expect(migrated).toBe(`<sbb-menu [first]="'new'" [second]='"new"'></sbb-menu>`);
      const parsed = parseTemplate(migrated, 'test.html');
      expect(parsed.errors).toBeNull();
      const element = parsed.nodes[0];
      expect(element).toBeInstanceOf(TmplAstElement);
      if (!(element instanceof TmplAstElement)) {
        throw new Error('Expected an element');
      }
      for (const input of element.inputs) {
        expect(input.value).toBeInstanceOf(ASTWithSource);
        if (
          !(input.value instanceof ASTWithSource) ||
          !(input.value.ast instanceof LiteralPrimitive)
        ) {
          throw new Error('Expected a string literal');
        }
        expect(input.value.ast.value).toBe('new');
      }
    });

    it('should reject replacement values requiring escaping', () => {
      for (const replaceValueWith of ['&amp;', '<', '>', '"', "'", '\\', '\n']) {
        expect(() =>
          createAttributeMigrationRule([
            {
              action: 'replace-value',
              selector: 'sbb-menu',
              attribute: '*',
              attributeValue: 'old',
              replaceValueWith,
            },
          ]),
        ).toThrow("'replaceValueWith' does not support HTML or expression special characters.");
      }
    });

    it('should support named references and empty values', async () => {
      const named = createAttributeMigrationRule([
        {
          action: 'replace-value',
          selector: '*',
          attribute: 'menu',
          attributeValue: '',
          replaceValueWith: 'new',
        },
      ]);
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-menu #menu #other=""></sbb-menu>',
          named,
        ),
      ).toBe('<sbb-menu #menu="new" #other=""></sbb-menu>');
      const empty = createAttributeMigrationRule([
        {
          action: 'replace-value',
          selector: 'sbb-menu',
          attribute: '*',
          attributeValue: 'old',
          replaceValueWith: '',
        },
      ]);
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile('<sbb-menu #menu=old></sbb-menu>', empty),
      ).toBe('<sbb-menu #menu=""></sbb-menu>');
    });

    it('should preserve inline template quoting and respect output filters', async () => {
      const source = [
        "import { Component } from '@angular/core';",
        '@Component({',
        `  template: '<sbb-menu #menu="sbbHeaderMenu"></sbb-menu>',`,
        '})',
        'export class AppComponent {}',
      ].join('\n');
      expect(await MigrateLegacyTestUtils.migrateTsFile(source, rule)).toBe(
        source.replace('sbbHeaderMenu', 'sbbMenu'),
      );
      const outputOnly = createAttributeMigrationRule([
        {
          action: 'replace-value',
          selector: 'sbb-menu',
          attribute: '*',
          attributeValue: 'sbbHeaderMenu',
          replaceValueWith: 'sbbMenu',
          onlyOutputs: true,
        },
      ]);
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-menu #menu="sbbHeaderMenu" (event)="sbbHeaderMenu"></sbb-menu>',
          outputOnly,
        ),
      ).toBe('<sbb-menu #menu="sbbHeaderMenu" (event)="sbbMenu"></sbb-menu>');
    });

    it('should reject incompatible replacement options', () => {
      for (const options of [{ replaceWith: 'name' }, { defaultValue: 'default' }]) {
        expect(() =>
          Reflect.apply(createAttributeMigrationRule, undefined, [
            [
              {
                action: 'replace-value',
                selector: 'sbb-x',
                attribute: '*',
                attributeValue: 'old',
                replaceValueWith: '',
                ...options,
              },
            ],
          ]),
        ).toThrow('Invalid attribute migration action or options.');
      }
    });
  });

  describe('output filters', () => {
    const migrate = (
      html: string,
      migration: { onlyOutputs?: boolean; excludeOutputs?: boolean; remove?: boolean },
    ) =>
      MigrateLegacyTestUtils.migrateHtmlFile(
        html,
        createAttributeMigrationRule([
          migration.remove
            ? {
                action: 'remove',
                selector: 'sbb-x',
                attribute: 'opened',
                onlyOutputs: migration.onlyOutputs,
                excludeOutputs: migration.excludeOutputs,
              }
            : {
                action: 'rename',
                selector: 'sbb-x',
                attribute: 'opened',
                replaceWith: 'open',
                onlyOutputs: migration.onlyOutputs,
                excludeOutputs: migration.excludeOutputs,
              },
        ]),
      );

    describe('onlyOutputs', () => {
      it('should rename the output and leave the input', async () => {
        expect(
          await migrate('<sbb-x [opened]="o" (opened)="f()"></sbb-x>', { onlyOutputs: true }),
        ).toBe('<sbb-x [opened]="o" (open)="f()"></sbb-x>');
      });

      it('should rename the output when it is written first', async () => {
        expect(
          await migrate('<sbb-x (opened)="f()" [opened]="o"></sbb-x>', { onlyOutputs: true }),
        ).toBe('<sbb-x (open)="f()" [opened]="o"></sbb-x>');
      });

      it('should not rename a static attribute or an input', async () => {
        const html = '<sbb-x opened [opened]="o"></sbb-x>';
        expect(await migrate(html, { onlyOutputs: true })).toBe(html);
      });

      it('should remove only the output', async () => {
        expect(
          await migrate('<sbb-x [opened]="o" (opened)="f()"></sbb-x>', {
            onlyOutputs: true,
            remove: true,
          }),
        ).toBe('<sbb-x [opened]="o"></sbb-x>');
      });
    });

    describe('excludeOutputs', () => {
      it('should rename the input and leave the output', async () => {
        expect(
          await migrate('<sbb-x (opened)="f()" [opened]="o"></sbb-x>', { excludeOutputs: true }),
        ).toBe('<sbb-x (opened)="f()" [open]="o"></sbb-x>');
      });

      it('should rename a static attribute', async () => {
        expect(await migrate('<sbb-x opened></sbb-x>', { excludeOutputs: true })).toBe(
          '<sbb-x open></sbb-x>',
        );
      });

      it('should not rename an output', async () => {
        const html = '<sbb-x (opened)="f()"></sbb-x>';
        expect(await migrate(html, { excludeOutputs: true })).toBe(html);
      });
    });
  });
});
