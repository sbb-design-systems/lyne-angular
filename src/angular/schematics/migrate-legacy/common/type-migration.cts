import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import ts from 'typescript';

import { applyEdits, isTypeScriptFile, MigrationEdit } from '../../utils.cjs';
import { findSymbolReferences } from './symbol-references.cjs';

export interface TypeMigration {
  /** Legacy symbol name, e.g. `'SbbBreadcrumbs'`. */
  from: string;
  /** New symbol name, e.g. `'SbbBreadcrumbGroup'`. */
  to: string;
  /**
   * Only migrate the symbol when it is imported from this module (exact match
   * or sub-path). When omitted, any import of `from` is migrated.
   */
  importedFrom?: string | string[];
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
 * Only files which actually import the legacy symbol are touched, so unrelated symbols sharing the name stay untouched.
 * Member names (`foo.SbbBreadcrumbs`, except on a namespace import), object keys and declaration names are never renamed.
 */
export function createTypeMigrationRule(migrations: TypeMigration[]): Rule {
  const targets = migrations.map((migration) => ({
    name: migration.from,
    importedFrom: migration.importedFrom,
    migration,
  }));

  return (tree: Tree, context: SchematicContext) => {
    if (!targets.length) {
      return;
    }

    tree.visit((filePath) => {
      if (!isTypeScriptFile(filePath)) {
        return;
      }

      const buffer = tree.read(filePath);
      if (!buffer) {
        return;
      }

      const original = buffer.toString('utf-8');
      // Cheap pre-check: nothing to do when no legacy name occurs at all.
      if (!targets.some((target) => original.includes(target.name))) {
        return;
      }

      const sourceFile = ts.createSourceFile(filePath, original, ts.ScriptTarget.Latest, true);
      const edits: MigrationEdit[] = [];
      const editedOffsets = new Set<number>();
      let index = 0;

      for (const { node, target, kind } of findSymbolReferences(sourceFile, targets)) {
        const { migration } = target;

        if (kind === 'shorthand') {
          context.logger.warn(
            `  ⚠ Skipped shorthand property '${node.text}' in ${filePath}: ` +
              `renaming it would also rename the object key.`,
          );
          continue;
        }

        const offset = node.getStart(sourceFile);
        if (editedOffsets.has(offset)) {
          continue;
        }
        editedOffsets.add(offset);

        edits.push({
          offset,
          index: index++,
          length: node.getEnd() - offset,
          insertion: migration.to,
          log:
            kind === 'import'
              ? () =>
                  context.logger.info(
                    `  → Renamed '${migration.from}' to '${migration.to}' in ${filePath}`,
                  )
              : undefined,
        });
      }

      const updated = applyEdits(original, edits);
      if (updated !== original) {
        tree.overwrite(filePath, updated);
      }
    });
  };
}
