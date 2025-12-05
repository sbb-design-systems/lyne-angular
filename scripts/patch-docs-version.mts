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

const { version, dependencies } = JSON.parse(
  readFileSync(fileURLToPath(import.meta.resolve('../package.json')), 'utf8'),
);
let lyneVersion = dependencies['@sbb-esta/lyne-elements'] as string;
if (!lyneVersion.startsWith('^')) {
  lyneVersion = `^${lyneVersion}`;
}
let lyneTokenVersion = dependencies['@sbb-esta/lyne-design-tokens'] as string;
if (!lyneTokenVersion.startsWith('^')) {
  lyneTokenVersion = `^${lyneTokenVersion}`;
}

const content = readFileSync(indexPath, 'utf8')
  .replaceAll('0.0.0-LYNE-ANGULAR', version)
  .replaceAll('0.0.0-LYNE-TOKEN', lyneTokenVersion)
  .replaceAll('0.0.0-LYNE', lyneVersion);
writeFileSync(indexPath, content, 'utf8');
