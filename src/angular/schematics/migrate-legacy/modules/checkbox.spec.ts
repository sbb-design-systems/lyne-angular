import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { CHECKBOX_MIGRATIONS, convertWrapperToCheckboxGroupMigration } from './checkbox.cjs';

describe('sbb-checkbox', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, selectors } = CHECKBOX_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTemplateSelectorMigrationRule(selectors),
      convertWrapperToCheckboxGroupMigration(),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('import paths', () => {
    it('should rewrite checkbox imports', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbCheckboxModule } from '@sbb-esta/angular/checkbox';",
          "export { SbbCheckboxModule } from '@sbb-esta/angular/checkbox';",
          "import { SbbIconModule } from '@sbb-esta/angular/icon';",
        ].join('\n'),
      );

      expect(content).toContain(
        "import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';",
      );
      expect(content).toContain(
        "export { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';",
      );
      expect(content).toContain("from '@sbb-esta/angular/icon';");
    });
  });

  describe('unsupported', () => {
    it.each([
      ['<sbb-checkbox labelPosition="before">Text</sbb-checkbox>', 'labelPosition'],
      ['<sbb-checkbox [labelPosition]="pos">Text</sbb-checkbox>', 'labelPosition'],
      [
        '<sbb-checkbox (indeterminateChange)="onChange($event)">Text</sbb-checkbox>',
        'indeterminateChange',
      ],
    ])('should mark %s', async (template, name) => {
      const content = await migrateTemplate(template);

      expect(content).toContain(`FIXME: the \`${name}\``);
      expect(content.endsWith(template)).toBe(true);
    });

    it('should mark SBB_CHECKBOX_DEFAULT_OPTIONS usages', async () => {
      const content = await migrateTsFile(
        [
          "import { SBB_CHECKBOX_DEFAULT_OPTIONS } from '@sbb-esta/angular/checkbox';",
          '',
          'export const providers = [',
          "  { provide: SBB_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } },",
          '];',
        ].join('\n'),
      );

      expect(content).toContain('// FIXME: SBB_CHECKBOX_DEFAULT_OPTIONS does not exist in lyne.');
    });

    it('should not mark supported usages', async () => {
      const template =
        '<sbb-checkbox value="a" checked (change)="onChange($event)">Text</sbb-checkbox>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });

  describe('group wrapper', () => {
    it.each(['vertical', 'horizontal'])('should migrate the %s wrapper', async (orientation) => {
      expect(
        await migrateTemplate(
          [
            `<div class="sbb-checkbox-group-${orientation}">`,
            '  <sbb-checkbox value="a">A</sbb-checkbox>',
            '</div>',
          ].join('\n'),
        ),
      ).toBe(
        [
          `<sbb-checkbox-group orientation="${orientation}">`,
          '  <sbb-checkbox value="a">A</sbb-checkbox>',
          '</sbb-checkbox-group>',
        ].join('\n'),
      );
    });

    it('should keep other classes, attributes and bindings', async () => {
      expect(
        await migrateTemplate(
          '<div id="x" class="foo sbb-checkbox-group-vertical bar" [hidden]="h" (click)="c()"></div>',
        ),
      ).toBe(
        '<sbb-checkbox-group orientation="vertical" id="x" class="foo bar" [hidden]="h" (click)="c()"></sbb-checkbox-group>',
      );
    });

    it('should not touch other elements', async () => {
      const template = '<div class="foo sbb-checkbox-group"></div>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });
});
