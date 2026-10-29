import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { USERMENU_MIGRATIONS } from './usermenu.cjs';

describe('sbb-usermenu', () => {
  const { importPaths, comments, types, customRules } = USERMENU_MIGRATIONS;
  const defaultMigration: Rule = () =>
    chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
      ...customRules!.map((rule) => rule()),
    ]);

  describe('import paths and types', () => {
    it('should migrate', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        "import { SbbUsermenuModule } from '@sbb-esta/angular/usermenu';",
        defaultMigration,
      );

      expect(content).toContain("import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';");
    });
  });

  describe('comments', () => {
    it('should add in html', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          '<sbb-usermenu></sbb-usermenu>',
          defaultMigration,
        ),
      ).toContain(
        "FIXME: this component can be replaced by 'sbb-header-button' with a connected 'sbb-menu'; please check and possibly adapt the auto-migrated code.",
      );
    });

    it('should add in ts', async () => {
      const source = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          "import { SbbUsermenuModule } from '@sbb-esta/angular/usermenu';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  imports: [SbbUsermenuModule],',
          "  template: '<sbb-usermenu></sbb-usermenu>',",
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        defaultMigration,
      );

      const content = [
        "import { Component } from '@angular/core';",
        "import { SbbHeaderModule } from '@sbb-esta/lyne-angular/header';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  imports: [SbbHeaderModule],',
        "  // FIXME: this component can be replaced by 'sbb-header-button' with a connected 'sbb-menu'; please check and possibly adapt the auto-migrated code.",
        '  template: \'<sbb-header-button iconName="user-small">Login</sbb-header-button>\',',
        '})',
        'export class AppComponent {}',
      ].join('\n');

      expect(source).toBe(content);
    });
  });

  describe('custom rule', () => {
    it('should migrate the full component', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          [
            '<sbb-usermenu',
            '  [userName]="userName"',
            '  [displayName]="displayName"',
            '  (loginRequest)="login()"',
            '  [menu]="menu">',
            '</sbb-usermenu>',
          ].join('\n'),
          defaultMigration,
        ),
      ).toBe(
        [
          "<!-- FIXME: this component can be replaced by 'sbb-header-button' with a connected 'sbb-menu'; please check and possibly adapt the auto-migrated code. -->",
          '<!-- [userName]="userName" should be included in the sbb-menu -->',
          '<sbb-header-button iconName="user-small"',
          '  (click)="displayName ? null : login()"',
          '  [sbbMenu]="displayName ? menu : null">',
          '  @if (displayName) {',
          '    {{ displayName }}',
          '  } @else {',
          '    Login',
          '  }',
          '</sbb-header-button>',
        ].join('\n'),
      );
    });

    it('should migrate the component with no displayName', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          [
            '<sbb-usermenu',
            '  [userName]="userName"',
            '  (loginRequest)="login()"',
            '  [menu]="menu">',
            '</sbb-usermenu>',
          ].join('\n'),
          defaultMigration,
        ),
      ).toBe(
        [
          "<!-- FIXME: this component can be replaced by 'sbb-header-button' with a connected 'sbb-menu'; please check and possibly adapt the auto-migrated code. -->",
          '<!-- [userName]="userName" should be included in the sbb-menu -->',
          '<sbb-header-button iconName="user-small"',
          '  (click)="login()"',
          '  [sbbMenu]="menu">',
          '  Login',
          '</sbb-header-button>',
        ].join('\n'),
      );
    });

    it('should migrate a real case with no login request', async () => {
      // from api-devportal-webapp
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          `<sbb-usermenu
              [menu]="menu"
              [userName]="userProfile.email || userProfile.username"
              [displayName]="userProfile.name"
              ></sbb-usermenu>`,
          defaultMigration,
        ),
      ).toBe(
        [
          "<!-- FIXME: this component can be replaced by 'sbb-header-button' with a connected 'sbb-menu'; please check and possibly adapt the auto-migrated code. -->",
          '<!-- [userName]="userProfile.email || userProfile.username" should be included in the sbb-menu -->',
          '<sbb-header-button iconName="user-small"',
          '              [sbbMenu]="userProfile.name ? menu : null"',
          '              >',
          '  @if (userProfile.name) {',
          '    {{ userProfile.name }}',
          '  } @else {',
          '    Login',
          '  }',
          '</sbb-header-button>',
        ].join('\n'),
      );
    });

    it('should migrate a real case with only click', async () => {
      // from api-devportal-webapp
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          `<sbb-usermenu data-testid="login-button" (click)="login()"></sbb-usermenu>`,
          defaultMigration,
        ),
      ).toBe(
        [
          "<!-- FIXME: this component can be replaced by 'sbb-header-button' with a connected 'sbb-menu'; please check and possibly adapt the auto-migrated code. -->",
          '<sbb-header-button iconName="user-small" data-testid="login-button" (click)="login()">Login</sbb-header-button>',
        ].join('\n'),
      );
    });

    it('should migrate a real case with inner content', async () => {
      // from esta-pharao
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          `<sbb-usermenu [menu]="menu" [userName]="userName()" (loginRequest)="login()">
  <sbb-icon svgIcon="user-small" *sbbIcon></sbb-icon>
</sbb-usermenu>`,
          defaultMigration,
        ),
      ).toBe(
        [
          "<!-- FIXME: this component can be replaced by 'sbb-header-button' with a connected 'sbb-menu'; please check and possibly adapt the auto-migrated code. -->",
          '<!-- [userName]="userName()" should be included in the sbb-menu -->',
          '<sbb-header-button iconName="user-small" [sbbMenu]="menu" (click)="login()">',
          '  <sbb-icon svgIcon="user-small" *sbbIcon></sbb-icon>',
          '</sbb-header-button>',
        ].join('\n'),
      );
    });
  });
});
