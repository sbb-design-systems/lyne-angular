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
 * Whether the identifier is resolved in the type space: a type reference (`x: Name`), a heritage
 * type (`implements Name`, `interface X extends Name`) or the name of a type-only declaration.
 * Everything else (including `typeof Name` and `extends Name` of a class) is a value reference.
 */
function isTypeMeaning(identifier: ts.Identifier): boolean {
  const parent = identifier.parent;

  if (ts.isTypeReferenceNode(parent)) {
    return parent.typeName === identifier;
  }
  if (ts.isInterfaceDeclaration(parent) || ts.isTypeAliasDeclaration(parent)) {
    return parent.name === identifier;
  }
  if (ts.isTypeParameterDeclaration(parent)) {
    return parent.name === identifier;
  }
  if (ts.isExpressionWithTypeArguments(parent)) {
    const clause = parent.parent;
    return (
      ts.isHeritageClause(clause) &&
      (clause.token === ts.SyntaxKind.ImplementsKeyword || ts.isInterfaceDeclaration(clause.parent))
    );
  }
  return false;
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
 * Collects the `var` bindings declared anywhere within `node`, which are hoisted to the enclosing
 * function (or module) scope, e.g. a `var` inside an `if` or a loop body.
 * Nested functions and classes own their `var`s, while `let`/`const` stay block-scoped.
 */
function collectHoistedVarNames(node: ts.Node, names: Set<string>): void {
  ts.forEachChild(node, (child) => {
    if (ts.isFunctionLike(child) || ts.isClassLike(child)) {
      return;
    }
    if (ts.isVariableDeclarationList(child) && !(child.flags & ts.NodeFlags.BlockScoped)) {
      for (const declaration of child.declarations) {
        collectDeclaredNames(declaration.name, names);
      }
    }
    collectHoistedVarNames(child, names);
  });
}

/**
 * Names declared by a scope, split by the TypeScript declaration space they live in.
 * The two spaces are independent: `function f(Foo: Foo) {}` declares the value `Foo`
 * (the parameter), while the annotation still refers to the type `Foo`.
 */
interface ScopeDeclarations {
  /** Names which shadow value references (variables, parameters, functions, classes, enums). */
  values: Set<string>;
  /** Names which shadow type references (type parameters, interfaces, type aliases, classes, enums). */
  types: Set<string>;
}

/**
 * Extracts all new identifier names declared in scoping statements/nodes.
 */
function collectScopeDeclarations(scopeNode: ts.Node): ScopeDeclarations {
  const values = new Set<string>();
  const types = new Set<string>();

  // `var` declarations nested in blocks belong to the enclosing function or module scope.
  if (ts.isSourceFile(scopeNode) || ts.isModuleBlock(scopeNode)) {
    collectHoistedVarNames(scopeNode, values);
  } else if (ts.isFunctionLike(scopeNode) && 'body' in scopeNode && scopeNode.body) {
    collectHoistedVarNames(scopeNode.body, values);
  }

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
        values.add(node.name.text);
      }
      if (node === scopeNode) {
        // A named function expression binds its own name inside its body.
        if (ts.isFunctionExpression(node) && node.name) {
          values.add(node.name.text);
        }
        // Type parameters only live in the type space.
        for (const typeParameter of node.typeParameters ?? []) {
          types.add(typeParameter.name.text);
        }
        // Parameters only live in the value space, so `(Foo: Foo) => …` keeps the type reference.
        for (const param of node.parameters) {
          collectDeclaredNames(param.name, values);
        }
      }
    } else if (
      (ts.isForStatement(node) || ts.isForInStatement(node) || ts.isForOfStatement(node)) &&
      node === scopeNode
    ) {
      // `for (const x of …)`: the initializer declarations are scoped to the loop.
      if (node.initializer && ts.isVariableDeclarationList(node.initializer)) {
        addFromNode(node.initializer);
      }
    } else if (ts.isVariableDeclarationList(node)) {
      for (const decl of node.declarations) {
        collectDeclaredNames(decl.name, values);
      }
    } else if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        collectDeclaredNames(decl.name, values);
      }
    } else if (ts.isCatchClause(node) && node.variableDeclaration) {
      collectDeclaredNames(node.variableDeclaration.name, values);
    } else if (ts.isClassDeclaration(node) || ts.isEnumDeclaration(node)) {
      // Classes and enums are both a value and a type.
      if (node.name) {
        values.add(node.name.text);
        types.add(node.name.text);
      }
    } else if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
      types.add(node.name.text);
    }
  };

  // If node is block or function, collect declarations
  addFromNode(scopeNode);

  if (ts.isBlock(scopeNode) || ts.isSourceFile(scopeNode) || ts.isModuleBlock(scopeNode)) {
    for (const statement of scopeNode.statements) {
      addFromNode(statement);
    }
  } else if (ts.isCaseBlock(scopeNode)) {
    // All clauses of a `switch` share one lexical scope.
    for (const clause of scopeNode.clauses) {
      for (const statement of clause.statements) {
        addFromNode(statement);
      }
    }
  }

  return { values, types };
}

/** Whether the node opens a lexical scope which may shadow imported bindings. */
function isScopeNode(node: ts.Node): boolean {
  return (
    ts.isSourceFile(node) ||
    ts.isBlock(node) ||
    ts.isModuleBlock(node) ||
    ts.isCaseBlock(node) ||
    ts.isCatchClause(node) ||
    ts.isForStatement(node) ||
    ts.isForInStatement(node) ||
    ts.isForOfStatement(node) ||
    ts.isFunctionLike(node)
  );
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

  // Resolve which symbols the file actually imports.
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

  // Traversal with lexical scope and shadowing awareness.
  // Values and types are shadowed independently, e.g. a parameter `Foo` hides the imported value `Foo` but not the imported type `Foo`.
  const visit = (node: ts.Node, currentValues: Set<string>, currentTypes: Set<string>): void => {
    let shadowedValues = currentValues;
    let shadowedTypes = currentTypes;

    // Whether entering scope (Block, Function, CatchClause, etc.)
    if (isScopeNode(node)) {
      // Determine if this node introduces new declarations that shadow existing bindings
      const declared = collectScopeDeclarations(node);
      for (const name of declared.values) {
        if (bindings.has(name) || namespaces.has(name)) {
          if (shadowedValues === currentValues) {
            shadowedValues = new Set(currentValues);
          }
          shadowedValues.add(name);
        }
      }
      // Namespace imports are not affected by type declarations.
      for (const name of declared.types) {
        if (bindings.has(name)) {
          if (shadowedTypes === currentTypes) {
            shadowedTypes = new Set(currentTypes);
          }
          shadowedTypes.add(name);
        }
      }
    }

    if (ts.isIdentifier(node)) {
      const parent = node.parent;

      if (ts.isShorthandPropertyAssignment(parent)) {
        if (!shadowedValues.has(node.text)) {
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
        // A value-shadowed qualifier (e.g. a parameter named like the namespace) is not the import.
        // In a type position (`x: ns.Name`) the qualifier is a namespace, which values can't shadow.
        const qualifierIsValue =
          ts.isPropertyAccessExpression(parent) || ts.isTypeQueryNode(parent.parent);
        const target =
          ts.isIdentifier(qualifier) && !(qualifierIsValue && shadowedValues.has(qualifier.text))
            ? namespaces.get(qualifier.text)?.find((candidate) => candidate.name === node.text)
            : undefined;

        if (target) {
          references.push({ node, target, kind: 'usage' });
        }
        return;
      }

      if (
        isDeclarationName(node) ||
        ts.isImportSpecifier(parent) ||
        ts.isImportClause(parent) ||
        ts.isNamespaceExport(parent)
      ) {
        return;
      }

      // Re-exports were resolved against their own module in the first pass.
      // For local exports, only the referenced name denotes a local binding.
      if (
        ts.isExportSpecifier(parent) &&
        (parent.parent.parent.moduleSpecifier || (parent.propertyName && parent.name === node))
      ) {
        return;
      }

      // Skip the reference if the name is shadowed in the declaration space it resolves in.
      const shadowed = isTypeMeaning(node) ? shadowedTypes : shadowedValues;
      if (!shadowed.has(node.text)) {
        const target = bindings.get(node.text);
        if (target) {
          references.push({ node, target, kind: 'usage' });
        }
      }
      return;
    }

    ts.forEachChild(node, (child) => visit(child, shadowedValues, shadowedTypes));
  };

  ts.forEachChild(sourceFile, (child) => visit(child, new Set(), new Set()));

  return references;
}
