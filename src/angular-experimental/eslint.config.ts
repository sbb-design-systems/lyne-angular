import { defineConfig } from 'eslint/config';

import rootConfig from '../../eslint.config.js';

export default defineConfig([
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    files: ['**/*.html'],
    rules: {},
  },
]);
