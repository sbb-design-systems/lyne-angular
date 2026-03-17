import { existsSync, globSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { format, resolveConfig } from 'prettier';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const exampleModulePath = join(projectRoot, 'src/docs/app/shared/example-module.ts');
const exampleModuleDir = dirname(exampleModulePath);

const files = globSync(join(projectRoot, 'src/docs/app/*/examples/**/index.ts'));

const exampleMap = new Map<string, (string | object)[]>();
const exampleImport = new Map<string, string>();
for (const file of files) {
  const dir = dirname(file);
  const examples = readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const exampleArray: (string | object)[] = [];
  for (const example of examples) {
    exampleImport.set(example, relative(exampleModuleDir, dir));

    const exampleDir = join(dir, example);
    const wellKnownFilePattern = `${example}-example`;
    const wellKnownFiles = ['.html', '.ts'].map((e) => `${wellKnownFilePattern}${e}`);
    const files = readdirSync(exampleDir, { withFileTypes: true, recursive: true })
      .filter((d) => d.isFile())
      .map((d) => relative(exampleDir, join(d.parentPath, d.name)))
      .reduce((current, next) => current.add(next), new Set<string>());
    const hasStyle = files.has(`${wellKnownFilePattern}.scss`);
    if (hasStyle) {
      files.delete(`${wellKnownFilePattern}.scss`);
    }
    const listFiles = files.size > 2;

    if (!hasStyle && !listFiles) {
      exampleArray.push(example);
    } else {
      exampleArray.push({
        id: example,
        ...(hasStyle ? { hasStyle: true } : {}),
        ...(listFiles ? { exampleFiles: Array.from(files) } : {}),
      });
    }
  }
  exampleMap.set(basename(dir), exampleArray);
}

const template = `import type { Type } from '@angular/core';

import type { ExampleData } from './example-data';

export const EXAMPLE_COMPONENTS: Record<string, (string | Partial<ExampleData>)[]> = {
${Array.from(exampleMap.entries())
  .reverse()
  .map(([key, value]) => `  '${key}': ${JSON.stringify(value)}`)
  .join(',\n')}
};

export async function loadExample(id: string): Promise<Record<string, Type<unknown>> | undefined> {
  switch (id) {
    ${Array.from(exampleImport.entries())
      .reverse()
      .map(([key, value]) => `case '${key}': return import('${value}');`)
      .join('\n    ')}
    default:
      console.warn(\`No example found for component with id "\${id}".\`);
      return undefined;
  }
}`;

const options = await resolveConfig(exampleModulePath);
const content = await format(template, { ...options, filepath: exampleModulePath });
writeFileSync(exampleModulePath, content, 'utf-8');
