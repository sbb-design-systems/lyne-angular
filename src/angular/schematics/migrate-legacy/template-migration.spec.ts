import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import type { MigrationScope } from '../utils.cjs';

import { createTemplateMigrationRule } from './template-migration.cjs';

describe('sbb-template-migration', () => {
  const tempCollectionPath = path.join(
    os.tmpdir(),
    'lyne-angular-template-migration-collection.json',
  );
  fs.writeFileSync(tempCollectionPath, JSON.stringify({ schematics: {} }));

  const runner = new SchematicTestRunner('test', tempCollectionPath);

  /** Inline templates are only detected on a `Component` imported from `@angular/core`. */
  const inlineComponent = (template: string, className: string): string =>
    [
      "import { Component } from '@angular/core';",
      `@Component({ template: '${template}' })`,
      `export class ${className} {}`,
    ].join('\n');

  const files: Record<string, string> = {
    '/src/app/app.component.html': '<sbb-root></sbb-root>',
    '/projects/app-a/src/app.component.html': '<sbb-a></sbb-a>',
    '/projects/app-a/src/inline.component.ts': inlineComponent(
      '<sbb-a-inline></sbb-a-inline>',
      'A',
    ),
    '/projects/app-a/lib/src/lib.component.html': '<sbb-lib></sbb-lib>',
    '/projects/app-b/src/app.component.html': '<sbb-b></sbb-b>',
    '/node_modules/lib/index.html': '<sbb-node-modules></sbb-node-modules>',
    '/src/app/types.d.ts': inlineComponent('<sbb-dts></sbb-dts>', 'D'),
  };

  /** Runs a template rule and returns the visited `filePath: element` pairs. */
  const visitedElements = async (scope?: MigrationScope): Promise<string[]> => {
    const tree = new UnitTestTree(new HostTree());
    for (const [filePath, content] of Object.entries(files)) {
      tree.create(filePath, content);
    }

    const visited: string[] = [];
    const rule = createTemplateMigrationRule((element, context) => {
      visited.push(`${context.filePath}: ${element.name}${context.inline ? ' (inline)' : ''}`);
    }, scope);

    await firstValueFrom(runner.callRule(rule, tree));
    return visited.sort();
  };

  it('should visit all templates of the workspace without scope', async () => {
    expect(await visitedElements()).toEqual([
      '/projects/app-a/lib/src/lib.component.html: sbb-lib',
      '/projects/app-a/src/app.component.html: sbb-a',
      '/projects/app-a/src/inline.component.ts: sbb-a-inline (inline)',
      '/projects/app-b/src/app.component.html: sbb-b',
      '/src/app/app.component.html: sbb-root',
    ]);
  });

  it('should only visit the templates of the given scope', async () => {
    expect(await visitedElements({ root: 'projects/app-a', excludedRoots: [] })).toEqual([
      '/projects/app-a/lib/src/lib.component.html: sbb-lib',
      '/projects/app-a/src/app.component.html: sbb-a',
      '/projects/app-a/src/inline.component.ts: sbb-a-inline (inline)',
    ]);
  });

  it('should skip the excluded roots of the scope', async () => {
    expect(
      await visitedElements({ root: 'projects/app-a', excludedRoots: ['projects/app-a/lib'] }),
    ).toEqual([
      '/projects/app-a/src/app.component.html: sbb-a',
      '/projects/app-a/src/inline.component.ts: sbb-a-inline (inline)',
    ]);
  });

  it('should skip nested projects of a workspace root scope', async () => {
    expect(
      await visitedElements({ root: '', excludedRoots: ['projects/app-a', 'projects/app-b'] }),
    ).toEqual(['/src/app/app.component.html: sbb-root']);
  });

  it('should visit nothing for a scope without files', async () => {
    expect(await visitedElements({ root: 'projects/missing', excludedRoots: [] })).toEqual([]);
  });

  it('should apply the collected edits only to the scoped files', async () => {
    const tree = new UnitTestTree(new HostTree());
    for (const [filePath, content] of Object.entries(files)) {
      tree.create(filePath, content);
    }

    const rule = createTemplateMigrationRule(
      (element, { content, baseOffset, edits, nextIndex }) => {
        const start = element.startSourceSpan.start.offset;
        if (content.startsWith('<sbb-', start)) {
          edits.push({
            offset: baseOffset + start + 1,
            index: nextIndex(),
            length: 0,
            insertion: 'x-',
          });
        }
      },
      { root: 'projects/app-b', excludedRoots: [] },
    );
    await firstValueFrom(runner.callRule(rule, tree));

    expect(tree.readText('/projects/app-b/src/app.component.html')).toBe('<x-sbb-b></sbb-b>');
    expect(tree.readText('/projects/app-a/src/app.component.html')).toBe('<sbb-a></sbb-a>');
    expect(tree.readText('/src/app/app.component.html')).toBe('<sbb-root></sbb-root>');
  });
});
