import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { parseTemplate, TmplAstElement } from '@angular/compiler';
import { HostTree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { firstValueFrom } from 'rxjs';
import { describe, expect, it } from 'vitest';

import type { MigrationScope } from '../utils.cjs';

import {
  createTemplateMigrationRule,
  elementMatches,
  matchSelector,
  parseSelector,
  selectorAttributes,
} from './template-migration.cjs';

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

  describe('selectors', () => {
    /** The elements of a template, nested ones included. */
    const elements = (template: string): TmplAstElement[] => {
      const result: TmplAstElement[] = [];
      const visit = (nodes: unknown[]): void => {
        for (const node of nodes) {
          if (node instanceof TmplAstElement) {
            result.push(node);
          }
          const children = (node as { children?: unknown[] }).children;
          if (children) {
            visit(children);
          }
        }
      };
      visit(parseTemplate(template, 'test.html', { preserveWhitespaces: true }).nodes);
      return result;
    };
    const first = (template: string): TmplAstElement => elements(template)[0];

    describe('parseSelector', () => {
      it.each([
        'sbb-button',
        '[sbb-button]',
        'button[sbb-button]',
        'a.link',
        '.link',
        'a.big.link',
        'a[href=foo]',
        'a[href="foo"]',
        "a[href='foo']",
        'a[href=foo].link',
        'a:not(.link)',
        'a:not([download])',
        "a:not([data-custom='true'])",
        'a[sbb-link]:not([download])',
        'a.link:not([download])',
        'a:not(.link):not([download])',
        ':not(button)',
        'a[sbb-link], button[sbb-link]',
        '*',
      ])('should accept "%s"', (selector) => {
        expect(() => parseSelector(selector)).not.toThrow();
        expect(parseSelector(selector).source).toBe(selector);
      });

      it.each([
        'a b',
        'a > b',
        'a + b',
        'a ~ b',
        'a:hover',
        'a:first-child',
        'a::before',
        'a:not(b c)',
        'a:not(b:not(c))',
        'a:not()',
        'a[b',
        'a]',
        '#id',
        'a,',
        ', a',
        '',
        '   ',
      ])('should reject "%s"', (selector) => {
        expect(() => parseSelector(selector)).toThrow(/Unsupported selector/);
      });

      it('should name the unsupported selector in the error', () => {
        expect(() => parseSelector('a > b')).toThrow('Unsupported selector "a > b"');
      });

      it('should create one alternative per entry of a list', () => {
        expect(parseSelector('a').alternatives).toHaveLength(1);
        expect(parseSelector('a, b[c], .d').alternatives).toHaveLength(3);
      });

      it('should not split a list at a comma of an attribute value', () => {
        expect(parseSelector('a[title="x,y"], b').alternatives).toHaveLength(2);
      });

      it('should ignore surrounding whitespace', () => {
        expect(elementMatches(first('<a sbb-link></a>'), parseSelector('  a[sbb-link]  '))).toBe(
          true,
        );
      });
    });

    describe('elementMatches', () => {
      it('should match a tag name', () => {
        expect(elementMatches(first('<a></a>'), parseSelector('a'))).toBe(true);
        expect(elementMatches(first('<b></b>'), parseSelector('a'))).toBe(false);
      });

      it('should match any tag for a selector without tag', () => {
        expect(elementMatches(first('<div sbb-x></div>'), parseSelector('[sbb-x]'))).toBe(true);
        expect(elementMatches(first('<div></div>'), parseSelector('*'))).toBe(true);
      });

      it('should match a static and a bound attribute', () => {
        const selector = parseSelector('button[sbb-button]');
        expect(elementMatches(first('<button sbb-button></button>'), selector)).toBe(true);
        expect(elementMatches(first('<button [sbb-button]="x"></button>'), selector)).toBe(true);
        expect(elementMatches(first('<button></button>'), selector)).toBe(false);
        expect(elementMatches(first('<a sbb-button></a>'), selector)).toBe(false);
      });

      it('should match an output and a two-way binding like Angular does', () => {
        const selector = parseSelector('a[sbb-link]');
        expect(elementMatches(first('<a (sbb-link)="x()"></a>'), selector)).toBe(true);
        expect(elementMatches(first('<a [(sbb-link)]="x"></a>'), selector)).toBe(true);
      });

      it('should not match attribute, class and style bindings as an attribute', () => {
        const selector = parseSelector('a[sbb-link]');
        expect(elementMatches(first('<a [attr.sbb-link]="x"></a>'), selector)).toBe(false);
        expect(elementMatches(first('<a [class.sbb-link]="x"></a>'), selector)).toBe(false);
        expect(elementMatches(first('<a [style.sbb-link]="x"></a>'), selector)).toBe(false);
      });

      it('should exclude an element with the output of an exclusion', () => {
        expect(
          elementMatches(first('<a (download)="f()"></a>'), parseSelector('a:not([download])')),
        ).toBe(false);
      });

      it('should not match an output against an attribute value', () => {
        expect(elementMatches(first('<a (href)="f()"></a>'), parseSelector('a[href=foo]'))).toBe(
          false,
        );
      });

      it('should match an attribute value only against a static attribute', () => {
        const selector = parseSelector('a[href=foo]');
        expect(elementMatches(first('<a href="foo"></a>'), selector)).toBe(true);
        expect(elementMatches(first('<a href="bar"></a>'), selector)).toBe(false);
        expect(elementMatches(first('<a [href]="foo"></a>'), selector)).toBe(false);
      });

      it('should match the classes of a static class attribute', () => {
        const selector = parseSelector('a.big.link');
        expect(elementMatches(first('<a class="link big x"></a>'), selector)).toBe(true);
        expect(elementMatches(first('<a class="link"></a>'), selector)).toBe(false);
        expect(elementMatches(first('<a></a>'), selector)).toBe(false);
        expect(elementMatches(first('<a [class]="c"></a>'), selector)).toBe(false);
      });

      it('should apply every exclusion', () => {
        const selector = parseSelector('a:not(.link):not([download])');
        expect(elementMatches(first('<a></a>'), selector)).toBe(true);
        expect(elementMatches(first('<a class="link"></a>'), selector)).toBe(false);
        expect(elementMatches(first('<a download></a>'), selector)).toBe(false);
        expect(elementMatches(first('<a [download]="f"></a>'), selector)).toBe(false);
        expect(elementMatches(first('<a class="x"></a>'), selector)).toBe(true);
      });

      it('should match an element in any position of a template', () => {
        const template = '<div><span><a sbb-link>x</a></span></div>';
        const [, inner] = elements(template);
        expect(elementMatches(inner, parseSelector('span'))).toBe(true);
        expect(
          elements(template).filter((element) =>
            elementMatches(element, parseSelector('a[sbb-link]')),
          ),
        ).toHaveLength(1);
      });
    });

    describe('matchSelector', () => {
      it('should return undefined if nothing matches', () => {
        expect(matchSelector(first('<a></a>'), parseSelector('b'))).toBeUndefined();
      });

      it('should return the alternative which matched', () => {
        const selector = parseSelector('a[sbb-link], button[sbb-btn]');

        const anchor = matchSelector(first('<a sbb-link></a>'), selector);
        expect(anchor).toBe(selector.alternatives[0]);

        const button = matchSelector(first('<button sbb-btn></button>'), selector);
        expect(button).toBe(selector.alternatives[1]);
      });

      it('should return the first alternative if several match', () => {
        const selector = parseSelector('a, a[sbb-link]');
        expect(matchSelector(first('<a sbb-link></a>'), selector)).toBe(selector.alternatives[0]);
      });
    });

    describe('selectorAttributes', () => {
      const attributes = (selector: string): string[] =>
        selectorAttributes(parseSelector(selector).alternatives[0]);

      it('should return the attributes the selector requires', () => {
        expect(attributes('button[sbb-button]')).toEqual(['sbb-button']);
        expect(attributes('a[sbb-link][sbb-extra]')).toEqual(['sbb-link', 'sbb-extra']);
      });

      it('should return the name of an attribute with a value', () => {
        expect(attributes('a[href=foo]')).toEqual(['href']);
      });

      it('should return nothing for tags and classes', () => {
        expect(attributes('a')).toEqual([]);
        expect(attributes('a.link')).toEqual([]);
      });

      it('should not return the attributes of an exclusion', () => {
        expect(attributes('a[sbb-link]:not([download])')).toEqual(['sbb-link']);
        expect(attributes('a:not([download])')).toEqual([]);
      });

      it('should not return duplicates', () => {
        expect(attributes('a[sbb-link][sbb-link]')).toEqual(['sbb-link']);
      });

      it('should only look at one alternative', () => {
        const selector = parseSelector('a[sbb-link], button[sbb-btn]');
        expect(selectorAttributes(selector.alternatives[1])).toEqual(['sbb-btn']);
      });
    });
  });
});
