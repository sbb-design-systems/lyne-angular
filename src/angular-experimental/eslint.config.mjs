// @ts-check
import tseslint from 'typescript-eslint';
import rootConfig from '../../eslint.config.js';

export default tseslint.config(
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      'lyne/storybook-generator-rule': 'off',
    },
  },
  {
    files: ['**/*.html'],
    rules: {},
  },
);
