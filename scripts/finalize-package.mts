import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const distDir = join(projectRoot, 'dist');

const packageName = process.env['npm_lifecycle_event']?.split(':')[1];
if (!packageName) {
  throw new Error('Expected this script to be called via yarn script!');
}

const packagePath = join(distDir, packageName);
const packageJsonPath = join(packagePath, 'package.json');
if (!existsSync(packageJsonPath)) {
  throw new Error(
    `${relative(fileURLToPath(import.meta.resolve('../')), packageJsonPath)} does not exist!`,
  );
}

// Patch Types

// The Angular CLI does not preserve type imports, that would include the global
// tag name declaration. Due to this, we add a side effect import to the .d.ts files.

interface PackageJson {
  exports?: Record<string, string | Record<string, string>>;
}

const pkg: PackageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
for (const [key, value] of Object.entries(pkg.exports ?? {})) {
  if (key === '.' || typeof value !== 'object' || !('types' in value)) {
    continue;
  }
  const moduleName = key.replace(/^\.\//, '');
  const typesPath = join(packagePath, value['types']);
  const moduleImport = `@sbb-esta/lyne-elements/${moduleName}.pure.js`;
  if (!existsSync(join(projectRoot, 'node_modules', moduleImport))) {
    continue;
  }
  const sideEffectImport = `import '${moduleImport}';\n`;
  const typesContent = readFileSync(typesPath, 'utf8');
  if (!typesContent.includes(sideEffectImport)) {
    writeFileSync(typesPath, sideEffectImport + typesContent, 'utf8');
  }
}

// Patch Version

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
const angularVersion = `^${angularMajorVersion}.0.0${rootAngularVersion.includes('-') ? '-0' : ''}`;

const content = readFileSync(packageJsonPath, 'utf8')
  .replaceAll('0.0.0-PLACEHOLDER', version)
  .replaceAll('0.0.0-LYNE_ELEMENTS', lyneVersion)
  .replaceAll('0.0.0-ANGULAR', angularVersion);
writeFileSync(packageJsonPath, content, 'utf8');
