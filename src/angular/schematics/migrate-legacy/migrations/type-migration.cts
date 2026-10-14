import type { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import ts from 'typescript';

import {
  applyEdits,
  isTypeScriptFile,
  MigrationEdit,
  MigrationScope,
  visitScopedFiles,
} from '../../utils.cjs';
import {
  findSymbolReferences,
  matchesModule,
  type SymbolReference,
  type SymbolTarget,
} from '../symbol-references.cjs';

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

/** A local import binding of the file. */
interface ImportBinding {
  /** Exported name of the imported symbol; `undefined` for default and namespace imports. */
  importedName: string | undefined;
  module: string;
  /** Whether the binding is only usable in type positions (`import type` or `{ type X }`). */
  typeOnly: boolean;
  /**
   * Range of the `type` modifier to remove to turn a type-only binding into a value binding.
   * Only set when no other binding is affected (a `{ type X }` specifier or a single-binding `import type`).
   */
  promotion?: { offset: number; length: number };
}

/**
 * How the legacy symbol of a file is migrated:
 * - `rename`: no conflict, the import and all usages are renamed
 * - `dedupe`: the new symbol is already imported, the legacy import specifier is removed
 * - `alias`:  the new name is taken by another binding, the import becomes `New as Legacy`
 */
type RenameMode = 'rename' | 'dedupe' | 'alias';

/** Rename mode of a migration within a file, plus the `type` modifier to drop on a promoted import. */
interface RenamePlan {
  mode: RenameMode;
  promotion?: { offset: number; length: number };
}

/** An export of the file, keyed by its exported name in {@link collectExportedNames}. */
interface ExportedName {
  /** The export specifier, if the name is exported through `export { … }`. */
  specifier?: ts.ExportSpecifier;
  /** Module of a re-export (`export { … } from '…'`). */
  module?: string;
  /** Name of the exported binding/symbol (`Local` of `export { Local as Exported }`). */
  referencedName?: string;
}

/** Whether the identifier is a member name (`ns.Name`) instead of a standalone reference. */
function isMemberName(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (
    (ts.isPropertyAccessExpression(parent) && parent.name === node) ||
    (ts.isQualifiedName(parent) && parent.right === node)
  );
}

/** Whether the import specifier only imports a type (`import type { X }` or `{ type X }`). */
function isTypeOnlySpecifier(specifier: ts.ImportSpecifier): boolean {
  return (
    specifier.isTypeOnly || specifier.parent.parent.phaseModifier === ts.SyntaxKind.TypeKeyword
  );
}

/** The import specifier introducing a local binding with the name of `node` (non-aliased only). */
function localImportSpecifier(node: ts.Identifier): ts.ImportSpecifier | undefined {
  const parent = node.parent;
  return ts.isImportSpecifier(parent) && !parent.propertyName ? parent : undefined;
}

/** The export specifier whose exported name is `node` itself (non-aliased `export { X }`). */
function unaliasedExportSpecifier(node: ts.Identifier): ts.ExportSpecifier | undefined {
  const parent = node.parent;
  return ts.isExportSpecifier(parent) && !parent.propertyName ? parent : undefined;
}

/** Module specifier of the import declaration owning `node`. */
function importModule(node: ts.Node): string | undefined {
  let current: ts.Node | undefined = node;
  while (current && !ts.isImportDeclaration(current)) {
    current = current.parent;
  }
  return current && ts.isStringLiteral(current.moduleSpecifier)
    ? current.moduleSpecifier.text
    : undefined;
}

/** Local import bindings of the file: local name → binding. */
function collectImportBindings(sourceFile: ts.SourceFile): Map<string, ImportBinding> {
  const bindings = new Map<string, ImportBinding>();

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
      continue;
    }
    const module = statement.moduleSpecifier.text;
    const clause = statement.importClause;
    const clauseTypeOnly = clause?.phaseModifier === ts.SyntaxKind.TypeKeyword;

    if (clause?.name) {
      bindings.set(clause.name.text, { importedName: undefined, module, typeOnly: clauseTypeOnly });
    }
    if (clause?.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
      bindings.set(clause.namedBindings.name.text, {
        importedName: undefined,
        module,
        typeOnly: clauseTypeOnly,
      });
    }
    if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
      const elements = clause.namedBindings.elements;
      for (const element of elements) {
        let promotion: ImportBinding['promotion'];
        if (element.isTypeOnly) {
          // `{ type X }` → `{ X }`
          const start = element.getStart(sourceFile);
          promotion = {
            offset: start,
            length: (element.propertyName ?? element.name).getStart(sourceFile) - start,
          };
        } else if (clauseTypeOnly && elements.length === 1 && !clause.name) {
          // `import type { X }` → `import { X }`
          const start = clause.getStart(sourceFile);
          promotion = {
            offset: start,
            length: clause.namedBindings.getStart(sourceFile) - start,
          };
        }

        bindings.set(element.name.text, {
          importedName: (element.propertyName ?? element.name).text,
          module,
          typeOnly: clauseTypeOnly || element.isTypeOnly,
          promotion,
        });
      }
    }
  }

  return bindings;
}

/** Names declared anywhere in the file (variables, parameters, functions, classes, types, ...). */
function collectDeclaredNames(sourceFile: ts.SourceFile): Set<string> {
  const names = new Set<string>();

  const visit = (node: ts.Node): void => {
    if (
      (ts.isVariableDeclaration(node) ||
        ts.isBindingElement(node) ||
        ts.isParameter(node) ||
        ts.isFunctionDeclaration(node) ||
        ts.isFunctionExpression(node) ||
        ts.isClassDeclaration(node) ||
        ts.isClassExpression(node) ||
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isEnumDeclaration(node) ||
        ts.isModuleDeclaration(node) ||
        ts.isTypeParameterDeclaration(node)) &&
      node.name &&
      ts.isIdentifier(node.name)
    ) {
      names.add(node.name.text);
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);

  return names;
}

/** Detects, per migration, whether the new name collides with an existing binding of the file. */
function resolveRenameModes(
  sourceFile: ts.SourceFile,
  references: SymbolReference<SymbolTarget & { migration: TypeMigration }>[],
): Map<TypeMigration, RenamePlan> {
  const plans = new Map<TypeMigration, RenamePlan>();
  let importBindings: ReturnType<typeof collectImportBindings> | undefined;
  let declaredNames: Set<string> | undefined;

  for (const { node, target, kind } of references) {
    const { migration } = target;
    const specifier = kind === 'import' ? localImportSpecifier(node) : undefined;
    if (!specifier || plans.has(migration)) {
      continue;
    }

    importBindings ??= collectImportBindings(sourceFile);
    declaredNames ??= collectDeclaredNames(sourceFile);

    const existing = importBindings.get(migration.to);
    if (!existing) {
      plans.set(migration, { mode: declaredNames.has(migration.to) ? 'alias' : 'rename' });
      continue;
    }

    // The very same symbol is already imported (e.g. a partially migrated file).
    const legacyModule = importModule(node);
    const sameSymbol =
      existing.importedName === migration.to &&
      (migration.importedFrom
        ? matchesModule(existing.module, migration.importedFrom)
        : existing.module === legacyModule);

    if (!sameSymbol) {
      plans.set(migration, { mode: 'alias' });
    } else if (!existing.typeOnly || isTypeOnlySpecifier(specifier)) {
      // The existing import can satisfy every usage of the legacy one.
      plans.set(migration, { mode: 'dedupe' });
    } else if (existing.promotion) {
      // Value usages need a value import: promote the existing type-only import.
      plans.set(migration, { mode: 'dedupe', promotion: existing.promotion });
    } else {
      // Promoting would affect other bindings: keep the legacy value import through an alias.
      plans.set(migration, { mode: 'alias' });
    }
  }

  return plans;
}

/**
 * Edit removing an import/export specifier together with its separating comma;
 * the whole declaration is removed when nothing else is imported/exported.
 */
function removeSpecifier(
  specifier: ts.ImportSpecifier | ts.ExportSpecifier,
  sourceFile: ts.SourceFile,
  content: string,
): { offset: number; length: number } {
  const elements: ts.NodeArray<ts.ImportSpecifier | ts.ExportSpecifier> = specifier.parent.elements;
  const position = elements.indexOf(specifier);

  if (elements.length > 1) {
    // Remove up to the next element, or from the previous element for the last one.
    const start =
      position < elements.length - 1
        ? specifier.getStart(sourceFile)
        : elements[position - 1].getEnd();
    const end =
      position < elements.length - 1
        ? elements[position + 1].getStart(sourceFile)
        : specifier.getEnd();
    return { offset: start, length: end - start };
  }

  let declaration: ts.Node;
  if (ts.isImportSpecifier(specifier)) {
    const clause = specifier.parent.parent;
    if (clause.name) {
      // `import Default, { Legacy } from '…'` → `import Default from '…'`
      const namedImports = specifier.parent;
      return {
        offset: clause.name.getEnd(),
        length: namedImports.getEnd() - clause.name.getEnd(),
      };
    }
    declaration = clause.parent;
  } else {
    declaration = specifier.parent.parent;
  }

  const start = declaration.getStart(sourceFile);
  let end = declaration.getEnd();
  const lineBreak = /^\r?\n/.exec(content.slice(end));
  if (lineBreak) {
    end += lineBreak[0].length;
  }
  return { offset: start, length: end - start };
}

/** All names exported by the file: export specifiers and exported declarations. */
function collectExportedNames(sourceFile: ts.SourceFile): Map<string, ExportedName[]> {
  const exported = new Map<string, ExportedName[]>();
  const add = (name: string, entry: ExportedName): void => {
    exported.set(name, [...(exported.get(name) ?? []), entry]);
  };

  for (const statement of sourceFile.statements) {
    if (ts.isExportDeclaration(statement)) {
      if (!statement.exportClause || !ts.isNamedExports(statement.exportClause)) {
        continue;
      }
      const module =
        statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier)
          ? statement.moduleSpecifier.text
          : undefined;
      for (const specifier of statement.exportClause.elements) {
        add(specifier.name.text, {
          specifier,
          module,
          referencedName: (specifier.propertyName ?? specifier.name).text,
        });
      }
      continue;
    }

    const isExported = ts.canHaveModifiers(statement)
      ? ts.getModifiers(statement)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
      : false;
    if (!isExported) {
      continue;
    }
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) {
          add(declaration.name.text, {});
        }
      }
    } else if (
      (ts.isClassDeclaration(statement) ||
        ts.isFunctionDeclaration(statement) ||
        ts.isInterfaceDeclaration(statement) ||
        ts.isTypeAliasDeclaration(statement) ||
        ts.isEnumDeclaration(statement)) &&
      statement.name
    ) {
      add(statement.name.text, {});
    }
  }

  return exported;
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
export function createTypeMigrationRule(migrations: TypeMigration[], scope?: MigrationScope): Rule {
  const targets = migrations.map((migration) => ({
    name: migration.from,
    importedFrom: migration.importedFrom,
    migration,
  }));

  return (tree: Tree, context: SchematicContext) => {
    if (!targets.length) {
      return;
    }

    visitScopedFiles(tree, scope, (filePath) => {
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

      const references = findSymbolReferences(sourceFile, targets);
      const plans = resolveRenameModes(sourceFile, references);
      let exportedNames: Map<string, ExportedName[]> | undefined;

      for (const { node, target, kind } of references) {
        const { migration } = target;
        const plan = plans.get(migration);
        const mode = plan?.mode ?? 'rename';
        const specifier = kind === 'import' ? localImportSpecifier(node) : undefined;

        if (specifier && mode === 'dedupe') {
          // `to` is already imported: drop the legacy specifier, usages are renamed below.
          edits.push({
            ...removeSpecifier(specifier, sourceFile, original),
            index: index++,
            log: () =>
              context.logger.info(
                `  → Removed '${migration.from}' in favor of the existing '${migration.to}' import in ${filePath}`,
              ),
          });
          if (plan?.promotion && !editedOffsets.has(plan.promotion.offset)) {
            // The existing import is type-only, but the legacy one was also used as a value.
            editedOffsets.add(plan.promotion.offset);
            edits.push({
              ...plan.promotion,
              index: index++,
              log: () =>
                context.logger.info(
                  `  → Turned the type-only import of '${migration.to}' into a value import in ${filePath}`,
                ),
            });
          }
          continue;
        }

        if (specifier && mode === 'alias') {
          // `to` is already taken by another binding: keep the local name through an alias.
          const offset = node.getStart(sourceFile);
          edits.push({
            offset,
            index: index++,
            length: node.getEnd() - offset,
            insertion: `${migration.to} as ${migration.from}`,
            log: () =>
              context.logger.warn(
                `  ⚠ '${migration.to}' is already declared in ${filePath}; ` +
                  `imported it as '${migration.from}' instead of renaming the usages.`,
              ),
          });
          continue;
        }

        // With an alias import the usages keep the legacy local name; namespace members (`ns.X`) are still renamed.
        if (mode === 'alias' && kind !== 'import' && !isMemberName(node)) {
          continue;
        }

        // `export { Old }` / `export { Old } from '…'`: renaming changes the exported name,
        // which must not collide with an existing export of `to`.
        const exportSpecifier = unaliasedExportSpecifier(node);
        if (exportSpecifier && !editedOffsets.has(node.getStart(sourceFile))) {
          exportedNames ??= collectExportedNames(sourceFile);
          const existing = (exportedNames.get(migration.to) ?? []).filter(
            (entry) => entry.specifier !== exportSpecifier,
          );

          if (existing.length) {
            editedOffsets.add(node.getStart(sourceFile));
            const declaration = exportSpecifier.parent.parent;
            const module =
              declaration.moduleSpecifier && ts.isStringLiteral(declaration.moduleSpecifier)
                ? declaration.moduleSpecifier.text
                : undefined;
            const sameSymbol = existing.some(
              (entry) =>
                entry.referencedName === migration.to &&
                (module === undefined
                  ? // Local export: `to` is the same symbol when the legacy import was deduped into it.
                    entry.module === undefined && mode === 'dedupe'
                  : entry.module !== undefined &&
                    (migration.importedFrom
                      ? matchesModule(entry.module, migration.importedFrom)
                      : entry.module === module)),
            );

            if (sameSymbol) {
              edits.push({
                ...removeSpecifier(exportSpecifier, sourceFile, original),
                index: index++,
                log: () =>
                  context.logger.info(
                    `  → Removed the export of '${migration.from}' in favor of the existing '${migration.to}' export in ${filePath}`,
                  ),
              });
            } else {
              // A different symbol is already exported as `to`: keep the legacy exported name.
              const offset = node.getStart(sourceFile);
              edits.push({
                offset,
                index: index++,
                length: node.getEnd() - offset,
                insertion: `${migration.to} as ${migration.from}`,
                log: () =>
                  context.logger.warn(
                    `  ⚠ '${migration.to}' is already exported in ${filePath}; ` +
                      `exported it as '${migration.from}' instead.`,
                  ),
              });
            }
            continue;
          }
        }

        if (kind === 'shorthand') {
          const offset = node.getStart(sourceFile);
          if (editedOffsets.has(offset)) {
            continue;
          }
          editedOffsets.add(offset);
          edits.push({
            offset,
            index: index++,
            length: node.getEnd() - offset,
            insertion: `${node.text}: ${migration.to}`,
          });
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
