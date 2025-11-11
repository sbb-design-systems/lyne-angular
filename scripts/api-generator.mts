import { fileURLToPath } from 'url';
import type { Package } from 'custom-elements-manifest';
import { readFileSync, writeFileSync } from 'fs';
import { basename, join } from 'path';
import { dirname } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));

const readManifest = (name: string): Package =>
  JSON.parse(
    readFileSync(join(root, `/node_modules/@sbb-esta/${name}/custom-elements.json`), 'utf8'),
  );
const elementsManifest = readManifest('lyne-elements');
const elementsExperimentalManifest = readManifest('lyne-elements-experimental');

const documentation = JSON.parse(
  readFileSync(join(root, `/src/docs/documentation/documentation.json`), 'utf8'),
);

const generateApi = (pkg: Package, projectPath: string) => {
  for (const module of pkg.modules) {
    if (
      module.declarations?.some(
        (d) => d.kind === 'class' && 'customElement' in d && d.customElement,
      )
    ) {
      const directoryPath = dirname(join(projectPath, module.path));
      const apiPath = join(directoryPath, 'api.md');
      const readmeContent = createReadmeAPI(directoryPath.split(root)[1]);

      writeFileSync(apiPath, readmeContent, 'utf8');
    }
  }
};

const createReadmeAPI = (modulePath: string): string => {
  let readmeText = '';

  // TODO: classes - components - injectables - interfaces - miscellaneous
  const directives = (documentation['directives'] as any[]).filter(
    (e) => dirname(e.file) === modulePath,
  );

  directives.forEach((directive) => {
    readmeText += `## API Reference for ${directive['name']}

${directive['rawdescription']?.replaceAll('\n', '')}

Selector: \`${directive['selector']}\`

Exported as: \`${directive['exportAs']}\`

${directive['inputsClass'] && directive['inputsClass'].length > 0 ? createInputsTable(directive) : ''}
${directive['propertiesClass'] && directive['propertiesClass'].length > 0 ? createOutputTable(directive) : ''}
${directive['methodsClass'] && directive['methodsClass'].length > 0 ? createMethodsTable(directive) : ''}
`;
  });

  return readmeText;
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
  return `### Methods
| Name | Parameters | Return type | Description |
| --- | --- | --- | --- |
${(directive['methodsClass'] as any[])
  .map(
    (method) =>
      `| ${method['name']} | ${createParametersForTable(method['args'])} | ${createTypeForTable(method['returnType'])} | ${method['rawdescription']?.replaceAll('\n', '')} |\n`,
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
    return `${rawdescription.replaceAll('\n', '')}`;
  }
  return '-';
};

const createParametersForTable = (args: any[]): string => {
  if (args && args.length > 0) {
    return `${args.map((arg) => `${arg.name}${arg.optional ? '?' : ''}: \`${arg.type}\``).join(' - ')}`;
  }
  return '-';
};

generateApi(elementsManifest, join(root, 'src/angular'));
generateApi(elementsExperimentalManifest, join(root, 'src/angular-experimental'));
