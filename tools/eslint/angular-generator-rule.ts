/* eslint-disable @typescript-eslint/no-unused-vars */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, relative } from 'node:path';
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

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Given a fileName, find the corresponding JS module from the custom-manifest
function getPairedModuleFromManifest(fileName: string): JavaScriptModule | undefined {
  const name = fileName.split('/').at(-1)!.replace(/.ts$/, '.js');
  return elementsManifest.modules.find(
    (module) => module.path.includes(name) && module.declarations && module.declarations.length > 0,
  );
}

const isPublicProperties: (e: ClassMember) => e is CustomElementField = (
  e: ClassMember,
): e is CustomElementField => e.privacy === 'public' && e.kind === 'field' && !e.static;
const isPublicMethod: (e: ClassMember) => e is ClassMethod = (e: ClassMember): e is ClassMethod =>
  e.privacy === 'public' && e.kind === 'method';
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
// const elementsExperimentalManifest = readManifest('lyne-elements-experimental');

const ngPackageConfig = JSON.stringify({ lib: { entryFile: 'index.ts' } });
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
// generateStructure(elementsManifest, join(root, 'src/angular'));
// generateStructure(elementsExperimentalManifest, join(root, 'src/angular-experimental'));

export default ESLintUtils.RuleCreator.withoutDocs({
  create(context) {
    return {
      Program(node: TSESTree.Program) {
        const module = getPairedModuleFromManifest(context.filename);
        if (!module) {
          return;
        }

        // FIXME check Component vs Directive - selector issue
        if (node.body.every((n) => n.type !== 'ImportDeclaration')) {
          context.report({
            node,
            messageId: 'angularMissingImport',
            data: { symbol: 'Component' },
            fix: (fixer) =>
              fixer.insertTextBefore(node, `import { Component } from '@angular/core';\n`),
          });
        }
        const classDeclaration = module.declarations!.find((e) => e.kind === 'class')!;
        const classSelector = toKebabCase(classDeclaration.name.replace(/Element$/, ''));
        const className = classDeclaration.name.replace(/Element$/, 'Component');

        if (
          node.body.every(
            (n) =>
              n.type !== 'ExportNamedDeclaration' ||
              !n.declaration ||
              n.declaration.type !== 'ClassDeclaration' ||
              n.declaration.id?.name !== className,
          )
        ) {
          context.report({
            node,
            messageId: 'angularMissingComponent',
            data: { className },
            fix: (fixer) =>
              fixer.insertTextAfter(
                node,
                `
@Component({
  selector: '${classSelector}',
  standalone: true,
  template: '<ng-template></ng-template>'
})
export class ${className} {
}`,
              ),
          });
        }
      },
      // can it be just `ClassDeclaration`?
      ['ClassDeclaration > Decorator[expression.callee.name="Component"]'](
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
          (e: Declaration): e is CustomElementDeclaration => e.kind === 'class',
        )!;
        const elementClassName = classManifestDeclaration.name;
        const publicProperties = classManifestDeclaration.members?.filter(isPublicProperties) ?? [];
        const publicMethods = classManifestDeclaration.members?.filter(isPublicMethod) ?? [];
        const publicGetters = classManifestDeclaration.members?.filter(isPublicGetter) ?? [];
        const publicEvents = classManifestDeclaration.events ?? [];

        // The Angular class being written on
        const classDeclaration = node.parent as unknown as TSESTree.ClassDeclaration;
        // FIXME
        // let hasBooleanAttributesToTransform = false;

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
                !context.sourceCode.getText(n.value).startsWith('inject(ElementRef'),
            )
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularMissingElementRef',
              fix: (fixer) => {
                const endOfBody = classDeclaration.body.range[1] - 1; // Get the position before the closing brace
                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `  #element = inject(ElementRef<${elementClassName}>);\n`,
                );
              },
            });
          }
          if (
            publicProperties.length &&
            classDeclaration.body.body.every(
              (n) =>
                n.type !== 'PropertyDefinition' ||
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
                  `  #ngZone = inject(NgZone);\n`,
                );
              },
            });
          }
        }

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
                let input = '@Input(';
                if (member.attribute && member.attribute.includes('-')) {
                  input += `{ alias: ${member.attribute} }`;
                }
                if (member.type) {
                  // FIXME
                  // hasBooleanAttributesToTransform = true;
                  if (member.type.text === 'boolean') {
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

        // TODO

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
            n.type === 'ImportDeclaration' && n.source.value === '@angular/core',
        );
        if (!angularCoreImport) {
          const imports = Array.from(expectedAngularImports).sort().join(', ');
          context.report({
            node: program,
            messageId: 'angularMissingImport',
            data: { symbol: imports },
            fix: (fixer) =>
              fixer.insertTextBefore(node, `import { ${imports} } from '@angular/core';\n`),
          });
        } else {
          const existingImports = angularCoreImport.specifiers.map(
            (s) => ((s as TSESTree.ImportSpecifier).imported as TSESTree.Identifier).name,
          );
          const importsToAdd = Array.from(expectedAngularImports).filter(
            (i) => !existingImports.includes(i),
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

        // RxJs imports
        if (expectedRxJsImports.size > 0) {
          const rxjsCoreImport = program.body.find(
            (n): n is TSESTree.ImportDeclaration =>
              n.type === 'ImportDeclaration' && n.source.value === 'rxjs',
          );
          if (!rxjsCoreImport) {
            const imports = Array.from(expectedRxJsImports).sort().join(', ');
            context.report({
              node: program,
              messageId: 'rxJsMissingImport',
              data: { symbol: imports },
              fix: (fixer) => fixer.insertTextBefore(node, `import { ${imports} } from 'rxjs';\n`),
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
              n.type !== 'ImportDeclaration' ||
              n.importKind !== 'type' ||
              n.source.value !== elementImport,
          )
        ) {
          const lastImport = program.body
            .filter((n) => n.type === 'ImportDeclaration' && n.specifiers.length)
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
              n.type !== 'ImportDeclaration' ||
              n.importKind !== 'value' ||
              n.source.value !== elementImport,
          )
        ) {
          const lastImport = program.body.filter((n) => n.type === 'ImportDeclaration').at(-1)!;
          context.report({
            node: lastImport,
            messageId: 'angularMissingImport',
            data: { symbol: 'element side effect' },
            fix: (fixer) => fixer.insertTextAfter(lastImport, `\nimport '${elementImport}';\n`),
          });
        }

        // FIXME
        // // booleanAttribute
        // if (
        //   hasBooleanAttributesToTransform &&
        //   program.body.every(
        //     (n) =>
        //       n.type !== 'ImportDeclaration' ||
        //       n.importKind !== 'value' ||
        //       n.source.value !== '@sbb-esta/lyne-angular/core',
        //   )
        // ) {
        //   const lastImport = program.body.filter((n) => n.type === 'ImportDeclaration').at(-1)!;
        //   context.report({
        //     node: lastImport,
        //     messageId: 'angularMissingImport',
        //     data: { symbol: 'booleanAttribute' },
        //     fix: (fixer) => fixer.insertTextAfter(lastImport, `\nimport { booleanAttribute } from '@sbb-esta/lyne-angular/core';`),
        //   });
        // }
      },
    };
  },
  meta: {
    docs: {
      description: 'Generate Angular code.',
    },
    messages: {
      angularMissingImport: 'Missing import {{ symbol }}',
      rxJsMissingImport: 'Missing import {{ symbol }}',
      angularMissingComponent: 'Missing class for {{ className }}',
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
