import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import { handleLeanThemeConfiguration } from '../migrate-lean-theme.cjs';

describe(`sbb-lean-theme-migration`, () => {
  // Create a minimal dummy collection file in the OS temp directory
  const tempCollectionPath = path.join(os.tmpdir(), 'sbb-dummy-collection.json');
  fs.writeFileSync(tempCollectionPath, JSON.stringify({ schematics: {} }));

  // Pass the real physical temporary file path to the runner
  const runner = new SchematicTestRunner('test', tempCollectionPath);

  /**
   * Helper utility to spin up a mock workspace tree.
   * This provides a valid structure so internal workspace utilities don't crash.
   */
  const createMockWorkspace = (): UnitTestTree => {
    const tree = new UnitTestTree(new HostTree());

    tree.create(
      '/angular.json',
      JSON.stringify(
        {
          version: 1,
          projects: {
            'my-test-app': {
              root: '',
              sourceRoot: 'src',
              projectType: 'application',
              architect: {
                build: {
                  builder: '@angular-devkit/build-angular:browser',
                  options: { styles: ['src/styles.css'] },
                },
                test: {
                  builder: '@angular-devkit/build-angular:karma',
                  options: { styles: ['src/styles.css'] },
                },
              },
            },
          },
        },
        null,
        2,
      ),
    );

    return tree;
  };

  it('should remove sbb-lean, inject the FIXME comment, and trigger angular.json rule chain', async () => {
    const tree = createMockWorkspace();
    tree.create('/src/index.html', '<html class="sbb-lean"><body></body></html>');

    const resultTree = await firstValueFrom(runner.callRule(handleLeanThemeConfiguration(), tree));

    const transformedHtml = resultTree.read('/src/index.html')?.toString('utf-8') ?? '';
    expect(transformedHtml.trim()).toEqual(
      `
<!--
  FIXME:
   The legacy \`sbb-lean\` class has been found and removed from the <html> tag, and the default lean theme import has been added.
   If you want a different one, or an 'off-brand' or 'safety' variant, please check and adapt your \`angular.json\`.
   Check https://lyne-angular.app.sbb.ch/angular/guides/theming#themes for more details about theming.
-->
<html><body></body></html>
`.trim(),
    );

    const angularJsonRaw = resultTree.read('/angular.json')?.toString('utf-8') ?? '{}';
    const angularJson = JSON.parse(angularJsonRaw);
    const styles: string[] = angularJson.projects['my-test-app'].architect.build.options.styles;
    expect(styles).toBeDefined();
    const hasLean = styles.includes('node_modules/@sbb-esta/lyne-elements/lean-theme.css');
    expect(hasLean).to.be.equal(true);
  });

  it('should pass-through completely untouched if sbb-lean is missing from the html tag', async () => {
    const tree = createMockWorkspace();
    const cleanHtml = '<html class="sbb-brand-modern"><body></body></html>';

    tree.create('/src/index.html', cleanHtml);

    const resultTree = await firstValueFrom(runner.callRule(handleLeanThemeConfiguration(), tree));

    // Ensure absolutely nothing changed structurally inside the file tracking layers
    const transformedHtml = resultTree.read('/src/index.html')?.toString('utf-8') ?? '';
    expect(transformedHtml).toBe(cleanHtml);
  });
});
