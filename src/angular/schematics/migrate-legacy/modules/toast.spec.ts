import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { TOAST_MIGRATIONS } from './toast.cjs';

describe('sbb-toast', () => {
  const migration: Rule = () => {
    const { importPaths, comments, types } = TOAST_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
    ]);
  };
  const migrate = (content: string) => MigrateLegacyTestUtils.migrateTsFile(content, migration);

  it('should rewrite the import path and rename symbols', async () => {
    const result = await migrate(
      [
        `import { SbbNotificationToastModule, SbbNotificationToastRef } from '@sbb-esta/angular/notification-toast';`,
        'let m = SbbNotificationToastModule;',
        'let r: SbbNotificationToastRef<unknown>;',
      ].join('\n'),
    );
    expect(result).toContain(`from '@sbb-esta/lyne-angular/toast'`);
    expect(result).toContain('SbbToastModule');
    expect(result).toContain('SbbToastRef<unknown>');
    expect(result).not.toContain('SbbNotification');
  });

  it('should rename the data token', async () => {
    const result = await migrate(
      [
        `import { SBB_NOTIFICATION_TOAST_DATA } from '@sbb-esta/angular/notification-toast';`,
        'const t = SBB_NOTIFICATION_TOAST_DATA;',
      ].join('\n'),
    );
    expect(result).toContain('SBB_TOAST_DATA');
    expect(result).not.toContain('SBB_NOTIFICATION_TOAST_DATA');
  });

  it('should comment the service and config usages with a documentation hint', async () => {
    const result = await migrate(
      [
        `import { SbbNotificationToast, SbbNotificationToastConfig } from '@sbb-esta/angular/notification-toast';`,
        'class A { toast = inject(SbbNotificationToast); config: SbbNotificationToastConfig = {}; }',
      ].join('\n'),
    );
    expect(result).toContain('SbbToastService');
    expect(result).toContain('SbbToastConfig');
    expect(result).toContain('Check the documentation');
    expect(result).toContain('FIXME: the toast service API changed');
    expect(result).toContain('FIXME: the sbb-toast config changed');
  });

  it.each([
    'SBB_NOTIFICATION_TOAST_DEFAULT_OPTIONS',
    'SBB_NOTIFICATION_TOAST_DEFAULT_OPTIONS_FACTORY',
    'SbbNotificationToastContainer',
  ])('should comment %s', async (symbol) => {
    const result = await migrate(
      [
        `import { ${symbol} } from '@sbb-esta/angular/notification-toast';`,
        `let x = ${symbol};`,
      ].join('\n'),
    );
    expect(result).toContain(`FIXME: ${symbol} does not exist in Lyne.`);
  });
});
