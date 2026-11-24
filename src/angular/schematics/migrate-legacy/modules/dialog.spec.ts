import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { DIALOG_MIGRATIONS } from './dialog.cjs';

describe('sbb-dialog', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, selectors, attributes } = DIALOG_MIGRATIONS;
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
      const content = await migrateTsFile(
        "import {SbbDialogModule} from '@sbb-esta/angular/dialog';",
      );
      expect(content).toBe("import {SbbDialogModule} from '@sbb-esta/lyne-angular/dialog';");
    });

    it('comments', async () => {
      const migrated = await migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          "import { SbbDialogRole, SbbDialogPosition } from '@sbb-esta/angular/dialog';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  imports: [SbbDialogModule],',
          '})',
          'export class AppComponent {',
          '  const role: SbbDialogRole = "alertdialog"',
          '  const position: SbbDialogPosition = {',
          '    top: "10px",',
          '    left: "100px",',
          '  };',
          '}',
        ].join('\n'),
      );
      expect(migrated).toContain(
        '// FIXME: the `SbbDialogPosition` interface does not exist anymore.',
      );
      expect(migrated).toContain('// FIXME: the `SbbDialogRole` interface does not exist anymore.');
    });

    it('types', async () => {
      const migrated = await migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          "import { SbbDialog, SbbDialogModule } from '@sbb-esta/angular/dialog';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  imports: [SbbDialogModule],',
          '})',
          'export class AppComponent {',
          '  const sbbDialog = inject(SbbDialog);',
          '  this.sbbDialog.open(MyComponent, { position, role });',
          '}',
        ].join('\n'),
      );
      expect(migrated).toContain(
        "import { SbbDialogService, SbbDialogModule } from '@sbb-esta/lyne-angular/dialog';",
      );
      expect(migrated).toContain('const sbbDialog = inject(SbbDialogService);');
    });

    it('selectors', async () => {
      const migrated = await migrateTemplate(`
        <div sbbDialogTitle>Install Angular</div>
        <div sbbDialogContent>
          <p>
            Learn one way to build applications with Angular.
          </p>
        </div>
        <div sbbDialogActions>
          <button sbb-button [sbbDialogClose]="true">Accept</button>
          <button sbb-secondary-button sbbDialogClose>Cancel</button>
        </div>
      `);
      expect(migrated).toBe(`
        <sbb-dialog-title>Install Angular</sbb-dialog-title>
        <sbb-dialog-content>
          <p>
            Learn one way to build applications with Angular.
          </p>
        </sbb-dialog-content>
        <sbb-dialog-actions>
          <button sbb-button [sbbDialogClose]="true">Accept</button>
          <button sbb-secondary-button sbbDialogClose>Cancel</button>
        </sbb-dialog-actions>
      `);
    });
  });
});
