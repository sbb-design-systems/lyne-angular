import { globSync } from 'node:fs';
import path from 'node:path';

import type { TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

const packages = ['angular', 'angular-experimental'];
const examplesRoot = () => {
  /** The process cwd is different depending on whether the rule is run by the IDE or by command */
  const basePath = process.cwd().endsWith('src/docs')
    ? process.cwd()
    : path.join(process.cwd(), `src/docs`);
  return packages.map((p) => path.join(basePath, `/app/${p}/examples/`));
};

/**
 * Helper to extract the 'exampleId' from EXAMPLE_COMPONENTS
 * Currently, the exampleId is either a string literal or an 'ExampleData' object.
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

/**
 * Scans the examples directory and builds a map:
 *   key => folder that contains the examples, aka the 'moduleId';
 *   value => set of the exampleIds inside the module folder;
 */
function collectExamplesStructure(): Map<string, Set<string>> {
  const result = new Map<string, Set<string>>();

  for (const root of examplesRoot()) {
    const examplesFile = globSync('**/*-example.ts', {
      cwd: root,
    });

    for (const example of examplesFile) {
      const examplePath = path.dirname(example).split(path.sep); // e.g. "accordion/accordion-basic" or "button/mini-button/mini-button-basic"
      const exampleId = examplePath.at(-1)!; // e.g. "accordion-basic" or "mini-button-basic"
      const moduleId = examplePath.slice(0, -1).join(path.sep); // e.g. "accordion" or "button/mini-button"

      if (!result.has(moduleId)) {
        result.set(moduleId, new Set());
      }
      result.get(moduleId)!.add(exampleId);
    }
  }
  return result;
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
    },
  },
  create(context) {
    const filename = context.filename;

    // Limit rule execution to example-module.ts
    if (!filename.endsWith('example-module.ts')) {
      return {};
    }

    // Map of the test files, grouped by module (Map<moduleId, Set<exampleId>>)
    const onDiskExamples = collectExamplesStructure();

    // Map extracted from EXAMPLE_COMPONENTS (Map<moduleId, Set<exampleId>>)
    const configuredExamples = new Map<string, Set<string>>();
    let hasExampleComponents = false;

    return {
      // Find the 'EXAMPLE_COMPONENTS' declaration and extract a map of moduleId => exampleIds
      VariableDeclarator(node: TSESTree.VariableDeclarator) {
        if (node.id.type !== 'Identifier' || node.id.name !== 'EXAMPLE_COMPONENTS') {
          return;
        }
        hasExampleComponents = true;

        if (!node.init || node.init.type !== 'ObjectExpression') {
          context.report({
            node,
            messageId: 'notObjectLiteral',
          });
          return;
        }

        const objectExpr = node.init;
        for (const prop of objectExpr.properties) {
          if (prop.type !== 'Property') continue;

          let moduleId: string | null = null;
          if (prop.key.type === 'Identifier' && !prop.computed) {
            moduleId = prop.key.name;
          } else if (prop.key.type === 'Literal' && typeof prop.key.value === 'string') {
            moduleId = prop.key.value;
          }

          if (!moduleId || prop.value.type !== 'ArrayExpression') {
            continue;
          }

          const examples = new Set<string>();
          for (const element of prop.value.elements) {
            if (!element || (element.type !== 'Literal' && element.type !== 'ObjectExpression')) {
              continue;
            }

            const id = extractExampleId(element);
            if (id) {
              examples.add(id);

              // Example is configured, but it does not exist on disk FIX: delete the example from EXAMPLE_COMPONENTS
              if (onDiskExamples.has(moduleId) && !onDiskExamples.get(moduleId)!.has(id)) {
                context.report({
                  node: element,
                  messageId: 'exampleDoesNotExist',
                  data: { module: moduleId, example: id },
                  fix: (fixer) => fixer.remove(element),
                });
              }
            }
          }

          configuredExamples.set(moduleId, examples);

          // Module is configured, but it does not exist on disk FIX: delete the module from EXAMPLE_COMPONENTS
          if (!onDiskExamples.has(moduleId)) {
            context.report({
              node: prop,
              messageId: 'moduleDoesNotExist',
              data: { module: moduleId },
              fix: (fixer) => fixer.remove(prop),
            });
            continue;
          }

          // Example exists physically, but it's not configured FIX: add the example to the module in EXAMPLE_COMPONENTS
          for (const example of onDiskExamples.get(moduleId)!) {
            if (!examples.has(example)) {
              context.report({
                node: prop.key,
                messageId: 'exampleNotConfigured',
                data: { module: moduleId, example },
                fix: (fixer) =>
                  fixer.insertTextAfterRange(
                    [prop.value.range[0], prop.value.range[1] - 1],
                    `, '${example}'`,
                  ),
              });
            }
          }
        }

        // Module exists physically, but it's not configured FIX: add the module to EXAMPLE_COMPONENTS
        for (const moduleId of onDiskExamples.keys()) {
          if (!configuredExamples.has(moduleId)) {
            context.report({
              node: objectExpr,
              messageId: 'moduleNotConfigured',
              data: { module: moduleId },
              fix: (fixer) =>
                fixer.insertTextAfterRange(
                  [objectExpr.range[0], objectExpr.range[1] - 1],
                  `${moduleId}: [],`,
                ),
            });
          }
        }
      },

      // Ensure that the 'loadExample' function handles all the configured examples
      FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
        if (node.id?.type !== 'Identifier' || node.id?.name !== 'loadExample') {
          return;
        }

        const switchNode = node.body.body.find((n) => n.type === 'SwitchStatement')!;
        const defaultNode = switchNode.cases.find((c) => !c.test)!;
        const importedExamples = switchNode.cases
          .map((c) => (c.test?.type === 'Literal' ? c.test.value : null))
          .filter(Boolean) as string[];

        // Check that all configured examples are imported
        for (const [moduleId, examples] of configuredExamples.entries()) {
          for (const example of examples) {
            if (!importedExamples.includes(example)) {
              context.report({
                node: switchNode,
                messageId: 'exampleNotImported',
                data: { module: moduleId, example },
                fix: (fixer) =>
                  fixer.insertTextBefore(
                    defaultNode,
                    `case '${example}':\n return import('../angular/examples/${moduleId}');\n`,
                  ),
              });
            }
          }
        }

        // Flatten the map values in a single array
        const allConfiguredExamplesIds = new Array(...configuredExamples.values())
          .map((e) => new Array(...e.values()))
          .flat();

        // Check that all imported examples are configured
        for (const example of importedExamples) {
          if (!allConfiguredExamplesIds.includes(example)) {
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
      },

      // At the end of the file, compare EXAMPLE_COMPONENTS with the real structure on disk
      'Program:exit'(node: TSESTree.Program) {
        if (!hasExampleComponents) {
          context.report({
            node,
            messageId: 'missingConst',
          });
          return;
        }
      },
    };
  },
});
