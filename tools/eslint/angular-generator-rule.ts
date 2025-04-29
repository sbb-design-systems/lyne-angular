import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, relative, resolve } from 'node:path';
import { basename, join } from 'path';
import { fileURLToPath } from 'url';

import { AST_NODE_TYPES, ESLintUtils, type TSESTree } from '@typescript-eslint/utils';
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
  const name = fileName.split('/').slice(-2).join('/').replace(/.ts$/, '.js');
  return manifest.modules.find(
    (module) =>
      module.declarations &&
      module.declarations.length > 0 &&
      (module.path === name || module.path.includes(`/${name}`)),
  );
}

function getClassManifestDeclaration(
  module: JavaScriptModule,
): CustomElementDeclaration & { classGenerics: string } {
  return module.declarations!.find(
    (declaration: Declaration): declaration is CustomElementDeclaration =>
      declaration.kind === 'class' && /^(?!.*Base).*Element/.test(declaration.name),
  )! as CustomElementDeclaration & { classGenerics: string };
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
      const directoryPath = dirname(join(projectPath, module.path));
      const moduleName = basename(directoryPath);
      const modulePath = join(directoryPath, `${moduleName}.ts`);
      const testPath = join(directoryPath, `${moduleName}.spec.ts`);
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
      if (!existsSync(testPath)) {
        const testTemplate = readFileSync(
          resolve(process.cwd(), './tools/eslint/test-template.ts'),
          'utf-8',
        );

        writeFileSync(
          testPath,
          testTemplate
            .replaceAll('__name__', `sbb-${moduleName}`)
            .replaceAll(
              '__className__',
              getClassManifestDeclaration(module).name.replace('Element', ''),
            )
            .replaceAll('__angularPath__', `./${moduleName}`),
          'utf8',
        );
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
        const classDeclaration = getClassManifestDeclaration(module);

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
        const className = classDeclaration.name.replace(/Element$/, '');

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
        const classManifestDeclaration = getClassManifestDeclaration(module);
        const elementClassName = classManifestDeclaration.name;
        const publicProperties = classManifestDeclaration.members?.filter(isPublicProperties) ?? [];
        const publicEvents = classManifestDeclaration.events ?? [];
        const publicGetters = classManifestDeclaration.members?.filter(isPublicGetter) ?? [];
        const publicMethods =
          classManifestDeclaration.members
            ?.filter(isPublicMethod)
            .filter((m) => !m.name.endsWith('Callback')) ?? [];

        // The Angular class being written on
        const classDeclaration = node.parent as unknown as TSESTree.ClassDeclaration;
        let hasBooleanAttributesToTransform = false;

        // Add imports related to inputs and outputs properties
        if (publicProperties.length) {
          expectedAngularImports.add('Input').add('NgZone');
        }
        if (publicEvents.length) {
          expectedAngularImports.add('Output');
          expectedRxJsImports.add('fromEvent').add('NEVER').add('type Observable');
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
            classDeclaration.body.body.every(
              (n) =>
                n.type !== AST_NODE_TYPES.MethodDefinition ||
                n.kind !== 'set' ||
                context.sourceCode.getText(n.key) !== member.name ||
                !context.sourceCode.getText(n).includes('@Input('),
            )
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingInput',
              data: { property: member.name },
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1;
                let input = '@Input(';
                if (member.type?.text === 'boolean') {
                  hasBooleanAttributesToTransform = true;
                  input += `{ transform: booleanAttribute }`;
                }
                if (member.type?.text === 'number') {
                  expectedAngularImports.add('numberAttribute');
                  input += `{ transform: numberAttribute }`;
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
          const type = member.type?.text ?? 'Event';
          if (
            classDeclaration.body.body.every(
              (n) =>
                n.type !== AST_NODE_TYPES.PropertyDefinition ||
                context.sourceCode.getText(n.key) !== `_${member.name}` ||
                !context.sourceCode.getText(n).includes(`@Output('${member.name}')`),
            )
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingOutput',
              data: { property: member.name },
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1;
                const eslintDisableRule = NATIVE_EVENTS_NAME.includes(member.name)
                  ? `// eslint-disable-next-line @angular-eslint/no-output-native`
                  : '';

                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `
  ${eslintDisableRule}
  @Output('${member.name}') protected _${member.name}: (typeof this)['${memberNameVariable}'] = NEVER;`,
                );
              },
            });
          }
          if (
            classDeclaration.body.body.every(
              (n) =>
                n.type !== AST_NODE_TYPES.PropertyDefinition ||
                context.sourceCode.getText(n.key) !== memberNameVariable,
            )
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingOutput',
              data: { property: member.name },
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1;
                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `
  public ${memberNameVariable}: Observable<${type}> = fromEvent<${type}>(this.#element.nativeElement, '${member.name}');\n`,
                );
              },
            });
          }

          // Check if output types are corresponding to manifest
          if (
            classDeclaration.body.body.every(
              (n) =>
                n.type !== AST_NODE_TYPES.PropertyDefinition ||
                context.sourceCode.getText(n.key) !== memberNameVariable ||
                !context.sourceCode
                  .getText(n)
                  .replace(/\s+/g, '')
                  .includes(`Observable<${type}>`.replace(/\s+/g, '')) ||
                !context.sourceCode
                  .getText(n)
                  .replace(/\s+/g, '')
                  .includes(`fromEvent<${type}>`.replace(/\s+/g, '')),
            )
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularWrongOutputType',
              data: { property: member.name },
            });
          }
        }

        // Add get method
        for (const member of publicGetters) {
          if (
            classDeclaration.body.body.every(
              (n) =>
                n.type !== AST_NODE_TYPES.MethodDefinition ||
                context.sourceCode.getText(n.key) !== member.name,
            )
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
            classDeclaration.body.body.every(
              (n) =>
                n.type !== AST_NODE_TYPES.MethodDefinition ||
                context.sourceCode.getText(n.key) !== member.name,
            )
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
      angularMissingImport: 'Missing import {{ symbol }}',
      rxJsMissingImport: 'Missing import {{ symbol }}',
      angularMissingDirective: 'Missing class for {{ className }}',
      angularMissingElementRef: 'Missing ElementRef property',
      angularMissingNgZone: 'Missing NgZone property',
      angularMissingInput: 'Missing input for property {{ property }}',
      angularMissingOutput: 'Missing output for property {{ property }}',
      angularMissingMethod: 'Missing output for method {{ method }}',
      angularWrongOutputType: 'Output type differy from manifest for property {{ property }}',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
