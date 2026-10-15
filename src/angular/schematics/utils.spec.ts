import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import {
  HostTree,
  type Rule,
  type SchematicContext,
  SchematicsException,
  type Tree,
} from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it, vi } from 'vitest';

import {
  getProjectScope,
  isStandardThemeSet,
  type MigrationScope,
  visitScopedFiles,
} from './utils.cjs';

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

  it('should check all files if default is not found', async () => {
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

  it('should win lean theme if both are imported in different files', async () => {
    const targets = {
      build: {
        builder: '@angular-devkit/build-angular:browser',
        options: {
          styles: ['src/lean-default-styles.scss', 'src/standard-default-styles.scss'],
        },
      },
    };
    const tree = createMockWorkspace(targets);

    tree.create(
      '/src/lean-default-styles.scss',
      '@import "@sbb-esta/lyne-elements/standard-theme.css";',
    );
    tree.create(
      '/src/standard-default-styles.scss',
      '@import "@sbb-esta/lyne-elements/lean-theme.css";',
    );

    let isStandard: boolean | undefined;

    const testRule: Rule = async (inlineTree: Tree, context: SchematicContext) => {
      isStandard = await isStandardThemeSet(inlineTree, context, 'test-app');
      return inlineTree;
    };

    await firstValueFrom(runner.callRule(testRule, tree));
    expect(isStandard).toBe(false);
  });

  it('should log a warning and return true if no themes match anywhere', async () => {
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
        expect.stringContaining('No `@sbb-esta/lyne-elements` theme found in the global styles'),
      );
      return inlineTree;
    };

    await firstValueFrom(runner.callRule(testRule, tree));
    expect(isStandard).toBe(true);
  });

  describe('project scope', () => {
    /** Workspace with a root app, a nested library and a sibling app. */
    const createMultiProjectTree = (): UnitTestTree => {
      const tree = new UnitTestTree(new HostTree());
      tree.create(
        '/angular.json',
        JSON.stringify({
          version: 1,
          projects: {
            'root-app': { root: '', projectType: 'application' },
            'app-a': { root: 'projects/app-a/', projectType: 'application' },
            lib: { root: './projects/app-a/lib', projectType: 'library' },
            'app-b': { root: 'projects/app-b', projectType: 'application' },
          },
        }),
      );
      for (const file of [
        '/src/main.ts',
        '/projects/app-a/src/main.ts',
        '/projects/app-a/lib/src/index.ts',
        '/projects/app-b/src/main.ts',
      ]) {
        tree.create(file, '');
      }
      return tree;
    };

    const visitedFiles = (tree: Tree, scope?: MigrationScope): string[] => {
      const files: string[] = [];
      visitScopedFiles(tree, scope, (filePath) => {
        if (filePath.endsWith('.ts')) {
          files.push(filePath);
        }
      });
      return files.sort();
    };

    it('should resolve the root and the nested projects to exclude', async () => {
      const tree = createMultiProjectTree();

      expect(await getProjectScope(tree, 'app-a')).toEqual({
        root: 'projects/app-a',
        excludedRoots: ['projects/app-a/lib'],
      });
      expect(await getProjectScope(tree, 'root-app')).toEqual({
        root: '',
        excludedRoots: ['projects/app-a', 'projects/app-a/lib', 'projects/app-b'],
      });
    });

    it('should throw if the project does not exist', async () => {
      await expect(getProjectScope(createMultiProjectTree(), 'missing')).rejects.toThrow(
        SchematicsException,
      );
    });

    it('should only visit the files of the selected project', async () => {
      const tree = createMultiProjectTree();

      expect(visitedFiles(tree, await getProjectScope(tree, 'app-a'))).toEqual([
        '/projects/app-a/src/main.ts',
      ]);
      expect(visitedFiles(tree, await getProjectScope(tree, 'root-app'))).toEqual(['/src/main.ts']);
    });

    it('should visit the whole workspace without scope', () => {
      expect(visitedFiles(createMultiProjectTree())).toEqual([
        '/projects/app-a/lib/src/index.ts',
        '/projects/app-a/src/main.ts',
        '/projects/app-b/src/main.ts',
        '/src/main.ts',
      ]);
    });
  });
});
