import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { BREADCRUMB_MIGRATIONS } from './breadcrumb.cjs';

describe('sbb-breadcrumb', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, selectors, attributes } = BREADCRUMB_MIGRATIONS;
    return chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
      createTemplateSelectorMigrationRule(selectors),
      createAttributeMigrationRule(attributes),
    ]);
  };
  const comment =
    'FIXME: It is strongly recommended to place an aria-label attribute on the <sbb-breadcrumb-group>.';

  it('should rewrite imports', async () => {
    const content = await MigrateLegacyTestUtils.migrateTsFile(
      [
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        "import { SbbBreadcrumb } from '@sbb-esta/angular/breadcrumb';",
      ].join('\n'),
      defaultMigration,
    );

    expect(content).toContain("'@sbb-esta/lyne-angular/breadcrumb';");
    expect(content).not.toContain("'@sbb-esta/angular/breadcrumb';");
  });

  describe('should handle comments', () => {
    it('addition when aria-label is missing', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-breadcrumbs>Test</sbb-breadcrumbs>',
          defaultMigration,
        ),
      ).toContain(comment);
    });

    it('no addition when aria-label is present', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-breadcrumbs aria-label="label">Test</sbb-breadcrumbs>',
          defaultMigration,
        ),
      ).not.toContain(comment);
    });
  });

  it('should migrate types', async () => {
    const content = await MigrateLegacyTestUtils.migrateTsFile(
      [
        "import { Component } from '@angular/core';",
        "import { SbbBreadcrumbs } from '@sbb-esta/angular/breadcrumb';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  imports: [SbbBreadcrumbs],',
        "  template: '<sbb-breadcrumbs>...</sbb-breadcrumbs>',",
        '})',
        'export class AppComponent {}',
      ].join('\n'),
      defaultMigration,
    );
    expect(content).toContain(
      "import { SbbBreadcrumbGroup } from '@sbb-esta/lyne-angular/breadcrumb';",
    );
    expect(content).toContain('imports: [SbbBreadcrumbGroup],');
  });

  it('should migrate template', async () => {
    const content = await MigrateLegacyTestUtils.migrateHtmlFile(
      [
        '<sbb-breadcrumbs aria-label="Test">',
        '  <sbb-breadcrumb sbb-breadcrumb-root routerLink="/">Link</sbb-breadcrumb>',
        '  <sbb-link sbb-breadcrumb-root routerLink="/">Link</sbb-link>',
        '  <a sbb-breadcrumb-root routerLink="/">Link</a>',
        '</sbb-breadcrumbs>',
      ].join('\n'),
      defaultMigration,
    );
    const result = [
      '<sbb-breadcrumb-group aria-label="Test">',
      '  <sbb-breadcrumb iconName="house-small" routerLink="/">Link</sbb-breadcrumb>',
      '  <sbb-breadcrumb iconName="house-small" routerLink="/">Link</sbb-breadcrumb>',
      '  <sbb-breadcrumb iconName="house-small" routerLink="/">Link</sbb-breadcrumb>',
      '</sbb-breadcrumb-group>',
    ].join('\n');
    expect(content).toBe(result);
  });
});
