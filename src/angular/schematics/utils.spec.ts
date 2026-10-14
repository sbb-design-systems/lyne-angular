import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { HostTree, SchematicsException } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';

import { isStandardThemeSet } from './utils.cjs';

describe(`sbb-utils`, () => {
  const tempCollectionPath = path.join(os.tmpdir(), 'sbb-dummy-collection.json');
  fs.writeFileSync(tempCollectionPath, JSON.stringify({ schematics: {} }));

  const runner = new SchematicTestRunner('test', tempCollectionPath);

  const createMockWorkspace = (
    targets: Record<string, unknown> = {
      build: {
        builder: '@angular-devkit/build-angular:browser',
        options: { styles: [] },
      },
    },
  ): UnitTestTree => {
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
              targets,
            },
          },
        },
        null,
        2,
      ),
    );

    return tree;
  };

  it('should throw SchematicsException if project does not exist', async () => {
    const tree = createMockWorkspace();

    const testRule: Rule = async (inlineTree: Tree, context: SchematicContext) => {
      await isStandardThemeSet(inlineTree, context, 'non-existent-project');
      return inlineTree;
    };

    await expect(firstValueFrom(runner.callRule(testRule, tree))).rejects.toThrow(
      SchematicsException,
    );
  });

  it('should throw SchematicsException if build target is missing', async () => {
    const targets = {
      test: { builder: '@angular-devkit/build-angular:karma' },
    };
    const tree = createMockWorkspace(targets);

    const testRule: Rule = async (inlineTree: Tree, context: SchematicContext) => {
      await isStandardThemeSet(inlineTree, context, 'test-app');
      return inlineTree;
    };

    await expect(firstValueFrom(runner.callRule(testRule, tree))).rejects.toThrow(
      /Could not find build configuration/,
    );
  });

  it('should return true if standard theme is set directly as string in angular.json', async () => {
    const targets = {
      build: {
        builder: '@angular-devkit/build-angular:browser',
        options: {
          styles: ['src/styles.css', 'node_modules/@sbb-esta/lyne-elements/standard-theme.css'],
        },
      },
    };
    const tree = createMockWorkspace(targets);
    let isStandard: boolean | undefined;

    const testRule: Rule = async (inlineTree: Tree, context: SchematicContext) => {
      isStandard = await isStandardThemeSet(inlineTree, context, 'test-app');
      return inlineTree;
    };

    await firstValueFrom(runner.callRule(testRule, tree));
    expect(isStandard).toBe(true);
  });

  it('should return false if lean theme is set in a complex object format in angular.json', async () => {
    const targets = {
      build: {
        builder: '@angular-devkit/build-angular:browser',
        options: {
          styles: [
            {
              input: 'node_modules/@sbb-esta/lyne-elements/lean-theme.css',
              bundleName: 'theme-bundle',
            },
          ],
        },
      },
    };
    const tree = createMockWorkspace(targets);
    let isStandard: boolean | undefined;

    const testRule: Rule = async (inlineTree: Tree, context: SchematicContext) => {
      isStandard = await isStandardThemeSet(inlineTree, context, 'test-app');
      return inlineTree;
    };

    await firstValueFrom(runner.callRule(testRule, tree));
    expect(isStandard).toBe(false);
  });

  it('should fallback to global stylesheet content if angular.json styles array does not match any theme directly', async () => {
    const targets = {
      build: {
        builder: '@angular-devkit/build-angular:browser',
        options: {
          styles: ['src/styles.scss'],
        },
      },
    };
    const tree = createMockWorkspace(targets);

    tree.create('/src/styles.scss', '@import "@sbb-esta/lyne-elements/standard-theme.css";');

    let isStandard: boolean | undefined;

    const testRule: Rule = async (inlineTree: Tree, context: SchematicContext) => {
      isStandard = await isStandardThemeSet(inlineTree, context, 'test-app');
      return inlineTree;
    };

    await firstValueFrom(runner.callRule(testRule, tree));
    expect(isStandard).toBe(true);
  });

  it('should fallback to first style file if default is not found', async () => {
    const targets = {
      build: {
        builder: '@angular-devkit/build-angular:browser',
        options: {
          styles: ['src/default-styles.scss', 'src/another-custom-styles.scss'],
        },
      },
    };
    const tree = createMockWorkspace(targets);

    tree.create(
      '/src/default-styles.scss',
      '@import "@sbb-esta/lyne-elements/standard-theme.css";',
    );

    let isStandard: boolean | undefined;

    const testRule: Rule = async (inlineTree: Tree, context: SchematicContext) => {
      isStandard = await isStandardThemeSet(inlineTree, context, 'test-app');
      return inlineTree;
    };

    await firstValueFrom(runner.callRule(testRule, tree));
    expect(isStandard).toBe(true);
  });

  it('should log a warning and return false if no themes match anywhere', async () => {
    const targets = {
      build: {
        builder: '@angular-devkit/build-angular:browser',
        options: {
          styles: ['src/styles.css'],
        },
      },
    };
    const tree = createMockWorkspace(targets);
    tree.create('/src/styles.css', '/* generic css rules */');

    let isStandard: boolean | undefined;

    const testRule: Rule = async (inlineTree: Tree, context: SchematicContext) => {
      vi.spyOn(context.logger, 'warn');

      isStandard = await isStandardThemeSet(inlineTree, context, 'test-app');

      expect(context.logger.warn).toHaveBeenCalledWith(
        expect.stringContaining('No @sbb-esta/lyne-elements theme found in the global styles'),
      );
      return inlineTree;
    };

    await firstValueFrom(runner.callRule(testRule, tree));
    expect(isStandard).toBe(false);
  });
});
