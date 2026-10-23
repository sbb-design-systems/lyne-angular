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

export interface SymbolReference<T extends SymbolTarget> {
  node: ts.Identifier;
  target: T;
}

/** Whether `moduleSpecifier` equals one of `importedFrom` or is a sub-path of it. */
export function matchesModule(moduleSpecifier: string, importedFrom?: string | string[]): boolean {
  if (!importedFrom) {
    return true;
  }
  return [importedFrom]
    .flat()
    .some((module) => moduleSpecifier === module || moduleSpecifier.startsWith(`${module}/`));
}

/** Whether the identifier refers to a binding, as opposed to a member name or an object/class key. */
function isReference(node: ts.Identifier): boolean {
  const parent = node.parent;
  if (ts.isQualifiedName(parent)) {
    return parent.left === node;
  }
  if (
    ts.isPropertyAccessExpression(parent) ||
    ts.isPropertyAssignment(parent) ||
    ts.isPropertyDeclaration(parent) ||
    ts.isPropertySignature(parent) ||
    ts.isMethodDeclaration(parent) ||
    ts.isMethodSignature(parent) ||
    ts.isEnumMember(parent)
  ) {
    return parent.name !== node;
  }
  return true;
}

/**
 * Finds the named imports of the given symbols and every reference to them in the file.
 *
 * This is purely name based: scoping and shadowing are not considered, and only
 * `import { Name } from '…'` is understood (namespace imports and re-exports are ignored).
 * An aliased import (`Name as Alias`) yields only the import itself, since its usages use the alias.
 */
export function findSymbolReferences<T extends SymbolTarget>(
  sourceFile: ts.SourceFile,
  targets: T[],
): SymbolReference<T>[] {
  const references: SymbolReference<T>[] = [];
  /** Local name → target of the non-aliased imports. */
  const bindings = new Map<string, T>();

  for (const statement of sourceFile.statements) {
    const namedImports = ts.isImportDeclaration(statement)
      ? statement.importClause?.namedBindings
      : undefined;
    if (
      !namedImports ||
      !ts.isNamedImports(namedImports) ||
      !ts.isStringLiteral((statement as ts.ImportDeclaration).moduleSpecifier)
    ) {
      continue;
    }

    const module = ((statement as ts.ImportDeclaration).moduleSpecifier as ts.StringLiteral).text;
    for (const specifier of namedImports.elements) {
      const imported = specifier.propertyName ?? specifier.name;
      const target = ts.isIdentifier(imported)
        ? targets.find((t) => t.name === imported.text && matchesModule(module, t.importedFrom))
        : undefined;

      if (target) {
        references.push({ node: imported as ts.Identifier, target });
        if (!specifier.propertyName) {
          bindings.set(specifier.name.text, target);
        }
      }
    }
  }

  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node)) {
      return; // Already handled above.
    }
    if (ts.isIdentifier(node)) {
      const target = bindings.get(node.text);
      if (target && isReference(node)) {
        references.push({ node, target });
      }
      return;
    }
    ts.forEachChild(node, visit);
  };
  ts.forEachChild(sourceFile, visit);

  return references;
}
