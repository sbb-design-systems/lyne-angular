import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';

const distDir = fileURLToPath(import.meta.resolve('../dist/'));
const indexPath = join(distDir, 'docs/browser/index.html');
if (!existsSync(indexPath)) {
  throw new Error(
    `${relative(fileURLToPath(import.meta.resolve('../')), indexPath)} does not exist!`,
  );
}

const { version } = JSON.parse(
  readFileSync(fileURLToPath(import.meta.resolve('../package.json')), 'utf8'),
);

const content = readFileSync(indexPath, 'utf8').replaceAll('0.0.0-PLACEHOLDER', version);
writeFileSync(indexPath, content, 'utf8');
