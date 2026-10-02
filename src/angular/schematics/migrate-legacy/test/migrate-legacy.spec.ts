import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { migrateLegacy } from '../index.cjs';

describe('sbb-migrate-legacy', () => {
  const tempCollectionPath = path.join(os.tmpdir(), 'lyne-angular-migrate-legacy-collection.json');
  fs.writeFileSync(tempCollectionPath, JSON.stringify({ schematics: {} }));

  const runner = new SchematicTestRunner('test', tempCollectionPath);

  const createTree = (): UnitTestTree => {
    const tree = new UnitTestTree(new HostTree());

    tree.create(
      '/angular.json',
      JSON.stringify(
        {
          version: 1,
          projects: {
            'test-app': {
              root: '',
              sourceRoot: 'src',
              projectType: 'application',
              architect: {
                build: {
                  builder: '@angular-devkit/build-angular:browser',
                  options: {
                    styles: ['src/styles.css'],
                  },
                },
                test: {
                  builder: '@angular-devkit/build-angular:karma',
                  options: {
                    styles: ['src/styles.css'],
                  },
                },
              },
            },
          },
        },
        null,
        2,
      ),
    );

    tree.create(
      '/package.json',
      JSON.stringify(
        {
          name: 'demo-app',
          dependencies: {
            '@sbb-esta/angular': '1.0.0',
          },
        },
        null,
        2,
      ),
    );

    tree.create(
      '/node_modules/@sbb-esta/lyne-angular/package.json',
      JSON.stringify(
        {
          peerDependencies: {
            '@sbb-esta/lyne-elements': '1.0.0',
            '@angular/cdk': '1.0.0',
          },
        },
        null,
        2,
      ),
    );

    tree.create(
      '/src/app/app.component.ts',
      [
        "import { Component } from '@angular/core';",
        "import { SbbButtonModule } from '@sbb-esta/angular/button';",
        "import { SbbButtonGroup } from '@sbb-esta/angular/button/button';",
        "import { SbbCore } from '@sbb-esta/angular';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        "  template: '<sbb-button></sbb-button>',",
        '})',
        'export class AppComponent {}',
      ].join('\n'),
    );

    return tree;
  };

  it('should migrate button module with import path rewrite', async () => {
    const tree = createTree();
    const resultTree = await firstValueFrom(
      runner.callRule(migrateLegacy({ module: ['button'] }), tree),
    );

    // Verify button imports rewritten
    const sourceCode = resultTree.read('/src/app/app.component.ts')?.toString('utf-8') ?? '';
    expect(sourceCode).toContain("from '@sbb-esta/lyne-angular/button'");
    expect(sourceCode).toContain("from '@sbb-esta/lyne-angular/button/button'");
    // Other modules unchanged
    expect(sourceCode).toContain("from '@sbb-esta/angular';");

    // Verify dependencies and theme setup
    const packageJson = JSON.parse(resultTree.read('/package.json')?.toString('utf-8') ?? '{}');
    expect(packageJson.dependencies['@sbb-esta/lyne-elements']).toBeDefined();
  });

  it('should migrate all modules when no specific module requested', async () => {
    const tree = createTree();
    const resultTree = await firstValueFrom(runner.callRule(migrateLegacy({}), tree));

    // Verify button imports rewritten ( (to be completed))
    const sourceCode = resultTree.read('/src/app/app.component.ts')?.toString('utf-8') ?? '';
    expect(sourceCode).toContain("from '@sbb-esta/lyne-angular/button'");
  });

  it('should setup lyne dependencies and theme', async () => {
    const tree = createTree();
    const resultTree = await firstValueFrom(
      runner.callRule(migrateLegacy({ module: ['button'] }), tree),
    );

    // Verify dependencies added
    const packageJson = JSON.parse(resultTree.read('/package.json')?.toString('utf-8') ?? '{}');
    expect(packageJson.dependencies['@sbb-esta/angular']).toBe('1.0.0');
    expect(packageJson.dependencies['@sbb-esta/lyne-elements']).toBeDefined();
    expect(packageJson.dependencies['@angular/cdk']).toBeDefined();

    // Verify theme added to build target
    const angularJson = JSON.parse(resultTree.read('/angular.json')?.toString('utf-8') ?? '{}');
    expect(angularJson.projects['test-app'].architect.build.options.styles).toContain(
      'node_modules/@sbb-esta/lyne-elements/standard-theme.css',
    );

    // Verify theme added to test target
    expect(angularJson.projects['test-app'].architect.test.options.styles).toContain(
      'node_modules/@sbb-esta/lyne-elements/standard-theme.css',
    );

    // Button imports should be rewritten ( (to be completed))
    const sourceCode = resultTree.read('/src/app/app.component.ts')?.toString('utf-8') ?? '';
    expect(sourceCode).toContain("from '@sbb-esta/lyne-angular/button'");
  });

  it('should resolve all modules when module array is empty', async () => {
    const tree = createTree();
    const resultTree = await firstValueFrom(runner.callRule(migrateLegacy({ module: [] }), tree));

    // Verify dependencies and theme setup works for all modules case
    const packageJson = JSON.parse(resultTree.read('/package.json')?.toString('utf-8') ?? '{}');
    expect(packageJson.dependencies['@sbb-esta/lyne-elements']).toBeDefined();
    expect(packageJson.dependencies['@angular/cdk']).toBeDefined();

    // Verify all available modules migrated (to be completed)
    const sourceCode = resultTree.read('/src/app/app.component.ts')?.toString('utf-8') ?? '';
    expect(sourceCode).toContain("from '@sbb-esta/lyne-angular/button'");
  });
});
