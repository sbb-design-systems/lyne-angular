import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { basename, dirname, join, normalize, relative } from 'path';

const root = fileURLToPath(new URL('../', import.meta.url));
const documentation = JSON.parse(readFileSync(join(root, `/src/docs/documentation.json`), 'utf8'));

/**
 * Starting from `projectFolder`, it goes deeper until it reaches the innermost folders;
 * if the folder's path matches the path of any object (directive, component, class...) in the `compodoc` file,
 * it creates a `<folder>-api.md` file for the found object under `src/docs/app/<project>/api`.
 *
 * NOTE: since there could be cases of folders with the same name (e.g. `angular/overlay` and `angular/core/overlay`),
 * the `api` folder is deleted and recreated every time and the readme file is created with the 'append' flag (`a`).
 *
 * @param projectFolder the name of the package (angular / angular-experimental / ...)
 */
const generateApiFiles = (projectFolder: string) => {
  const projectPath = join(root, 'src', projectFolder);
  const outputPath = join(root, 'src/docs/app', projectFolder, 'api');
  if (existsSync(outputPath)) {
    rmSync(outputPath, { recursive: true, force: true });
  }
  mkdirSync(outputPath, { recursive: true });
  scanFoldersAndWriteFiles(projectPath, outputPath);
};

/**
 * Recursive function which reaches the innermost folder and creates a `.md` file
 * with the documentation of the objects from compodoc that matches the final path.
 *
 * @param projectPath path of the source package
 * @param apiFolder path of the output folder
 */
const scanFoldersAndWriteFiles = (projectPath: string, apiFolder: string) => {
  const folders = readdirSync(projectPath, { withFileTypes: true });
  const subFolders = folders.filter((e) => e.isDirectory());

  // Inner folder reached
  if (subFolders.length === 0) {
    // Scan the documentation file and possibly create the docs file.
    const readmeContent = createReadmeAPI(relative(root, normalize(projectPath)));
    if (readmeContent) {
      const apiFileName = `${basename(projectPath)}-api.md`;
      const outPath = join(apiFolder, apiFileName);
      writeFileSync(outPath, readmeContent, { encoding: 'utf-8', flag: 'a' });
    }
    return;
  }

  // Inner folder not reached, go deeper recursively
  for (const sub of subFolders) {
    const subPath = join(projectPath, sub.name);
    scanFoldersAndWriteFiles(subPath, apiFolder);
  }
};

const createReadmeAPI = (modulePath: string): string => {
  let readmeText = '';

  // Add directives
  readmeText += addToReadme(
    modulePath,
    ['directives'],
    'Directives',
    createDocsComponentsDirectives,
  );

  // Add components
  readmeText += addToReadme(
    modulePath,
    ['components'],
    'Components',
    createDocsComponentsDirectives,
  );

  // Add classes
  readmeText += addToReadme(
    modulePath,
    ['classes'],
    'Classes',
    createDocsClassesInterfacesInjectables,
  );

  // Add interfaces
  readmeText += addToReadme(
    modulePath,
    ['interfaces'],
    'Interfaces',
    createDocsClassesInterfacesInjectables,
  );

  // Add injectables
  readmeText += addToReadme(
    modulePath,
    ['injectables'],
    'Injectables',
    createDocsClassesInterfacesInjectables,
  );

  // Add type aliases
  readmeText += addToReadme(
    modulePath,
    ['miscellaneous', 'typealiases'],
    'Type aliases',
    createDocsTypeAliases,
  );

  // Add enumerations
  readmeText += addToReadme(
    modulePath,
    ['miscellaneous', 'enumerations'],
    'Enumerations',
    createDocsEnumerations,
  );

  return readmeText;
};

const addToReadme = (
  modulePath: string,
  keys: string[],
  sectionName: string,
  createFn: (p: any[]) => string,
) => {
  const listElements = keys.reduce((acc, key) => acc?.[key], documentation) as any[];
  const found = listElements.filter((obj) => dirname(obj.file) === modulePath);
  if (found?.length > 0) {
    return `# ${sectionName}\n\n${createFn(found)}`;
  }
  return '';
};

const createDocsClassesInterfacesInjectables = (entities: any[]): string => {
  return entities
    .map(
      (entity) =>
        `## ${entity['name']}${entity['extends']?.length > 0 ? ` extends ${entity['extends'].join(', ')}` : ''}${entity['implements']?.length > 0 ? ` implements ${entity['implements'].join(',')}` : ''}
${entity['rawdescription'] ? `\n${entity['rawdescription']?.replaceAll('\n', ' ').trimStart()}\n` : ''}
${entity['properties']?.length > 0 ? createInputsTable(entity['properties'], entity['accessors']) : ''}${entity['methods']?.length > 0 ? createMethodsTable(entity['methods']) : ''}`,
    )
    .join('');
};

const createDocsComponentsDirectives = (entities: any[]): string => {
  return entities
    .map(
      (entity) =>
        `## ${entity['name']}
${entity['rawdescription'] ? `\n${entity['rawdescription']?.replaceAll('\n', ' ').trimStart()}\n` : ''}
**Selector:** \`${entity['selector']}\`
${entity['exportAs'] ? `\n**Exported as:** \`${entity['exportAs']}\`\n` : ''}
${entity['inputsClass']?.length > 0 ? createInputsTable(entity['inputsClass'], entity['accessors']) : ''}${entity['propertiesClass']?.length > 0 ? createOutputTable(entity) : ''}${entity['methodsClass']?.length > 0 ? createMethodsTable(entity['methodsClass']) : ''}`,
    )
    .join('');
};

const createDocsTypeAliases = (typeAliases: any[]): string => {
  return typeAliases
    .map((alias) => `## ${alias['name']}\n\n\`type ${alias['name']} = ${alias['rawtype']};\``)
    .join('');
};

const createDocsEnumerations = (enums: any[]): string => {
  return enums
    .map(
      (enumVal) =>
        `## ${enumVal['name']}\n\n\`enum ${enumVal['name']} = { ${(enumVal['childs'] as any[]).map((c) => `${c.name}`).join(', ')} }\`\n`,
    )
    .join('');
};

const createInputsTable = (inputs: any[], accessors?: Record<string, any>): string => {
  if (accessors) {
    const inputsNames = new Set(inputs.map((input) => input.name));
    const accessorsToAdd = Object.keys(accessors)
      .filter((key) => !inputsNames.has(key))
      .map((acc) => {
        const accessor = accessors[acc];
        return accessor['getSignature'] ?? accessor['setSignature'];
      }) as any[];
    inputs = [...inputs, ...accessorsToAdd];
  }
  return `### Properties

| Name | Type | Description |
| --- | --- | --- |
${inputs
  .map(
    (input) =>
      `| ${input['name']} | ${createTypeForTable(input['returnType'] ?? input['type'])} | ${createDescriptionForTable(input['rawdescription'])}|\n`,
  )
  .join('')}\n`;
};

const createOutputTable = (directive: any): string => {
  const outputs = (directive['propertiesClass'] as any[]).filter(
    (prop) =>
      prop['name'].toLowerCase().includes('output') &&
      prop['defaultValue'].toLowerCase().includes('outputfromobservable('),
  );
  if (outputs.length > 0) {
    return `### Events

| Name | Description |
| --- | --- |
${outputs
  .map(
    (output) => `| ${output['name']} | ${createDescriptionForTable(output['rawdescription'])}|\n`,
  )
  .join('')}\n`;
  }
  return '';
};

const createMethodsTable = (methods: any[]): string => {
  if (methods.every((method) => (method['name'] as string).startsWith('ng'))) {
    return '';
  }

  return `### Methods

| Name | Parameters | Return type | Description |
| --- | --- | --- | --- |
${methods
  .map(
    (method) =>
      `| ${method['name']} | ${createParametersForTable(method['args'])} | ${createTypeForTable(method['returnType'])} | ${createDescriptionForTable(method['rawdescription'])} |\n`,
  )
  .join('')}\n`;
};

const createTypeForTable = (type?: string): string => {
  if (type) {
    return `\`${type.replaceAll('|', '\\\|')}\``;
  }
  return '-';
};

const createDescriptionForTable = (rawdescription?: string): string => {
  if (rawdescription) {
    return `${rawdescription.replaceAll('\n', ' ').trimStart()}`;
  }
  return '-';
};

const createParametersForTable = (args: any[]): string => {
  if (args && args.length > 0) {
    return `${args.map((arg) => `${arg.name}${arg.optional ? '?' : ''}: \`${arg.type}\``).join(' - ')}`;
  }
  return '-';
};

generateApiFiles('angular');
generateApiFiles('angular-experimental');
