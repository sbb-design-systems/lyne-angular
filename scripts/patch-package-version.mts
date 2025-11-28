import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const distDir = fileURLToPath(import.meta.resolve('../dist/'));

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
  readFileSync(fileURLToPath(import.meta.resolve('../package.json')), 'utf8'),
);
let lyneVersion = dependencies['@sbb-esta/lyne-elements'] as string;
if (!lyneVersion.startsWith('^')) {
  lyneVersion = `^${lyneVersion}`;
}

const rootAngularVersion = dependencies['@angular/core'] as string;
const angularMajorVersion = rootAngularVersion.trim().match(/\d+/)![0];
const angularVersion = `^${angularMajorVersion}.0.0${rootAngularVersion.includes('-') ? '-0' : ''}`;

const content = readFileSync(packageJsonPath, 'utf8')
  .replaceAll('0.0.0-PLACEHOLDER', version)
  .replaceAll('0.0.0-LYNE_ELEMENTS', lyneVersion)
  .replaceAll('0.0.0-ANGULAR', angularVersion);
writeFileSync(packageJsonPath, content, 'utf8');
