import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync, statSync, rmSync } from 'node:fs';
import { basename, dirname } from 'node:path';

/**
 * This script can be used to extract modules which consist of multiple components into a top level modules.
 * It generates a new index.ts file that re-exports all components from the module.
 * And it generates a new Angular module file that imports all components and exports them.
 *
 * How to use:
 * 1. Fill in the `modulesToMigrate` array with the names of the modules you want to migrate.
 * 2. run `node --experimental-strip-types ./scripts/migrate-modules.mts`
 *
 * NOTE: This script is entirely generated with GitHub copilot and is far not optimized.
 */

const modulesToMigrate = ['option'];

// Helper functions
function walkDir(dir: string, callback: (filePath: string) => void) {
  readdirSync(dir).forEach((file) => {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

function getAllFiles(dir: string): string[] {
  let results: string[] = [];
  readdirSync(dir).forEach((file) => {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

function getExportsFromIndex(
  indexPath: string,
  moduleRoot: string,
): { name: string; relPath: string; exportLine: string }[] {
  if (!existsSync(indexPath)) return [];
  const content = readFileSync(indexPath, 'utf-8');
  const indexDir = dirname(indexPath);
  const result: { name: string; relPath: string; exportLine: string }[] = [];

  // Re-exports: export { ... } from '...'
  const exportRegex = /^export\s+\{([^}]+)\}\s+from\s+['"](.*)['"];?/gm;
  let match;
  while ((match = exportRegex.exec(content)) !== null) {
    const names = match[1]
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean);
    let relPath = match[2];
    // Adjust path if relative
    if (relPath.startsWith('.')) {
      const absOld = join(indexDir, relPath);
      relPath = './' + relative(moduleRoot, absOld).replace(/\\/g, '/');
      if (!relPath.startsWith('./')) relPath = './' + relPath;
    }
    for (const name of names) {
      result.push({
        name,
        relPath,
        exportLine: `export { ${name} } from '${relPath}';`,
      });
    }
  }
  // Wildcard re-exports: export * from '...'
  const starExportRegex = /^export\s+\*\s+from\s+['"](.*)['"];?/gm;
  while ((match = starExportRegex.exec(content)) !== null) {
    let relPath = match[1];
    if (relPath.startsWith('.')) {
      const absOld = join(indexDir, relPath);
      relPath = './' + relative(moduleRoot, absOld).replace(/\\/g, '/');
      if (!relPath.startsWith('./')) relPath = './' + relPath;
    }
    result.push({
      name: '*',
      relPath,
      exportLine: `export * from '${relPath}';`,
    });
  }
  return result;
}

function collectAllExports(
  moduleRoot: string,
): { name: string; relPath: string; exportLine: string }[] {
  const exports: { name: string; relPath: string; exportLine: string }[] = [];
  walkDir(moduleRoot, (filePath) => {
    if (basename(filePath) === 'index.ts') {
      getExportsFromIndex(filePath, moduleRoot).forEach((exp) => {
        exports.push(exp);
      });
    }
  });
  return exports;
}

function writeNewIndexTs(
  moduleRoot: string,
  exports: { name: string; relPath: string; exportLine: string }[],
  moduleFileName: string,
) {
  const lines = [];
  // All exportLine (no duplicates)
  const seen = new Set();
  for (const exp of exports) {
    if (!seen.has(exp.exportLine)) {
      lines.push(exp.exportLine);
      seen.add(exp.exportLine);
    }
  }
  lines.push(`export * from './${moduleFileName}';`);
  writeFileSync(join(moduleRoot, 'index.ts'), lines.join('\n') + '\n');
}

function writeAngularModule(
  moduleRoot: string,
  exports: { name: string; relPath: string; exportLine: string }[],
  moduleName: string,
  moduleFileName: string,
) {
  // Collect all class names and their paths by searching .ts files for "export class"
  const classExports: { name: string; relPath: string }[] = [];
  const seen = new Set<string>();

  for (const exp of exports) {
    // Try to find the file
    let absPath = join(moduleRoot, exp.relPath);
    if (!extname(absPath)) absPath += '.ts';
    if (!existsSync(absPath)) {
      if (existsSync(join(moduleRoot, exp.relPath, 'index.ts'))) {
        absPath = join(moduleRoot, exp.relPath, 'index.ts');
      } else {
        continue;
      }
    }
    const content = readFileSync(absPath, 'utf-8');
    // Search for "export class Symbol" or "export abstract class Symbol"
    const classRegex = new RegExp(
      `export\\s+(?:abstract\\s+)?class\\s+([A-Za-z0-9_]+)(?:\\s*<[^>{}]*>)?\\s*`,
    );
    const match = content.match(classRegex);
    if (match && !seen.has(match[1])) {
      // Remove generic parameters from class name (if present)
      const name = match[1];
      classExports.push({ name, relPath: exp.relPath });
      seen.add(name);
    }
  }

  const importLines = classExports.map(
    ({ name, relPath }) => `import { ${name} } from '${relPath}';`,
  );
  const classNames = classExports.map((e) => e.name);

  const sbbModuleName = `Sbb${moduleName}Module`;
  const content = `
import { NgModule } from '@angular/core';
${importLines.join('\n')}
const EXPORTED_DECLARATIONS = [${classNames.join(', ')}];
@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS
})
export class ${sbbModuleName} {}
`;
  writeFileSync(join(moduleRoot, `${moduleFileName}.ts`), content.trim() + '\n');
}

function findModuleRoots(srcDir: string, modules: string[]): string[] {
  return readdirSync(srcDir)
    .filter((name) => modules.includes(name) && statSync(join(srcDir, name)).isDirectory())
    .map((name) => join(srcDir, name));
}

function deleteModuleFiles(moduleRoot: string): { ngPackageContent: string | null } {
  let ngPackageContent: string | null = null;
  walkDir(moduleRoot, (filePath) => {
    const base = basename(filePath);
    if (base === 'index.ts' || base === 'ng-package.json') {
      if (base === 'ng-package.json' && ngPackageContent === null) {
        ngPackageContent = readFileSync(filePath, 'utf-8');
      }
      rmSync(filePath);
    }
  });
  return { ngPackageContent };
}

function migrateModules(srcDir1: string) {
  const moduleRoots = findModuleRoots(srcDir1, modulesToMigrate);
  for (const moduleRoot of moduleRoots) {
    // 1. Collect all exports from all index.ts
    const exports = collectAllExports(moduleRoot);

    // 2. Delete all index.ts and ng-package.json, remember content of the first ng-package.json
    const { ngPackageContent } = deleteModuleFiles(moduleRoot);

    // 3. Write new index.ts and Angular module
    const moduleName = basename(moduleRoot).replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase());
    const moduleFileName = `${basename(moduleRoot)}.module`;
    writeNewIndexTs(moduleRoot, exports, moduleFileName);
    writeAngularModule(moduleRoot, exports, moduleName, moduleFileName);

    // 4. Write ng-package.json back (if present)
    if (ngPackageContent) {
      writeFileSync(join(moduleRoot, 'ng-package.json'), ngPackageContent);
    }
  }
}

function fixProjectImports(projectRoot: string, packageName: string, modules: string[]) {
  const files = getAllFiles(projectRoot).filter(
    (f) => f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.js') || f.endsWith('.jsx'),
  );
  const modulePattern = modules.map((m) => m.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
  const importRegex = new RegExp(`(['"])${packageName}/(${modulePattern})(?:/[^'"]+)?\\1`, 'g');

  for (const file of files) {
    let content = readFileSync(file, 'utf-8');
    let replaced = false;
    content = content.replace(importRegex, (_match, quote, mod) => {
      replaced = true;
      return `${quote}${packageName}/${mod}${quote}`;
    });
    if (replaced) {
      writeFileSync(file, content);
    }
  }
}

// After migrating the modules:
migrateModules(fileURLToPath(import.meta.resolve('../src/angular')));
migrateModules(fileURLToPath(import.meta.resolve('../src/angular-experimental')));

// Fix all imports in the project
fixProjectImports(
  fileURLToPath(import.meta.resolve('..')),
  '@sbb-esta/lyne-angular',
  modulesToMigrate,
);

fixProjectImports(
  fileURLToPath(import.meta.resolve('..')),
  '@sbb-esta/lyne-angular-experimental',
  modulesToMigrate,
);
