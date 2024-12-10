/* eslint-disable @typescript-eslint/no-unused-vars */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, join } from 'path';
import { fileURLToPath } from 'url';

import { ESLintUtils } from '@typescript-eslint/utils';
import type { Package } from 'custom-elements-manifest';

const root = fileURLToPath(new URL('../../', import.meta.url));
const readManifest = (name: string): Package =>
  JSON.parse(
    readFileSync(join(root, `/node_modules/@sbb-esta/${name}/custom-elements.json`), 'utf8'),
  );
const elementsManifest = readManifest('lyne-elements');
const elementsExerpimentalManifest = readManifest('lyne-elements-experimental');

const ngPackageConfig = JSON.stringify({ lib: { entryFile: 'index.ts' } });
const generateStructure = (pkg: Package, projectPath: string) => {
  for (const module of pkg.modules) {
    if (
      module.declarations?.some(
        (d) => d.kind === 'class' && 'customElement' in d && d.customElement,
      )
    ) {
      const directoryPath = join(projectPath, module.path.replace(/.js$/, ''));
      const moduleName = basename(directoryPath);
      const modulePath = join(directoryPath, `${moduleName}.ts`);
      if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
      }
      const ngPackagePath = join(directoryPath, 'ng-package.json');
      if (!existsSync(ngPackagePath)) {
        writeFileSync(ngPackagePath, ngPackageConfig, 'utf8');
      }
      const indexPath = join(directoryPath, 'index.ts');
      if (!existsSync(indexPath)) {
        writeFileSync(indexPath, `export * from './${moduleName}';\n`, 'utf8');
      }
      if (!existsSync(modulePath)) {
        writeFileSync(modulePath, '', 'utf8');
      }
    }
  }
};

// TODO: Enable
// generateStructure(elementsManifest, join(root, 'src/angular'));
// generateStructure(elementsExerpimentalManifest, join(root, 'src/angular-experimental'));

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      Program(node) {
        // TODO
      },
    };
  },
  meta: {
    messages: {},
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
