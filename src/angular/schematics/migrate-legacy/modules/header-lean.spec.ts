import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { HEADER_LEAN_MIGRATIONS } from './header-lean.cjs';

describe('sbb-header-lean', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, selectors, attributes } = HEADER_LEAN_MIGRATIONS;
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

  describe('imports', () => {
    it('should rewrite imports', async () => {
      const content = await migrateTsFile(
        "import {SbbHeaderLeanModule} from '@sbb-esta/angular/header-lean';",
      );
      expect(content).toBe("import {SbbHeaderModule} from '@sbb-esta/lyne-angular/header';");
    });
  });

  describe('comments', () => {
    it.each([
      'collapseBreakpoint',
      'label',
      'subtitle',
      'closedStart',
      'openedStart',
      'openedChange',
    ])('should flag %s', async (attribute) => {
      expect(
        await migrateTemplate(`<sbb-header-lean ${attribute}="x"></sbb-header-lean>`),
      ).toContain(`FIXME: the attribute \`${attribute}\` does not exist anymore.`);
    });

    it('should flag removed header elements', async () => {
      const content = await migrateTemplate(
        '<sbb-app-chooser-section></sbb-app-chooser-section><sbb-header-icon-actions></sbb-header-icon-actions>',
      );
      expect(content).toContain('`sbb-app-chooser-section` does not exist anymore');
      expect(content).toContain('`sbb-header-icon-actions` does not exist anymore');
    });
  });

  describe('types', () => {
    it('should rename header types and usages', async () => {
      const content = await migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          "import { SbbHeaderLeanModule, SbbHeaderMenu } from '@sbb-esta/angular/header-lean';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  imports: [SbbHeaderLeanModule],',
          '})',
          'export class AppComponent {',
          '  public menu: SbbHeaderMenu | null = null',
          '}',
        ].join('\n'),
      );

      expect(content).toContain(
        "import { SbbHeaderModule, SbbMenu } from '@sbb-esta/lyne-angular/header';",
      );
      expect(content).toContain('  imports: [SbbHeaderModule],');
      expect(content).toContain('  public menu: SbbMenu | null = null');
    });
  });

  describe('selectors and attributes', () => {
    it('should migrate header elements and menu links', async () => {
      expect(
        await migrateTemplate(
          [
            '<sbb-header-lean>',
            '  <button type="button" [sbbHeaderMenu]="menuLang">',
            '    <sbb-icon svgIcon="globe-small"></sbb-icon>',
            '  </button>',
            '  <sbb-header-menu #menuLang="sbbHeaderMenu">',
            '    <a sbbHeaderMenuItem href="/en/">English</a>',
            '    <a sbbHeaderMenuItem href="/de/">Deutsch</a>',
            '    <a sbbHeaderMenuItem href="/fr/">Français</a>',
            '    <a sbbHeaderMenuItem href="/it/">Italiano</a>',
            '  </sbb-header-menu>',
            '</sbb-header-lean>',
          ].join('\n'),
        ),
      ).toBe(
        [
          '<sbb-header>',
          '  <button type="button" [sbbMenu]="menuLang">',
          '    <sbb-icon svgIcon="globe-small"></sbb-icon>',
          '  </button>',
          '  <!-- FIXME: the `sbb-header-menu` has been replaced by `sbb-menu`. Import the `SbbMenuModule` from "@sbb-esta/lyne-angular/menu". -->',
          '  <sbb-menu #menuLang="sbbMenu">',
          '    <sbb-link href="/en/">English</sbb-link>',
          '    <sbb-link href="/de/">Deutsch</sbb-link>',
          '    <sbb-link href="/fr/">Français</sbb-link>',
          '    <sbb-link href="/it/">Italiano</sbb-link>',
          '  </sbb-menu>',
          '</sbb-header>',
        ].join('\n'),
      );
    });
  });
});
