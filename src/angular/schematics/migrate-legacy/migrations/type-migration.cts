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

/**
 * How the legacy symbol of a file is migrated:
 * - `rename`: no conflict, the import and all usages are renamed
 * - `dedupe`: the new symbol is already imported, the legacy import specifier is removed
 * - `alias`:  the new name is taken by another binding, the import becomes `New as Legacy`
 */
type RenameMode = 'rename' | 'dedupe' | 'alias';

/** Whether the identifier is a member name (`ns.Name`) instead of a standalone reference. */
function isMemberName(node: ts.Identifier): boolean {
  const parent = node.parent;
  return (
    (ts.isPropertyAccessExpression(parent) && parent.name === node) ||
    (ts.isQualifiedName(parent) && parent.right === node)
  );
}

/** The import specifier introducing a local binding with the name of `node` (non-aliased only). */
function localImportSpecifier(node: ts.Identifier): ts.ImportSpecifier | undefined {
  const parent = node.parent;
  return ts.isImportSpecifier(parent) && !parent.propertyName ? parent : undefined;
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

/** Local import bindings of the file: local name → imported name and module. */
function collectImportBindings(
  sourceFile: ts.SourceFile,
): Map<string, { importedName: string | undefined; module: string }> {
  const bindings = new Map<string, { importedName: string | undefined; module: string }>();

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
      continue;
    }
    const module = statement.moduleSpecifier.text;
    const clause = statement.importClause;

    if (clause?.name) {
      bindings.set(clause.name.text, { importedName: undefined, module });
    }
    if (clause?.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
      bindings.set(clause.namedBindings.name.text, { importedName: undefined, module });
    }
    if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
      for (const element of clause.namedBindings.elements) {
        bindings.set(element.name.text, {
          importedName: (element.propertyName ?? element.name).text,
          module,
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
): Map<TypeMigration, RenameMode> {
  const modes = new Map<TypeMigration, RenameMode>();
  let importBindings: ReturnType<typeof collectImportBindings> | undefined;
  let declaredNames: Set<string> | undefined;

  for (const { node, target, kind } of references) {
    const { migration } = target;
    if (kind !== 'import' || modes.has(migration) || !localImportSpecifier(node)) {
      continue;
    }

    importBindings ??= collectImportBindings(sourceFile);
    declaredNames ??= collectDeclaredNames(sourceFile);

    const existing = importBindings.get(migration.to);
    if (existing) {
      // The very same symbol is already imported (e.g. a partially migrated file).
      const legacyModule = importModule(node);
      const sameSymbol =
        existing.importedName === migration.to &&
        (migration.importedFrom
          ? matchesModule(existing.module, migration.importedFrom)
          : existing.module === legacyModule);
      modes.set(migration, sameSymbol ? 'dedupe' : 'alias');
    } else {
      modes.set(migration, declaredNames.has(migration.to) ? 'alias' : 'rename');
    }
  }

  return modes;
}

/**
 * Edit removing an import specifier together with its separating comma;
 * the whole import declaration is removed when nothing else is imported.
 */
function removeImportSpecifier(
  specifier: ts.ImportSpecifier,
  sourceFile: ts.SourceFile,
  content: string,
): { offset: number; length: number } {
  const namedImports = specifier.parent;
  const elements = namedImports.elements;
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

  const clause = namedImports.parent;
  if (clause.name) {
    // `import Default, { Legacy } from '…'` → `import Default from '…'`
    return { offset: clause.name.getEnd(), length: namedImports.getEnd() - clause.name.getEnd() };
  }

  const declaration = clause.parent;
  const start = declaration.getStart(sourceFile);
  let end = declaration.getEnd();
  const lineBreak = /^\r?\n/.exec(content.slice(end));
  if (lineBreak) {
    end += lineBreak[0].length;
  }
  return { offset: start, length: end - start };
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
      const modes = resolveRenameModes(sourceFile, references);

      for (const { node, target, kind } of references) {
        const { migration } = target;
        const mode = modes.get(migration) ?? 'rename';
        const specifier = kind === 'import' ? localImportSpecifier(node) : undefined;

        if (specifier && mode === 'dedupe') {
          // `to` is already imported: drop the legacy specifier, usages are renamed below.
          edits.push({
            ...removeImportSpecifier(specifier, sourceFile, original),
            index: index++,
            log: () =>
              context.logger.info(
                `  → Removed '${migration.from}' in favor of the existing '${migration.to}' import in ${filePath}`,
              ),
          });
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
