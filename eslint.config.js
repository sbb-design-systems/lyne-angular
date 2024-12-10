// @ts-check
import eslint from '@eslint/js';
// eslint-disable-next-line import-x/no-unresolved
import { config, configs as tseslint } from 'typescript-eslint';
import { configs as angulareslint, processInlineTemplates } from 'angular-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImportX from 'eslint-plugin-import-x';

export default config(
  {
    files: ['**/*.ts', '**/*.js'],
    ...eslintPluginImportX.flatConfigs.recommended,
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.recommended,
      ...tseslint.stylistic,
      ...angulareslint.tsRecommended,
    ],
    processor: processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'sbb',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'sbb',
          style: 'kebab-case',
        },
      ],

      'import-x/first': 'error',
      'import-x/named': 'off',
      'import-x/no-absolute-path': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-unresolved': 'off',
      'import-x/no-useless-path-segments': 'error',
      'import-x/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angulareslint.templateRecommended, ...angulareslint.templateAccessibility],
    rules: {},
  },
  eslintConfigPrettier,
);
