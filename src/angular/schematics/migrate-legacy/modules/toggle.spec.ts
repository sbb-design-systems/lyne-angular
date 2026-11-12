import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { TOGGLE_MIGRATIONS } from './toggle.cjs';

describe('sbb-toggle', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, attributes, selectors, customRules } = TOGGLE_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
      createTemplateSelectorMigrationRule(selectors),
      createAttributeMigrationRule(attributes),
      ...customRules!.map((rule) => rule({ root: '', excludedRoots: [] })),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('imports and types', () => {
    it('should rewrite the import path', async () => {
      expect(
        await migrateTsFile(
          `import { SbbToggleModule } from '@sbb-esta/angular/toggle';\nconsole.log(SbbToggleModule);`,
        ),
      ).toContain(`from '@sbb-esta/lyne-angular/toggle'`);
    });

    it('should replace SbbRadioChange with Event', async () => {
      const result = await migrateTsFile(
        [
          `import { SbbRadioChange } from '@sbb-esta/angular/toggle';`,
          'export function f(e: SbbRadioChange) {}',
        ].join('\n'),
      );
      expect(result).toContain('f(e: Event)');
    });
  });

  describe('FIXME comments', () => {
    it.each([
      '<sbb-toggle-subtitle>S</sbb-toggle-subtitle>',
      '<sbb-toggle-details>D</sbb-toggle-details>',
      '<sbb-toggle selected="x"></sbb-toggle>',
      '<sbb-toggle-option subtitle="s" value="a">A</sbb-toggle-option>',
    ])('should flag %s', async (template) => {
      expect(await migrateTemplate(template)).toContain('FIXME');
    });

    it('should flag sbb-toggle-icon', async () => {
      expect(await migrateTemplate('<sbb-toggle-icon></sbb-toggle-icon>')).toContain(
        'FIXME: this component has no counterpart in Lyne.',
      );
    });

    it('should not flag a plain toggle', async () => {
      expect(
        await migrateTemplate(
          '<sbb-toggle><sbb-toggle-option value="a">A</sbb-toggle-option></sbb-toggle>',
        ),
      ).not.toContain('FIXME');
    });
  });

  describe('attributes', () => {
    it.each([
      ['svgIcon="x"', 'iconName="x"'],
      ['[svgIcon]="y"', '[iconName]="y"'],
    ])('should rename %s', async (from, to) => {
      expect(await migrateTemplate(`<sbb-toggle-option ${from}>A</sbb-toggle-option>`)).toBe(
        `<sbb-toggle-option ${to}>A</sbb-toggle-option>`,
      );
    });
  });

  describe('sbb-toggle-label', () => {
    it('should be unwrapped', async () => {
      expect(
        await migrateTemplate(
          '<sbb-toggle-option value="a"><sbb-toggle-label>Option 2</sbb-toggle-label></sbb-toggle-option>',
        ),
      ).toBe('<sbb-toggle-option value="a">Option 2</sbb-toggle-option>');
    });
  });

  describe('sbb-toggle-option label', () => {
    it('should move a static label into the content', async () => {
      expect(
        await migrateTemplate('<sbb-toggle-option label="Option 1" value="a"></sbb-toggle-option>'),
      ).toBe('<sbb-toggle-option value="a">Option 1</sbb-toggle-option>');
    });

    it('should turn a bound label into an interpolation', async () => {
      expect(
        await migrateTemplate(
          '<sbb-toggle-option [label]="item.name" value="a"></sbb-toggle-option>',
        ),
      ).toBe('<sbb-toggle-option value="a">{{ item.name }}</sbb-toggle-option>');
    });

    it('should handle a self-closing option', async () => {
      expect(await migrateTemplate('<sbb-toggle-option label="A" value="a" />')).toBe(
        '<sbb-toggle-option value="a">A</sbb-toggle-option>',
      );
    });

    it('should replace whitespace-only content', async () => {
      expect(await migrateTemplate('<sbb-toggle-option label="A">\n</sbb-toggle-option>')).toBe(
        '<sbb-toggle-option>A</sbb-toggle-option>',
      );
    });

    it('should keep the label when the option has content', async () => {
      const template = '<sbb-toggle-option label="A">B</sbb-toggle-option>';
      expect(await migrateTemplate(template)).toBe(template);
    });

    it('should be idempotent', async () => {
      const once = await migrateTemplate('<sbb-toggle-option label="A"></sbb-toggle-option>');
      expect(await migrateTemplate(once)).toBe(once);
    });
  });
});
