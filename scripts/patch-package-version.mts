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

const { version } = JSON.parse(
  readFileSync(fileURLToPath(import.meta.resolve('../package.json')), 'utf8'),
);
const content = readFileSync(packageJsonPath, 'utf8');
writeFileSync(packageJsonPath, content.replaceAll('0.0.0-PLACEHOLDER', version), 'utf8');
