import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ESLintUtils } from '@typescript-eslint/utils';

const parsePkg = (name: string) =>
  JSON.parse(
    readFileSync(new URL(`../../node_modules/${name}/package.json`, import.meta.url), 'utf-8'),
  );
const pkgElements = parsePkg('@sbb-esta/lyne-elements');
const pkgElementsExperimental = parsePkg('@sbb-esta/lyne-elements-experimental');

const filterForNonPureImports = (name: string, _: number, array: string[]) =>
  !name.includes('.pure.') && array.includes(name.replace(/\.js$/, '.pure.js'));
const toImportName =
  (pkgName: string) =>
  (name: string): string =>
    join(pkgName, name);
const nonPureImports = [
  ...Object.keys(pkgElements.exports)
    .filter(filterForNonPureImports)
    .map(toImportName('@sbb-esta/lyne-elements')),
  ...Object.keys(pkgElementsExperimental.exports)
    .filter(filterForNonPureImports)
    .map(toImportName('@sbb-esta/lyne-elements-experimental')),
];

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      ImportDeclaration(node) {
        if (!nonPureImports.includes(node.source.value)) {
          return;
        } else if (!node.specifiers.length) {
          context.report({
            messageId: 'obsoleteSideEffectImport',
            node,
            fix(fixer) {
              return fixer.remove(node);
            },
          });
        } else {
          context.report({
            messageId: 'nonPureImport',
            node: node.source,
            fix(fixer) {
              return fixer.replaceText(
                node.source,
                `'${node.source.value.replace(/\.js$/, '.pure.js')}'`,
              );
            },
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Avoid non pure imports',
    },
    messages: {
      obsoleteSideEffectImport:
        'Side effect imports of non pure modules are not allowed. Please import the pure module instead.',
      nonPureImport:
        'Importing non pure modules is not allowed. Please import the pure module instead.',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
    hasSuggestions: true,
  },
  defaultOptions: [],
});
