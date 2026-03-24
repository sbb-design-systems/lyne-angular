import { globSync, readdirSync } from 'node:fs';
import path from 'node:path';

import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

/** The process cwd is different depending on whether the rule is run by the IDE or by command */
const docsRoot = () =>
  process.cwd().endsWith('src/docs') ? process.cwd() : path.join(process.cwd(), `src/docs`);

const exampleModulePath = () => path.join(docsRoot(), 'app/shared/example-module.ts');

/**
 * Metadata about a single example, mirroring ExampleData from the script.
 */
interface ExampleMeta {
  id: string;
  hasStyle?: true;
  exampleFiles?: string[];
  /** relative import path from example-module.ts to the index folder, e.g. '../angular/examples/accordion' */
  importPath: string;
}

type ExampleElement = TSESTree.Literal | TSESTree.ObjectExpression;

/** Type guard for array elements that can represent an example (string literal or object). */
function isExampleElement(
  node: TSESTree.Expression | TSESTree.SpreadElement | null,
): node is ExampleElement {
  return node?.type === 'Literal' || node?.type === 'ObjectExpression';
}

/**
 * Helper to extract the 'exampleId' from EXAMPLE_COMPONENTS.
 * The exampleId is either a string literal or an 'ExampleData' object with an 'id' property.
 */
function extractExampleId(node: TSESTree.Expression): string | null {
  if (node.type === 'Literal' && typeof node.value === 'string') {
    return node.value;
  }
  if (node.type === 'ObjectExpression') {
    const idProp = node.properties.find(
      (prop): prop is TSESTree.Property =>
        prop.type === 'Property' &&
        !prop.computed &&
        prop.key.type === 'Identifier' &&
        prop.key.name === 'id',
    );
    if (idProp && idProp.value.type === 'Literal' && typeof idProp.value.value === 'string') {
      return idProp.value.value;
    }
  }
  return null;
}

/** Returns true if the AST node has `hasStyle: true` set. */
function extractHasStyle(node: TSESTree.Expression): boolean {
  if (node.type !== 'ObjectExpression') {
    return false;
  }
  return node.properties.some(
    (prop): prop is TSESTree.Property =>
      prop.type === 'Property' &&
      !prop.computed &&
      prop.key.type === 'Identifier' &&
      prop.key.name === 'hasStyle' &&
      prop.value.type === 'Literal' &&
      prop.value.value === true,
  );
}

/** Serialises an ExampleMeta to its source representation, e.g. `'foo'` or `{ id: 'foo', hasStyle: true }` */
function serializeExampleMeta(meta: ExampleMeta): string {
  const { id, hasStyle, exampleFiles } = meta;
  if (!hasStyle && !exampleFiles) {
    return `'${id}'`;
  }
  const parts = [`id: '${id}'`];
  if (hasStyle) {
    parts.push('hasStyle: true');
  }
  if (exampleFiles) {
    parts.push(`exampleFiles: ${JSON.stringify(exampleFiles)}`);
  }
  return `{ ${parts.join(', ')} }`;
}

/** Extracts the string key from a Property node. */
function getPropertyKey(prop: TSESTree.Property): string {
  if (prop.key.type === 'Identifier' && !prop.computed) {
    return prop.key.name;
  }
  if (prop.key.type === 'Literal' && typeof prop.key.value === 'string') {
    return prop.key.value;
  }
  return '';
}

/**
 * Scans the examples directory using the same logic as generate-examples-module.mts:
 *   key => moduleId (e.g. 'accordion');
 *   value => ordered list of ExampleMeta objects;
 */
function collectExamplesStructure(): Map<string, ExampleMeta[]> {
  const result = new Map<string, ExampleMeta[]>();
  const moduleDir = path.dirname(exampleModulePath());

  // Mirror the glob from the script: app/*/examples/**/index.ts
  const indexFiles = globSync(`app/*/examples/**/index.ts`, { cwd: docsRoot() }).map((f) =>
    path.join(docsRoot(), f),
  );

  for (const indexFile of indexFiles) {
    const dir = path.dirname(indexFile);
    const examplesEntries = readdirSync(dir, { withFileTypes: true }).filter((d) =>
      d.isDirectory(),
    );
    if (!examplesEntries.length) {
      continue;
    }

    // importPath: relative from example-module.ts dir to the examples index dir (e.g. '../angular/examples/accordion')
    const importPath = path.relative(moduleDir, dir).split(path.sep).join('/');
    // moduleId: basename of the dir, matching the script's `basename(dir)`
    const moduleId = path.basename(dir);

    const metas: ExampleMeta[] = [];
    for (const entry of examplesEntries) {
      const exampleId = entry.name;
      const exampleDir = path.join(dir, exampleId);
      const wellKnownFilePattern = `${exampleId}-example`;

      const fileSet = new Set(
        readdirSync(exampleDir, { withFileTypes: true, recursive: true })
          .filter((d) => d.isFile())
          .map((d) => path.relative(exampleDir, path.join(d.parentPath, d.name))),
      );

      const hasStyle = fileSet.has(`${wellKnownFilePattern}.scss`);
      if (hasStyle) {
        fileSet.delete(`${wellKnownFilePattern}.scss`);
      }

      const meta: ExampleMeta = { id: exampleId, importPath };
      if (hasStyle) {
        meta.hasStyle = true;
      }
      if (fileSet.size > 2) {
        meta.exampleFiles = Array.from(fileSet);
      }
      metas.push(meta);
    }

    result.set(moduleId, metas);
  }

  return result;
}

/**
 * Removes a node together with its surrounding comma so no stray comma remains.
 * Prefers removing the preceding comma; falls back to the trailing one.
 */
function removeWithComma(
  fixer: TSESLint.RuleFixer,
  node: TSESTree.Node,
  sourceCode: TSESLint.SourceCode,
): TSESLint.RuleFix {
  const tokenBefore = sourceCode.getTokenBefore(node);
  if (tokenBefore?.value === ',') {
    return fixer.removeRange([tokenBefore.range[0], node.range[1]]);
  }
  const tokenAfter = sourceCode.getTokenAfter(node);
  if (tokenAfter?.value === ',') {
    return fixer.removeRange([node.range[0], tokenAfter.range[1]]);
  }
  return fixer.remove(node);
}

export default ESLintUtils.RuleCreator.withoutDocs({
  defaultOptions: [],
  meta: {
    fixable: 'code',
    type: 'problem',
    schema: [],
    hasSuggestions: false,
    docs: {
      description:
        'Ensures that EXAMPLE_COMPONENTS in example-module.ts contains all examples present in docs/app/angular/examples.',
    },
    messages: {
      missingConst: 'The EXAMPLE_COMPONENTS constant must be defined in example-module.ts.',
      notObjectLiteral: 'EXAMPLE_COMPONENTS must be initialized with an object literal.',
      moduleNotConfigured:
        'The examples module "{{module}}" is not configured in EXAMPLE_COMPONENTS.',
      exampleNotConfigured:
        'The example "{{example}}" of the module "{{module}}" is not configured in EXAMPLE_COMPONENTS.',
      moduleDoesNotExist: 'The configured module "{{module}}" does not exist.',
      exampleDoesNotExist:
        'The configured example "{{example}}" of the module "{{module}}" does not exist.',
      exampleNotImported:
        'The example "{{example}}" of the module "{{module}}" is not imported in the "loadExample" switch.',
      importedExampleDoesNotExist:
        'The imported example "{{example}}" is not configured. Please delete the import statement or add the example to EXAMPLE_COMPONENTS.',
      modulesNotSorted:
        'The modules in EXAMPLE_COMPONENTS are not sorted alphabetically. "{{module}}" should come before "{{before}}".',
      examplesNotSorted:
        'The examples in module "{{module}}" are not sorted alphabetically. "{{example}}" should come before "{{before}}".',
      switchCasesNotSorted:
        'The cases in the loadExample switch are not sorted alphabetically. "{{example}}" should come before "{{before}}".',
      hasStyleMissing:
        'The example "{{example}}" of module "{{module}}" has a style file but is missing "hasStyle: true".',
      hasStyleSuperfluous:
        'The example "{{example}}" of module "{{module}}" has "hasStyle: true" but no style file exists.',
    },
  },
  create(context) {
    if (!context.filename.endsWith('example-module.ts')) {
      return {};
    }

    const onDiskExamples = collectExamplesStructure();
    const configuredExamples = new Map<string, Set<string>>();
    let hasExampleComponents = false;
    // Populated by FunctionDeclaration, used by VariableDeclarator fixes
    let switchNode: TSESTree.SwitchStatement | null = null;
    // Built once from onDiskExamples for use in FunctionDeclaration
    const importPathByExample = new Map(
      [...onDiskExamples.values()].flat().map((m) => [m.id, m.importPath]),
    );

    return {
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (node.id.type !== 'Identifier' || node.id.name !== 'EXAMPLE_COMPONENTS') {
          return;
        }
        hasExampleComponents = true;

        if (!node.init || node.init.type !== 'ObjectExpression') {
          context.report({ node, messageId: 'notObjectLiteral' });
          return;
        }

        const objectExpr = node.init;
        for (const prop of objectExpr.properties) {
          if (prop.type !== 'Property') {
            continue;
          }

          const moduleId = getPropertyKey(prop);
          if (!moduleId || prop.value.type !== 'ArrayExpression') {
            continue;
          }

          const onDiskMetas = onDiskExamples.get(moduleId);
          const arrayElements = prop.value.elements.filter(isExampleElement);
          const examples = new Set<string>();

          for (const element of arrayElements) {
            const id = extractExampleId(element);
            if (!id) {
              continue;
            }
            examples.add(id);

            // Example is configured, but does not exist on disk → delete from EXAMPLE_COMPONENTS + switch
            if (onDiskMetas && !onDiskMetas.some((m) => m.id === id)) {
              context.report({
                node: element,
                messageId: 'exampleDoesNotExist',
                data: { module: moduleId, example: id },
                fix: (fixer) => {
                  const fixes: TSESLint.RuleFix[] = [
                    removeWithComma(fixer, element, context.sourceCode),
                  ];
                  const caseNode = switchNode?.cases.find(
                    (c) => c.test?.type === 'Literal' && c.test.value === id,
                  );
                  if (caseNode) {
                    fixes.push(removeWithComma(fixer, caseNode, context.sourceCode));
                  }
                  return fixes;
                },
              });
            }

            // Check hasStyle correctness against on-disk metadata
            const diskMeta = onDiskMetas?.find((m) => m.id === id);
            if (diskMeta) {
              const configuredHasStyle = extractHasStyle(element);
              if (diskMeta.hasStyle && !configuredHasStyle) {
                context.report({
                  node: element,
                  messageId: 'hasStyleMissing',
                  data: { module: moduleId, example: id },
                  fix: (fixer) => fixer.replaceText(element, serializeExampleMeta(diskMeta)),
                });
              } else if (!diskMeta.hasStyle && configuredHasStyle) {
                context.report({
                  node: element,
                  messageId: 'hasStyleSuperfluous',
                  data: { module: moduleId, example: id },
                  fix: (fixer) => fixer.replaceText(element, serializeExampleMeta(diskMeta)),
                });
              }
            }
          }

          configuredExamples.set(moduleId, examples);

          // Module is configured, but does not exist on disk → delete from EXAMPLE_COMPONENTS + switch
          if (!onDiskMetas) {
            context.report({
              node: prop,
              messageId: 'moduleDoesNotExist',
              data: { module: moduleId },
              fix: (fixer) => {
                const fixes: TSESLint.RuleFix[] = [
                  removeWithComma(fixer, prop, context.sourceCode),
                ];
                if (switchNode) {
                  for (const caseNode of switchNode.cases) {
                    if (
                      caseNode.test?.type === 'Literal' &&
                      typeof caseNode.test.value === 'string' &&
                      examples.has(caseNode.test.value)
                    ) {
                      fixes.push(removeWithComma(fixer, caseNode, context.sourceCode));
                    }
                  }
                }
                return fixes;
              },
            });
            continue;
          }

          // Check that examples inside the array are sorted alphabetically
          for (let i = 1; i < arrayElements.length; i++) {
            const prevId = extractExampleId(arrayElements[i - 1]) ?? '';
            const currId = extractExampleId(arrayElements[i]) ?? '';
            if (prevId.localeCompare(currId) > 0) {
              context.report({
                node: arrayElements[i],
                messageId: 'examplesNotSorted',
                data: { module: moduleId, example: currId, before: prevId },
                fix: (fixer) => {
                  const sorted = [...arrayElements].sort((a, b) =>
                    (extractExampleId(a) ?? '').localeCompare(extractExampleId(b) ?? ''),
                  );
                  return sorted.map((el, idx) =>
                    fixer.replaceText(arrayElements[idx], context.sourceCode.getText(el)),
                  );
                },
              });
              break; // one report per array is enough, the fix sorts all
            }
          }

          // Example exists on disk but is not configured → insert alphabetically
          const existingIds = arrayElements.map((el) => extractExampleId(el) ?? '');
          for (const meta of onDiskMetas) {
            if (!examples.has(meta.id)) {
              const serialized = serializeExampleMeta(meta);
              const afterIndex = existingIds.findIndex((id) => id.localeCompare(meta.id) > 0);
              context.report({
                node: prop.key,
                messageId: 'exampleNotConfigured',
                data: { module: moduleId, example: meta.id },
                fix: (fixer) => {
                  if (afterIndex === -1) {
                    return fixer.insertTextAfterRange(
                      [prop.value.range[0], prop.value.range[1] - 1],
                      `, ${serialized}`,
                    );
                  }
                  return fixer.insertTextBefore(arrayElements[afterIndex], `${serialized}, `);
                },
              });
            }
          }
        }

        const configuredProps = objectExpr.properties.filter(
          (p): p is TSESTree.Property => p.type === 'Property',
        );

        // Check that modules are sorted alphabetically
        for (let i = 1; i < configuredProps.length; i++) {
          const prevKey = getPropertyKey(configuredProps[i - 1]);
          const currKey = getPropertyKey(configuredProps[i]);
          if (prevKey.localeCompare(currKey) > 0) {
            context.report({
              node: configuredProps[i].key,
              messageId: 'modulesNotSorted',
              data: { module: currKey, before: prevKey },
              fix: (fixer) => {
                const sorted = [...configuredProps].sort((a, b) =>
                  getPropertyKey(a).localeCompare(getPropertyKey(b)),
                );
                return sorted.map((p, idx) =>
                  fixer.replaceText(configuredProps[idx], context.sourceCode.getText(p)),
                );
              },
            });
            break; // one report is enough, the fix sorts all
          }
        }

        // Module exists on disk but is not configured → insert alphabetically
        for (const [moduleId, metas] of onDiskExamples.entries()) {
          if (!configuredExamples.has(moduleId)) {
            const entries = metas.map((m) => serializeExampleMeta(m)).join(', ');
            const newEntry = `'${moduleId}': [${entries}],`;
            const afterProp = configuredProps.find(
              (p) => getPropertyKey(p).localeCompare(moduleId) > 0,
            );
            context.report({
              node: objectExpr,
              messageId: 'moduleNotConfigured',
              data: { module: moduleId },
              fix: (fixer) =>
                afterProp
                  ? fixer.insertTextBefore(afterProp, `${newEntry}\n  `)
                  : fixer.insertTextAfterRange(
                      [objectExpr.range[0], objectExpr.range[1] - 1],
                      `\n  ${newEntry}`,
                    ),
            });
          }
        }
      },

      FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
        if (node.id?.type !== 'Identifier' || node.id?.name !== 'loadExample') {
          return;
        }

        switchNode = node.body.body.find((n) => n.type === 'SwitchStatement') ?? null;
        if (!switchNode) {
          return;
        }

        const defaultNode = switchNode.cases.find((c) => !c.test)!;
        const importedExamples = switchNode.cases
          .map((c) => (c.test?.type === 'Literal' ? (c.test.value as string) : null))
          .filter((v): v is string => v !== null);

        // Check that all configured examples have a case in the switch
        for (const [moduleId, examples] of configuredExamples.entries()) {
          for (const example of examples) {
            if (importedExamples.includes(example)) {
              continue;
            }
            const importPath =
              importPathByExample.get(example) ?? `../angular/examples/${moduleId}`;
            const caseText = `case '${example}':\n      return import('${importPath}');\n    `;
            const afterCase = switchNode.cases.find(
              (c) =>
                c.test?.type === 'Literal' &&
                typeof c.test.value === 'string' &&
                c.test.value.localeCompare(example) > 0,
            );
            context.report({
              node: switchNode,
              messageId: 'exampleNotImported',
              data: { module: moduleId, example },
              fix: (fixer) =>
                afterCase
                  ? fixer.insertTextBefore(afterCase, caseText)
                  : fixer.insertTextBefore(defaultNode, caseText),
            });
          }
        }

        // Check that all switch cases are configured in EXAMPLE_COMPONENTS
        const allConfiguredIds = [...configuredExamples.values()].flatMap((s) => [...s]);
        for (const example of importedExamples) {
          if (!allConfiguredIds.includes(example)) {
            context.report({
              node:
                switchNode.cases.find(
                  (c) => c.test?.type === 'Literal' && c.test.value === example,
                ) ?? switchNode,
              messageId: 'importedExampleDoesNotExist',
              data: { example },
            });
          }
        }

        // Check that switch cases are sorted alphabetically
        const namedCases = switchNode.cases.filter(
          (c): c is TSESTree.SwitchCase & { test: TSESTree.Literal } =>
            c.test?.type === 'Literal' && typeof c.test.value === 'string',
        );
        for (let i = 1; i < namedCases.length; i++) {
          const prevVal = namedCases[i - 1].test.value as string;
          const currVal = namedCases[i].test.value as string;
          if (prevVal.localeCompare(currVal) > 0) {
            context.report({
              node: namedCases[i].test,
              messageId: 'switchCasesNotSorted',
              data: { example: currVal, before: prevVal },
              fix: (fixer) => {
                const sorted = [...namedCases].sort((a, b) =>
                  (a.test.value as string).localeCompare(b.test.value as string),
                );
                return sorted.map((c, idx) =>
                  fixer.replaceText(namedCases[idx], context.sourceCode.getText(c)),
                );
              },
            });
            break; // one report is enough, the fix sorts all
          }
        }
      },

      'Program:exit'(node: TSESTree.Program) {
        if (!hasExampleComponents) {
          context.report({ node, messageId: 'missingConst' });
        }
      },
    };
  },
});
