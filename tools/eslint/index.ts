import type { ESLintUtils, TSESLint } from '@typescript-eslint/utils';

const rules = (
  await Promise.all(
    ['angular-generator-rule', 'angular-tests-generator-rule'].map((name) =>
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
  rules,
};

plugin.configs!['recommended'] = {
  plugins: {
    lyne: plugin,
  },
  rules: {
    'lyne/angular-generator-rule': 'error',
    'lyne/angular-tests-generator-rule': 'off',
  },
};

export default plugin;
