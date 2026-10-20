import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { HostTree, type Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { migrateButton } from './button.cjs';

describe('sbb-button', () => {
  const tempCollectionPath = path.join(os.tmpdir(), 'lyne-angular-migrate-button-collection.json');
  fs.writeFileSync(tempCollectionPath, JSON.stringify({ schematics: {} }));

  const runner = new SchematicTestRunner('test', tempCollectionPath);

  /** Runs the button migration against a tree containing the given files. */
  const migrate = async (files: Record<string, string>): Promise<Tree> => {
    const tree = new UnitTestTree(new HostTree());
    for (const [filePath, content] of Object.entries(files)) {
      tree.create(filePath, content);
    }
    return firstValueFrom(runner.callRule(migrateButton({ root: '', excludedRoots: [] }), tree));
  };

  const migrateHtml = async (template: string): Promise<string> => {
    const tree = await migrate({ '/src/app/app.component.html': template });
    return tree.read('/src/app/app.component.html')!.toString('utf-8');
  };

  describe('project scope', () => {
    it('should only migrate the files of the given scope', async () => {
      const template = '<button sbb-button>A</button>';
      const source = "import { SbbButtonModule } from '@sbb-esta/angular/button';";
      const tree = new UnitTestTree(new HostTree());
      for (const project of ['app-a', 'app-b']) {
        tree.create(`/projects/${project}/src/app.component.html`, template);
        tree.create(`/projects/${project}/src/app.component.ts`, source);
      }

      await firstValueFrom(
        runner.callRule(migrateButton({ root: 'projects/app-a', excludedRoots: [] }), tree),
      );

      expect(tree.readText('/projects/app-a/src/app.component.html')).toBe(
        '<sbb-button>A</sbb-button>',
      );
      expect(tree.readText('/projects/app-a/src/app.component.ts')).toContain(
        '@sbb-esta/lyne-angular/button',
      );
      expect(tree.readText('/projects/app-b/src/app.component.html')).toBe(template);
      expect(tree.readText('/projects/app-b/src/app.component.ts')).toBe(source);
    });
  });

  describe('import paths', () => {
    it('should rewrite button imports', async () => {
      const tree = await migrate({
        '/src/app/app.component.ts': [
          "import { SbbButtonModule } from '@sbb-esta/angular/button';",
          "import { SbbCore } from '@sbb-esta/angular';",
          "import { SbbIconModule } from '@sbb-esta/angular/icon';",
          "export { SbbButtonModule } from '@sbb-esta/angular/button';",
        ].join('\n'),
      });

      const content = tree.read('/src/app/app.component.ts')!.toString('utf-8');
      expect(content).toContain("import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';");
      expect(content).toContain("export { SbbButtonModule } from '@sbb-esta/lyne-angular/button';");
      // Unrelated imports stay untouched.
      expect(content).toContain("from '@sbb-esta/angular';");
      expect(content).toContain("from '@sbb-esta/angular/icon';");
    });

    it('should preserve the original quote style', async () => {
      const tree = await migrate({
        '/src/app/app.component.ts': 'import { SbbButtonModule } from "@sbb-esta/angular/button";',
      });

      expect(tree.read('/src/app/app.component.ts')!.toString('utf-8')).toBe(
        'import { SbbButtonModule } from "@sbb-esta/lyne-angular/button";',
      );
    });

    it('should not touch node_modules or declaration files', async () => {
      const source = "import { SbbButtonModule } from '@sbb-esta/angular/button';";
      const tree = await migrate({
        '/node_modules/some-lib/index.ts': source,
        '/src/app/app.d.ts': source,
      });

      expect(tree.read('/node_modules/some-lib/index.ts')!.toString('utf-8')).toBe(source);
      expect(tree.read('/src/app/app.d.ts')!.toString('utf-8')).toBe(source);
    });
  });

  describe('template selectors', () => {
    it('should replace all button variants', async () => {
      expect(await migrateHtml('<button sbb-button>A</button>')).toBe('<sbb-button>A</sbb-button>');
      expect(await migrateHtml('<button sbb-secondary-button>A</button>')).toBe(
        '<sbb-secondary-button>A</sbb-secondary-button>',
      );
      expect(await migrateHtml('<button sbb-ghost-button>A</button>')).toBe(
        '<sbb-accent-button>A</sbb-accent-button>',
      );
      expect(await migrateHtml('<button sbb-frameless-button>A</button>')).toBe(
        '<sbb-transparent-button>A</sbb-transparent-button>',
      );
      expect(await migrateHtml('<a sbb-button>A</a>')).toBe('<sbb-button-link>A</sbb-button-link>');
      expect(await migrateHtml('<a sbb-secondary-button>A</a>')).toBe(
        '<sbb-secondary-button-link>A</sbb-secondary-button-link>',
      );
      expect(await migrateHtml('<a sbb-ghost-button>A</a>')).toBe(
        '<sbb-accent-button-link>A</sbb-accent-button-link>',
      );
      expect(await migrateHtml('<a sbb-frameless-button>A</a>')).toBe(
        '<sbb-transparent-button-link>A</sbb-transparent-button-link>',
      );
      expect(await migrateHtml('<button sbb-link>A</button>')).toContain(
        '<sbb-link-button>A</sbb-link-button>',
      );
      expect(await migrateHtml('<a sbb-link>A</a>')).toContain('<sbb-link>A</sbb-link>');
    });

    it('should keep all other attributes and bindings', async () => {
      expect(
        await migrateHtml(
          '<button sbb-button class="foo" [disabled]="isDisabled" (click)="go()" #ref>Go</button>',
        ),
      ).toBe('<sbb-button class="foo" [disabled]="isDisabled" (click)="go()" #ref>Go</sbb-button>');
    });

    it('should migrate nested and multiline templates', async () => {
      const result = await migrateHtml(
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
      const result = await migrateHtml(
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
      expect(await migrateHtml(template)).toBe(template);
    });

    it('should be idempotent', async () => {
      const once = await migrateHtml('<button type="button" sbb-button>A</button>');
      const twice = await migrateHtml(once);
      expect(twice).toBe(once);
    });

    it('should migrate multiple buttons within one template', async () => {
      expect(
        await migrateHtml('<a sbb-button>One</a><button sbb-frameless-button>Two</button>'),
      ).toBe(
        '<sbb-button-link>One</sbb-button-link><sbb-transparent-button>Two</sbb-transparent-button>',
      );
    });
  });

  describe('attributes', () => {
    it('should rename svgIcon to iconName on migrated buttons', async () => {
      expect(await migrateHtml('<button sbb-button svgIcon="arrow-right">Go</button>')).toBe(
        '<sbb-button iconName="arrow-right">Go</sbb-button>',
      );
    });

    it('should rename a bound svgIcon on every button variant', async () => {
      expect(await migrateHtml('<button sbb-secondary-button [svgIcon]="icon">A</button>')).toBe(
        '<sbb-secondary-button [iconName]="icon">A</sbb-secondary-button>',
      );
      expect(await migrateHtml('<button sbb-ghost-button [svgIcon]="icon">A</button>')).toBe(
        '<sbb-accent-button [iconName]="icon">A</sbb-accent-button>',
      );
      expect(await migrateHtml('<button sbb-frameless-button svg-icon="arrow">A</button>')).toBe(
        '<sbb-transparent-button icon-name="arrow">A</sbb-transparent-button>',
      );
    });

    it('should not rename svgIcon on untouched elements', async () => {
      const template = '<sbb-icon svgIcon="arrow"></sbb-icon>';
      expect(await migrateHtml(template)).toBe(template);
    });

    it('should rename svgIcon in inline templates', async () => {
      const tree = await migrate({
        '/src/app/app.component.ts': [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  template: \'<button sbb-button svgIcon="arrow">Go</button>\',',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
      });

      expect(tree.read('/src/app/app.component.ts')!.toString('utf-8')).toContain(
        'template: \'<sbb-button iconName="arrow">Go</sbb-button>\',',
      );
    });
  });

  describe('comments', () => {
    it('should add comments for links', async () => {
      expect(await migrateHtml('<a sbb-link>Go</a>')).toContain(
        "FIXME: links are now imported from `SbbLinkModule` under `@sbb-esta/lyne-angular/link`. Check the component's imports.",
      );
      expect(await migrateHtml('<button sbb-link>Go</button>')).toContain(
        "FIXME: links are now imported from `SbbLinkModule` under `@sbb-esta/lyne-angular/link`. Check the component's imports.",
      );
    });

    it('should add comments for sbb-alt-button', async () => {
      expect(await migrateHtml('<button sbb-alt-button>Go</button>')).toContain(
        'FIXME: this component has no counterpart in lyne-angular.',
      );
      expect(await migrateHtml('<a sbb-alt-button>Go</a>')).toContain(
        'FIXME: this component has no counterpart in lyne-angular.',
      );
    });
  });

  describe('inline templates', () => {
    it('should migrate a single quoted inline template', async () => {
      const tree = await migrate({
        '/src/app/app.component.ts': [
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
      });

      const content = tree.read('/src/app/app.component.ts')!.toString('utf-8');
      expect(content).toContain('template: \'<sbb-button type="button">Click</sbb-button>\',');
      expect(content).toContain("from '@sbb-esta/lyne-angular/button';");
    });

    it('should migrate a multiline template literal', async () => {
      const tree = await migrate({
        '/src/app/app.component.ts': [
          "import { Component } from '@angular/core';",
          '',
          '@Component({',
          "  selector: 'app-root',",
          '  template: `',
          '    <button sbb-button (click)="go()">Go</button>',
          '    <a sbb-ghost-button>Alt</a>',
          '  `,',
          '})',
          'export class AppComponent {}',
        ].join('\n'),
      });

      const content = tree.read('/src/app/app.component.ts')!.toString('utf-8');
      expect(content).toContain('<sbb-button (click)="go()">Go</sbb-button>');
      expect(content).toContain('<sbb-accent-button-link>Alt</sbb-accent-button-link>');
    });

    it('should migrate multiple components within the same file', async () => {
      const tree = await migrate({
        '/src/app/app.component.ts': [
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
      });

      const content = tree.read('/src/app/app.component.ts')!.toString('utf-8');
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

      const tree = await migrate({ '/src/app/foo.directive.ts': source });
      expect(tree.read('/src/app/foo.directive.ts')!.toString('utf-8')).toBe(source);
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

      const tree = await migrate({ '/src/app/app.component.ts': source });
      expect(tree.read('/src/app/app.component.ts')!.toString('utf-8')).toBe(source);
    });
  });
});
