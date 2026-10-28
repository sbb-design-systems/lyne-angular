import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { CHECKBOX_PANEL_MIGRATIONS } from './checkbox-panel.cjs';

describe('sbb-checkbox-panel', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, selectors } = CHECKBOX_PANEL_MIGRATIONS;
    const scope = { root: '', excludedRoots: [] };
    return chain([
      createImportPathMigrationRule(importPaths, scope),
      createCommentMigrationRule(comments, scope),
      createTemplateSelectorMigrationRule(selectors, scope),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('import paths', () => {
    it('should rewrite checkbox-panel imports', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbCheckboxPanelModule } from '@sbb-esta/angular/checkbox-panel';",
          "export { SbbCheckboxPanelModule } from '@sbb-esta/angular/checkbox-panel';",
          "import { SbbCheckboxModule } from '@sbb-esta/angular/checkbox';",
        ].join('\n'),
      );

      expect(content).toContain(
        "import { SbbCheckboxPanelModule } from '@sbb-esta/lyne-angular/checkbox-panel';",
      );
      expect(content).toContain(
        "export { SbbCheckboxPanelModule } from '@sbb-esta/lyne-angular/checkbox-panel';",
      );
      expect(content).toContain("from '@sbb-esta/angular/checkbox';");
    });
  });

  describe('content elements', () => {
    it.each([
      ['sbb-checkbox-panel-subtitle', 'subtext'],
      ['sbb-checkbox-panel-warning', 'suffix'],
      ['sbb-checkbox-panel-note', 'suffix'],
    ])('should replace <%s> with a span in the %s slot', async (tag, slot) => {
      expect(await migrateTemplate(`<${tag}>Text</${tag}>`)).toBe(
        `<span slot="${slot}">Text</span>`,
      );
    });

    it('should migrate all content elements of a panel', async () => {
      expect(
        await migrateTemplate(
          [
            '<sbb-checkbox-panel>',
            '  Zürich HB - Basel SBB',
            '  <sbb-checkbox-panel-subtitle class="y">Direct</sbb-checkbox-panel-subtitle>',
            '  <sbb-checkbox-panel-warning class="w">Not possible</sbb-checkbox-panel-warning>',
            '  <sbb-checkbox-panel-note class="x">CHF 250.00</sbb-checkbox-panel-note>',
            '</sbb-checkbox-panel>',
          ].join('\n'),
        ),
      ).toBe(
        [
          '<sbb-checkbox-panel>',
          '  Zürich HB - Basel SBB',
          '  <span slot="subtext" class="y">Direct</span>',
          '  <span slot="suffix" class="w">Not possible</span>',
          '  <span slot="suffix" class="x">CHF 250.00</span>',
          '</sbb-checkbox-panel>',
        ].join('\n'),
      );
    });
  });

  describe('unsupported', () => {
    it.each([
      ['<sbb-checkbox-panel labelPosition="before">Text</sbb-checkbox-panel>', 'labelPosition'],
      ['<sbb-checkbox-panel [labelPosition]="pos">Text</sbb-checkbox-panel>', 'labelPosition'],
      [
        '<sbb-checkbox-panel (indeterminateChange)="x($event)">Text</sbb-checkbox-panel>',
        'indeterminateChange',
      ],
    ])('should mark %s', async (template, name) => {
      const content = await migrateTemplate(template);

      expect(content).toContain(`FIXME: the \`${name}\``);
      expect(content.endsWith(template)).toBe(true);
    });

    it('should mark the panel group wrapper', async () => {
      const template =
        '<div class="sbb-checkbox-panel-group sbb-col-tablet-2"><sbb-checkbox-panel>A</sbb-checkbox-panel></div>';
      const content = await migrateTemplate(template);

      expect(content).toContain('FIXME: Consider using a `sbb-checkbox-group`.');
      expect(content.endsWith(template)).toBe(true);
    });
  });
});
