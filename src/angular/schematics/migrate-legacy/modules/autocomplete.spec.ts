import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { AUTOCOMPLETE_MIGRATIONS } from './autocomplete.cjs';

describe('sbb-autocomplete', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, attributes } = AUTOCOMPLETE_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createAttributeMigrationRule(attributes),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('import paths', () => {
    it('should rewrite autocomplete imports', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbAutocompleteModule } from '@sbb-esta/angular/autocomplete';",
          "export { SbbAutocompleteModule } from '@sbb-esta/angular/autocomplete';",
          "import { SbbIconModule } from '@sbb-esta/angular/icon';",
        ].join('\n'),
      );

      expect(content).toContain(
        "import { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';",
      );
      expect(content).toContain(
        "export { SbbAutocompleteModule } from '@sbb-esta/lyne-angular/autocomplete';",
      );
      expect(content).toContain("from '@sbb-esta/angular/icon';");
    });
  });

  describe('outputs', () => {
    it('should rename opened and closed', async () => {
      expect(
        await migrateTemplate(
          '<sbb-autocomplete (opened)="onOpen()" (closed)="onClose()"></sbb-autocomplete>',
        ),
      ).toBe('<sbb-autocomplete (open)="onOpen()" (close)="onClose()"></sbb-autocomplete>');
    });

    it('should keep optionSelected', async () => {
      const template = '<sbb-autocomplete (optionSelected)="a($event)"></sbb-autocomplete>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });

  describe('unsupported', () => {
    it.each([
      ['<div sbbAutocompleteOrigin></div>', 'sbbAutocompleteOrigin'],
      ['<input [sbbAutocompleteConnectedTo]="origin" />', 'sbbAutocompleteConnectedTo'],
      ['<input sbbAutocompletePosition="above" />', 'sbbAutocompletePosition'],
      ['<input [sbbAutocompleteDisabled]="true" />', 'sbbAutocompleteDisabled'],
      ['<sbb-autocomplete [localeNormalizer]="fn"></sbb-autocomplete>', 'localeNormalizer'],
      ['<sbb-autocomplete panelWidth="200"></sbb-autocomplete>', 'panelWidth'],
      ['<sbb-autocomplete showHintIfNoOptions></sbb-autocomplete>', 'showHintIfNoOptions'],
    ])('should mark %s', async (template, name) => {
      const content = await migrateTemplate(template);

      expect(content).toContain(`FIXME: the \`${name}\``);
      expect(content.endsWith(template)).toBe(true);
    });

    it('should mark the optionActivated output', async () => {
      expect(
        await migrateTemplate(
          '<sbb-autocomplete (optionActivated)="a($event)"></sbb-autocomplete>',
        ),
      ).toContain('FIXME: the `optionActivated` event');
    });

    it('should not mark supported usages', async () => {
      const template =
        '<input [sbbAutocomplete]="auto" /><sbb-autocomplete #auto autoActiveFirstOption></sbb-autocomplete>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });
});
