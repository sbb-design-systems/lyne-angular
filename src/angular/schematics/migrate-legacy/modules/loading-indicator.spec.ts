import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { LOADING_INDICATOR_MIGRATIONS } from './loading-indicator.cjs';

describe('sbb-loading-indicator', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, selectors, attributes } = LOADING_INDICATOR_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTemplateSelectorMigrationRule(selectors),
      createAttributeMigrationRule(attributes),
    ]);
  };

  const migrateTsFile = (content: string) =>
    MigrateLegacyTestUtils.migrateTsFile(content, defaultMigration);
  const migrateTemplate = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  it('should rewrite the import path', async () => {
    expect(
      await migrateTsFile(
        `import { SbbLoadingIndicatorModule } from '@sbb-esta/angular/loading-indicator';`,
      ),
    ).toContain(`from '@sbb-esta/lyne-angular/loading-indicator'`);
  });

  it('should comment SbbLoadingIndicatorMode', async () => {
    const result = await migrateTsFile(
      [
        `import { SbbLoadingIndicatorMode } from '@sbb-esta/angular/loading-indicator';`,
        'let m: SbbLoadingIndicatorMode;',
      ].join('\n'),
    );
    expect(result).toContain('FIXME: SbbLoadingIndicatorMode');
  });

  it.each([
    ['tiny', 's'],
    ['small', 'l'],
    ['medium', 'xxl'],
    ['big', 'xxxl'],
  ])('should migrate mode %s to size %s', async (mode, size) => {
    const result = await migrateTemplate(`<sbb-loading-indicator mode="${mode}"/>`);
    expect(result).toContain(`size="${size}"`);
    expect(result).not.toContain('mode');
    expect(result).not.toContain('FIXME');
  });

  it.each(['fullbox', 'inline'])('should add a FIXME for mode %s', async (mode) => {
    const result = await migrateTemplate(
      `<sbb-loading-indicator mode="${mode}"></sbb-loading-indicator>`,
    );
    expect(result).toContain(`FIXME: the \`${mode}\` mode`);
  });

  it('should add size="xxl" when no mode is set', async () => {
    const result = await migrateTemplate('<sbb-loading-indicator></sbb-loading-indicator>');
    expect(result).toContain('<sbb-loading-indicator size="xxl">');
  });

  it('should not add a default size when size or mode is set', async () => {
    expect(await migrateTemplate('<sbb-loading-indicator mode="tiny" />')).not.toContain('xxl');
    expect(await migrateTemplate('<sbb-loading-indicator size="l" />')).not.toContain('xxl');
  });
});
