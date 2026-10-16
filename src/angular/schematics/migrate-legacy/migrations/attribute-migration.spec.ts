import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { HostTree, type Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import type { MigrationScope } from '../../utils.cjs';

import { type AttributeMigration, createAttributeMigrationRule } from './attribute-migration.cjs';

describe('sbb-attribute-migration', () => {
  const tempCollectionPath = path.join(
    os.tmpdir(),
    'lyne-angular-attribute-migration-collection.json',
  );
  fs.writeFileSync(tempCollectionPath, JSON.stringify({ schematics: {} }));

  const runner = new SchematicTestRunner('test', tempCollectionPath);

  const migrate = async (
    files: Record<string, string>,
    migrations: AttributeMigration[],
  ): Promise<Tree> => {
    const tree = new UnitTestTree(new HostTree());
    for (const [filePath, content] of Object.entries(files)) {
      tree.create(filePath, content);
    }
    return firstValueFrom(runner.callRule(createAttributeMigrationRule(migrations), tree));
  };

  const rename: AttributeMigration[] = [
    { selector: 'sbb-button', attribute: 'svgIcon', replaceWith: 'iconName' },
  ];

  const migrateHtml = async (
    template: string,
    migrations: AttributeMigration[] = rename,
  ): Promise<string> => {
    const tree = await migrate({ '/src/app/app.component.html': template }, migrations);
    return tree.read('/src/app/app.component.html')!.toString('utf-8');
  };

  describe('renaming', () => {
    it('should rename a static attribute', async () => {
      expect(await migrateHtml('<sbb-button svgIcon="arrow">A</sbb-button>')).toBe(
        '<sbb-button iconName="arrow">A</sbb-button>',
      );
    });

    it('should rename a bound input', async () => {
      expect(await migrateHtml('<sbb-button [svgIcon]="icon">A</sbb-button>')).toBe(
        '<sbb-button [iconName]="icon">A</sbb-button>',
      );
    });

    it('should keep the dash-case spelling', async () => {
      expect(await migrateHtml('<sbb-button svg-icon="arrow">A</sbb-button>')).toBe(
        '<sbb-button icon-name="arrow">A</sbb-button>',
      );
      expect(await migrateHtml('<sbb-button [svg-icon]="icon">A</sbb-button>')).toBe(
        '<sbb-button [icon-name]="icon">A</sbb-button>',
      );
    });

    it('should rename a two-way binding exactly once', async () => {
      expect(await migrateHtml('<sbb-button [(svgIcon)]="icon">A</sbb-button>')).toBe(
        '<sbb-button [(iconName)]="icon">A</sbb-button>',
      );
    });

    it('should rename an output', async () => {
      expect(
        await migrateHtml('<sbb-button (svgIconChange)="onChange($event)">A</sbb-button>', [
          {
            selector: 'sbb-button',
            attribute: 'svgIconChange',
            replaceWith: 'iconNameChange',
          },
        ]),
      ).toBe('<sbb-button (iconNameChange)="onChange($event)">A</sbb-button>');
    });

    it('should rename every occurrence in a template', async () => {
      expect(
        await migrateHtml(
          '<sbb-button svgIcon="a">A</sbb-button>\n<sbb-button [svgIcon]="b">B</sbb-button>',
        ),
      ).toBe('<sbb-button iconName="a">A</sbb-button>\n<sbb-button [iconName]="b">B</sbb-button>');
    });

    it('should not touch other elements', async () => {
      const template = '<sbb-icon svgIcon="arrow"></sbb-icon>';
      expect(await migrateHtml(template)).toBe(template);
    });

    it('should not touch other attributes or the value', async () => {
      expect(
        await migrateHtml(
          '<sbb-button class="svgIcon" svgIcon="svgIcon" [disabled]="svgIcon">svgIcon</sbb-button>',
        ),
      ).toBe(
        '<sbb-button class="svgIcon" iconName="svgIcon" [disabled]="svgIcon">svgIcon</sbb-button>',
      );
    });

    it('should support multiple selectors and migrations', async () => {
      expect(
        await migrateHtml(
          '<sbb-button svgIcon="a"></sbb-button><sbb-secondary-button svgIcon="b"></sbb-secondary-button>',
          [
            {
              selector: ['sbb-button', 'sbb-secondary-button'],
              attribute: 'svgIcon',
              replaceWith: 'iconName',
            },
          ],
        ),
      ).toBe(
        '<sbb-button iconName="a"></sbb-button><sbb-secondary-button iconName="b"></sbb-secondary-button>',
      );
    });

    it('should support attribute selectors', async () => {
      expect(
        await migrateHtml('<button sbb-button svgIcon="a">A</button>', [
          {
            selector: 'button[sbb-button]',
            attribute: 'svgIcon',
            replaceWith: 'iconName',
          },
        ]),
      ).toBe('<button sbb-button iconName="a">A</button>');
    });

    it('should be idempotent', async () => {
      const once = await migrateHtml('<sbb-button svgIcon="arrow">A</sbb-button>');
      expect(await migrateHtml(once)).toBe(once);
    });

    it('should skip the rename when the target attribute already exists', async () => {
      const template = '<sbb-button svgIcon="a" iconName="b">A</sbb-button>';
      expect(await migrateHtml(template)).toBe(template);
    });

    it('should migrate elements inside control flow blocks', async () => {
      expect(
        await migrateHtml(
          ['@if (visible) {', '  <sbb-button svgIcon="a">A</sbb-button>', '}'].join('\n'),
        ),
      ).toBe(['@if (visible) {', '  <sbb-button iconName="a">A</sbb-button>', '}'].join('\n'));
    });
  });

  describe('removal', () => {
    const removal: AttributeMigration[] = [{ selector: 'sbb-button', attribute: 'svgIcon' }];

    it('should remove a static attribute', async () => {
      expect(await migrateHtml('<sbb-button svgIcon="arrow">A</sbb-button>', removal)).toBe(
        '<sbb-button>A</sbb-button>',
      );
    });

    it('should remove a bound input', async () => {
      expect(await migrateHtml('<sbb-button [svgIcon]="icon">A</sbb-button>', removal)).toBe(
        '<sbb-button>A</sbb-button>',
      );
    });

    it('should remove the whole line in multiline tags', async () => {
      expect(
        await migrateHtml(
          ['<sbb-button', '  svgIcon="arrow"', '  [disabled]="d"', '>A</sbb-button>'].join('\n'),
          removal,
        ),
      ).toBe(['<sbb-button', '  [disabled]="d"', '>A</sbb-button>'].join('\n'));
    });
  });

  describe('inline templates', () => {
    it('should migrate inline templates', async () => {
      const tree = await migrate(
        {
          '/src/app/app.component.ts': [
            "import { Component } from '@angular/core';",
            '',
            '@Component({',
            "  selector: 'app-root',",
            '  template: `',
            '    <sbb-button svgIcon="arrow" (click)="go()">Go</sbb-button>',
            '  `,',
            '})',
            'export class AppComponent {',
            "  svgIcon = 'arrow';",
            '}',
          ].join('\n'),
        },
        rename,
      );

      const content = tree.read('/src/app/app.component.ts')!.toString('utf-8');
      expect(content).toContain('<sbb-button iconName="arrow" (click)="go()">Go</sbb-button>');
      // Class members are not templates and therefore untouched.
      expect(content).toContain("svgIcon = 'arrow';");
    });

    it('should not touch files without a matching element', async () => {
      const source = [
        "import { Component } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  template: \'<sbb-icon svgIcon="arrow"></sbb-icon>\',',
        '})',
        'export class AppComponent {}',
      ].join('\n');

      const tree = await migrate({ '/src/app/app.component.ts': source }, rename);
      expect(tree.read('/src/app/app.component.ts')!.toString('utf-8')).toBe(source);
    });
  });

  describe('inline template quoting', () => {
    const SOURCE_FILE = '/src/app/app.component.ts';

    const component = (templateLiteral: string): string =>
      [
        "import { Component } from '@angular/core';",
        '',
        `@Component({ selector: 'app-root', template: ${templateLiteral} })`,
        'export class AppComponent {}',
      ].join('\n');

    const migrateComponent = async (
      source: string,
      migrations: AttributeMigration[],
    ): Promise<string> => {
      const tree = await migrate({ [SOURCE_FILE]: source }, migrations);
      return tree.read(SOURCE_FILE)!.toString('utf-8');
    };

    const expectValidTypeScript = (source: string): void => {
      expect(ts.transpileModule(source, { reportDiagnostics: true }).diagnostics).toEqual([]);
    };

    const defaultFor = (defaultValue: string): AttributeMigration[] => [
      {
        selector: 'button[sbb-button]',
        attribute: 'svgIcon',
        replaceWith: 'iconName',
        defaultValue,
      },
    ];

    it('should escape an inserted default for a double-quoted template', async () => {
      const result = await migrateComponent(
        component(String.raw`"<button sbb-button>Go</button>"`),
        defaultFor('arrow-right-small'),
      );

      expect(result).toBe(
        component(String.raw`"<button iconName=\"arrow-right-small\" sbb-button>Go</button>"`),
      );
      expectValidTypeScript(result);
    });

    it('should not escape double quotes for a single-quoted template', async () => {
      const result = await migrateComponent(
        component(String.raw`'<button sbb-button>Go</button>'`),
        defaultFor('arrow-right-small'),
      );

      expect(result).toBe(
        component(String.raw`'<button iconName="arrow-right-small" sbb-button>Go</button>'`),
      );
      expectValidTypeScript(result);
    });

    it('should escape the enclosing quote and backslashes of an inserted default', async () => {
      const result = await migrateComponent(
        component(String.raw`'<button sbb-button>Go</button>'`),
        defaultFor(String.raw`it's a\b`),
      );

      expect(result).toBe(
        component(String.raw`'<button iconName="it\'s a\\b" sbb-button>Go</button>'`),
      );
      expectValidTypeScript(result);
    });

    it('should escape substitutions of an inserted default in a template literal', async () => {
      const result = await migrateComponent(
        component('`<button sbb-button>Go</button>`'),
        defaultFor('a${b}`c'),
      );

      expect(result).toBe(component('`<button iconName="a\\${b}\\`c" sbb-button>Go</button>`'));
      expectValidTypeScript(result);
    });

    it('should rename escaped bindings in a double-quoted template', async () => {
      const result = await migrateComponent(
        component(String.raw`"<sbb-button [svgIcon]=\"icon\" class=\"a\">A</sbb-button>"`),
        rename,
      );

      expect(result).toBe(
        component(String.raw`"<sbb-button [iconName]=\"icon\" class=\"a\">A</sbb-button>"`),
      );
      expectValidTypeScript(result);
    });

    it('should remove an attribute between escaped quotes', async () => {
      const result = await migrateComponent(
        component(
          String.raw`"<sbb-button class=\"a\" svgIcon=\"x\" [disabled]=\"d\">A</sbb-button>"`,
        ),
        [{ selector: 'sbb-button', attribute: 'svgIcon' }],
      );

      expect(result).toBe(
        component(String.raw`"<sbb-button class=\"a\" [disabled]=\"d\">A</sbb-button>"`),
      );
      expectValidTypeScript(result);
    });

    it('should remove the whole line of a template written with `\\n` escapes', async () => {
      const result = await migrateComponent(
        component(String.raw`'<sbb-button\n  svgIcon="a"\n  [disabled]="d"\n>A</sbb-button>'`),
        [{ selector: 'sbb-button', attribute: 'svgIcon' }],
      );

      expect(result).toBe(component(String.raw`'<sbb-button\n  [disabled]="d"\n>A</sbb-button>'`));
    });

    it('should map offsets behind unicode escapes back to the source', async () => {
      const result = await migrateComponent(
        component(String.raw`"\u00e4\u{1F600} <sbb-button svgIcon=\"a\">A</sbb-button>"`),
        rename,
      );

      expect(result).toBe(
        component(String.raw`"\u00e4\u{1F600} <sbb-button iconName=\"a\">A</sbb-button>"`),
      );
    });

    it('should keep CRLF line breaks of template literals', async () => {
      expect(
        await migrateComponent(
          component('`\r\n  <sbb-button svgIcon="a">A</sbb-button>\r\n`'),
          rename,
        ),
      ).toBe(component('`\r\n  <sbb-button iconName="a">A</sbb-button>\r\n`'));

      expect(
        await migrateComponent(
          component('`<sbb-button\r\n  svgIcon="a"\r\n  [disabled]="d"\r\n>A</sbb-button>`'),
          [{ selector: 'sbb-button', attribute: 'svgIcon' }],
        ),
      ).toBe(component('`<sbb-button\r\n  [disabled]="d"\r\n>A</sbb-button>`'));
    });

    it('should migrate escaped bindings in subsequent passes', async () => {
      const first = await migrateComponent(
        component(String.raw`"<sbb-button [svgIcon]=\"icon\">A</sbb-button>"`),
        rename,
      );
      const second = await migrateComponent(first, [
        { selector: 'sbb-button', attribute: 'iconName', replaceWith: 'name' },
      ]);

      expect(second).toBe(component(String.raw`"<sbb-button [name]=\"icon\">A</sbb-button>"`));
    });

    it('should be idempotent for an inserted default', async () => {
      const once = await migrateComponent(
        component(String.raw`"<button sbb-button>Go</button>"`),
        defaultFor('arrow-right-small'),
      );

      expect(await migrateComponent(once, defaultFor('arrow-right-small'))).toBe(once);
    });

    it('should leave templates with malformed escapes untouched', async () => {
      const source = component(String.raw`"<sbb-button svgIcon=\"a\">\x</sbb-button>"`);

      expect(await migrateComponent(source, rename)).toBe(source);
    });
  });

  describe('default value', () => {
    const migrationWithDefault: AttributeMigration[] = [
      {
        selector: 'sbb-button',
        attribute: 'svgIcon',
        replaceWith: 'iconName',
        defaultValue: 'default-icon',
      },
    ];

    const migrateWithDefaultHtml = async (template: string): Promise<string> => {
      const tree = await migrate({ '/src/app/app.component.html': template }, migrationWithDefault);
      return tree.read('/src/app/app.component.html')!.toString('utf-8');
    };

    it('should add the default attribute when the legacy attribute is missing', async () => {
      expect(await migrateWithDefaultHtml('<sbb-button>A</sbb-button>')).toBe(
        '<sbb-button iconName="default-icon">A</sbb-button>',
      );
    });

    it('should rename the legacy attribute instead of adding default when present', async () => {
      expect(await migrateWithDefaultHtml('<sbb-button svgIcon="arrow">A</sbb-button>')).toBe(
        '<sbb-button iconName="arrow">A</sbb-button>',
      );
    });

    it('should skip adding the default attribute if the target attribute already exists', async () => {
      const template = '<sbb-button iconName="existing">A</sbb-button>';
      expect(await migrateWithDefaultHtml(template)).toBe(template);
    });

    it('should add distinct defaults to the same element', async () => {
      expect(
        await migrateHtml('<sbb-button>A</sbb-button>', [
          ...migrationWithDefault,
          {
            selector: 'sbb-button',
            attribute: 'mode',
            replaceWith: 'size',
            defaultValue: 'm',
          },
        ]),
      ).toBe('<sbb-button iconName="default-icon" size="m">A</sbb-button>');
    });

    it('should add a default only once per target attribute', async () => {
      expect(
        await migrateHtml('<sbb-button>A</sbb-button>', [
          ...migrationWithDefault,
          {
            selector: 'sbb-button',
            attribute: 'icon',
            replaceWith: 'iconName',
            defaultValue: 'x',
          },
        ]),
      ).toBe('<sbb-button iconName="default-icon">A</sbb-button>');
    });
  });

  describe('project scope', () => {
    const scope: MigrationScope = {
      root: 'projects/app-a',
      excludedRoots: ['projects/app-a/lib'],
    };
    const scopedDirs = ['projects/app-a/src', 'projects/app-a/lib/src', 'projects/app-b/src'];

    /** Creates the same file in the scoped project, a nested project and a sibling project. */
    const createScopedTree = (fileName: string, content: string): UnitTestTree => {
      const tree = new UnitTestTree(new HostTree());
      for (const scopedDir of scopedDirs) {
        tree.create(`/${scopedDir}/${fileName}`, content);
      }
      return tree;
    };

    /** Asserts that only the file of the scoped project changed. */
    const expectOnlyScopedFile = (
      tree: Tree,
      fileName: string,
      original: string,
      assert: (content: string) => void,
    ): void => {
      assert(tree.readText(`/projects/app-a/src/${fileName}`));
      expect(tree.readText(`/projects/app-a/lib/src/${fileName}`)).toBe(original);
      expect(tree.readText(`/projects/app-b/src/${fileName}`)).toBe(original);
    };

    it('should only migrate the templates of the given scope', async () => {
      const template = '<sbb-button svgIcon="arrow">A</sbb-button>';
      const tree = createScopedTree('app.component.html', template);

      await firstValueFrom(runner.callRule(createAttributeMigrationRule(rename, scope), tree));

      expectOnlyScopedFile(tree, 'app.component.html', template, (content) =>
        expect(content).toBe('<sbb-button iconName="arrow">A</sbb-button>'),
      );
    });

    it('should migrate the whole workspace without scope', async () => {
      const template = '<sbb-button svgIcon="arrow">A</sbb-button>';
      const tree = createScopedTree('app.component.html', template);

      await firstValueFrom(runner.callRule(createAttributeMigrationRule(rename), tree));

      for (const scopedDir of scopedDirs) {
        expect(tree.readText(`/${scopedDir}/app.component.html`)).toContain('iconName');
      }
    });
  });
});
