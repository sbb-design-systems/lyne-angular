import { transformWithEsbuild } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    extensions: ['.js', '.cjs', '.mjs', '.ts', '.cts', '.mts'],
  },
  test: {
    environment: 'node',
    include: ['src/angular/schematics/**/*.spec.ts'],
    setupFiles: [],
  },
  plugins: [
    {
      name: 'vitest-cts-compiler',
      enforce: 'pre',
      async transform(code, id) {
        const [filePath] = id.split('?');

        if (filePath.endsWith('.cts')) {
          const result = await transformWithEsbuild(code, filePath, {
            loader: 'ts',
          });

          return {
            code: result.code,
            map: result.map,
          };
        }

        return null;
      },
    },
  ],
});
