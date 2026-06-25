/**
 * Generates src/docs/app/shared/keywords.json by scanning the TypeScript source files
 * and Markdown files of src/angular and src/angular-experimental.
 *
 * Output structure:
 * {
 *   "angular": {
 *     "guides": {
 *       "gettingStarted": ["foo", "bar", ...],   // from <!-- keywords: ... --> in guide-*.md
 *       "theming": [...]
 *     },
 *     "components": {
 *       "select": ["form", "sbb-select", ...]     // selectors + <!-- keywords: ... --> from readme.md
 *     }
 *   },
 *   "angularExperimental": { ... }
 * }
 *
 * Component keywords are the union of:
 *  - @Directive / @Component selector values (element + attribute selectors starting with "sbb")
 *  - @Input alias values starting with "sbb"
 *  - Keywords declared in the component's readme.md via <!-- keywords: foo, bar -->
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, join } from 'path';
import { fileURLToPath } from 'url';

const root = fileURLToPath(new URL('../', import.meta.url));

type KeywordsMap = Record<
  string,
  { guides: Record<string, string[]>; components: Record<string, string[]> }
>;

function toCamelCase(str: string): string {
  return str.toLowerCase().replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''));
}

/** Parse the <!-- keywords: foo, bar --> comment from a Markdown source string. */
function parseKeywords(source: string): string[] {
  const match = source.match(/<!--\s*keywords\s*:\s*([\s\S]*?)-->/);
  if (!match) {
    return [];
  }
  return match[1]
    .split(',')
    .map((kw) => kw.trim().toLowerCase())
    .filter((kw) => kw.length > 0);
}

// ---------------------------------------------------------------------------
// Component keyword extraction (selectors + readme.md keywords)
// ---------------------------------------------------------------------------

function selectorsFromDecoratorValue(raw: string): string[] {
  const results: string[] = [];
  for (const part of raw.split(',')) {
    const trimmed = part.trim();
    const elementMatch = trimmed.match(/^(sbb-[a-z0-9-]+)/);
    if (elementMatch) {
      results.push(elementMatch[1]);
      continue;
    }
    const attributeMatch = trimmed.match(/\[(sbb[A-Za-z0-9-]+)]/);
    if (attributeMatch) {
      results.push(attributeMatch[1]);
    }
  }
  return results;
}

function inputAliasesFromSource(source: string): string[] {
  const results: string[] = [];
  for (const m of source.matchAll(/@Input\(\s*['"]([^'"]+)['"]\s*\)/g)) {
    if (m[1].startsWith('sbb')) results.push(m[1]);
  }
  for (const m of source.matchAll(/@Input\s*\(\s*\{[^}]*alias\s*:\s*['"]([^'"]+)['"]/g)) {
    if (m[1].startsWith('sbb')) results.push(m[1]);
  }
  return results;
}

/** Skips decorators preceded by a JSDoc comment containing @internal. */
function directiveSelectorsFromSource(source: string): string[] {
  const results: string[] = [];
  for (const m of source.matchAll(
    /(\/\*\*[\s\S]*?\*\/\s*)?@(?:Directive|Component)\s*\(\s*\{[^}]*?selector\s*:\s*([`'"])([\s\S]*?)\2/g,
  )) {
    const jsdoc = m[1] ?? '';
    if (jsdoc.includes('@internal')) {
      continue;
    }
    results.push(...selectorsFromDecoratorValue(m[3]));
  }
  return results;
}

function collectTsFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      files.push(...collectTsFiles(join(dir, entry.name)));
    } else if (entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.spec.ts')) {
      files.push(join(dir, entry.name));
    }
  }
  return files;
}

function generateComponents(pkg: 'angular' | 'angular-experimental'): Record<string, string[]> {
  const pkgDir = join(root, 'src', pkg);
  const result: Record<string, string[]> = {};

  for (const entry of readdirSync(pkgDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) {
      continue;
    }

    const moduleDir = join(pkgDir, entry.name);
    const keywords = new Set<string>();

    // Collect selectors and @Input aliases from TypeScript sources
    for (const file of collectTsFiles(moduleDir)) {
      const source = readFileSync(file, 'utf-8');
      for (const s of directiveSelectorsFromSource(source)) {
        keywords.add(s);
      }
      for (const s of inputAliasesFromSource(source)) {
        keywords.add(s);
      }
    }

    // Merge keywords from readme.md if present
    const readmePath = join(moduleDir, 'readme.md');
    if (existsSync(readmePath)) {
      for (const kw of parseKeywords(readFileSync(readmePath, 'utf-8'))) {
        keywords.add(kw);
      }
    }

    if (keywords.size > 0) {
      result[toCamelCase(entry.name)] = [...keywords];
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Guide keyword extraction (<!-- keywords: ... --> in guide-*.md)
// ---------------------------------------------------------------------------

function generateGuides(pkg: 'angular' | 'angular-experimental'): Record<string, string[]> {
  const pkgDir = join(root, 'src', pkg);
  const result: Record<string, string[]> = {};

  for (const entry of readdirSync(pkgDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.startsWith('guide-') || !entry.name.endsWith('.md')) {
      continue;
    }

    const keywords = parseKeywords(readFileSync(join(pkgDir, entry.name), 'utf-8'));
    if (keywords.length > 0) {
      const key = toCamelCase(basename(entry.name, '.md').replace(/^guide-/, ''));
      result[key] = keywords;
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const keywordsMap: KeywordsMap = {
  angular: {
    guides: generateGuides('angular'),
    components: generateComponents('angular'),
  },
  angularExperimental: {
    guides: generateGuides('angular-experimental'),
    components: generateComponents('angular-experimental'),
  },
};

const outputPath = join(root, 'src/docs/app/shared/keywords.json');
writeFileSync(outputPath, JSON.stringify(keywordsMap, null, 2), 'utf-8');
console.log(`Generated ${outputPath}`);
