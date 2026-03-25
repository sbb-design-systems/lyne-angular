import type { ESLintUtils, TSESLint } from '@typescript-eslint/utils';

import exampleIndexRule from './example-index-rule';
import exampleModuleRule from './example-module-rule';

const rules = (
  await Promise.all(
    ['angular-generator-rule', 'test-describe-title-rule'].map((name) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      import(`./${name}.js`).then((m) => ({ [name]: m.default as ESLintUtils.RuleModule<any> })),
    ),
  )
).reduce((current, next) => Object.assign(current, next));

const plugin: TSESLint.FlatConfig.Plugin = {
  meta: {
    name: 'lyne',
  },
  configs: {},
  rules: {
    ...rules,
    'example-module-rule': exampleModuleRule,
    'example-index-rule': exampleIndexRule,
  },
};

plugin.configs!['recommended'] = [
  {
    plugins: {
      lyne: plugin,
    },
    rules: Object.keys(rules).reduce(
      (current, next) => Object.assign(current, { [`lyne/${next}`]: 'error' }),
      {} as TSESLint.FlatConfig.Rules,
    ),
  },
  {
    files: ['**/example-module.ts'],
    plugins: { lyne: plugin },
    rules: { 'lyne/example-module-rule': 'error' },
  },
  {
    files: ['**/examples/**/index.ts'],
    plugins: { lyne: plugin },
    rules: { 'lyne/example-index-rule': 'error' },
  },
];

export default plugin;
