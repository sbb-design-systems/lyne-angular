import 'tsx';
import eslint from '@eslint/js';
import { configs as angulareslint, processInlineTemplates } from 'angular-eslint';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import { flatConfigs as importXFlatConfigs } from 'eslint-plugin-import-x';
import globals from 'globals';
import { configs as tseslint } from 'typescript-eslint';

const eslintPluginLyne = await import('./tools/eslint/index.js');

const ignores = [
  'dist/**/*',
  'coverage/**/*',
  'tools/generate-component/**/*',
  '**/__snapshots__/**/*',
];

export default defineConfig([
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  { ignores },
  // @ts-expect-error The returned config works but has type problems.
  {
    files: ['**/*.ts', '**/*.js'],
    ...importXFlatConfigs.recommended,
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
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/directive-class-suffix': 'off',
      '@angular-eslint/directive-selector': 'off',
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'sbb',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/no-inputs-metadata-property': 'off',
      '@angular-eslint/no-output-rename': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
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
  // @ts-expect-error The returned config will exist.
  eslintPluginLyne.default.configs.recommended,
  eslintConfigPrettier,
]);
