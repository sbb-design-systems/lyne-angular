import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { noop } from '@angular-devkit/schematics';
import ts from 'typescript';

import type { MigrationEdit, MigrationScope } from '../../utils.cjs';
import type { ImportRewriteOptions } from '../common.cjs';
import { applyEdits, isTypeScriptFile, visitScopedFiles } from '../common.cjs';

/** Rewrites the module specifiers of the imports and exports of a TypeScript source file. */
function rewriteImportPaths(
  filePath: string,
  fileContent: string,
  mappings: ImportRewriteOptions[],
): string {
  const newImports = new Map(mappings.map(({ oldImport, newImport }) => [oldImport, newImport]));
  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
  const edits: MigrationEdit[] = [];

  for (const statement of sourceFile.statements) {
    const specifier =
      ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement)
        ? statement.moduleSpecifier
        : undefined;
    const newImport =
      specifier && ts.isStringLiteral(specifier) ? newImports.get(specifier.text) : undefined;

    if (specifier && newImport) {
      // Only the text between the quotes is replaced, which keeps the quote style.
      const start = specifier.getStart(sourceFile) + 1;
      edits.push({
        offset: start,
        index: edits.length,
        length: specifier.getEnd() - 1 - start,
        insertion: newImport,
      });
    }
  }

  return applyEdits(fileContent, edits);
}

/**
 * Creates a rule which rewrites the module specifiers of all imports and exports in every
 * TypeScript file of the workspace (or of the given `scope` only).
 *
 * ```ts
 * createImportPathMigrationRule([
 *   { oldImport: '@sbb-esta/angular/button', newImport: '@sbb-esta/lyne-angular/button' },
 * ]);
 * ```
 *
 * Module specifiers are matched exactly, which is enough for first-level entry points.
 * Sub-paths (`@sbb-esta/angular/button/button`) are not rewritten.
 */
export function createImportPathMigrationRule(
  mappings?: ImportRewriteOptions[],
  scope?: MigrationScope,
): Rule {
  if (!mappings || mappings.length === 0) {
    return noop();
  }
  const migratedPathModules = mappings.map((e) => e.oldImport.split('/').at(-1)).join("', '");

  return (tree: Tree, context: SchematicContext) => {
    visitScopedFiles(tree, scope, (filePath) => {
      const original = isTypeScriptFile(filePath) ? tree.read(filePath)?.toString('utf-8') : null;
      if (!original) {
        return;
      }

      const updated = rewriteImportPaths(filePath, original, mappings);
      if (updated !== original) {
        tree.overwrite(filePath, updated);
        context.logger.info(`  → Updated '${migratedPathModules}' imports in '${filePath}'.`);
      }
    });
  };
}
