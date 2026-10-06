import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import ts from 'typescript';

import { applyEdits, isTypeScriptFile, MigrationEdit } from '../../utils.cjs';

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

/** A legacy symbol which is actually imported by the currently visited file. */
interface ResolvedBinding {
  migration: TypeMigration;
  /** Name the symbol is used with inside the file. */
  localName: string;
}

function matchesModule(moduleSpecifier: string, importedFrom?: string | string[]): boolean {
  if (!importedFrom) {
    return true;
  }

  const candidates = Array.isArray(importedFrom) ? importedFrom : [importedFrom];
  return candidates.some(
    (candidate) => moduleSpecifier === candidate || moduleSpecifier.startsWith(`${candidate}/`),
  );
}

/** Whether the identifier is a member name (`x.Name`) instead of a reference. */
function isMemberName(identifier: ts.Identifier): boolean {
  const parent = identifier.parent;
  return (
    (ts.isPropertyAccessExpression(parent) && parent.name === identifier) ||
    (ts.isQualifiedName(parent) && parent.right === identifier)
  );
}

/** Whether renaming the identifier would rename a declaration member or an object key. */
function isDeclarationName(identifier: ts.Identifier): boolean {
  const parent = identifier.parent;

  if (ts.isPropertyAssignment(parent) && parent.name === identifier) {
    return true;
  }
  if (ts.isBindingElement(parent) && parent.propertyName === identifier) {
    return true;
  }

  return (
    (ts.isPropertyDeclaration(parent) ||
      ts.isPropertySignature(parent) ||
      ts.isMethodDeclaration(parent) ||
      ts.isMethodSignature(parent) ||
      ts.isGetAccessorDeclaration(parent) ||
      ts.isSetAccessorDeclaration(parent) ||
      ts.isEnumMember(parent)) &&
    parent.name === identifier
  );
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
  return (tree: Tree, context: SchematicContext) => {
    if (!migrations.length) {
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
      if (!migrations.some((migration) => original.includes(migration.from))) {
        return;
      }

      const sourceFile = ts.createSourceFile(filePath, original, ts.ScriptTarget.Latest, true);
      const edits: MigrationEdit[] = [];
      const editedOffsets = new Set<number>();
      let index = 0;

      const bindings: ResolvedBinding[] = [];
      /** Local names of `import * as ns` namespace imports, per migration. */
      const namespaces = new Map<string, TypeMigration[]>();

      const queueRename = (node: ts.Node, migration: TypeMigration, log?: () => void): void => {
        const offset = node.getStart(sourceFile);
        if (editedOffsets.has(offset)) {
          return;
        }
        editedOffsets.add(offset);
        edits.push({
          offset,
          index: index++,
          length: node.getEnd() - offset,
          insertion: migration.to,
          log,
        });
      };

      // 1. Resolve which legacy symbols this file actually imports.
      for (const statement of sourceFile.statements) {
        const isImport = ts.isImportDeclaration(statement);
        if (!isImport && !ts.isExportDeclaration(statement)) {
          continue;
        }

        const moduleSpecifier = statement.moduleSpecifier;
        if (!moduleSpecifier || !ts.isStringLiteral(moduleSpecifier)) {
          continue;
        }

        const applicable = migrations.filter((migration) =>
          matchesModule(moduleSpecifier.text, migration.importedFrom),
        );
        if (!applicable.length) {
          continue;
        }

        const namedBindings = isImport
          ? statement.importClause?.namedBindings
          : statement.exportClause;

        if (namedBindings && ts.isNamespaceImport(namedBindings)) {
          namespaces.set(namedBindings.name.text, applicable);
          continue;
        }

        if (
          !namedBindings ||
          (!ts.isNamedImports(namedBindings) && !ts.isNamedExports(namedBindings))
        ) {
          continue;
        }

        for (const specifier of namedBindings.elements) {
          const importedName = (specifier.propertyName ?? specifier.name).text;
          const migration = applicable.find((candidate) => candidate.from === importedName);
          if (!migration) {
            continue;
          }

          queueRename(specifier.propertyName ?? specifier.name, migration, () =>
            context.logger.info(
              `  → Renamed '${migration.from}' to '${migration.to}' in ${filePath}`,
            ),
          );

          // Aliased imports keep their alias, so only the import itself changes.
          if (!specifier.propertyName) {
            bindings.push({ migration, localName: specifier.name.text });
          }
        }
      }

      // 2. Rename every usage of the resolved bindings. Aliased imports have no binding, their usages keep the alias.
      const visit = (node: ts.Node): void => {
        if (ts.isIdentifier(node)) {
          const parent = node.parent;

          if (ts.isShorthandPropertyAssignment(parent)) {
            if (bindings.some((binding) => binding.localName === node.text)) {
              context.logger.warn(
                `  ⚠ Skipped shorthand property '${node.text}' in ${filePath}: ` +
                  `renaming it would also rename the object key.`,
              );
            }
            return;
          }

          if (isMemberName(node)) {
            // `ns.LegacyName` of a namespace import is a real usage.
            const qualifier = ts.isPropertyAccessExpression(parent)
              ? parent.expression
              : (parent as ts.QualifiedName).left;
            const migration = ts.isIdentifier(qualifier)
              ? namespaces.get(qualifier.text)?.find((candidate) => candidate.from === node.text)
              : undefined;

            if (migration) {
              queueRename(node, migration);
            }
            return;
          }

          if (!isDeclarationName(node) && !ts.isImportSpecifier(parent)) {
            const binding = bindings.find((candidate) => candidate.localName === node.text);
            if (binding) {
              queueRename(node, binding.migration);
            }
          }

          return;
        }

        ts.forEachChild(node, visit);
      };

      ts.forEachChild(sourceFile, visit);

      const updated = applyEdits(original, edits);
      if (updated !== original) {
        tree.overwrite(filePath, updated);
      }
    });
  };
}
