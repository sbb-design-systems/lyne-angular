import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { MigrateLegacyTestUtils } from '../test-utils.cjs';

import { BUTTON_MIGRATIONS } from './button.cjs';

describe('sbb-button', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, attributes, selectors } = BUTTON_MIGRATIONS;
    const scope = { root: '', excludedRoots: [] };
    return chain([
      createImportPathMigrationRule(importPaths, scope),
      createCommentMigrationRule(comments, scope),
      createTemplateSelectorMigrationRule(selectors, scope),
      createAttributeMigrationRule(attributes, scope),
    ]);
  };

  const migrateTemplate: (template: string) => Promise<string> = (template: string) =>
    MigrateLegacyTestUtils.migrateHtmlFile(template, defaultMigration);

  describe('import paths', () => {
    it('should rewrite button imports', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { SbbButtonModule } from '@sbb-esta/angular/button';",
          "import { SbbCore } from '@sbb-esta/angular';",
          "import { SbbIconModule } from '@sbb-esta/angular/icon';",
          "export { SbbButtonModule } from '@sbb-esta/angular/button';",
        ].join('\n'),
        defaultMigration,
      );

      expect(content).toContain("import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';");
      expect(content).toContain("export { SbbButtonModule } from '@sbb-esta/lyne-angular/button';");
      // Unrelated imports stay untouched.
      expect(content).toContain("from '@sbb-esta/angular';");
      expect(content).toContain("from '@sbb-esta/angular/icon';");
    });

    it('should preserve the original quote style', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        'import { SbbButtonModule } from "@sbb-esta/angular/button";',
        defaultMigration,
      );

      expect(content).toBe('import { SbbButtonModule } from "@sbb-esta/lyne-angular/button";');
    });

    it('should not touch node_modules or declaration files', async () => {
      const source = "import { SbbButtonModule } from '@sbb-esta/angular/button';";
      const tree = await MigrateLegacyTestUtils.migrateFiles(
        {
          '/node_modules/some-lib/index.ts': source,
          '/src/app/app.d.ts': source,
        },
        defaultMigration,
      );

      expect(tree.read('/node_modules/some-lib/index.ts')!.toString('utf-8')).toBe(source);
      expect(tree.read('/src/app/app.d.ts')!.toString('utf-8')).toBe(source);
    });
  });

  describe('template selectors', () => {
    it('should replace all button variants', async () => {
      expect(await migrateTemplate('<button sbb-button>A</button>')).toBe(
        '<sbb-button>A</sbb-button>',
      );
      expect(await migrateTemplate('<button sbb-secondary-button>A</button>')).toBe(
        '<sbb-secondary-button>A</sbb-secondary-button>',
      );
      expect(await migrateTemplate('<button sbb-ghost-button>A</button>')).toBe(
        '<sbb-accent-button>A</sbb-accent-button>',
      );
      expect(await migrateTemplate('<button sbb-frameless-button>A</button>')).toBe(
        '<sbb-transparent-button>A</sbb-transparent-button>',
      );
      expect(await migrateTemplate('<a sbb-button>A</a>')).toBe(
        '<sbb-button-link>A</sbb-button-link>',
      );
      expect(await migrateTemplate('<a sbb-secondary-button>A</a>')).toBe(
        '<sbb-secondary-button-link>A</sbb-secondary-button-link>',
      );
      expect(await migrateTemplate('<a sbb-ghost-button>A</a>')).toBe(
        '<sbb-accent-button-link>A</sbb-accent-button-link>',
      );
      expect(await migrateTemplate('<a sbb-frameless-button>A</a>')).toBe(
        '<sbb-transparent-button-link>A</sbb-transparent-button-link>',
      );
      expect(await migrateTemplate('<button sbb-link>A</button>')).toContain(
        '<sbb-block-link-button>A</sbb-block-link-button>',
      );
      expect(await migrateTemplate('<a sbb-link>A</a>')).toContain(
        '<sbb-block-link>A</sbb-block-link>',
      );
      expect(await migrateTemplate('<a class="sbb-link-reset">A</a>')).toContain(
        '<a class="sbb-link-reset">A</a>',
      );
      expect(await migrateTemplate('<a>A</a>')).toContain('<sbb-link>A</sbb-link>');
    });

    it('should keep all other attributes and bindings', async () => {
      expect(
        await migrateTemplate(
          '<button sbb-button class="foo" [disabled]="isDisabled" (click)="go()" #ref>Go</button>',
        ),
      ).toBe('<sbb-button class="foo" [disabled]="isDisabled" (click)="go()" #ref>Go</sbb-button>');
    });

    it('should migrate nested and multiline templates', async () => {
      const result = await migrateTemplate(
        [
          '<div class="wrapper">',
          '  <button',
          '    type="button"',
          '    sbb-button',
          '    (click)="save()"',
          '  >',
          '    <span>Save</span>',
          '  </button>',
          '</div>',
        ].join('\n'),
      );

      expect(result).toBe(
        [
          '<div class="wrapper">',
          '  <sbb-button',
          '    type="button"',
          '    (click)="save()"',
          '  >',
          '    <span>Save</span>',
          '  </sbb-button>',
          '</div>',
        ].join('\n'),
      );
    });

    it('should migrate buttons inside structural directives and control flow blocks', async () => {
      const result = await migrateTemplate(
        [
          '<button *ngIf="visible" sbb-button>Old</button>',
          '@if (visible) {',
          '  <button sbb-secondary-button>New</button>',
          '} @else {',
          '  <button sbb-ghost-button>Else</button>',
          '}',
          '@for (item of items; track item) {',
          '  <button sbb-frameless-button>{{ item }}</button>',
          '}',
        ].join('\n'),
      );

      expect(result).toBe(
        [
          '<sbb-button *ngIf="visible">Old</sbb-button>',
          '@if (visible) {',
          '  <sbb-secondary-button>New</sbb-secondary-button>',
          '} @else {',
          '  <sbb-accent-button>Else</sbb-accent-button>',
          '}',
          '@for (item of items; track item) {',
          '  <sbb-transparent-button>{{ item }}</sbb-transparent-button>',
          '}',
        ].join('\n'),
      );
    });

    it('should not touch plain buttons or already migrated elements', async () => {
      const template = '<button type="button">Plain</button>\n<sbb-button>Done</sbb-button>';
      expect(await migrateTemplate(template)).toBe(template);
    });

    it('should be idempotent', async () => {
      const once = await migrateTemplate('<button type="button" sbb-button>A</button>');
      const twice = await migrateTemplate(once);
      expect(twice).toBe(once);
    });

    it('should migrate multiple buttons within one template', async () => {
      expect(
        await migrateTemplate('<a sbb-button>One</a><button sbb-frameless-button>Two</button>'),
      ).toBe(
        '<sbb-button-link>One</sbb-button-link><sbb-transparent-button>Two</sbb-transparent-button>',
      );
    });
  });

  describe('attributes', () => {
    it('should rename svgIcon to iconName on migrated buttons', async () => {
      expect(
        await migrateTemplate(
          [
            '<button sbb-button svgIcon="arrow-right">Go</button>',
            '<button sbb-secondary-button svgIcon="arrow-right">A</button>',
            '<button sbb-ghost-button svgIcon="arrow-right">A</button>',
            '<button sbb-frameless-button svgIcon="arrow-right">A</button>',
            '<a sbb-button svgIcon="arrow-right">A</a>',
            '<a sbb-secondary-button svgIcon="arrow-right">A</a>',
            '<a sbb-ghost-button svgIcon="arrow-right">A</a>',
            '<a sbb-frameless-button svgIcon="arrow-right">A</a>',
          ].join('\n'),
        ),
      ).toBe(
        [
          '<sbb-button iconName="arrow-right">Go</sbb-button>',
          '<sbb-secondary-button iconName="arrow-right">A</sbb-secondary-button>',
          '<sbb-accent-button iconName="arrow-right">A</sbb-accent-button>',
          '<sbb-transparent-button iconName="arrow-right">A</sbb-transparent-button>',
          '<sbb-button-link iconName="arrow-right">A</sbb-button-link>',
          '<sbb-secondary-button-link iconName="arrow-right">A</sbb-secondary-button-link>',
          '<sbb-accent-button-link iconName="arrow-right">A</sbb-accent-button-link>',
          '<sbb-transparent-button-link iconName="arrow-right">A</sbb-transparent-button-link>',
        ].join('\n'),
      );
    });

    it('should rename svgIcon to iconName on migrated links', async () => {
      expect(await migrateTemplate('<button sbb-link svgIcon="arrow-right">A</button>')).toContain(
        '<sbb-block-link-button iconName="arrow-right">A</sbb-block-link-button>',
      );
      expect(await migrateTemplate('<a sbb-link svgIcon="arrow-right">A</a>')).toContain(
        '<sbb-block-link iconName="arrow-right">A</sbb-block-link>',
      );
    });

    it('should rename a bound svgIcon on every button variant', async () => {
      expect(
        await migrateTemplate('<button sbb-secondary-button [svgIcon]="icon">A</button>'),
      ).toBe('<sbb-secondary-button [iconName]="icon">A</sbb-secondary-button>');
      expect(await migrateTemplate('<button sbb-ghost-button [(svgIcon)]="icon">A</button>')).toBe(
        '<sbb-accent-button [(iconName)]="icon">A</sbb-accent-button>',
      );
      expect(
        await migrateTemplate('<button sbb-frameless-button svg-icon="arrow">A</button>'),
      ).toBe('<sbb-transparent-button icon-name="arrow">A</sbb-transparent-button>');
    });

    it('should not rename svgIcon on untouched elements', async () => {
      const template = '<sbb-icon svgIcon="arrow"></sbb-icon>';
      expect(await migrateTemplate(template)).toBe(template);
    });

    it('should rename svgIcon in inline templates', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  template: \'<button sbb-button svgIcon="arrow">Go</button>\',',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        defaultMigration,
      );

      expect(content).toContain('template: \'<sbb-button iconName="arrow">Go</sbb-button>\',');
    });
  });

  describe('comments', () => {
    it('should add comments for links', async () => {
      expect(await migrateTemplate('<a sbb-link>Go</a>')).toContain(
        "FIXME: links are now imported from `SbbLinkModule` under `@sbb-esta/lyne-angular/link`. Check the component's imports.",
      );
      expect(await migrateTemplate('<button sbb-link>Go</button>')).toContain(
        "FIXME: links are now imported from `SbbLinkModule` under `@sbb-esta/lyne-angular/link`. Check the component's imports.",
      );
    });

    it('should add comments for sbb-alt-button', async () => {
      expect(await migrateTemplate('<button sbb-alt-button>Go</button>')).toContain(
        'FIXME: this component has no counterpart in lyne-angular.',
      );
      expect(await migrateTemplate('<a sbb-alt-button>Go</a>')).toContain(
        'FIXME: this component has no counterpart in lyne-angular.',
      );
    });
  });

  describe('inline templates', () => {
    it('should migrate a single quoted inline template', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          "import { SbbButtonModule } from '@sbb-esta/angular/button';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  imports: [SbbButtonModule],',
          '  template: \'<button type="button" sbb-button>Click</button>\',',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        defaultMigration,
      );

      expect(content).toContain('template: \'<sbb-button type="button">Click</sbb-button>\',');
      expect(content).toContain("from '@sbb-esta/lyne-angular/button';");
    });

    it('should migrate a multiline template literal', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  template: `',
          '    <button sbb-button (click)="go()">Go</button>',
          '    <a sbb-ghost-button>Alt</a>',
          '    <a>To sbb-link</a>',
          '    <a class="sbb-link-reset">Link</a>',
          '  `,',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
        defaultMigration,
      );

      expect(content).toContain('<sbb-button (click)="go()">Go</sbb-button>');
      expect(content).toContain('<sbb-accent-button-link>Alt</sbb-accent-button-link>');
      expect(content).toContain('<sbb-link>To sbb-link</sbb-link>');
      expect(content).toContain('<a class="sbb-link-reset">Link</a>');
    });

    it('should migrate multiple components within the same file', async () => {
      const content = await MigrateLegacyTestUtils.migrateTsFile(
        [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'a-cmp',",
          "  template: '<button sbb-button>A</button>',",
          '})',
          'export class ACmp {}',
          '',
          '@Component({',
          "  selector: 'b-cmp',",
          "  template: '<button sbb-ghost-button>B</button>',",
          '})',
          'export class BCmp {}',
        ].join('\n'),
        defaultMigration,
      );

      expect(content).toContain("template: '<sbb-button>A</sbb-button>',");
      expect(content).toContain("template: '<sbb-accent-button>B</sbb-accent-button>',");
    });

    it('should not touch templates of other decorators or template literals with substitutions', async () => {
      const source = [
        "import { Directive } from '@angular/core';",
        '',
        '@Directive({',
        "  selector: '[appFoo]',",
        '})',
        'export class FooDirective {',
        '  markup = `<button sbb-button>${this.label}</button>`;',
        "  label = 'x';",
        '}',
      ].join('\n');

      const content = await MigrateLegacyTestUtils.migrateTsFile(source, defaultMigration);
      expect(content).toBe(source);
    });

    it('should leave elements without a closing tag untouched', async () => {
      const source = [
        "import { Component } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        "  template: '<button sbb-button>Broken',",
        '})',
        'export class AppComponent {}',
      ].join('\n');

      const content = await MigrateLegacyTestUtils.migrateTsFile(source, defaultMigration);
      expect(content).toBe(source);
    });
  });
});
