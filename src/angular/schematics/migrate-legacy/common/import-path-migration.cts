import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

import { applyEdits, ImportRewriteOptions, isTypeScriptFile, MigrationEdit } from '../../utils.cjs';
import ts from 'typescript';

/**
 * Creates a rule which rewrites all given import/export module specifiers in
 * every TypeScript file of the workspace.
 * Module migrations only have to declare their path mappings:
 *
 * ```ts
 * createImportPathMigrationRule([
 *   { oldImport: '@sbb-esta/angular/button', newImport: '@sbb-esta/lyne-angular/button' },
 * ]);
 * ```
 */
export function createImportPathMigrationRule(
  mappings: ImportRewriteOptions | ImportRewriteOptions[],
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    tree.visit((filePath) => {
      if (!isTypeScriptFile(filePath)) {
        return;
      }

      const buffer = tree.read(filePath);
      if (!buffer) {
        return;
      }

      const original = buffer.toString('utf-8');
      const updated = rewriteImportPaths(filePath, original, mappings);

      if (updated !== original) {
        tree.overwrite(filePath, updated);
        context.logger.info(`  → Updated imports in ${filePath}`);
      }
    });
  };
}

/**
 * Rewrite module specifiers in TypeScript source files.
 * Multiple mappings can be passed; the most specific (longest) matching `oldImport` wins, so a root mapping never shadows a sub-path mapping.
 *
 * Example:
 * `{ oldImport: '@sbb-esta/angular/button', newImport: '@sbb-esta/lyne-angular/button' }`
 */
export function rewriteImportPaths(
  filePath: string,
  fileContent: string,
  mappings: ImportRewriteOptions | ImportRewriteOptions[],
): string {
  // Most specific mapping first, so '@sbb-esta/angular' cannot shadow '@sbb-esta/angular/button' regardless of the declaration order.
  const sortedMappings = (Array.isArray(mappings) ? mappings : [mappings])
    .slice()
    .sort((a, b) => b.oldImport.length - a.oldImport.length);

  if (!sortedMappings.length) {
    return fileContent;
  }

  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
  const edits: MigrationEdit[] = [];
  let index = 0;

  const visit = (node: ts.Node) => {
    if (
      (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const specifier = node.moduleSpecifier;
      const mapping = sortedMappings.find(
        ({ oldImport }) =>
          specifier.text === oldImport || specifier.text.startsWith(`${oldImport}/`),
      );

      if (mapping) {
        // Only the prefix is replaced; the (possibly repeating) rest of the specifier is kept as is.
        const newPath = mapping.newImport + specifier.text.slice(mapping.oldImport.length);
        const start = specifier.getStart(sourceFile);
        const quote = fileContent[start];
        edits.push({
          offset: start,
          index: index++,
          length: specifier.getEnd() - start,
          insertion: `${quote}${newPath}${quote}`,
        });
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);

  return applyEdits(fileContent, edits);
}
