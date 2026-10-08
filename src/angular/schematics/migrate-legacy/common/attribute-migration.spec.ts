import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { HostTree } from '@angular-devkit/schematics';
import type { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from './attribute-migration.cjs';
import type { AttributeMigration } from './attribute-migration.cjs';

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
          { selector: 'sbb-button', attribute: 'svgIconChange', replaceWith: 'iconNameChange' },
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
          { selector: 'button[sbb-button]', attribute: 'svgIcon', replaceWith: 'iconName' },
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
});
