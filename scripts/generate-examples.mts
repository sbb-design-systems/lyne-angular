import { existsSync, globSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

const files = globSync(join(projectRoot, 'src/**/readme.md')).filter(
  (p) => p.includes('/src/angular/') || p.includes('/src/angular-experimental/'),
);

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  if (!content.includes('```html')) {
    continue;
  }

  const example = content.split('```html')[1].split('```')[0].trim();
  const [_, packageName, moduleName] = relative(projectRoot, file).split('/');
  const examplesDir = join(projectRoot, 'src/docs/app', packageName, 'examples', moduleName);
  const exampleDir = join(examplesDir, `${moduleName}-basic`);
  if (existsSync(exampleDir)) {
    continue;
  }

  mkdirSync(exampleDir, { recursive: true });
  const componentName = `${moduleName}-basic-example`;
  writeFileSync(join(exampleDir, `${componentName}.html`), example, 'utf-8');

  const classNam = toPascalCase(componentName);
  const template = `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sbb${toPascalCase(moduleName)}Module } from '@sbb-esta/lyne-${packageName}/${moduleName}';

/**
 * @title Basic ${moduleName}
 */
@Component({
  selector: 'sbb-${componentName}',
  templateUrl: '${componentName}.html',
  imports: [Sbb${toPascalCase(moduleName)}Module],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ${classNam} {}
`;
  writeFileSync(join(exampleDir, `${componentName}.ts`), template, 'utf-8');

  const indexPath = join(examplesDir, 'index.ts');
  const indexContent = existsSync(indexPath) ? readFileSync(indexPath, 'utf-8') : '';
  writeFileSync(
    indexPath,
    `${indexContent}export { ${classNam} } from './${moduleName}-basic/${componentName}';\n`,
  );
}

function toPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text: string) {
  return text.replace(/-/, '').toUpperCase();
}
