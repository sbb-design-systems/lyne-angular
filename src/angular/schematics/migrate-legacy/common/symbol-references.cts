import ts from 'typescript';

/** A symbol to look up, optionally restricted to the module(s) it is imported from. */
export interface SymbolTarget {
  /** Exported name of the symbol, e.g. `'SbbBreadcrumbs'`. */
  name: string;
  /**
   * Only consider the symbol when it is imported from this module (exact match
   * or sub-path). When omitted, any import of `name` is considered.
   */
  importedFrom?: string | string[];
}

/**
 * - `import`:    the name inside an import/export specifier
 * - `usage`:     a reference to the imported symbol (incl. `ns.Name` of a namespace import)
 * - `shorthand`: a shorthand property (`{ Name }`), whose identifier is also the object key
 */
export type SymbolReferenceKind = 'import' | 'usage' | 'shorthand';

export interface SymbolReference<T extends SymbolTarget> {
  node: ts.Identifier;
  target: T;
  kind: SymbolReferenceKind;
}

/** Whether `moduleSpecifier` equals one of `importedFrom` or is a sub-path of it. */
export function matchesModule(moduleSpecifier: string, importedFrom?: string | string[]): boolean {
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

/** Whether the identifier is the name of a declared member or an object key. */
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
 * Finds all references of the given symbols within a source file.
 *
 * Only symbols which are actually imported (or re-exported) by the file are considered,
 * so unrelated symbols sharing the name are ignored.
 * Member names (`foo.Name`, except on a namespace import), object keys and declaration names are never reported.
 * Usages of aliased imports (`{ Name as Alias }`) are not reported either, as they refer to the alias;
 * only the import itself is.
 */
export function findSymbolReferences<T extends SymbolTarget>(
  sourceFile: ts.SourceFile,
  targets: T[],
): SymbolReference<T>[] {
  const references: SymbolReference<T>[] = [];
  /** Local name → target, for non-aliased named imports. */
  const bindings = new Map<string, T>();
  /** Local names of `import * as ns` namespace imports → applicable targets. */
  const namespaces = new Map<string, T[]>();

  // 1. Resolve which symbols the file actually imports.
  for (const statement of sourceFile.statements) {
    const isImport = ts.isImportDeclaration(statement);
    if (!isImport && !ts.isExportDeclaration(statement)) {
      continue;
    }

    const moduleSpecifier = statement.moduleSpecifier;
    if (!moduleSpecifier || !ts.isStringLiteral(moduleSpecifier)) {
      continue;
    }

    const applicable = targets.filter((target) =>
      matchesModule(moduleSpecifier.text, target.importedFrom),
    );
    if (!applicable.length) {
      continue;
    }

    const namedBindings = isImport ? statement.importClause?.namedBindings : statement.exportClause;

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
      const importedName = specifier.propertyName ?? specifier.name;
      if (!ts.isIdentifier(importedName)) {
        continue;
      }

      const target = applicable.find((candidate) => candidate.name === importedName.text);
      if (!target) {
        continue;
      }

      references.push({ node: importedName, target, kind: 'import' });

      // Aliased imports keep their alias, so their usages do not refer to the name.
      if (!specifier.propertyName && isImport) {
        bindings.set(specifier.name.text, target);
      }
    }
  }

  if (!bindings.size && !namespaces.size) {
    return references;
  }

  // 2. Find every usage of the resolved bindings.
  const visit = (node: ts.Node): void => {
    if (!ts.isIdentifier(node)) {
      ts.forEachChild(node, visit);
      return;
    }

    const parent = node.parent;

    if (ts.isShorthandPropertyAssignment(parent)) {
      const target = bindings.get(node.text);
      if (target) {
        references.push({ node, target, kind: 'shorthand' });
      }
      return;
    }

    if (isMemberName(node)) {
      // `ns.Name` of a namespace import is a real usage.
      const qualifier = ts.isPropertyAccessExpression(parent)
        ? parent.expression
        : (parent as ts.QualifiedName).left;
      const target = ts.isIdentifier(qualifier)
        ? namespaces.get(qualifier.text)?.find((candidate) => candidate.name === node.text)
        : undefined;

      if (target) {
        references.push({ node, target, kind: 'usage' });
      }
      return;
    }

    if (isDeclarationName(node) || ts.isImportSpecifier(parent) || ts.isImportClause(parent)) {
      return;
    }

    // In `export { Local as Exported }` only `Local` refers to the binding.
    if (ts.isExportSpecifier(parent) && parent.propertyName && parent.name === node) {
      return;
    }

    const target = bindings.get(node.text);
    if (target) {
      references.push({ node, target, kind: 'usage' });
    }
  };

  ts.forEachChild(sourceFile, visit);

  return references;
}
