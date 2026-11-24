import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { NOTIFICATION_MIGRATIONS } from './notification.cjs';

describe('sbb-notification', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, selectors, attributes } = NOTIFICATION_MIGRATIONS;
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

  describe('typescript', () => {
    it('should rewrite the import path', async () => {
      expect(
        await migrateTsFile(
          "import { SbbNotificationModule } from '@sbb-esta/angular/notification';",
        ),
      ).toContain("import { SbbNotificationModule } from '@sbb-esta/lyne-angular/notification';");
    });

    it('should rename SbbNotificationEvent to Event and drop its import', async () => {
      const content = await migrateTsFile(
        [
          "import { SbbNotificationEvent } from '@sbb-esta/angular/notification';",
          'export function onDismiss(event: SbbNotificationEvent) {}',
        ].join('\n'),
      );
      expect(content).toContain('export function onDismiss(event: Event) {}');
      expect(content).not.toContain('import');
    });

    it('should comment SbbNotificationType', async () => {
      const content = await migrateTsFile(
        [
          `import { SbbNotificationType } from '@sbb-esta/angular/notification';`,
          `export const x = SbbNotificationType;`,
        ].join('\n'),
      );
      expect(content).toContain(`// FIXME: 'SbbNotificationType' has no counterpart in Lyne.`);
    });
  });

  describe('type', () => {
    it('should add the old default type', async () => {
      expect(await migrateTemplate('<sbb-notification>Text</sbb-notification>')).toBe(
        '<sbb-notification type="success">Text</sbb-notification>',
      );
    });

    it.each([
      '<sbb-notification type="error">Text</sbb-notification>',
      '<sbb-notification [type]="t">Text</sbb-notification>',
    ])('should keep an existing type: %s', async (template) => {
      expect(await migrateTemplate(template)).toBe(template);
    });

    it('should replace info-light with info', async () => {
      expect(
        await migrateTemplate('<sbb-notification type="info-light">T</sbb-notification>'),
      ).toBe('<sbb-notification type="info">T</sbb-notification>');
    });
  });

  describe('attributes', () => {
    it('should rename svgIcon and readonly', async () => {
      expect(
        await migrateTemplate(
          '<sbb-notification type="info" svgIcon="clock-small" readonly>T</sbb-notification>',
        ),
      ).toBe('<sbb-notification type="info" iconName="clock-small" readOnly>T</sbb-notification>');
    });

    it('should rename bound inputs', async () => {
      expect(
        await migrateTemplate(
          '<sbb-notification type="info" [svgIcon]="i" [readonly]="r">T</sbb-notification>',
        ),
      ).toBe('<sbb-notification type="info" [iconName]="i" [readOnly]="r">T</sbb-notification>');
    });

    it('should rename (dismissed) and comment it', async () => {
      const result = await migrateTemplate(
        '<sbb-notification type="info" (dismissed)="d($event)">T</sbb-notification>',
      );
      expect(result).toContain('(close)="d($event)"');
    });

    it('should not touch other elements', async () => {
      const template = '<sbb-toast svgIcon="x" readonly (dismissed)="d()"></sbb-toast>';
      expect(await migrateTemplate(template)).toBe(template);
    });
  });

  describe('comments', () => {
    it('should comment jumpMarks', async () => {
      expect(
        await migrateTemplate(
          '<sbb-notification type="error" [jumpMarks]="j">T</sbb-notification>',
        ),
      ).toContain("FIXME: 'jumpMarks' has no counterpart in Lyne.");
    });

    it('should comment sbb-notification-icon', async () => {
      expect(
        await migrateTemplate(
          '<sbb-notification type="info"><sbb-notification-icon><sbb-icon svgIcon="x"></sbb-icon></sbb-notification-icon>T</sbb-notification>',
        ),
      ).toContain("FIXME: 'sbb-notification-icon' has no counterpart in Lyne.");
    });
  });
});
