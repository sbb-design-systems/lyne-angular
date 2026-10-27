/**
 * Generates the boilerplate of a module migration: `npm run generate-migration <module>`
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const modulesDir = join(root, 'src/angular/schematics/migrate-legacy/modules');

function fail(message) {
  console.error(message);
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  fail(
    'Usage: npm run generate-migration <module>\nExample: npm run generate-migration date-picker',
  );
}

/** `datePicker`, `date_picker` and `Date-Picker` all become `date-picker`. */
const module = args[0]
  .trim()
  .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
  .replace(/[_\s]+/g, '-')
  .toLowerCase();

if (!/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(module)) {
  fail(`Invalid module name "${args[0]}". Use letters, digits and dashes, e.g. "date-picker".`);
}

const pascalCase = module
  .split('-')
  .map((part) => part[0].toUpperCase() + part.slice(1))
  .join('');

const migrationTemplate = `import { ImportRewriteOptions } from '../../utils.cjs';
import { AttributeMigration } from '../migrations/attribute-migration.cjs';
import { SelectorMigration } from '../migrations/template-selector-migration.cjs';
import { CommentMigration } from '../migrations/comment-migration.cjs';
import { TypeMigration } from '../migrations/type-migration.cjs';
import { ModuleMigrations } from '../index.cjs';

const importPaths: ImportRewriteOptions[] = [
  // TODO
];

const comments: CommentMigration[] = [
  // TODO
];

const types: TypeMigration[] = [
  // TODO
];

const selectors: SelectorMigration[] = [
  // TODO
];

const attributes: AttributeMigration[] = [
  // TODO
];

export const ${module.toUpperCase()}_MIGRATIONS: Partial<ModuleMigrations> = {
  importPaths,
  comments,
  types,
  selectors,
  attributes,
  // TODO: create and add custom rules if needed
};
`;

const specTemplate = `import type { Rule } from '@angular-devkit/schematics';
import { chain } from '@angular-devkit/schematics';
import { describe, expect, it } from 'vitest';

import { createAttributeMigrationRule } from '../migrations/attribute-migration.cjs';
import { createCommentMigrationRule } from '../migrations/comment-migration.cjs';
import { createImportPathMigrationRule } from '../migrations/import-path-migration.cjs';
import { createTemplateSelectorMigrationRule } from '../migrations/template-selector-migration.cjs';
import { createTypeMigrationRule } from '../migrations/type-migration.cjs';

import { ${module.toUpperCase()}_MIGRATIONS } from './${module}.cjs';

describe('sbb-${module}', () => {
  const defaultMigration: Rule = () => {
    const { importPaths, comments, types, attributes, selectors } = ${module.toUpperCase()}_MIGRATIONS;
    const scope = { root: '', excludedRoots: [] };
    return chain([
      createImportPathMigrationRule(importPaths, scope),
      createCommentMigrationRule(comments, scope),
      createTypeMigrationRule(types, scope),
      createAttributeMigrationRule(attributes, scope),
      createTemplateSelectorMigrationRule(selectors, scope),
    ]);
  };

  describe('should migrate', () => {
    // TODO
  });
});
`;

const files = [
  [join(modulesDir, `${module}.cts`), migrationTemplate],
  [join(modulesDir, `${module}.spec.ts`), specTemplate],
];

// Check everything first, so a conflict never leaves a half generated module behind.
const existing = files.map(([file]) => file).filter((file) => existsSync(file));
if (existing.length) {
  fail(
    `Nothing generated, already exists:\n${existing.map((file) => `  ${relative(root, file)}`).join('\n')}`,
  );
}

mkdirSync(modulesDir, { recursive: true });
for (const [file, content] of files) {
  writeFileSync(file, content, { flag: 'wx' });
  console.log(`Created ${relative(root, file)}`);
}
