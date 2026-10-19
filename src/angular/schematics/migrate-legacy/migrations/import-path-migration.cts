import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import ts from 'typescript';

import {
  applyEdits,
  ImportRewriteOptions,
  isTypeScriptFile,
  MigrationEdit,
  MigrationScope,
  visitScopedFiles,
} from '../../utils.cjs';

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
 * Module specifiers are matched exactly, which is enough for first-level entry points. Sub-paths
 * (`@sbb-esta/angular/button/button`) are not rewritten.
 */
export function createImportPathMigrationRule(
  mappings: ImportRewriteOptions | ImportRewriteOptions[],
  scope?: MigrationScope,
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    visitScopedFiles(tree, scope, (filePath) => {
      const original = isTypeScriptFile(filePath) ? tree.read(filePath)?.toString('utf-8') : null;
      if (!original) {
        return;
      }

      const updated = rewriteImportPaths(filePath, original, mappings);
      if (updated !== original) {
        tree.overwrite(filePath, updated);
        context.logger.info(`  → Updated imports in ${filePath}`);
      }
    });
  };
}

/** Rewrites the module specifiers of the imports and exports of a TypeScript source file. */
export function rewriteImportPaths(
  filePath: string,
  fileContent: string,
  mappings: ImportRewriteOptions | ImportRewriteOptions[],
): string {
  const newImports = new Map(
    [mappings].flat().map(({ oldImport, newImport }) => [oldImport, newImport]),
  );
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
