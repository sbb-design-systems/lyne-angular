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
 * Collects local binding names declared directly within a parameter list or variable declaration.
 */
function collectDeclaredNames(node: ts.Node, nameSet: Set<string>): void {
  if (ts.isIdentifier(node)) {
    nameSet.add(node.text);
  } else if (ts.isObjectBindingPattern(node) || ts.isArrayBindingPattern(node)) {
    for (const element of node.elements) {
      if (ts.isBindingElement(element)) {
        collectDeclaredNames(element.name, nameSet);
      }
    }
  }
}

/**
 * Extracts all new identifier names declared in scoping statements/nodes.
 */
function collectScopeDeclarations(scopeNode: ts.Node): Set<string> {
  const names = new Set<string>();

  const addFromNode = (node: ts.Node) => {
    if (
      ts.isFunctionDeclaration(node) ||
      ts.isFunctionExpression(node) ||
      ts.isArrowFunction(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isGetAccessorDeclaration(node) ||
      ts.isSetAccessorDeclaration(node) ||
      ts.isConstructorDeclaration(node)
    ) {
      if (ts.isFunctionDeclaration(node) && node.name) {
        names.add(node.name.text);
      }
      for (const param of node.parameters) {
        collectDeclaredNames(param.name, names);
      }
    } else if (ts.isVariableDeclarationList(node)) {
      for (const decl of node.declarations) {
        collectDeclaredNames(decl.name, names);
      }
    } else if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        collectDeclaredNames(decl.name, names);
      }
    } else if (ts.isCatchClause(node) && node.variableDeclaration) {
      collectDeclaredNames(node.variableDeclaration.name, names);
    } else if (
      ts.isClassDeclaration(node) ||
      ts.isInterfaceDeclaration(node) ||
      ts.isTypeAliasDeclaration(node) ||
      ts.isEnumDeclaration(node)
    ) {
      if (node.name) {
        names.add(node.name.text);
      }
    }
  };

  // If node is block or function, collect declarations
  addFromNode(scopeNode);

  if (ts.isBlock(scopeNode) || ts.isSourceFile(scopeNode)) {
    for (const statement of scopeNode.statements) {
      addFromNode(statement);
    }
  }

  return names;
}

/**
 * Finds all references of the given symbols within a source file.
 *
 * Only symbols which are actually imported (or re-exported) by the file are considered,
 * so unrelated symbols sharing the name are ignored.
 * Lexical shadowing (local parameters/variables with matching names) is accounted for.
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

  // 2. Traversal with lexical scope and shadowing awareness.
  const visit = (node: ts.Node, currentShadowed: Set<string>): void => {
    let nextShadowed = currentShadowed;

    // Whether entering scope (Block, Function, CatchClause, etc.)
    if (
      ts.isBlock(node) ||
      ts.isFunctionLike(node) ||
      ts.isCatchClause(node) ||
      ts.isSourceFile(node)
    ) {
      // Determine if this node introduces new declarations that shadow existing bindings
      const declared = collectScopeDeclarations(node);
      if (declared.size > 0) {
        for (const name of declared) {
          if (bindings.has(name)) {
            if (nextShadowed === currentShadowed) {
              nextShadowed = new Set(currentShadowed);
            }
            nextShadowed.add(name);
          }
        }
      }
    }

    if (ts.isIdentifier(node)) {
      const parent = node.parent;

      if (ts.isShorthandPropertyAssignment(parent)) {
        if (!nextShadowed.has(node.text)) {
          const target = bindings.get(node.text);
          if (target) {
            references.push({ node, target, kind: 'shorthand' });
          }
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

      // Skip reference if the identifier name is currently shadowed in this scope
      if (!nextShadowed.has(node.text)) {
        const target = bindings.get(node.text);
        if (target) {
          references.push({ node, target, kind: 'usage' });
        }
      }
      return;
    }

    ts.forEachChild(node, (child) => visit(child, nextShadowed));
  };

  ts.forEachChild(sourceFile, (child) => visit(child, new Set()));

  return references;
}
