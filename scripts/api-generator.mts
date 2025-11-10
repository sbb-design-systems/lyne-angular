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

${directive['methodsClass'] && directive['methodsClass'].length > 0 ? createMethodsTable(directive) : ''}
`;
  });

  return readmeText;
};

const createInputsTable = (directive: any): string => {
  return `### Properties
| Name | Type | Description |
| --- | --- | --- |
${(directive['inputsClass'] as any[])
  .map(
    (input) =>
      `| ${input['name']} | \`${input['type'].replaceAll('|', '\\\|')}\` | ${input['rawdescription']?.replaceAll('\n', '')} |\n`,
  )
  .join('')}`;
};

const createMethodsTable = (directive: any): string => {
  return `### Methods
| Name | Args | Return type | Description |
| --- | --- | --- | --- |
${(directive['methodsClass'] as any[])
  .map(
    (method) =>
      `| ${method['name']} | ${(method['args'] as any[])?.map((arg) => `${arg.name}: \`${arg.type}\``).join('\n')} | \`${method['returnType']?.replaceAll('|', '\\\|')}\` | ${method['rawdescription']?.replaceAll('\n', '')} |\n`,
  )
  .join('')}`;
};

generateApi(elementsManifest, join(root, 'src/angular'));
generateApi(elementsExperimentalManifest, join(root, 'src/angular-experimental'));
