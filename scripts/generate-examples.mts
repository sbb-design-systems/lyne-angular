import { globSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

const files = globSync(join(projectRoot, 'src/**/readme.md')).filter(
  (p) => p.includes('/angular/') || p.includes('/angular-experimental/'),
);

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  if (!content.includes('```html')) {
    continue;
  }

  const example = content.split('```html')[1].split('```')[0].trim();
  console.log(file);
}
