import { defineConfig } from 'eslint/config';

import rootConfig from '../../eslint.config.js';

export default defineConfig([
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      'lyne/storybook-generator-rule': 'error',
    },
  },
  {
    files: ['**/*.html'],
    rules: {},
  },
]);
