import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { HostTree, type Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import type { MigrationScope } from '../../utils.cjs';

import {
  createTemplateSelectorMigrationRule,
  type SelectorMigration,
} from './template-selector-migration.cjs';

describe('sbb-template-selector-migration', () => {
  const tempCollectionPath = path.join(
    os.tmpdir(),
    'lyne-angular-template-selector-migration-collection.json',
  );
  fs.writeFileSync(tempCollectionPath, JSON.stringify({ schematics: {} }));

  const runner = new SchematicTestRunner('test', tempCollectionPath);

  const migrate = async (
    files: Record<string, string>,
    migrations: SelectorMigration[],
  ): Promise<Tree> => {
    const tree = new UnitTestTree(new HostTree());
    for (const [filePath, content] of Object.entries(files)) {
      tree.create(filePath, content);
    }
    return firstValueFrom(runner.callRule(createTemplateSelectorMigrationRule(migrations), tree));
  };

  const defaultMigrations: SelectorMigration[] = [
    { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
    { selector: 'sbb-usermenu', replaceWith: 'sbb-user-menu' },
  ];

  const migrateHtml = async (
    template: string,
    migrations: SelectorMigration[] = defaultMigrations,
  ): Promise<string> => {
    const tree = await migrate({ '/src/app/app.component.html': template }, migrations);
    return tree.read('/src/app/app.component.html')!.toString('utf-8');
  };

  describe('tag replacement', () => {
    it('should replace tag and remove marker attribute for tag + attribute selector', async () => {
      expect(await migrateHtml('<button sbb-button>Click me</button>')).toBe(
        '<sbb-button>Click me</sbb-button>',
      );
    });

    it('should rename simple custom element tag names', async () => {
      expect(await migrateHtml('<sbb-usermenu>Menu</sbb-usermenu>')).toBe(
        '<sbb-user-menu>Menu</sbb-user-menu>',
      );
    });

    it('should support attribute-only selectors', async () => {
      const migrations: SelectorMigration[] = [
        { selector: '[sbb-legacy-card]', replaceWith: 'sbb-card' },
      ];
      expect(await migrateHtml('<div sbb-legacy-card>Content</div>', migrations)).toBe(
        '<sbb-card>Content</sbb-card>',
      );
    });

    it('should preserve attributes and structural directives on the element', async () => {
      expect(
        await migrateHtml(
          '<button sbb-button *ngIf="show" class="primary" [disabled]="isDisabled">Click</button>',
        ),
      ).toBe('<sbb-button *ngIf="show" class="primary" [disabled]="isDisabled">Click</sbb-button>');
    });

    it('should handle self-closing / void elements correctly', async () => {
      const migrations: SelectorMigration[] = [
        { selector: 'input[sbb-input]', replaceWith: 'sbb-input' },
      ];
      expect(await migrateHtml('<input sbb-input />', migrations)).toBe('<sbb-input />');
    });

    it('should migrate nested elements and multiple occurrences', async () => {
      const template = [
        '<sbb-usermenu>',
        '  <button sbb-button>Action 1</button>',
        '  <button sbb-button>Action 2</button>',
        '</sbb-usermenu>',
      ].join('\n');

      const expected = [
        '<sbb-user-menu>',
        '  <sbb-button>Action 1</sbb-button>',
        '  <sbb-button>Action 2</sbb-button>',
        '</sbb-user-menu>',
      ].join('\n');

      expect(await migrateHtml(template)).toBe(expected);
    });

    it('should migrate elements inside control flow blocks', async () => {
      const template = ['@if (visible) {', '  <button sbb-button>Label</button>', '}'].join('\n');

      const expected = ['@if (visible) {', '  <sbb-button>Label</sbb-button>', '}'].join('\n');

      expect(await migrateHtml(template)).toBe(expected);
    });

    it('should leave non-matching elements untouched', async () => {
      const template = '<button class="regular">Normal Button</button>';
      expect(await migrateHtml(template)).toBe(template);
    });

    it('should be idempotent', async () => {
      const once = await migrateHtml('<button sbb-button>Click me</button>');
      expect(await migrateHtml(once)).toBe(once);
    });
  });

  describe('edge cases', () => {
    it('should skip migration if element has no closing tag to prevent template corruption', async () => {
      // Tag non chiuso <button sbb-button> senza </button>
      const unclosedTemplate = '<button sbb-button>Unclosed';
      expect(await migrateHtml(unclosedTemplate)).toBe(unclosedTemplate);
    });
  });

  describe('inline templates', () => {
    it('should migrate inline templates in component files', async () => {
      const tree = await migrate(
        {
          '/src/app/app.component.ts': [
            "import { Component } from '@angular/core';",
            '',
            '@Component({',
            "  selector: 'app-root',",
            '  template: `',
            '    <button sbb-button (click)="go()">Go</button>',
            '  `,',
            '})',
            'export class AppComponent {}',
          ].join('\n'),
        },
        defaultMigrations,
      );

      const content = tree.read('/src/app/app.component.ts')!.toString('utf-8');
      expect(content).toContain('<sbb-button (click)="go()">Go</sbb-button>');
    });

    it('should not modify TypeScript files without matching selectors', async () => {
      const source = [
        "import { Component } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        "  template: '<div>Unrelated</div>',",
        '})',
        'export class AppComponent {}',
      ].join('\n');

      const tree = await migrate({ '/src/app/app.component.ts': source }, defaultMigrations);
      expect(tree.read('/src/app/app.component.ts')!.toString('utf-8')).toBe(source);
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

    const migrations: SelectorMigration[] = [
      { selector: 'button[sbb-button]', replaceWith: 'sbb-button' },
    ];

    it('should only migrate the external templates of the given scope', async () => {
      const template = '<button sbb-button>A</button>';
      const tree = createScopedTree('app.component.html', template);

      await firstValueFrom(
        runner.callRule(createTemplateSelectorMigrationRule(migrations, scope), tree),
      );

      expectOnlyScopedFile(tree, 'app.component.html', template, (content) =>
        expect(content).toBe('<sbb-button>A</sbb-button>'),
      );
    });

    it('should only migrate the inline templates of the given scope', async () => {
      const source =
        "import { Component } from '@angular/core';\n@Component({ template: '<button sbb-button>A</button>' })\nexport class A {}";
      const tree = createScopedTree('app.component.ts', source);

      await firstValueFrom(
        runner.callRule(createTemplateSelectorMigrationRule(migrations, scope), tree),
      );

      expectOnlyScopedFile(tree, 'app.component.ts', source, (content) =>
        expect(content).toContain("template: '<sbb-button>A</sbb-button>'"),
      );
    });
  });
});
