import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = join(projectRoot, 'dist');

const packageName = process.env['npm_lifecycle_event']?.split(':')[1];
if (!packageName) {
  throw new Error('Expected this script to be called via yarn script!');
}

const packageJsonPath = join(distDir, packageName, 'package.json');
if (!existsSync(packageJsonPath)) {
  throw new Error(
    `${relative(fileURLToPath(import.meta.resolve('../')), packageJsonPath)} does not exist!`,
  );
}

const { version, dependencies } = JSON.parse(
  readFileSync(join(projectRoot, 'package.json'), 'utf8'),
);
const lynePkg: { version: string } = JSON.parse(
  readFileSync(join(projectRoot, 'node_modules/@sbb-esta/lyne-elements/package.json'), 'utf-8'),
);
const lyneVersionParts = lynePkg.version.split('-');
const lyneVersion = `^${lyneVersionParts.length > 2 ? lyneVersionParts.slice(0, 2).join('-') : lyneVersionParts[0]}`;

const rootAngularVersion = dependencies['@angular/core'] as string;
const angularMajorVersion = rootAngularVersion.trim().match(/\d+/)![0];
// TODO: revert minor version to 0 with next major release
const angularVersion = `^${angularMajorVersion}.2.0${rootAngularVersion.includes('-') ? '-0' : ''}`;

const content = readFileSync(packageJsonPath, 'utf8')
  .replaceAll('0.0.0-PLACEHOLDER', version)
  .replaceAll('0.0.0-LYNE_ELEMENTS', lyneVersion)
  .replaceAll('0.0.0-ANGULAR', angularVersion);
writeFileSync(packageJsonPath, content, 'utf8');
