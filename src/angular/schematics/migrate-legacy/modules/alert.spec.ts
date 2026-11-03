import { chain, type Rule } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { ALERT_MIGRATIONS } from './alert.cjs';

describe('sbb-alert', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, attributes, selectors } = ALERT_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTemplateSelectorMigrationRule(selectors),
      createAttributeMigrationRule(attributes),
    ]);
  };

  const migrateTsFile = (ts: string) => MigrateLegacyTestUtils.migrateTsFile(ts, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('import paths', () => {
    it('should rewrite alert imports', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbAlertModule } from '@sbb-esta/angular/alert';",
          "export { SbbAlertModule } from '@sbb-esta/angular/alert';",
          "import { SbbIconModule } from '@sbb-esta/angular/icon';",
        ].join('\n'),
      );

      expect(content).toContain("import { SbbAlertModule } from '@sbb-esta/lyne-angular/alert';");
      expect(content).toContain("export { SbbAlertModule } from '@sbb-esta/lyne-angular/alert';");
      expect(content).toContain("from '@sbb-esta/angular/icon';");
    });
  });

  describe('attributes', () => {
    it('should rename svgIcon to iconName', async () => {
      expect(await migrateTemplate('<sbb-alert svgIcon="arrow"></sbb-alert>')).toBe(
        '<sbb-alert iconName="arrow"></sbb-alert>',
      );
    });

    it('should rename a bound svgIcon', async () => {
      expect(await migrateTemplate('<sbb-alert [svgIcon]="icon"></sbb-alert>')).toBe(
        '<sbb-alert [iconName]="icon"></sbb-alert>',
      );
    });

    it('should rename the dismissed output to close', async () => {
      expect(await migrateTemplate('<sbb-alert (dismissed)="onClose()"></sbb-alert>')).toBe(
        '<sbb-alert (close)="onClose()"></sbb-alert>',
      );
    });

    it('should not touch other elements', async () => {
      const template = '<sbb-icon svgIcon="arrow" (dismissed)="onClose()"></sbb-icon>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });

  describe('anchor alerts', () => {
    it('should replace <a SbbAlert> with <sbb-alert>', async () => {
      const content = await migrateTemplate(
        '<a SbbAlert href="/x" svgIcon="arrow" (dismissed)="onClose()">Text</a>',
      );

      expect(content).toContain('<sbb-alert');
      expect(content).toContain('</sbb-alert>');
      expect(content).toContain('iconName="arrow"');
      expect(content).toContain('(close)="onClose()"');
      expect(content).not.toContain('<a ');
    });

    it('should add a FIXME comment for anchor alerts', async () => {
      expect(await migrateTemplate('<a SbbAlert href="/x">Text</a>')).toContain(
        'FIXME: Anchor alerts are not supported in lyne-angular.',
      );
    });
  });

  describe('unsupported', () => {
    it('should mark <sbb-alert-outlet>', async () => {
      expect(await migrateTemplate('<sbb-alert-outlet></sbb-alert-outlet>')).toContain(
        'FIXME: this component has no counterpart in lyne-angular.',
      );
    });

    it('should mark SbbAlertService usages', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbAlertService } from '@sbb-esta/angular/alert';",
          '',
          'export class A {',
          '  constructor(private _alert: SbbAlertService) {}',
          '}',
        ].join('\n'),
      );

      expect(content).toContain('// FIXME: SbbAlertService is not supported in lyne-angular.');
    });
  });
});
