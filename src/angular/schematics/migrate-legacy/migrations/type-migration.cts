import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { noop } from '@angular-devkit/schematics';
import ts from 'typescript';

import type { MigrationEdit, MigrationScope } from '../../utils.cjs';
import type { TypeMigration } from '../common.cjs';
import { applyEdits, isTypeScriptFile, visitScopedFiles } from '../common.cjs';
import { findSymbolReferences } from '../symbol-references.cjs';

/**
 * Ranges removing the given specifiers from an import list, or the whole list/declaration
 * if nothing else is imported. Adjacent removals are merged so that the ranges never overlap.
 */
function getRemovalRanges(
  list: ts.NamedImports,
  removed: Set<ts.ImportSpecifier>,
  sourceFile: ts.SourceFile,
): { offset: number; length: number }[] {
  const elements = list.elements;
  // Start of the trailing run of removed specifiers.
  let tail = elements.length;
  while (tail > 0 && removed.has(elements[tail - 1])) {
    tail--;
  }

  if (tail === 0) {
    const clause = list.parent;
    if (clause.name) {
      // `import Default, { Legacy } from '…'` → `import Default from '…'`
      return [{ offset: clause.name.getEnd(), length: list.getEnd() - clause.name.getEnd() }];
    }
    const declaration = clause.parent;
    const start = declaration.getStart(sourceFile);
    const lineBreak = /^\r?\n/.exec(sourceFile.text.slice(declaration.getEnd()));
    return [{ offset: start, length: declaration.getEnd() + (lineBreak?.[0].length ?? 0) - start }];
  }

  const ranges: { offset: number; length: number }[] = [];
  // A removed specifier takes everything up to the next one, so consecutive removals chain up.
  for (let i = 0; i < tail; i++) {
    if (removed.has(elements[i])) {
      const start = elements[i].getStart(sourceFile);
      ranges.push({ offset: start, length: elements[i + 1].getStart(sourceFile) - start });
    }
  }
  // The trailing run takes the comma after the last kept specifier instead.
  if (tail < elements.length) {
    const start = elements[tail - 1].getEnd();
    ranges.push({ offset: start, length: elements[elements.length - 1].getEnd() - start });
  }
  return ranges;
}

/**
 * Creates a rule which renames legacy type/class/symbol usages in TypeScript files,
 * e.g. `SbbBreadcrumbs` to `SbbBreadcrumbGroup`.
 *
 * ```ts
 * createTypeMigrationRule([
 *   {
 *     from: 'SbbBreadcrumbs',
 *     to: 'SbbBreadcrumbGroup',
 *     importedFrom: ['@sbb-esta/angular/breadcrumb', '@sbb-esta/lyne-angular/breadcrumb'],
 *   },
 * ]);
 * ```
 *
 * Only files which import the legacy symbol (`import { Legacy } from '…'`) are touched. The import
 * and every identifier of the same name are renamed. If the file already imports `to`, the legacy
 * import specifier is removed instead of being renamed into a duplicate.
 */
export function createTypeMigrationRule(
  migrations?: TypeMigration[],
  scope?: MigrationScope,
): Rule {
  if (!migrations || migrations.length === 0) {
    return noop();
  }

  const targets = migrations.map((migration) => ({
    name: migration.from,
    importedFrom: migration.importedFrom,
    migration,
  }));

  return (tree: Tree, context: SchematicContext) => {
    visitScopedFiles(tree, scope, (filePath) => {
      const original = isTypeScriptFile(filePath) ? tree.read(filePath)?.toString('utf-8') : null;
      // Cheap pre-check: nothing to do when no legacy name occurs at all.
      if (!original || !targets.some((target) => original.includes(target.name))) {
        return;
      }

      const sourceFile = ts.createSourceFile(filePath, original, ts.ScriptTarget.Latest, true);
      const importedNames = new Set(
        sourceFile.statements
          .filter(ts.isImportDeclaration)
          .flatMap((statement) => {
            const bindings = statement.importClause?.namedBindings;
            return bindings && ts.isNamedImports(bindings) ? [...bindings.elements] : [];
          })
          .map((specifier) => specifier.name.text),
      );

      const edits: MigrationEdit[] = [];
      const removals = new Map<ts.NamedImports, Set<ts.ImportSpecifier>>();
      let index = 0;

      for (const { node, target } of findSymbolReferences(sourceFile, targets)) {
        const { from, to } = target.migration;
        const specifier = ts.isImportSpecifier(node.parent) ? node.parent : undefined;

        // `to` is already imported: drop the legacy specifier, its usages are renamed below.
        if (specifier && !specifier.propertyName && importedNames.has(to)) {
          const list = specifier.parent;
          removals.set(list, (removals.get(list) ?? new Set()).add(specifier));
          continue;
        }

        const offset = node.getStart(sourceFile);
        edits.push({
          offset,
          index: index++,
          length: node.getEnd() - offset,
          insertion: to,
          log: specifier
            ? () => context.logger.info(`  → Renamed '${from}' to '${to}' in '${filePath}'`)
            : undefined,
        });
      }

      for (const [list, removed] of removals) {
        const names = [...removed].map((specifier) => `'${specifier.name.text}'`).join(', ');
        getRemovalRanges(list, removed, sourceFile).forEach((range, i) =>
          edits.push({
            ...range,
            index: index++,
            log:
              i === 0
                ? () =>
                    context.logger.info(
                      `  → Removed ${names} in '${filePath}', its replacement is already imported`,
                    )
                : undefined,
          }),
        );
      }

      const updated = applyEdits(original, edits);
      if (updated !== original) {
        tree.overwrite(filePath, updated);
      }
    });
  };
}
