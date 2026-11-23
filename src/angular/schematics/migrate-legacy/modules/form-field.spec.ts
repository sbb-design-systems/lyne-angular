import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import type { ModuleMigrations } from '../common.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { FORM_FIELD_MIGRATIONS } from './form-field.cjs';

describe('sbb-form-field', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, selectors, customRules } = FORM_FIELD_MIGRATIONS as Required<
      Pick<ModuleMigrations, 'importPaths' | 'selectors' | 'customRules'>
    >;
    return chain([
      createImportPathMigrationRule(importPaths),
      createTemplateSelectorMigrationRule(selectors),
      ...customRules.map((rule) => rule()),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('should migrate', () => {
    it('imports', async () => {
      const content = await migrateTsFile(
        "import { SbbFormFieldModule } from '@sbb-esta/angular/form-field';",
      );
      expect(content).toBe(
        "import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';",
      );
    });

    it('selector', async () => {
      const migrated = await migrateTemplate(
        [
          '<sbb-form-field>',
          '  <sbb-label>Test</sbb-label>',
          '  <input value="Test" />',
          '</sbb-form-field>',
        ].join('\n'),
      );
      expect(migrated).toBe(
        [
          '<sbb-form-field>',
          '  <label>Test</label>',
          '  <input value="Test" />',
          '</sbb-form-field>',
        ].join('\n'),
      );
    });

    describe('custom rule', () => {
      it('full migration in controller', async () => {
        const content = await migrateTsFile(
          [
            "import { Component } from '@angular/core';",
            '',
            '@Component({',
            "  selector: 'app-root',",
            '  template: `',
            '    <sbb-form-field label="testLabel">',
            '      <input placeholder="test"/>',
            '    </sbb-form-field>',
            '    <sbb-form-field [label]="myLabel">',
            '      <input placeholder="test"/>',
            '    </sbb-form-field>',
            '  `',
            '})',
            'export class AppComponent {',
            '  protected myLabel = "My label"',
            '}',
          ].join('\n'),
        );
        expect(content).toBe(
          [
            "import { Component } from '@angular/core';",
            '',
            '@Component({',
            "  selector: 'app-root',",
            '  template: `',
            '    <sbb-form-field>',
            '      <label>testLabel</label>',
            '      <input placeholder="test"/>',
            '    </sbb-form-field>',
            '    <sbb-form-field>',
            '      <label>{{ myLabel }}</label>',
            '      <input placeholder="test"/>',
            '    </sbb-form-field>',
            '  `',
            '})',
            'export class AppComponent {',
            '  protected myLabel = "My label"',
            '}',
          ].join('\n'),
        );
      });

      it('moves static label', async () => {
        expect(
          await migrateTemplate(
            '<sbb-form-field appearance="x" label="Name"><input /></sbb-form-field>',
          ),
        ).toBe('<sbb-form-field appearance="x"><label>Name</label><input /></sbb-form-field>');
      });

      it.each([
        ['[label]="name"', '{{ name }}'],
        ['label="{{ name }}"', '{{ name }}'],
        ['label="Hello {{ name }}"', 'Hello {{ name }}'],
        ['label="A &amp; B"', 'A &amp; B'],
        ['label="A <b> B"', 'A &lt;b> B'],
        ['[label]="a < b"', '{{ a &lt; b }}'],
      ])('moves %s into a label', async (attribute, text) => {
        expect(await migrateTemplate(`<sbb-form-field ${attribute}></sbb-form-field>`)).toBe(
          `<sbb-form-field><label>${text}</label></sbb-form-field>`,
        );
      });

      it.each(['label', 'label=""', "label=''"])(
        'removes %s without adding a label',
        async (attribute) => {
          expect(
            await migrateTemplate(
              `<sbb-form-field ${attribute} appearance="x"><input /></sbb-form-field>`,
            ),
          ).toBe('<sbb-form-field appearance="x"><input /></sbb-form-field>');
        },
      );

      it('keeps a potentially empty bound expression', async () => {
        expect(await migrateTemplate(`<sbb-form-field [label]="''"></sbb-form-field>`)).toBe(
          `<sbb-form-field><label>{{ '' }}</label></sbb-form-field>`,
        );
      });

      it('removes a label on its own line', async () => {
        expect(
          await migrateTemplate(
            '<sbb-form-field\n  label="Name"\n  appearance="x"\n><input /></sbb-form-field>',
          ),
        ).toBe(
          '<sbb-form-field\n  appearance="x"\n>\n  <label>Name</label><input /></sbb-form-field>',
        );
      });

      it('preserves child indentation and CRLF line endings', async () => {
        expect(
          await migrateTemplate(
            '\t<sbb-form-field label="Name">\r\n\t\t<input />\r\n\t</sbb-form-field>',
          ),
        ).toBe(
          '\t<sbb-form-field>\r\n\t\t<label>Name</label>\r\n\t\t<input />\r\n\t</sbb-form-field>',
        );
      });

      it('indents a label in an empty multiline field', async () => {
        expect(await migrateTemplate('  <sbb-form-field label="Name">\n  </sbb-form-field>')).toBe(
          '  <sbb-form-field>\n    <label>Name</label>\n  </sbb-form-field>',
        );
      });

      it('places a label on a new line when existing content starts inline', async () => {
        expect(
          await migrateTemplate('<sbb-form-field label="Name"><input />\n</sbb-form-field>'),
        ).toBe('<sbb-form-field>\n  <label>Name</label><input />\n</sbb-form-field>');
      });

      it('migrates an inline template with escaped quotes', async () => {
        const source = `import { Component } from '@angular/core';
@Component({ template: "<sbb-form-field label=\\"Name\\"><input /></sbb-form-field>" }) class Example {}`;
        expect(await migrateTsFile(source)).toBe(
          `import { Component } from '@angular/core';
@Component({ template: "<sbb-form-field><label>Name</label><input /></sbb-form-field>" }) class Example {}`,
        );
      });

      it('leaves unrelated elements and attribute bindings unchanged', async () => {
        const template =
          '<other-element label="Name"></other-element><sbb-form-field [attr.label]="name"></sbb-form-field>';
        expect(await migrateTemplate(template)).toBe(template);
      });

      it('is idempotent', async () => {
        const once = await migrateTemplate('<sbb-form-field label="Name"></sbb-form-field>');
        expect(await migrateTemplate(once)).toBe(once);
      });
    });
  });
});
