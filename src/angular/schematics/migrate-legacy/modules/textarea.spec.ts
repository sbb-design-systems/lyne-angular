import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { createTextareaMigrationRule, TEXTAREA_MIGRATIONS } from './textarea.cjs';

describe('sbb-textarea', () => {
  const COUNTER = '<sbb-form-field-text-counter></sbb-form-field-text-counter>';
  const defaultMigration: Rule = () => {
    const scope = { root: '', excludedRoots: [] };
    return chain([
      createCommentMigrationRule(TEXTAREA_MIGRATIONS.comments, scope),
      createTextareaMigrationRule(scope),
    ]);
  };
  /** Wraps the lines in a `sbb-form-field`, each indented by one level. */
  const inField = (...lines: string[]): string =>
    [
      '<sbb-form-field>',
      ...lines.map((line) => (line.startsWith(' ') ? line : `  ${line}`)),
      '</sbb-form-field>',
    ].join('\n');

  /** Inline templates are only detected on a `Component` imported from `@angular/core`. */
  const inlineComponent = (template: string): string =>
    [
      "import { Component } from '@angular/core';",
      `@Component({ template: '${template}' })`,
      'export class AppComponent {}',
    ].join('\n');

  describe('without maxlength', () => {
    it('should replace sbb-textarea with textarea', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-textarea></sbb-textarea>',
          defaultMigration,
        ),
      ).toBe('<textarea></textarea>');
    });

    it('should keep attributes and content', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-textarea formControlName="comment" rows="3">Hello</sbb-textarea>',
          defaultMigration,
        ),
      ).toBe('<textarea formControlName="comment" rows="3">Hello</textarea>');
    });

    it('should replace multiline elements', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          [
            '<div>',
            '  <sbb-textarea',
            '    formControlName="comment"',
            '  ></sbb-textarea>',
            '</div>',
          ].join('\n'),
          defaultMigration,
        ),
      ).toBe(
        ['<div>', '  <textarea', '    formControlName="comment"', '  ></textarea>', '</div>'].join(
          '\n',
        ),
      );
    });

    it('should replace every sbb-textarea of a template', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          ['<sbb-textarea></sbb-textarea>', '<div><sbb-textarea></sbb-textarea></div>'].join('\n'),
          defaultMigration,
        ),
      ).toBe(['<textarea></textarea>', '<div><textarea></textarea></div>'].join('\n'));
    });

    it('should replace elements with a structural directive or inside control flow', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-textarea *ngIf="show"></sbb-textarea>',
          defaultMigration,
        ),
      ).toBe('<textarea *ngIf="show"></textarea>');
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '@if (show) {\n  <sbb-textarea></sbb-textarea>\n}',
          defaultMigration,
        ),
      ).toBe('@if (show) {\n  <textarea></textarea>\n}');
    });
  });

  describe('with maxlength inside a sbb-form-field', () => {
    it.each([
      ['a static attribute', 'maxlength="100"'],
      ['a single-quoted attribute', "maxlength='100'"],
      ['an attribute in another casing', 'maxLength="100"'],
      ['an interpolated attribute', 'maxlength="{{ max }}"'],
      ['a property binding', '[maxlength]="max"'],
      ['an attribute binding', '[attr.maxlength]="max"'],
    ])(
      'should replace the element and add the counter after it for %s',
      async (_name, attribute) => {
        expect(
          await MigrateLegacyTestUtils.migrateHtmlFile(
            inField(`<sbb-textarea ${attribute}></sbb-textarea>`),
            defaultMigration,
          ),
        ).toBe(inField(`<textarea ${attribute}></textarea>`, `  ${COUNTER}`));
      },
    );

    it('should indent the counter like the textarea', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          [
            '<sbb-form-field>',
            '  <div>',
            '    <sbb-textarea maxlength="100"></sbb-textarea>',
            '  </div>',
            '</sbb-form-field>',
          ].join('\n'),
          defaultMigration,
        ),
      ).toBe(
        [
          '<sbb-form-field>',
          '  <div>',
          '    <textarea maxlength="100"></textarea>',
          `    ${COUNTER}`,
          '  </div>',
          '</sbb-form-field>',
        ].join('\n'),
      );
    });

    it('should keep the content of the textarea', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          inField(
            '<sbb-textarea maxlength="100">Hello</sbb-textarea>',
            '  <sbb-hint>Hint</sbb-hint>',
          ),
          defaultMigration,
        ),
      ).toBe(
        [
          '<sbb-form-field>',
          '  <textarea maxlength="100">Hello</textarea>',
          `  ${COUNTER}`,
          '  <sbb-hint>Hint</sbb-hint>',
          '</sbb-form-field>',
        ].join('\n'),
      );
    });

    it('should add the counter after multiline elements', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          [
            '<sbb-form-field>',
            '  <sbb-textarea',
            '    maxlength="100"',
            '    formControlName="comment"',
            '  ></sbb-textarea>',
            '</sbb-form-field>',
          ].join('\n'),
          defaultMigration,
        ),
      ).toBe(
        [
          '<sbb-form-field>',
          '  <textarea',
          '    maxlength="100"',
          '    formControlName="comment"',
          '  ></textarea>',
          `  ${COUNTER}`,
          '</sbb-form-field>',
        ].join('\n'),
      );
    });

    it('should handle elements with a structural directive', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          inField('<sbb-textarea *ngIf="show" maxlength="100"></sbb-textarea>'),
          defaultMigration,
        ),
      ).toBe(inField('<textarea *ngIf="show" maxlength="100"></textarea>', `  ${COUNTER}`));
    });

    it('should handle elements inside control flow', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          [
            '<sbb-form-field>',
            '  @if (show) {',
            '    <sbb-textarea maxlength="100"></sbb-textarea>',
            '  }',
            '</sbb-form-field>',
          ].join('\n'),
          defaultMigration,
        ),
      ).toBe(
        [
          '<sbb-form-field>',
          '  @if (show) {',
          '    <textarea maxlength="100"></textarea>',
          `    ${COUNTER}`,
          '  }',
          '</sbb-form-field>',
        ].join('\n'),
      );
    });
  });

  describe('safety', () => {
    it('should not touch other elements', async () => {
      const source = [
        '<textarea maxlength="100"></textarea>',
        '<sbb-textarea-other maxlength="100"></sbb-textarea-other>',
        '<sbb-input maxlength="100"></sbb-input>',
      ].join('\n');

      expect(await MigrateLegacyTestUtils.migrateHtmlFile(source, defaultMigration)).toBe(source);
    });

    it('should handle several elements in one template', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          [
            '<sbb-textarea></sbb-textarea>',
            '<sbb-textarea maxlength="10"></sbb-textarea>',
            '<sbb-form-field>',
            '  <sbb-textarea maxlength="10"></sbb-textarea>',
            '</sbb-form-field>',
          ].join('\n'),
          defaultMigration,
        ),
      ).toBe(
        [
          '<textarea></textarea>',
          '<textarea maxlength="10"></textarea>',
          '<sbb-form-field>',
          '  <textarea maxlength="10"></textarea>',
          `  ${COUNTER}`,
          '</sbb-form-field>',
        ].join('\n'),
      );
    });

    it('should be idempotent', async () => {
      for (const source of [
        '<sbb-textarea></sbb-textarea>',
        '<sbb-textarea maxlength="100"></sbb-textarea>',
        inField('<sbb-textarea maxlength="100"></sbb-textarea>'),
      ]) {
        const once = await MigrateLegacyTestUtils.migrateHtmlFile(source, defaultMigration);
        expect(await MigrateLegacyTestUtils.migrateHtmlFile(once, defaultMigration)).toBe(once);
      }
    });
  });

  describe('inline templates', () => {
    it('should replace sbb-textarea with textarea', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateTsFile(
          inlineComponent('<sbb-textarea></sbb-textarea>'),
          defaultMigration,
        ),
      ).toBe(inlineComponent('<textarea></textarea>'));
    });

    it('should add the counter without line breaks', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateTsFile(
          inlineComponent(
            '<sbb-form-field><sbb-textarea maxlength="100"></sbb-textarea></sbb-form-field>',
          ),
          defaultMigration,
        ),
      ).toBe(
        inlineComponent(
          `<sbb-form-field><textarea maxlength="100"></textarea>${COUNTER}</sbb-form-field>`,
        ),
      );
    });

    it('should be idempotent', async () => {
      for (const template of [
        '<sbb-textarea maxlength="100"></sbb-textarea>',
        '<sbb-form-field><sbb-textarea maxlength="100"></sbb-textarea></sbb-form-field>',
      ]) {
        const once = await MigrateLegacyTestUtils.migrateTsFile(
          inlineComponent(template),
          defaultMigration,
        );
        const twice = await MigrateLegacyTestUtils.migrateTsFile(once, defaultMigration);

        expect(twice).toBe(once);
      }
    });
  });
});
