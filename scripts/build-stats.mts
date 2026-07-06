import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { brotliCompress, gzip } from 'node:zlib';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDirectory = join(projectRoot, 'dist');

// For compatibility, we need the stats.json at
// two directories (/docs/browser for dev deployment, /docs for local size comparison).
const outDirectories = [join(distDirectory, 'docs', 'browser'), join(distDirectory, 'docs')];
const gzipAsync = promisify(gzip);
const brotliAsync = promisify(brotliCompress);
const calculateGzipSize = async (content: string): Promise<number> =>
  (await gzipAsync(content)).length;
const calculateBrotliSize = async (content: string): Promise<number> =>
  (await brotliAsync(content)).length;

async function buildSizeStats(): Promise<void> {
  interface SizeStats {
    js: number;
    jsBrotli: number;
    jsGzip: number;
    jsCss: number;
    css: number;
    cssBrotli: number;
    cssGzip: number;
    cssFiles: Record<string, { size: number; gzipSize: number; brotliSize: number }>;
    jsFiles: Record<
      string,
      { size: number; cssSize?: number; gzipSize: number; brotliSize: number }
    >;
  }

  interface Stats {
    sizes: SizeStats;
  }

  const stats: SizeStats = {
    js: 0,
    jsBrotli: 0,
    jsGzip: 0,
    jsCss: 0,
    css: 0,
    cssBrotli: 0,
    cssGzip: 0,
    cssFiles: {} as Record<string, { size: number; gzipSize: number; brotliSize: number }>,
    jsFiles: {} as Record<
      string,
      { size: number; cssSize?: number; gzipSize: number; brotliSize: number }
    >,
  };

  for (const dir of ['angular', 'angular-experimental'].map((d) => join(distDirectory, d))) {
    for (const file of globSync('**/*.mjs', { cwd: dir })
      .map((f) => join(dir, f))
      .sort()) {
      const key = file.substring(distDirectory.length);
      const content = readFileSync(file, 'utf8');
      const size = content.length;
      const brotliSize = await calculateBrotliSize(content);
      const gzipSize = await calculateGzipSize(content);
      stats.js += size;
      stats.jsBrotli += brotliSize;
      stats.jsGzip += gzipSize;
      stats.jsFiles[key] = { size, brotliSize, gzipSize };
    }
  }

  for (const outDir of outDirectories) {
    const content = JSON.stringify({ sizes: stats } satisfies Stats, null, 2);
    writeFileSync(join(outDir, 'stats.json'), content, 'utf8');

    console.log(`=> Built size stats in ${relative(projectRoot, outDir)}`);
  }
}

await buildSizeStats();
