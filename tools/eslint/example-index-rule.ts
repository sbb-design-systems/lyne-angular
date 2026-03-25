import { readdirSync } from 'node:fs';
import path from 'node:path';

import type { TSESLint, TSESTree } from '@typescript-eslint/utils';
import { ESLintUtils } from '@typescript-eslint/utils';

/**
 * Converts a kebab-case filename (without extension) to PascalCase.
 * e.g. "accordion-basic-example" -> "AccordionBasicExample"
 */
function toPascalCase(name: string): string {
  return name.replace(/(^\w|-\w)/g, (s) => s.replace('-', '').toUpperCase());
}

/**
 * For a given index.ts file, scans sibling directories and collects
 * the expected exports: { className, importPath }
 */
interface ExpectedExport {
  className: string;
  /** relative specifier as it should appear in the export statement, e.g. './accordion-basic/accordion-basic-example' */
  specifier: string;
}

function collectExpectedExports(indexFilePath: string): ExpectedExport[] {
  const dir = path.dirname(indexFilePath);
  const entries = readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory());
  const result: ExpectedExport[] = [];

  for (const entry of entries) {
    const subDir = path.join(dir, entry.name);
    const exampleFile = readdirSync(subDir).find((f) => f.endsWith('-example.ts'));
    if (!exampleFile) {
      continue;
    }
    const fileNameWithoutExt = exampleFile.replace(/\.ts$/, '');
    const className = toPascalCase(fileNameWithoutExt);
    const specifier = `./${entry.name}/${fileNameWithoutExt}`;
    result.push({ className, specifier });
  }

  // Sort alphabetically by className so the fix inserts in order
  return result.sort((a, b) => a.className.localeCompare(b.className));
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
        'Ensures that the index.ts of an example folder exports all *-example.ts files from its sub-directories.',
    },
    messages: {
      missingExport:
        'The example "{{className}}" is not exported from this index. Expected: export { {{className}} } from \'{{specifier}}\';',
      extraExport:
        'The export "{{className}}" from \'{{specifier}}\' does not correspond to any *-example.ts file on disk.',
      exportsNotSorted:
        'Exports are not sorted alphabetically. "{{className}}" should come before "{{before}}".',
    },
  },
  create(context) {
    const filename = context.filename;

    // Only run on index.ts files inside an examples directory
    if (!filename.endsWith(`${path.sep}index.ts`) && !filename.endsWith('/index.ts')) {
      return {};
    }
    if (!filename.includes(`${path.sep}examples${path.sep}`) && !filename.includes('/examples/')) {
      return {};
    }

    const expectedExports = collectExpectedExports(filename);
    // Map: specifier -> className (for quick lookup)
    const expectedBySpecifier = new Map(expectedExports.map((e) => [e.specifier, e.className]));
    const expectedByClassName = new Map(expectedExports.map((e) => [e.className, e.specifier]));

    // Collect export declarations found in the file
    const foundExports: {
      node: TSESTree.ExportNamedDeclaration;
      className: string;
      specifier: string;
    }[] = [];

    return {
      ExportNamedDeclaration(node: TSESTree.ExportNamedDeclaration) {
        if (!node.source || node.source.type !== 'Literal') {
          return;
        }
        const specifier = node.source.value as string;
        const exportedName =
          node.specifiers.length === 1 && node.specifiers[0].exported.type === 'Identifier'
            ? node.specifiers[0].exported.name
            : null;

        if (!exportedName) {
          return;
        }

        foundExports.push({ node, className: exportedName, specifier });

        // Check: export exists in file but not on disk
        if (!expectedBySpecifier.has(specifier) && !expectedByClassName.has(exportedName)) {
          context.report({
            node,
            messageId: 'extraExport',
            data: { className: exportedName, specifier },
          });
        }
      },

      'Program:exit'(programNode: TSESTree.Program) {
        // Check: missing exports
        for (const expected of expectedExports) {
          const alreadyExported = foundExports.some(
            (f) => f.className === expected.className || f.specifier === expected.specifier,
          );
          if (!alreadyExported) {
            const exportLine = `export { ${expected.className} } from '${expected.specifier}';`;
            // Find alphabetical insertion point
            const afterNode = foundExports.find(
              (f) => f.className.localeCompare(expected.className) > 0,
            );

            context.report({
              node: programNode,
              messageId: 'missingExport',
              data: { className: expected.className, specifier: expected.specifier },
              fix: (fixer: TSESLint.RuleFixer) => {
                if (afterNode) {
                  return fixer.insertTextBefore(afterNode.node, `${exportLine}\n`);
                }
                // Append at end of file
                const lastToken = programNode.body.at(-1);
                if (lastToken) {
                  return fixer.insertTextAfter(
                    lastToken,
                    `\nexport { ${expected.className} } from '${expected.specifier}';`,
                  );
                }
                return fixer.insertTextAfterRange([0, 0], `${exportLine}\n`);
              },
            });
          }
        }

        // Check: exports are sorted alphabetically
        for (let i = 1; i < foundExports.length; i++) {
          const prev = foundExports[i - 1];
          const curr = foundExports[i];
          if (prev.className.localeCompare(curr.className) > 0) {
            context.report({
              node: curr.node,
              messageId: 'exportsNotSorted',
              data: { className: curr.className, before: prev.className },
              fix: (fixer: TSESLint.RuleFixer) => {
                const sourceCode = context.sourceCode;
                const sorted = [...foundExports].sort((a, b) =>
                  a.className.localeCompare(b.className),
                );
                return sorted.map((e, idx) =>
                  fixer.replaceText(foundExports[idx].node, sourceCode.getText(e.node)),
                );
              },
            });
            break; // one report is enough, fix sorts all
          }
        }
      },
    };
  },
});
