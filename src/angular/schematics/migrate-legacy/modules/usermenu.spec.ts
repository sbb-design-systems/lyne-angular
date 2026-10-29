import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { USERMENU_MIGRATIONS } from './usermenu.cjs';

const FIXME =
  "<!-- FIXME: this component can be replaced by 'sbb-header-button' with a connected 'sbb-menu'; please check and possibly adapt the auto-migrated code. -->";
const IMG_FIXME = '<!-- FIXME: an <img> is not supported as icon of the `sbb-header-button`. -->';

describe('sbb-usermenu', () => {
  const { importPaths, comments, types, customRules } = USERMENU_MIGRATIONS;
  const defaultMigration: Rule = () =>
    chain([
      createImportPathMigrationRule(importPaths),
      createCommentMigrationRule(comments),
      createTypeMigrationRule(types),
      ...customRules!.map((rule) => rule()),
    ]);
  // Only the custom rule: no FIXME comment, so output is easy to compare.
  const migrate = (html: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(html, chain(customRules!.map((rule) => rule())));

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

  describe('real cases', () => {
    // from itp-topology-ui
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
          FIXME,
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

    // from api-devportal-webapp
    it('should migrate with no login', async () => {
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
          FIXME,
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

    // from api-devportal-webapp
    it('should migrate with click handler', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          `<sbb-usermenu data-testid="login-button" (click)="login()"></sbb-usermenu>`,
          defaultMigration,
        ),
      ).toBe(
        [
          FIXME,
          '<sbb-header-button iconName="user-small" data-testid="login-button" (click)="login()">Login</sbb-header-button>',
        ].join('\n'),
      );
    });

    // from esta-pharao
    it('should migrate with no displayName and with inner content', async () => {
      expect(
        await MigrateLegacyTestUtils.migrateHtmlFile(
          `<sbb-usermenu [menu]="menu" [userName]="userName()" (loginRequest)="login()">
  <sbb-icon svgIcon="user-small" *sbbIcon></sbb-icon>
</sbb-usermenu>`,
          defaultMigration,
        ),
      ).toBe(
        [
          FIXME,
          '<!-- [userName]="userName()" should be included in the sbb-menu -->',
          '<sbb-header-button [sbbMenu]="menu" (click)="login()">',
          '  <sbb-icon svgIcon="user-small" *sbbIcon></sbb-icon>',
          '  Login',
          '</sbb-header-button>',
        ].join('\n'),
      );
    });
  });

  describe('no displayName', () => {
    it('should handle no attributes', async () => {
      expect(await migrate('<sbb-usermenu></sbb-usermenu>')).toBe(
        '<sbb-header-button iconName="user-small">Login</sbb-header-button>',
      );
    });

    it('should not make [menu] conditional', async () => {
      expect(await migrate('<sbb-usermenu [menu]="menu"></sbb-usermenu>')).toBe(
        '<sbb-header-button iconName="user-small" [sbbMenu]="menu">Login</sbb-header-button>',
      );
    });

    it('should not make (loginRequest) conditional', async () => {
      expect(await migrate('<sbb-usermenu (loginRequest)="login()"></sbb-usermenu>')).toBe(
        '<sbb-header-button iconName="user-small" (click)="login()">Login</sbb-header-button>',
      );
    });

    it('should keep other attributes', async () => {
      expect(await migrate('<sbb-usermenu class="a" id="b"></sbb-usermenu>')).toBe(
        '<sbb-header-button iconName="user-small" class="a" id="b">Login</sbb-header-button>',
      );
    });
  });

  describe('displayName', () => {
    // Literal is an edge case and one of the reason of the comment addition above the component.
    it('should use a static displayName as string literal', async () => {
      const result = await migrate(
        '<sbb-usermenu displayName="Hans" (loginRequest)="login()" [menu]="menu"></sbb-usermenu>',
      );

      expect(result).toContain(`(click)="'Hans' ? null : login()"`);
      expect(result).toContain(`[sbbMenu]="'Hans' ? menu : null"`);
      expect(result).toContain(`@if ('Hans') { {{ 'Hans' }} } @else { Login }`);
      expect(result).not.toContain('displayName');
    });

    it('should not wrap a property path in parentheses', async () => {
      const result = await migrate(
        '<sbb-usermenu [displayName]="user?.profile.name" (loginRequest)="login()"></sbb-usermenu>',
      );

      expect(result).toContain('(click)="user?.profile.name ? null : login()"');
      expect(result).toContain(
        '@if (user?.profile.name) { {{ user?.profile.name }} } @else { Login }',
      );
    });

    it('should wrap a complex expression in parentheses for the condition', async () => {
      const result = await migrate(
        '<sbb-usermenu [displayName]="a ? b : c" (loginRequest)="login()" [menu]="menu"></sbb-usermenu>',
      );

      expect(result).toContain('(click)="(a ? b : c) ? null : login()"');
      expect(result).toContain('[sbbMenu]="(a ? b : c) ? menu : null"');
      // In the @if and the interpolation no parentheses are needed.
      expect(result).toContain('@if (a ? b : c) { {{ a ? b : c }} } @else { Login }');
    });

    it('should wrap a call expression in parentheses', async () => {
      const result = await migrate(
        '<sbb-usermenu [displayName]="name()" (loginRequest)="login()"></sbb-usermenu>',
      );

      expect(result).toContain('(click)="(name()) ? null : login()"');
    });
  });

  describe('userName', () => {
    it('should move a static userName to a comment', async () => {
      const result = await migrate('<sbb-usermenu userName="x"></sbb-usermenu>');

      expect(result).toContain('<!-- userName="x" should be included in the sbb-menu -->');
      expect(result).toMatch(/<sbb-header-button iconName="user-small">Login<\/sbb-header-button>/);
    });

    it('should put the comment on its own line with the same indent', async () => {
      const result = await migrate(
        ['<div>', '  <sbb-usermenu [userName]="u"></sbb-usermenu>', '</div>'].join('\n'),
      );

      expect(result).toContain(
        [
          '<div>',
          '  <!-- [userName]="u" should be included in the sbb-menu -->',
          '  <sbb-header-button',
        ].join('\n'),
      );
    });

    it('should put the comment inline if the element is not on its own line', async () => {
      const result = await migrate('<div><sbb-usermenu [userName]="u"></sbb-usermenu></div>');

      expect(result).toContain(
        '<div><!-- [userName]="u" should be included in the sbb-menu --> <sbb-header-button',
      );
    });
  });

  describe('icons', () => {
    it('should keep an sbb-icon and add the label after it, single line', async () => {
      const result = await migrate(
        '<sbb-usermenu [displayName]="name"><sbb-icon svgIcon="x"></sbb-icon></sbb-usermenu>',
      );

      expect(result).not.toContain('iconName');
      expect(result).toContain(
        '<sbb-icon svgIcon="x"></sbb-icon> @if (name) { {{ name }} } @else { Login }</sbb-header-button>',
      );
    });

    it('should keep an sbb-icon and add the label after it, multiline', async () => {
      const result = await migrate(
        [
          '<sbb-usermenu [displayName]="name">',
          '  <sbb-icon svgIcon="x"></sbb-icon>',
          '</sbb-usermenu>',
        ].join('\n'),
      );

      expect(result).not.toContain('iconName');
      expect(result).toContain(
        [
          '  <sbb-icon svgIcon="x"></sbb-icon>',
          '  @if (name) {',
          '    {{ name }}',
          '  } @else {',
          '    Login',
          '  }',
          '</sbb-header-button>',
        ].join('\n'),
      );
    });

    it('should comment an img, single line', async () => {
      const result = await migrate('<sbb-usermenu><img src="a.png"></sbb-usermenu>');

      expect(result).not.toContain('iconName');
      expect(result).toContain(`${IMG_FIXME} <img src="a.png">`);
      expect(result).toContain('Login</sbb-header-button>');
    });

    it('should comment an img, multiline, with the same indent', async () => {
      const result = await migrate(
        ['<sbb-usermenu>', '  <img src="a.png" />', '</sbb-usermenu>'].join('\n'),
      );

      expect(result).toContain([`  ${IMG_FIXME}`, '  <img src="a.png" />'].join('\n'));
      expect(result).not.toContain('iconName');
    });

    it('should comment an img below a structural directive', async () => {
      const result = await migrate(
        ['<sbb-usermenu>', '  <img src="a.png" *sbbIcon />', '</sbb-usermenu>'].join('\n'),
      );

      expect(result).toContain(IMG_FIXME);
      expect(result).not.toContain('iconName');
    });
  });

  describe('inner content', () => {
    it('should leave content without icon as it is', async () => {
      expect(await migrate('<sbb-usermenu>Hello</sbb-usermenu>')).toBe(
        '<sbb-header-button iconName="user-small">Hello</sbb-header-button>',
      );
    });

    it('should not add a label to content without icon, even with displayName', async () => {
      const result = await migrate('<sbb-usermenu [displayName]="name">Hello</sbb-usermenu>');

      expect(result).toContain('>Hello</sbb-header-button>');
      expect(result).not.toContain('@if');
      expect(result).not.toContain('Login');
    });
  });
});
