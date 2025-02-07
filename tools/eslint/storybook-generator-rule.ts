import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, relative } from 'node:path';
import { basename, join } from 'path';
import { fileURLToPath } from 'url';

import { AST_NODE_TYPES, ESLintUtils, type TSESTree } from '@typescript-eslint/utils';
import type { CustomElementDeclaration, JavaScriptModule, Package } from 'custom-elements-manifest';

// Given a fileName, it finds the corresponding JS module from the custom-manifest
function getPairedModuleFromManifest(fileName: string): JavaScriptModule | undefined {
  const manifest = fileName.includes('angular-experimental')
    ? elementsExperimentalManifest
    : elementsManifest;
  const name = fileName
    .split('/')
    .at(-1)!
    .replace(/.stories.ts$/, '.js');
  return manifest.modules.find(
    (module) =>
      module.declarations &&
      module.declarations.length > 0 &&
      (module.path === name || module.path.includes(`/${name}`)),
  );
}

// Converts camelCase to kebab-case
function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const root = fileURLToPath(new URL('../../', import.meta.url));
const readManifest = (name: string): Package =>
  JSON.parse(
    readFileSync(join(root, `/node_modules/@sbb-esta/${name}/custom-elements.json`), 'utf8'),
  );
const elementsManifest = readManifest('lyne-elements');
const elementsExperimentalManifest = readManifest('lyne-elements-experimental');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateStructure = (pkg: Package, projectPath: string) => {
  for (const module of pkg.modules) {
    if (
      module.declarations?.some(
        (d) => d.kind === 'class' && 'customElement' in d && d.customElement,
      )
    ) {
      const directoryPath = join(projectPath, module.path.replace(/.js$/, ''));
      const moduleName = basename(directoryPath);
      const modulePath = join(directoryPath, `${moduleName}.stories.ts`);
      if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
      }
      if (!existsSync(modulePath)) {
        writeFileSync(modulePath, '', 'utf8');
      }
    }
  }
};

// generateStructure(elementsManifest, join(root, 'src/showcase/stories/angular'));
// generateStructure(
//   elementsExperimentalManifest,
//   join(root, 'src/showcase/stories/angular-experimental'),
// );

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      Program(node: TSESTree.Program) {
        const sourceFilename = context.filename.replace('/src/showcase/stories', '');
        const module = getPairedModuleFromManifest(sourceFilename);
        if (!module) {
          return;
        }
        const classDeclaration = module.declarations!.find(
          (declaration) =>
            declaration.kind === 'class' && /^(?!.*Base).*Element/.test(declaration.name),
        )! as CustomElementDeclaration & { classGenerics: string };
        const element = classDeclaration.name.replace(/Element$/, '');
        const classSelector = toKebabCase(classDeclaration.name.replace(/Element$/, ''));
        const storyFolder = context.filename.includes('experimental') ? 'experimental' : 'elements';
        const template = `\`<${classSelector} \${spreadArgs(args)}></${classSelector}>\``;
        const elementPath = relative(root, dirname(context.filename)).replace(
          'src/showcase/stories/',
          '@sbb-esta/lyne-',
        );

        if (node.body.every((n) => n.type !== AST_NODE_TYPES.ImportDeclaration)) {
          context.report({
            node,
            messageId: 'storybookMissingImport',
            fix: (fixer) =>
              fixer.insertTextAfterRange(
                [node.range[1] - 1, node.range[1] - 1],
                `import { ${element} } from '${elementPath}'
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, moduleMetadata } from '@storybook/angular';
`,
              ),
          });
        }

        if (node.body.every((n) => n.type !== AST_NODE_TYPES.ExportDefaultDeclaration)) {
          context.report({
            node,
            messageId: 'storybookMissingMeta',
            fix: (fixer) =>
              fixer.insertTextAfter(
                node,
                `
const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      // add slotted components or remove
      imports: []
    })
  ],
  title: '${storyFolder}/${classSelector}',
  component: ${element},
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] }
  },
  // render via template is needed due to the directive implementation
  render: ({ ...args }) => ({
    prop: { ...args },
    template: ${template}
  })
};
export default meta;
`,
              ),
          });
        }

        if (node.body.every((n) => n.type !== AST_NODE_TYPES.ExportNamedDeclaration)) {
          context.report({
            node,
            messageId: 'storybookMissingDefaultStory',
            fix: (fixer) =>
              fixer.insertTextAfter(
                node,
                `
export const Default = {};
`,
              ),
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Generate stories for Angular Lyne components.',
    },
    messages: {
      storybookMissingImport: 'Missing imports',
      storybookMissingMeta: 'Missing stories meta object',
      storybookMissingDefaultStory: 'Missing default story',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
