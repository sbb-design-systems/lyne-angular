import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, relative } from 'node:path';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = join(projectRoot, 'dist');
const indexPath = join(distDir, 'docs/browser/index.html');
if (!existsSync(indexPath)) {
  throw new Error(`${relative(projectRoot, indexPath)} does not exist!`);
}

const { version, dependencies } = JSON.parse(
  readFileSync(join(projectRoot, 'package.json'), 'utf8'),
);
const lynePkg: { version: string } = JSON.parse(
  readFileSync(join(projectRoot, 'node_modules/@sbb-esta/lyne-elements/package.json'), 'utf-8'),
);
const lyneVersionParts = lynePkg.version.split('-');
const lyneVersion =
  lyneVersionParts.length > 2 ? lyneVersionParts.slice(0, 2).join('-') : lyneVersionParts[0];
const lyneTokenVersion = (dependencies['@sbb-esta/lyne-design-tokens'] as string).replace(
  /^[\^~]/,
  '',
);

const content = readFileSync(indexPath, 'utf8')
  .replaceAll('0.0.0-LYNE-ANGULAR', version)
  .replaceAll('0.0.0-LYNE-TOKEN', lyneTokenVersion)
  .replaceAll('0.0.0-LYNE', lyneVersion);
writeFileSync(indexPath, content, 'utf8');
