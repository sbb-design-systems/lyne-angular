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

const CAMEL_CASE_EVENTS_MAP: Record<string, string> = {
  beforeclose: 'beforeClose',
  beforeopen: 'beforeOpen',
  beforestick: 'beforeStick',
  beforeunstick: 'beforeUnstick',
  chipinputtokenend: 'chipInputTokenEnd',
  dateselected: 'dateSelected',
  didChange: 'didChange',
  filechanged: 'fileChanged',
  focuscoach: 'focusCoach',
  optionselected: 'optionSelected',
  optionselectionchange: 'optionSelectionChange',
  selectcoach: 'selectCoach',
  selectedcoach: 'selectedCoach',
  selectplace: 'selectPlace',
  selectedplaces: 'selectedPlaces',
  tabchange: 'tabChange',
  toggleexpanded: 'toggleExpanded',
};

// Converts camelCase to kebab-case
function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Given a fileName, it finds the corresponding JS module from the custom-manifest
function getPairedModuleFromManifest(fileName: string): JavaScriptModule | undefined {
  const manifest = fileName.includes('angular-experimental')
    ? elementsExperimentalManifest
    : elementsManifest;
  const name = fileName.split('/').slice(-2).join('/').replace(/.ts$/, '.component.js');
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

        const indexPath = join(directoryPath, 'index.ts');
        const commonIndexPath = join(directoryPath, '..', 'index.ts');
        const hasCommonModule = existsSync(commonIndexPath);
        const ngPackagePath = join(directoryPath, 'ng-package.json');

        // Only add ng-package.json and index.ts if the module is not already in the common index
        if (!existsSync(ngPackagePath) && !hasCommonModule) {
          const ngPackageConfig = `{\n  "lib": {\n    "entryFile": "index.ts"\n  }\n}\n`;
          writeFileSync(ngPackagePath, ngPackageConfig, 'utf8');
        }
        if (!existsSync(indexPath) && !hasCommonModule) {
          writeFileSync(indexPath, `export * from './${moduleName}';\n`, 'utf8');
        }

        // If there is a common index, we need to add the export statement for the new module
        // And we need to update the *.module.ts file
        if (hasCommonModule) {
          // Edit index.ts in the common directory
          const indexContent = readFileSync(commonIndexPath, 'utf8');
          if (!indexContent.includes(`./${moduleName}`)) {
            const indexLines = indexContent.split('\n').filter((line) => line.trim() !== '');
            indexLines.push(`export * from './${moduleName}/${moduleName}';`);
            // Sort exports alphabetically, but keep the *.module.ts at the end
            indexLines.sort((a, b) => {
              if (a.includes('.module') && !b.includes('.module')) {
                return 1; // a is a module, b is not
              }
              if (!a.includes('.module') && b.includes('.module')) {
                return -1; // b is a module, a is not
              }
              return a.localeCompare(b); // both are not modules, sort alphabetically
            });

            // Write the updated content back to the index.ts
            writeFileSync(commonIndexPath, `${indexLines.join('\n')}\n`, 'utf8');
          }

          // Add the class to the angular.module.ts if it does not exist
          const modulePath = join(directoryPath, '..');
          const angularModulePath = join(modulePath, `${modulePath.split('/').pop()}.module.ts`);

          if (existsSync(angularModulePath)) {
            let angularModuleContent = readFileSync(angularModulePath, 'utf8');
            const className = getClassManifestDeclaration(module).name.replace('Element', '');

            const importLine = `import { ${className} } from './${moduleName}/${moduleName}';`;

            // Read the existing imports and alphabetically add the new import
            if (!angularModuleContent.includes(`import { ${className} }`)) {
              const existingImports = angularModuleContent
                .split('\n')
                .filter((line) => line.trim().startsWith('import {'))
                .map((line) => line.trim());
              existingImports.push(importLine);
              existingImports.sort();

              const newImportSection = existingImports.join('\n') + '\n';

              const remainingSection = angularModuleContent
                .split('\n')
                .filter((line) => !line.trim().startsWith('import {'))
                .join('\n');
              angularModuleContent = `${newImportSection}${remainingSection}`;
            }

            // Read the existing module array and alphabetically add the new class
            const exportedModulesRegex = /export const (Sbb\w+Module) = \[(.*?)\] as const;/s;
            const exportedDeclarationsMatch = angularModuleContent.match(exportedModulesRegex);

            if (exportedDeclarationsMatch) {
              const exportModuleName = exportedDeclarationsMatch[1];
              const exportedDeclarations = exportedDeclarationsMatch[2]
                .split(',')
                .map((d) => d.trim())
                .filter((d) => d !== '');

              if (!exportedDeclarations.includes(className)) {
                exportedDeclarations.push(className);
                exportedDeclarations.sort();
                angularModuleContent = angularModuleContent.replace(
                  exportedModulesRegex,
                  `export const ${exportModuleName} = [\n  ${exportedDeclarations.join(',\n  ')},\n] as const;\n`,
                );
              }
            }

            writeFileSync(angularModulePath, angularModuleContent, 'utf8');
          }
        }
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
  exportAs: '${className.charAt(0).toLowerCase()}${className.slice(1)}',
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
        const expectedRxJsInteropImports = new Set<string>();
        const expectedCoreImports = new Set<string>();

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

        // Add imports related to inputs and outputs properties
        if (publicProperties.length) {
          expectedAngularImports.add('Input').add('NgZone');
        }
        if (publicEvents.length) {
          expectedRxJsImports.add('fromEvent');
          expectedRxJsInteropImports.add('outputFromObservable');
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
                  expectedCoreImports.add('booleanAttribute');
                  input += `{ transform: booleanAttribute }`;
                }
                if (member.type?.text === 'number') {
                  expectedAngularImports.add('numberAttribute');
                  input += `{ transform: numberAttribute }`;
                }
                input += `)`;

                const type = member.type?.text ?? 'any';
                const setterType = type.match(/(Sbb|HTML)[a-zA-Z]*Element/)
                  ? `string | ${type}`
                  : type;
                const typeCast = type === setterType ? '' : ` as ${type}`;
                return fixer.insertTextBeforeRange(
                  [endOfBody, endOfBody],
                  `
  ${input}
  public set ${member.name}(value: ${setterType}) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.${member.name} = value${typeCast}));
  }
  public get ${member.name}(): ${type} {
    return this.#element.nativeElement.${member.name};
  }\n`,
                );
              },
            });
          }
        }

        // Add outputs
        for (const member of publicEvents) {
          const type = member.type?.text.replace(/\s+/g, '');
          const normalizedName = CAMEL_CASE_EVENTS_MAP[member.name] ?? member.name;
          const outputName = `${normalizedName}Output`;
          const outputRegex = new RegExp(
            `outputFromObservable(.*alias:.*'${normalizedName}'.*);`,
            's',
          );
          const isCamelCase = CAMEL_CASE_EVENTS_MAP[member.name];
          if (isCamelCase) {
            if (
              classDeclaration.body.body.every(
                (n) =>
                  n.type !== AST_NODE_TYPES.PropertyDefinition ||
                  context.sourceCode.getText(n.key) !== outputName,
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
  public ${outputName} = outputFromObservable(fromEvent<${type}>(this.#element.nativeElement, '${member.name}'), { alias: '${normalizedName}' });\n`,
                  );
                },
              });
            }
          } else {
            expectedRxJsImports.add('NEVER');
            if (
              classDeclaration.body.body.every(
                (n) =>
                  n.type !== AST_NODE_TYPES.PropertyDefinition ||
                  !context.sourceCode.getText(n).match(outputRegex),
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
  protected _${outputName} = outputFromObservable<${type}>(NEVER, { alias: '${normalizedName}' });`,
                  );
                },
              });
            }
            if (
              classDeclaration.body.body.every(
                (n) =>
                  n.type !== AST_NODE_TYPES.PropertyDefinition ||
                  context.sourceCode.getText(n.key) !== outputName,
              )
            ) {
              expectedCoreImports.add('internalOutputFromObservable');
              context.report({
                node: classDeclaration.body,
                messageId: 'angularMissingOutput',
                data: { property: member.name },
                fix: (fixer) => {
                  const endOfBody = classDeclaration.body.range[1] - 1;
                  return fixer.insertTextBeforeRange(
                    [endOfBody, endOfBody],
                    `
  public ${outputName} = internalOutputFromObservable(fromEvent<${type}>(this.#element.nativeElement, '${member.name}'));\n`,
                  );
                },
              });
            }
          }

          // Check if output types are corresponding to manifest
          if (
            classDeclaration.body.body.every(
              (n) =>
                n.type !== AST_NODE_TYPES.PropertyDefinition ||
                context.sourceCode.getText(n.key) !== outputName ||
                !context.sourceCode.getText(n).replace(/\s+/g, '').includes(`fromEvent<${type}>`),
            ) ||
            (!isCamelCase &&
              classDeclaration.body.body.every(
                (n) =>
                  n.type !== AST_NODE_TYPES.PropertyDefinition ||
                  context.sourceCode.getText(n.key) !== `_${outputName}` ||
                  !context.sourceCode
                    .getText(n)
                    .replace(/\s+/g, '')
                    .includes(`outputFromObservable<${type}>`),
              ))
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularWrongOutputType',
              data: { property: member.name },
            });
          }

          // Check if type names are corresponding to manifest
          if (
            classDeclaration.body.body.every(
              (n) =>
                n.type !== AST_NODE_TYPES.PropertyDefinition ||
                context.sourceCode.getText(n.key) !== outputName ||
                !context.sourceCode
                  .getText(n)
                  .replace(/\s+/g, '')
                  .includes(`(this.#element.nativeElement,'${member.name}'`) ||
                (isCamelCase &&
                  !context.sourceCode
                    .getText(n)
                    .replace(/\s+/g, '')
                    .includes(`alias:'${normalizedName}'`)),
            ) ||
            (!isCamelCase &&
              classDeclaration.body.body.every(
                (n) =>
                  n.type !== AST_NODE_TYPES.PropertyDefinition ||
                  context.sourceCode.getText(n.key) !== `_${outputName}` ||
                  !context.sourceCode
                    .getText(n)
                    .replace(/\s+/g, '')
                    .includes(`alias:'${normalizedName}'`),
              ))
          ) {
            context.report({
              node: classDeclaration.body,
              messageId: 'angularWrongOutputEventName',
              data: { property: member.name, expectedAlias: normalizedName },
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

        // Core imports
        if (expectedCoreImports.size > 0) {
          const coreImport = program.body.find(
            (n): n is TSESTree.ImportDeclaration =>
              n.type === AST_NODE_TYPES.ImportDeclaration &&
              n.source.value === '@sbb-esta/lyne-angular/core',
          );
          if (!coreImport) {
            const imports = Array.from(expectedCoreImports).sort().join(', ');
            const lastImport = program.body
              .filter((n) => n.type === AST_NODE_TYPES.ImportDeclaration)
              .at(-1)!;
            context.report({
              node: lastImport,
              messageId: 'angularMissingImport',
              data: { symbol: imports },
              fix: (fixer) =>
                fixer.insertTextBefore(
                  node,
                  `\nimport { ${imports} } from '@sbb-esta/lyne-angular/core';\n`,
                ),
            });
          } else {
            const existingImports = coreImport.specifiers.map(
              (spec) => ((spec as TSESTree.ImportSpecifier).imported as TSESTree.Identifier).name,
            );
            const importsToAdd = Array.from(expectedCoreImports).filter(
              (importName) => !existingImports.includes(importName),
            );
            if (importsToAdd.length > 0) {
              const imports = importsToAdd.sort().join(', ');
              context.report({
                node: coreImport,
                messageId: 'angularMissingImport',
                data: { symbol: imports },
                fix: (fixer) =>
                  fixer.insertTextAfter(coreImport.specifiers.at(-1)!, `, ${imports}`),
              });
            }
          }
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
                fixer.insertTextBefore(lastImport, `\nimport { ${imports} } from 'rxjs';`),
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

        // RxJs Interop imports
        if (expectedRxJsInteropImports.size > 0) {
          const rxjsInteropImport = program.body.find(
            (n): n is TSESTree.ImportDeclaration =>
              n.type === AST_NODE_TYPES.ImportDeclaration &&
              n.source.value === '@angular/core/rxjs-interop',
          );
          if (!rxjsInteropImport) {
            const imports = Array.from(expectedRxJsInteropImports).sort().join(', ');
            const lastImport = program.body
              .filter((n) => n.type === AST_NODE_TYPES.ImportDeclaration)
              .at(-1)!;
            context.report({
              node: program,
              messageId: 'rxJsInteropMissingImport',
              data: { symbol: imports },
              fix: (fixer) =>
                fixer.insertTextBefore(
                  lastImport,
                  `\nimport { ${imports} } from '@angular/core/rxjs-interop';`,
                ),
            });
          } else {
            const existingImports = rxjsInteropImport.specifiers.map((s) =>
              (s as TSESTree.ImportSpecifier).importKind === 'type'
                ? `${(s as TSESTree.ImportSpecifier).importKind} ${((s as TSESTree.ImportSpecifier).imported as TSESTree.Identifier).name}`
                : ((s as TSESTree.ImportSpecifier).imported as TSESTree.Identifier).name,
            );
            const importsToAdd = Array.from(expectedRxJsInteropImports).filter(
              (i) => !existingImports.includes(i),
            );
            if (importsToAdd.length > 0) {
              const imports = importsToAdd.sort().join(', ');
              context.report({
                node: rxjsInteropImport,
                messageId: 'rxJsInteropMissingImport',
                data: { symbol: imports },
                fix: (fixer) =>
                  fixer.insertTextAfter(rxjsInteropImport.specifiers.at(-1)!, `, ${imports}`),
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
              fixer.insertTextBefore(
                lastImport,
                `\nimport type { ${elementClassName} } from '${elementImport}';`,
              ),
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
      rxJsInteropMissingImport: 'Missing import {{ symbol }}',
      angularMissingDirective: 'Missing class for {{ className }}',
      angularMissingElementRef: 'Missing ElementRef property',
      angularMissingNgZone: 'Missing NgZone property',
      angularMissingInput: 'Missing input for property {{ property }}',
      angularMissingOutput: 'Missing output for property {{ property }}',
      angularMissingMethod: 'Missing output for method {{ method }}',
      angularWrongOutputType: 'Output type differs from manifest for event {{ property }}',
      angularWrongOutputEventName:
        'Output event name differs from manifest for event {{ property }} and expected alias {{ expectedAlias }}',
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],
});
