import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { TIME_INPUT_MIGRATIONS } from './time-input.cjs';

describe('sbb-time-input', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, attributes, selectors } = TIME_INPUT_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
      createTemplateSelectorMigrationRule(selectors),
      createAttributeMigrationRule(attributes),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('should migrate', () => {
    it('imports', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        "import { SbbTimeInputModule } from '@sbb-esta/angular/time-input';",
        defaultMigration,
      );
      expect(content).toBe(
        "import { SbbTimeInputModule } from '@sbb-esta/lyne-angular/time-input';",
      );
    });

    it('selector', async () => {
      const migrated = await migrateTemplate(
        [
          '<sbb-form-field label="Time Input">',
          '<input [(ngModel)]="value" sbbTimeInput sbbInput />',
          '</sbb-form-field>',
        ].join('\n'),
      );
      expect(migrated).toContain('<sbb-time-input [(ngModel)]="value"></sbb-time-input>');
    });

    it('attributes', async () => {
      const migrated = await migrateTemplate('<input sbbInput sbbTimeInput />');
      expect(migrated).toBe('<sbb-time-input></sbb-time-input>');
    });

    it('full migration in controller', async () => {
      const content = await migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          "import { SbbTimeInputModule } from '@sbb-esta/angular/time-input';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  imports: [SbbDatepickerModule],',
          '  template: \'<input sbbInput sbbTimeInput value="11.22" />\'',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
      );
      expect(content).toContain('  template: \'<sbb-time-input value="11.22"></sbb-time-input>\'');
    });
  });
});
