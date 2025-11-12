import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, dirname, join, normalize, relative } from 'path';

const root = fileURLToPath(new URL('../', import.meta.url));
const documentation = JSON.parse(
  readFileSync(join(root, `/src/docs/documentation/documentation.json`), 'utf8'),
);

const generateApiFiles = (projectPath: string) => {
  // Create output folder
  const outputFolder: string = join(root, `/src/docs/documentation/api`);
  if (!existsSync(outputFolder)) {
    mkdirSync(outputFolder, { recursive: true });
  }

  // Recursive method to scan directories and create files
  scanFoldersAndWriteFiles(projectPath, join(root, `/src/docs/documentation/api`));
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

    writeFileSync(outPath, readmeContent, 'utf-8');
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

  // TODO: classes - components - injectables - interfaces - miscellaneous
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

  return readmeText;
};

const createDocsComponentsDirectives = (entities: any[]): string => {
  return entities
    .map(
      (entity) =>
        `## API Reference for ${entity['name']}
${entity['rawdescription'] ? `\n${entity['rawdescription']?.replaceAll('\n', ' ').trimStart()}\n` : ''}
**Selector:** \`${entity['selector']}\`
${entity['exportAs'] ? `\n**Exported as:** \`${entity['exportAs']}\`\n` : ''}
${entity['inputsClass'] && entity['inputsClass'].length > 0 ? createInputsTable(entity) : ''}${entity['propertiesClass'] && entity['propertiesClass'].length > 0 ? createOutputTable(entity) : ''}${entity['methodsClass'] && entity['methodsClass'].length > 0 ? createMethodsTable(entity) : ''}`,
    )
    .join('');
};

// TODO verify if accessors have to be split in another table
const createInputsTable = (directive: any): string => {
  const inputs = directive['inputsClass'] as any[];
  const inputsNames = new Set(inputs.map((input) => input.name));
  const accessorsNamesToAdd = Object.keys(directive['accessors']).filter(
    (key) => !inputsNames.has(key),
  );
  const accessorsToAdd = accessorsNamesToAdd.map((acc) => {
    const accessor = directive['accessors'][acc];
    return accessor['getSignature'] ?? accessor['setSignature'];
  }) as any[];
  return `### Properties

| Name | Type | Description |
| --- | --- | --- |
${[...inputs, ...accessorsToAdd]
  .map(
    (input) =>
      `| ${input['name']} | ${createTypeForTable(input['type'])} | ${createDescriptionForTable(input['rawdescription'])} |\n`,
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

const createMethodsTable = (directive: any): string => {
  const methods = directive['methodsClass'] as any[];
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

generateApiFiles(join(root, 'src/angular'));
generateApiFiles(join(root, 'src/angular-experimental'));
