import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { RADIO_BUTTON_MIGRATIONS } from './radio-button.cjs';

describe('sbb-radio-button', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, selectors, customRules } = RADIO_BUTTON_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
      createTemplateSelectorMigrationRule(selectors),
      ...customRules!.map((rule) => rule()),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('typescript', () => {
    it('should rewrite the import path and rename the group type', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbRadioButtonModule, SbbRadioGroup } from '@sbb-esta/angular/radio-button';",
          'export const group = SbbRadioGroup;',
        ].join('\n'),
      );
      expect(content).toContain(
        "import { SbbRadioButtonModule, SbbRadioButtonGroup } from '@sbb-esta/lyne-angular/radio-button';",
      );
      expect(content).toContain('export const group = SbbRadioButtonGroup;');
    });
  });

  describe('selector', () => {
    it('should rename sbb-radio-group', async () => {
      expect(
        await migrateTemplate(
          '<sbb-radio-group><sbb-radio-button value="a">A</sbb-radio-button></sbb-radio-group>',
        ),
      ).toBe(
        '<sbb-radio-button-group><sbb-radio-button value="a">A</sbb-radio-button></sbb-radio-button-group>',
      );
    });
  });

  describe('comments', () => {
    it.each([['<sbb-radio-group [selected]="s"></sbb-radio-group>', 'selected']])(
      'should comment %s',
      async (template, name) => {
        expect(await migrateTemplate(template)).toContain(`FIXME: '${name}'`);
      },
    );

    it('should not comment a plain radio button', async () => {
      const template = '<sbb-radio-button value="a">A</sbb-radio-button>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });

  describe('orientation', () => {
    it.each([
      ['sbb-radio-group-vertical', 'vertical'],
      ['sbb-radio-group-horizontal', 'horizontal'],
      ['sbb-checkbox-group-vertical', 'vertical'],
      ['sbb-checkbox-group-horizontal', 'horizontal'],
    ])('should replace the class %s', async (cls, orientation) => {
      expect(await migrateTemplate(`<sbb-radio-group class="${cls}"></sbb-radio-group>`)).toBe(
        `<sbb-radio-button-group orientation="${orientation}"></sbb-radio-button-group>`,
      );
    });

    it('should not override an existing orientation', async () => {
      const template =
        '<sbb-radio-button-group class="sbb-radio-group-vertical" orientation="horizontal"></sbb-radio-button-group>';
      expect(await migrateTemplate(template)).toBe(template);
    });

    it('should leave unrelated classes and other elements', async () => {
      const template =
        '<sbb-radio-button-group class="x"></sbb-radio-button-group><div class="sbb-radio-group-vertical"></div>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });
});
