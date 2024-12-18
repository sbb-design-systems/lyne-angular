import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, join } from 'path';
import { fileURLToPath } from 'url';

import { AST_NODE_TYPES, ESLintUtils, type TSESTree } from '@typescript-eslint/utils';
import type {
  CustomElementDeclaration,
  Declaration,
  JavaScriptModule,
  Package,
} from 'custom-elements-manifest';

// Given a fileName, it finds the corresponding JS module from the custom-manifest
function getPairedModuleFromManifest(fileName: string): JavaScriptModule | undefined {
  const manifest = fileName.includes('angular-experimental')
    ? elementsExperimentalManifest
    : elementsManifest;
  const name = fileName
    .split('/')
    .at(-1)!
    .replace(/.spec.ts$/, '.js');
  return manifest.modules.find(
    (module) =>
      module.declarations &&
      module.declarations.length > 0 &&
      (module.path === name || module.path.includes(`/${name}`)),
  );
}

const root = fileURLToPath(new URL('../../', import.meta.url));
const readManifest = (name: string): Package =>
  JSON.parse(
    readFileSync(join(root, `/node_modules/@sbb-esta/${name}/custom-elements.json`), 'utf8'),
  );
const elementsManifest = readManifest('lyne-elements');
const elementsExperimentalManifest = readManifest('lyne-elements-experimental');

const generateStructure = (pkg: Package, projectPath: string) => {
  for (const module of pkg.modules) {
    if (
      module.declarations?.some(
        (d) => d.kind === 'class' && 'customElement' in d && d.customElement,
      )
    ) {
      const directoryPath = join(projectPath, module.path.replace(/.js$/, ''));
      const moduleName = basename(directoryPath);
      const modulePath = join(directoryPath, `${moduleName}.spec.ts`);
      if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
      }
      if (!existsSync(modulePath)) {
        writeFileSync(modulePath, '', 'utf8');
      }
    }
  }
};

generateStructure(elementsManifest, join(root, 'src/angular'));
generateStructure(elementsExperimentalManifest, join(root, 'src/angular-experimental'));

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      Program(node: TSESTree.Program) {
        const module = getPairedModuleFromManifest(context.filename);
        if (!module) {
          return;
        }

        const classManifestDeclaration = module.declarations!.find(
          (declaration: Declaration): declaration is CustomElementDeclaration =>
            declaration.kind === 'class' && /^(?!.*Base).*Element/.test(declaration.name),
        )! as CustomElementDeclaration & { classGenerics: string };
        const className = classManifestDeclaration.name.replace(/Element$/, 'Directive');

        if (node.body.every((n) => n.type !== AST_NODE_TYPES.ExpressionStatement)) {
          context.report({
            node,
            messageId: 'angularMissingDescribe',
            fix: (fixer) => {
              const filePath = context.filename
                .split('/')
                .at(-1)!
                .replace(/.spec.ts$/, '.js');
              return fixer.insertTextAfter(
                node,
                `import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ${className} } from './${filePath}';

describe('${className}', () => {
});
`,
              );
            },
          });
        }
      },
      ['CallExpression[callee.name="describe"] > ArrowFunctionExpression'](
        node: TSESTree.ArrowFunctionExpression,
      ) {
        const module = getPairedModuleFromManifest(context.filename);
        if (!module) {
          return;
        }
        const classManifestDeclaration = module.declarations!.find(
          (declaration: Declaration): declaration is CustomElementDeclaration =>
            declaration.kind === 'class' && /^(?!.*Base).*Element/.test(declaration.name),
        )! as CustomElementDeclaration & { classGenerics: string };
        const className = classManifestDeclaration.name.replace(/Element$/, 'Directive');
        const body = node.body as unknown as TSESTree.BlockStatement;

        if (
          body.body.every(
            (n) =>
              n.type !== AST_NODE_TYPES.VariableDeclaration ||
              n.declarations[0].id.type !== AST_NODE_TYPES.Identifier ||
              n.declarations[0].id.name !== 'component',
          )
        ) {
          context.report({
            node: node.body,
            messageId: 'angularMissingComponent',
            fix: (fixer) => {
              const endOfBody = body.range[1] - 1;
              return fixer.insertTextBeforeRange(
                [endOfBody, endOfBody],
                `  let component: ${className};\n`,
              );
            },
          });
        }

        if (
          body.body.every(
            (n) =>
              n.type !== AST_NODE_TYPES.VariableDeclaration ||
              n.declarations[0].id.type !== AST_NODE_TYPES.Identifier ||
              n.declarations[0].id.name !== 'fixture',
          )
        ) {
          context.report({
            node: node.body,
            messageId: 'angularMissingFixture',
            fix: (fixer) => {
              const endOfBody = body.range[1] - 1;
              return fixer.insertTextBeforeRange(
                [endOfBody, endOfBody],
                `  let fixture: ComponentFixture<${className}>;\n`,
              );
            },
          });
        }

        if (
          body.body.every(
            (n) =>
              n.type !== AST_NODE_TYPES.ExpressionStatement ||
              n.expression.type !== AST_NODE_TYPES.CallExpression ||
              n.expression.callee.type !== AST_NODE_TYPES.Identifier ||
              n.expression.callee.name !== 'beforeEach',
          )
        ) {
          context.report({
            node: node.body,
            messageId: 'angularMissingBeforeEach',
            fix: (fixer) => {
              const endOfBody = body.range[1] - 1;
              return fixer.insertTextBeforeRange(
                [endOfBody, endOfBody],
                `
  beforeEach(() => {
    fixture = TestBed.createComponent(${className});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
`,
              );
            },
          });
        }

        if (
          body.body.every(
            (n) =>
              n.type !== AST_NODE_TYPES.ExpressionStatement ||
              n.expression.type !== AST_NODE_TYPES.CallExpression ||
              n.expression.callee.type !== AST_NODE_TYPES.Identifier ||
              n.expression.callee.name !== 'it' ||
              n.expression.arguments[0].type !== AST_NODE_TYPES.Literal ||
              n.expression.arguments[0].value !== 'should create',
          )
        ) {
          context.report({
            node: node.body,
            messageId: 'angularMissingDefaultItBlock',
            fix: (fixer) => {
              const endOfBody = body.range[1] - 1;
              return fixer.insertTextBeforeRange(
                [endOfBody, endOfBody],
                `
  it('should create', () => {
    expect(component).toBeTruthy();
  });
`,
              );
            },
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Generate Angular tests code for Lyne elements.',
    },
    messages: {
      angularMissingDescribe: 'Missing test suite',
      angularMissingComponent: 'Missing `component` variable declaration',
      angularMissingFixture: 'Missing `fixture` variable declaration',
      angularMissingBeforeEach: 'Missing `beforeEach` block',
      angularMissingDefaultItBlock: 'Missing default `it` block',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
