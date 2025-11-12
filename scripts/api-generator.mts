import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { basename, dirname, join, normalize, relative } from 'path';

const root = fileURLToPath(new URL('../', import.meta.url));
const documentation = JSON.parse(
  readFileSync(join(root, `/src/docs/documentation/documentation.json`), 'utf8'),
);

const generateApiFiles = (projectPath: string[]) => {
  const outputFolder: string = join(root, `/src/docs/documentation/api`);
  // Clean and recreate output folder
  if (existsSync(outputFolder)) {
    rmSync(outputFolder, { recursive: true, force: true });
  }
  mkdirSync(outputFolder, { recursive: true });

  // Recursive method to scan directories and create files
  projectPath.forEach((p) =>
    scanFoldersAndWriteFiles(p, join(root, `/src/docs/documentation/api`)),
  );
};

const scanFoldersAndWriteFiles = (projectPath: string, apiFolder: string) => {
  const folders = readdirSync(projectPath, { withFileTypes: true });
  const subFolders = folders.filter((e) => e.isDirectory());

  // Inner folder reached
  if (subFolders.length === 0) {
    const folderName = basename(projectPath);
    const apiFileName = `${folderName}-api.md`;
    const outPath = join(apiFolder, apiFileName);

    // Scan documentation and add content
    const readmeContent = createReadmeAPI(relative(root, normalize(projectPath)));
    if (readmeContent) {
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

  // TODO: injectables - interfaces - miscellaneous
  const directives = (documentation['directives'] as any[]).filter(
    (e) => dirname(e.file) === modulePath,
  );
  if (directives && directives.length > 0) {
    readmeText += createDocsComponentsDirectives(directives);
  }
  const components = (documentation['components'] as any[]).filter(
    (e) => dirname(e.file) === modulePath,
  );
  if (components && components.length > 0) {
    readmeText += createDocsComponentsDirectives(components);
  }
  const classes = (documentation['classes'] as any[]).filter((e) => dirname(e.file) === modulePath);
  if (classes.length > 0) {
    readmeText += createDocsClasses(classes);
  }

  return readmeText;
};

const createDocsClasses = (entities: any[]): string => {
  return entities
    .map(
      (entity) =>
        `## API Reference for ${entity['name']}${entity['extends']?.length > 0 ? ` extends ${entity['extends'].join(', ')}` : ''}${entity['implements']?.length > 0 ? ` implements ${entity['implements'].join(',')}` : ''}
${entity['rawdescription'] ? `\n${entity['rawdescription']?.replaceAll('\n', ' ').trimStart()}\n` : ''}
${entity['properties']?.length > 0 ? createInputsTable(entity['properties'], entity['accessors']) : ''}${entity['methods']?.length > 0 ? createMethodsTable(entity['methods']) : ''}`,
    )
    .join('');
};

const createDocsComponentsDirectives = (entities: any[]): string => {
  return entities
    .map(
      (entity) =>
        `## API Reference for ${entity['name']}
${entity['rawdescription'] ? `\n${entity['rawdescription']?.replaceAll('\n', ' ').trimStart()}\n` : ''}
**Selector:** \`${entity['selector']}\`
${entity['exportAs'] ? `\n**Exported as:** \`${entity['exportAs']}\`\n` : ''}
${entity['inputsClass']?.length > 0 ? createInputsTable(entity['inputsClass'], entity['accessors']) : ''}${entity['propertiesClass']?.length > 0 ? createOutputTable(entity) : ''}${entity['methodsClass']?.length > 0 ? createMethodsTable(entity['methodsClass']) : ''}`,
    )
    .join('');
};

// TODO verify if accessors have to be split in another table
const createInputsTable = (inputs: any[], accessors: Record<string, any>): string => {
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
      `| ${input['name']} | ${createTypeForTable(input['returnType'] ?? input['type'])} | ${createDescriptionForTable(input['rawdescription'])} |\n`,
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
    (output) => `| ${output['name']} | ${createDescriptionForTable(output['rawdescription'])} |\n`,
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

generateApiFiles([join(root, 'src/angular'), join(root, 'src/angular-experimental')]);
