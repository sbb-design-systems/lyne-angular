import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { RADIO_BUTTON_PANEL_MIGRATIONS } from './radio-button-panel.cjs';

describe('sbb-radio-button-panel', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, selectors } = RADIO_BUTTON_PANEL_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createTemplateSelectorMigrationRule(selectors),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  it('should rewrite radio-button-panel imports', async () => {
    const content = await migrateTsFile(
      [
        "import { SbbRadioButtonPanelModule } from '@sbb-esta/angular/radio-button-panel';",
        "export { SbbRadioButtonPanelModule } from '@sbb-esta/angular/radio-button-panel';",
        "import { SbbRadioButtonModule } from '@sbb-esta/angular/radio-button';",
      ].join('\n'),
    );

    expect(content).toContain(
      "import { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';",
    );
    expect(content).toContain(
      "export { SbbRadioButtonPanelModule } from '@sbb-esta/lyne-angular/radio-button-panel';",
    );
    expect(content).toContain("from '@sbb-esta/angular/radio-button';");
  });

  describe('content elements', () => {
    it.each([
      ['sbb-radio-button-panel-subtitle', 'subtext'],
      ['sbb-radio-button-panel-warning', 'suffix'],
      ['sbb-radio-button-panel-note', 'suffix'],
    ])('should replace <%s> with a span in the %s slot', async (tag, slot) => {
      expect(await migrateTemplate(`<${tag}>Text</${tag}>`)).toBe(
        `<span slot="${slot}">Text</span>`,
      );
    });

    it('should migrate all content elements of a panel', async () => {
      expect(
        await migrateTemplate(
          [
            '<sbb-radio-button-panel value="a">',
            '  Label',
            '  <sbb-radio-button-panel-subtitle>Sub</sbb-radio-button-panel-subtitle>',
            '  <sbb-radio-button-panel-warning>Warn</sbb-radio-button-panel-warning>',
            '  <sbb-radio-button-panel-note>CHF 5</sbb-radio-button-panel-note>',
            '</sbb-radio-button-panel>',
          ].join('\n'),
        ),
      ).toBe(
        [
          '<sbb-radio-button-panel value="a">',
          '  Label',
          '  <span slot="subtext">Sub</span>',
          '  <span slot="suffix">Warn</span>',
          '  <span slot="suffix">CHF 5</span>',
          '</sbb-radio-button-panel>',
        ].join('\n'),
      );
    });
  });
});
