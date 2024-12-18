import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, relative } from 'node:path';
import { basename, join } from 'path';
import { fileURLToPath } from 'url';

import {
  AST_NODE_TYPES,
  AST_TOKEN_TYPES,
  ESLintUtils,
  type TSESTree,
} from '@typescript-eslint/utils';
import type {
  ClassMember,
  ClassMethod,
  CustomElementDeclaration,
  CustomElementField,
  Declaration,
  JavaScriptModule,
  Package,
} from 'custom-elements-manifest';

// A list of native DOM events used in @lyne-elements that need an alias.
const NATIVE_EVENTS_NAME: string[] = ['change', 'input', 'error', 'load'];

// Converts camelCase to kebab-case
function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Given a fileName, it finds the corresponding JS module from the custom-manifest
function getPairedModuleFromManifest(fileName: string): JavaScriptModule | undefined {
  const manifest = fileName.includes('angular-experimental')
    ? elementsExperimentalManifest
    : elementsManifest;
  const name = fileName.split('/').at(-1)!.replace(/.ts$/, '.js');
  return manifest.modules.find(
    (module) =>
      module.declarations &&
      module.declarations.length > 0 &&
      (module.path === name || module.path.includes(`/${name}`)),
  );
}

// Finds the public properties
const isPublicProperties: (e: ClassMember) => e is CustomElementField = (
  e: ClassMember,
): e is CustomElementField =>
  e.privacy === 'public' && e.kind === 'field' && !e.static && !e.readonly;
// Finds the public methods
const isPublicMethod: (e: ClassMember) => e is ClassMethod = (e: ClassMember): e is ClassMethod =>
  e.privacy === 'public' && e.kind === 'method';
// Finds the public getters: readonly is used from CEM to mark getters
const isPublicGetter: (e: ClassMember) => e is CustomElementField = (
  e: ClassMember,
): e is CustomElementField =>
  e.privacy === 'public' && e.kind === 'field' && !e.static && !!e.readonly;

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
      const modulePath = join(directoryPath, `${moduleName}.ts`);
      if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
      }
      const ngPackagePath = join(directoryPath, 'ng-package.json');
      if (!existsSync(ngPackagePath)) {
        const ngPackageConfig = `{\n  "lib": {\n    "entryFile": "index.ts"\n  }\n}\n`;
        writeFileSync(ngPackagePath, ngPackageConfig, 'utf8');
      }
      const indexPath = join(directoryPath, 'index.ts');
      if (!existsSync(indexPath)) {
        writeFileSync(indexPath, `export * from './${moduleName}';\n`, 'utf8');
      }
      if (!existsSync(modulePath)) {
        writeFileSync(modulePath, '', 'utf8');
      }
    }
  }
};

// TODO: Enable
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
        const classDeclaration = module.declarations!.find(
          (declaration) =>
            declaration.kind === 'class' && /^(?!.*Base).*Element/.test(declaration.name),
        )! as CustomElementDeclaration & { classGenerics: string };

        // Disable the eslint rule for the component name.
        if (
          node.comments?.every(
            (comment) =>
              comment.type === AST_TOKEN_TYPES.Block &&
              !comment.value.includes('directive-selector'),
          )
        ) {
          context.report({
            node,
            messageId: 'eslintMissingDisableDirectiveRule',
            fix: (fixer) =>
              fixer.insertTextBeforeRange(
                [node.range[0], node.range[0]],
                `/* eslint-disable @angular-eslint/directive-selector */\n`,
              ),
          });
        }

        if (node.body.every((n) => n.type !== AST_NODE_TYPES.ImportDeclaration)) {
          context.report({
            node,
            messageId: 'angularMissingImport',
            data: { symbol: 'Directive' },
            fix: (fixer) =>
              fixer.insertTextAfterRange(
                [node.range[1] - 1, node.range[1] - 1],
                `import { Directive } from '@angular/core';\n`,
              ),
          });
        }

        const classSelector = toKebabCase(classDeclaration.name.replace(/Element$/, ''));
        const className = classDeclaration.name.replace(/Element$/, 'Directive');

        if (
          node.body.every(
            (n) =>
              n.type !== AST_NODE_TYPES.ExportNamedDeclaration ||
              !n.declaration ||
              n.declaration.type !== AST_NODE_TYPES.ClassDeclaration ||
              n.declaration.id?.name !== className,
          )
        ) {
          context.report({
            node,
            messageId: 'angularMissingDirective',
            data: { className },
            fix: (fixer) =>
              fixer.insertTextAfter(
                node,
                `@Directive({
  selector: '${classSelector}',
  standalone: true,
})
export class ${className}${classDeclaration.classGenerics ? `<${classDeclaration.classGenerics}>` : ''} {
}`,
              ),
          });
        }
      },
      ['ClassDeclaration > Decorator[expression.callee.name="Directive"]'](
        node: TSESTree.Decorator,
      ) {
        const module = getPairedModuleFromManifest(context.filename);
        if (!module) {
          return;
        }

        const expectedAngularImports = new Set<string>();
        const expectedRxJsImports = new Set<string>();

        // The class and its public data that must be created in the Angular file
        const classManifestDeclaration = module.declarations!.find(
          (decl: Declaration): decl is CustomElementDeclaration =>
            decl.kind === 'class' && decl.name.includes('Element'),
        )! as CustomElementDeclaration & { classGenerics: string };
        const elementClassName = classManifestDeclaration.name;
        const publicProperties = classManifestDeclaration.members?.filter(isPublicProperties) ?? [];
        const publicEvents = classManifestDeclaration.events ?? [];
        const publicGetters = classManifestDeclaration.members?.filter(isPublicGetter) ?? [];
        const publicMethods = classManifestDeclaration.members?.filter(isPublicMethod) ?? [];

        // The Angular class being written on
        const classDeclaration = node.parent as unknown as TSESTree.ClassDeclaration;
        let hasBooleanAttributesToTransform = false;

        // Add imports related to inputs and outputs properties
        if (publicProperties.length) {
          expectedAngularImports.add('Input').add('NgZone');
        }
        if (publicEvents.length) {
          expectedAngularImports.add('Output');
          expectedRxJsImports.add('fromEvent').add('type Observable');
        }
        // Add the private variables for the native element and the ngZone
        if (
          publicProperties.length ||
          publicMethods.length ||
          publicGetters.length ||
          publicEvents.length
        ) {
          expectedAngularImports.add('ElementRef').add('inject');
          if (
            classDeclaration.body.body.every(
              (n) =>
                n.type !== AST_NODE_TYPES.PropertyDefinition ||
                !n.value ||
                !context.sourceCode
                  .getText(n.value)
                  .replace(/[\n\s]+/g, '')
                  .startsWith('inject(ElementRef'),
            )
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingElementRef',
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1;
                const genericType = classManifestDeclaration.classGenerics
                  ? `<${classManifestDeclaration.classGenerics.replace(/=.+/, '').trim()}>`
                  : '';
                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `  #element: ElementRef<${elementClassName}${genericType}> = inject(ElementRef<${elementClassName}${genericType}>);\n`,
                );
              },
            });
          }
          if (
            publicProperties.length &&
            classDeclaration.body.body.every(
              (n) =>
                n.type !== AST_NODE_TYPES.PropertyDefinition ||
                !n.value ||
                !context.sourceCode.getText(n.value).startsWith('inject(NgZone'),
            )
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingNgZone',
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1;
                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `  #ngZone: NgZone = inject(NgZone);\n`,
                );
              },
            });
          }
        }

        // Add properties
        for (const member of publicProperties) {
          if (
            classDeclaration.body.body.every((n) => {
              return (
                n.type !== AST_NODE_TYPES.MethodDefinition ||
                n.kind !== 'set' ||
                context.sourceCode.getText(n.key) !== member.name ||
                !context.sourceCode.getText(n).includes('@Input(')
              );
            })
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingInput',
              data: { property: member.name },
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1;
                const hasAttribute = member.attribute && member.attribute.includes('-');
                let input = hasAttribute
                  ? `// eslint-disable-next-line @angular-eslint/no-input-rename\n  @Input(`
                  : '@Input(';
                if (member.attribute && member.attribute.includes('-')) {
                  input += `{ alias: '${member.attribute}' }`;
                }
                if (member.type) {
                  if (member.type.text === 'boolean') {
                    hasBooleanAttributesToTransform = true;
                    if (input.includes('alias')) {
                      input = input.replace(`}`, `, transform: booleanAttribute }`);
                    } else {
                      input += `{ transform: booleanAttribute }`;
                    }
                  } else if (member.type.text === 'number') {
                    expectedAngularImports.add('numberAttribute');
                    if (input.includes('alias')) {
                      input = input.replace(`}`, `, transform: numberAttribute }`);
                    } else {
                      input += `{ transform: numberAttribute }`;
                    }
                  }
                }
                input += `)`;

                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `
  ${input}
  public set ${member.name}(value: ${member.type?.text ?? 'any'}) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.${member.name} = value));
  }
  public get ${member.name}(): ${member.type?.text ?? 'any'} {
    return this.#element.nativeElement.${member.name};
  }\n`,
                );
              },
            });
          }
        }

        // Add outputs
        for (const member of publicEvents) {
          const hasPropWithSameName = publicProperties.find((prop) => prop.name === member.name);
          const memberNameVariable = hasPropWithSameName ? `${member.name}Event` : member.name;
          if (
            classDeclaration.body.body.every((n) => {
              return (
                n.type !== AST_NODE_TYPES.PropertyDefinition ||
                context.sourceCode.getText(n.key) !== memberNameVariable ||
                !context.sourceCode.getText(n).includes('@Output(')
              );
            })
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingOutput',
              data: { property: member.name },
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1;
                const type = member.type?.text.replace(/CustomEvent<([^>]+)>/g, '$1') ?? 'void';
                let eslintDisableRule = '';
                if (NATIVE_EVENTS_NAME.includes(member.name)) {
                  if (hasPropWithSameName) {
                    eslintDisableRule = `// eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native\n  `;
                  } else {
                    eslintDisableRule =
                      '// eslint-disable-next-line @angular-eslint/no-output-native\n  ';
                  }
                }
                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `
  ${eslintDisableRule}@Output(${hasPropWithSameName ? `'${member.name}'` : ''}) public ${memberNameVariable}: Observable<${type}> = fromEvent<${type}>(this.#element.nativeElement, '${member.name}');\n`,
                );
              },
            });
          }
        }

        // Add get method
        for (const member of publicGetters) {
          if (
            classDeclaration.body.body.every((n) => {
              return (
                n.type !== AST_NODE_TYPES.MethodDefinition ||
                context.sourceCode.getText(n.key) !== member.name
              );
            })
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingMethod',
              data: { method: member.name },
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1;
                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `
  public get ${member.name}(): ${member.type?.text ?? ``} {
    return this.#element.nativeElement.${member.name};
  }\n`,
                );
              },
            });
          }
        }

        // Add methods
        for (const member of publicMethods) {
          if (
            classDeclaration.body.body.every((n) => {
              return (
                n.type !== AST_NODE_TYPES.MethodDefinition ||
                context.sourceCode.getText(n.key) !== member.name
              );
            })
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingMethod',
              data: { method: member.name },
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1;
                const methodParam = member.parameters
                  ?.map((e) => `${e.name}: ${e.type?.text}`)
                  .join(', ');
                const methodArguments = member.parameters?.map((param) => param.name).join(', ');
                const disableAnyType =
                  member.parameters?.some((param) => param.type?.text === 'any') ||
                  member.return?.type?.text === 'any'
                    ? '\n  // eslint-disable-next-line @typescript-eslint/no-explicit-any'
                    : '';
                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `${disableAnyType}
  public ${member.name}(${methodParam ?? ``}): ${member.return?.type?.text ?? ``} {
    return this.#element.nativeElement.${member.name}(${methodArguments ?? ``});
  }\n`,
                );
              },
            });
          }
        }

        // Add other imports
        const program = context.sourceCode.ast;
        const elementPath = relative(root, dirname(context.filename)).replace(
          'src/angular',
          'elements',
        );
        const elementImport = `@sbb-esta/lyne-${elementPath}.js`;

        // Angular imports
        const angularCoreImport = program.body.find(
          (n): n is TSESTree.ImportDeclaration =>
            n.type === AST_NODE_TYPES.ImportDeclaration && n.source.value === '@angular/core',
        );
        if (!angularCoreImport) {
          const imports = Array.from(expectedAngularImports).sort().join(', ');
          context.report({
            node: program,
            messageId: 'angularMissingImport',
            data: { symbol: imports },
            fix: (fixer) =>
              fixer.insertTextBefore(node, `\nimport { ${imports} } from '@angular/core';\n`),
          });
        } else {
          const existingImports = angularCoreImport.specifiers.map(
            (spec) => ((spec as TSESTree.ImportSpecifier).imported as TSESTree.Identifier).name,
          );
          const importsToAdd = Array.from(expectedAngularImports).filter(
            (importName) => !existingImports.includes(importName),
          );
          if (importsToAdd.length > 0) {
            const imports = importsToAdd.sort().join(', ');
            context.report({
              node: angularCoreImport,
              messageId: 'angularMissingImport',
              data: { symbol: imports },
              fix: (fixer) =>
                fixer.insertTextAfter(angularCoreImport.specifiers.at(-1)!, `, ${imports}`),
            });
          }
        }

        // booleanAttribute
        if (
          hasBooleanAttributesToTransform &&
          program.body.every(
            (n) =>
              n.type !== AST_NODE_TYPES.ImportDeclaration ||
              n.importKind !== 'value' ||
              n.source.value !== '@sbb-esta/lyne-angular/core',
          )
        ) {
          const lastImport = program.body
            .filter((n) => n.type === AST_NODE_TYPES.ImportDeclaration)
            .at(-1)!;
          context.report({
            node: lastImport,
            messageId: 'angularMissingImport',
            data: { symbol: 'booleanAttribute' },
            fix: (fixer) =>
              fixer.insertTextAfter(
                lastImport,
                `\nimport { booleanAttribute } from '@sbb-esta/lyne-angular/core';`,
              ),
          });
        }

        // RxJs imports
        if (expectedRxJsImports.size > 0) {
          const rxjsCoreImport = program.body.find(
            (n): n is TSESTree.ImportDeclaration =>
              n.type === AST_NODE_TYPES.ImportDeclaration && n.source.value === 'rxjs',
          );
          if (!rxjsCoreImport) {
            const imports = Array.from(expectedRxJsImports).sort().join(', ');
            const lastImport = program.body
              .filter((n) => n.type === AST_NODE_TYPES.ImportDeclaration)
              .at(-1)!;
            context.report({
              node: program,
              messageId: 'rxJsMissingImport',
              data: { symbol: imports },
              fix: (fixer) =>
                fixer.insertTextAfter(lastImport, `\nimport { ${imports} } from 'rxjs';`),
            });
          } else {
            const existingImports = rxjsCoreImport.specifiers.map((s) =>
              (s as TSESTree.ImportSpecifier).importKind === 'type'
                ? `${(s as TSESTree.ImportSpecifier).importKind} ${((s as TSESTree.ImportSpecifier).imported as TSESTree.Identifier).name}`
                : ((s as TSESTree.ImportSpecifier).imported as TSESTree.Identifier).name,
            );
            const importsToAdd = Array.from(expectedRxJsImports).filter(
              (i) => !existingImports.includes(i),
            );
            if (importsToAdd.length > 0) {
              const imports = importsToAdd.sort().join(', ');
              context.report({
                node: rxjsCoreImport,
                messageId: 'rxJsMissingImport',
                data: { symbol: imports },
                fix: (fixer) =>
                  fixer.insertTextAfter(rxjsCoreImport.specifiers.at(-1)!, `, ${imports}`),
              });
            }
          }
        }

        // Lyne element class
        if (
          expectedAngularImports.has('ElementRef') &&
          program.body.every(
            (n) =>
              n.type !== AST_NODE_TYPES.ImportDeclaration ||
              n.importKind !== 'type' ||
              n.source.value !== elementImport,
          )
        ) {
          const lastImport = program.body
            .filter((n) => n.type === AST_NODE_TYPES.ImportDeclaration && n.specifiers.length)
            .at(-1)!;
          context.report({
            node: lastImport,
            messageId: 'angularMissingImport',
            data: { symbol: elementClassName },
            fix: (fixer) =>
              fixer.insertTextAfter(
                lastImport,
                `\nimport type { ${elementClassName} } from '${elementImport}';`,
              ),
          });
        }

        // Lyne element
        if (
          program.body.every(
            (n) =>
              n.type !== AST_NODE_TYPES.ImportDeclaration ||
              n.importKind !== 'value' ||
              n.source.value !== elementImport,
          )
        ) {
          const lastImport = program.body
            .filter((n) => n.type === AST_NODE_TYPES.ImportDeclaration)
            .at(-1)!;
          context.report({
            node: lastImport,
            messageId: 'angularMissingImport',
            data: { symbol: 'element side effect' },
            fix: (fixer) => fixer.insertTextAfter(lastImport, `\nimport '${elementImport}';`),
          });
        }
      },
    };
  },
  meta: {
    docs: {
      description: 'Generate Angular code for Lyne elements.',
    },
    messages: {
      eslintMissingDisableDirectiveRule: 'Missing eslint disable rule for directive-selector',
      angularMissingImport: 'Missing import {{ symbol }}',
      rxJsMissingImport: 'Missing import {{ symbol }}',
      angularMissingDirective: 'Missing class for {{ className }}',
      angularMissingElementRef: 'Missing ElementRef property',
      angularMissingNgZone: 'Missing NgZone property',
      angularMissingInput: 'Missing input for property {{ property }}',
      angularMissingOutput: 'Missing output for property {{ property }}',
      angularMissingMethod: 'Missing output for method {{ method }}',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
