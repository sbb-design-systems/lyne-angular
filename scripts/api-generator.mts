import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { basename, dirname, join, normalize, relative } from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const documentation = JSON.parse(readFileSync(join(root, `/src/docs/documentation.json`), 'utf8'));
const modulesWithLegacySubmodules = ['checkbox', 'link-list', 'radio-button'];
const ignoredFolders = ['core'];

/**
 * For all directives it collects slots, cssProps and cssParts information and appends it
 * to the `documentation` object, which is used to create the API docs.
 */
const appendAdditionalInformation = (documentation: {
  directives: {
    file: string;
    name: string;
    slots?: { name: string; description: string }[];
    cssProps?: { name: string; default?: string; description: string }[];
    cssParts?: { name: string; description: string }[];
  }[];
}): void => {
  documentation.directives.forEach((d) => {
    const fileContent = readFileSync(new URL(`../${d.file}`, import.meta.url), 'utf8');

    const sourceFile = ts.createSourceFile('example.ts', fileContent, ts.ScriptTarget.ES2023, true);

    function handleJsDoc(node: ts.Node) {
      if (ts.isClassDeclaration(node) && node.name && node.name.text === d.name) {
        const jsDocs = ts.getJSDocTags(node);

        jsDocs?.forEach((doc) => {
          const tagName = doc.tagName.text;
          const wholeTag = getCommentText(doc);
          const parts = ` ${wholeTag}`.split(/\s-\s(.+)/);
          const name = parts[0].trim();
          const description = parts[1]?.trim() || '';

          if (tagName === 'slot') {
            d.slots ??= [];
            d.slots.push({ name, description });
          } else if (tagName === 'cssprop') {
            d.cssProps ??= [];

            let cssName = name;
            let cssDefault = '';

            const match = name.match(/\[([^\]=]+)=(.+)\]/);

            if (match) {
              cssName = match[1]; // "--sbb-dialog-z-index"
              cssDefault = match[2]; // "var(--sbb-overlay-default-z-index)"
            }

            d.cssProps.push({ name: cssName, default: cssDefault, description });
          } else if (tagName === 'csspart') {
            d.cssParts ??= [];
            d.cssParts.push({ name, description });
          }
        });
      }

      ts.forEachChild(node, handleJsDoc);
    }
    handleJsDoc(sourceFile);
  });
};

const getCommentText = (doc: ts.JSDocTag): string => {
  if (!doc.comment) {
    return '';
  }

  if (typeof doc.comment === 'string') {
    return doc.comment;
  }

  // Falls es ein NodeArray ist
  return doc.comment.map((part) => part.getText()).join('');
};

/**
 * Reads the module names for a given package from meta.ts.
 * For each module listed in PACKAGES (from meta.ts), all api files are merged into a single file.
 */
const getModuleNamesFromMeta = async (projectFolder: string): Promise<string[]> => {
  const { PACKAGES } = await import('../src/docs/app/shared/meta.js');
  const pkg = PACKAGES[projectFolder];
  if (!pkg) {
    return [];
  }
  return pkg.sections
    .flatMap((s) => s.entries)
    .map((e) => e.link.split('/').at(-1)!)
    .filter(Boolean);
};

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
const generateApiFiles = async (projectFolder: string) => {
  const projectPath = join(root, 'src', projectFolder);
  const outputPath = join(root, 'src/docs/app', projectFolder, 'api');
  if (existsSync(outputPath)) {
    rmSync(outputPath, { recursive: true, force: true });
  }
  mkdirSync(outputPath, { recursive: true });
  await mergeFilesInModule(projectPath, outputPath, projectFolder);
};

/**
 * Recursive function which reaches the innermost folder and creates a `.md` file
 * with the documentation of the objects from compodoc that matches the final path.
 * Returns the list of generated api file names.
 *
 * @param projectPath path of the source package
 * @param apiFolder path of the output folder
 */
const scanFoldersAndWriteFiles = (projectPath: string, apiFolder: string): string[] => {
  const folders = readdirSync(projectPath, { withFileTypes: true });
  const subFolders = folders.filter((e) => e.isDirectory());
  const currentName = basename(projectPath);
  const isLegacy = modulesWithLegacySubmodules.some((m) => projectPath.endsWith(`/${m}`));
  const hasSameNamedSubFolder = subFolders.some((e) => e.name === currentName);
  const generated: string[] = [];

  // Scan the current folder unless it has a same-named sub-folder whose docs would
  // duplicate it – except for legacy modules which always own their own docs directly.
  if (isLegacy || !hasSameNamedSubFolder) {
    const readmeContent = createReadmeAPI(relative(root, normalize(projectPath)));
    if (readmeContent) {
      const apiFileName = `${currentName}-api.md`;
      writeFileSync(join(apiFolder, apiFileName), readmeContent, { encoding: 'utf-8', flag: 'a' });
      generated.push(apiFileName);
    }
  }

  // Stop recursion at leaf folders or legacy submodule roots
  if (subFolders.length === 0 || isLegacy) {
    return generated;
  }

  // Go deeper recursively into all sub-folders, skipping ignored ones
  for (const sub of subFolders) {
    if (!ignoredFolders.includes(sub.name)) {
      generated.push(...scanFoldersAndWriteFiles(join(projectPath, sub.name), apiFolder));
    }
  }

  return generated;
};

/**
 * For each module listed in meta.ts for the given package, merges all generated
 * `*-api.md` files that belong to that module's folder into a single `<module>-api.md`.
 *
 * The belonging files are determined by re-scanning `src/<projectFolder>/<moduleName>/`
 * – which is identical to what scanFoldersAndWriteFiles already did – so we reuse it
 * in dry-run mode (no apiFolder writing needed, we only need the file names).
 */
const mergeFilesInModule = async (
  projectPath: string,
  outputPath: string,
  projectFolder: string,
): Promise<void> => {
  const moduleNames = await getModuleNamesFromMeta(projectFolder);

  for (const moduleName of moduleNames) {
    const moduleDir = join(projectPath, moduleName);
    if (!existsSync(moduleDir)) {
      continue;
    }

    // Scan this module's folder – writes the individual api files and returns their names
    const belongingFiles = scanFoldersAndWriteFiles(moduleDir, outputPath);

    if (belongingFiles.length <= 1) {
      continue; // nothing to merge
    }

    const outputDoc = belongingFiles.map((f) => readFileSync(join(outputPath, f), 'utf8')).join('');

    for (const f of belongingFiles) {
      rmSync(join(outputPath, f), { force: true });
    }
    writeFileSync(join(outputPath, `${moduleName}-api.md`), outputDoc, { encoding: 'utf-8' });
  }
};

/**
 * It creates the docs content by concatenating:
 *  - directives
 *  - components
 *  - classes
 *  - interfaces
 *  - types
 *  - enums
 * @param modulePath the path of the innermost folder, used to check which entities needs to be written
 */
const createReadmeAPI = (modulePath: string): string => {
  let readmeText = '';

  // Add directives
  readmeText += addToReadme(
    modulePath,
    ['directives'],
    'Directive',
    createDocsComponentsDirectives,
  );

  // Add components
  readmeText += addToReadme(
    modulePath,
    ['components'],
    'Component',
    createDocsComponentsDirectives,
  );

  // Add classes
  readmeText += addToReadme(
    modulePath,
    ['classes'],
    'Class',
    createDocsClassesInterfacesInjectables,
  );

  // Add interfaces
  readmeText += addToReadme(
    modulePath,
    ['interfaces'],
    'Interface',
    createDocsClassesInterfacesInjectables,
  );

  // Add injectables
  readmeText += addToReadme(
    modulePath,
    ['injectables'],
    'Injectable',
    createDocsClassesInterfacesInjectables,
  );

  // Add type aliases
  readmeText += addToReadme(
    modulePath,
    ['miscellaneous', 'typealiases'],
    'Type alias',
    createDocsTypeAliases,
  );

  // Add enumerations
  readmeText += addToReadme(
    modulePath,
    ['miscellaneous', 'enumerations'],
    'Enumeration',
    createDocsEnumerations,
  );

  return readmeText;
};

/**
 * From the `documentation` object, it accesses the object which key is given by cycling the `keys` value.
 * If in the object's values there are entities which `file` property matches the `modulePath`,
 * apply the `createFn` callback.
 * @param modulePath the scanned path
 * @param keys the keys needed to access the entities,
 *   e.g. "{ lvl1: { lvl2: [ { file: 1 }, { file: 2 } ] } }" => ['lvl1', 'lvl2']
 * @param type the entity type
 * @param createFn the callback function that creates the docs
 */
const addToReadme = (
  modulePath: string,
  keys: string[],
  type: string,
  createFn: (entities: any[], type: string) => string,
) => {
  const listElements = keys.reduce((acc, key) => acc?.[key], documentation) as any[];
  const found = listElements.filter((obj) => dirname(obj.file) === modulePath);
  if (found?.length > 0) {
    return createFn(found, type);
  }
  return '';
};

const createDocsClassesInterfacesInjectables = (entities: any[], type: string): string => {
  return entities
    .map(
      (entity) =>
        `## ${entity['name']}${entity['extends']?.length > 0 ? ` extends ${entity['extends'].join(', ')}` : ''}${entity['implements']?.length > 0 ? ` implements ${entity['implements'].join(',')}` : ''}
${entity['rawdescription'] ? `\n${entity['rawdescription']?.replaceAll('\n', ' ').trimStart()}\n` : ''}
**Type:** ${type}\n
${entity['properties']?.length > 0 ? createInputsTable(entity['properties'], entity['accessors']) : ''}${entity['methods']?.length > 0 ? createMethodsTable(entity['methods']) : ''}`,
    )
    .join('');
};

const createDocsComponentsDirectives = (entities: any[], type: string): string => {
  return entities
    .map(
      (entity) =>
        `## ${entity['name']}
${entity['rawdescription'] ? `\n${entity['rawdescription']?.replaceAll('\n', ' ').trimStart()}\n` : ''}
**Type:** ${type}\n
**Selector:** \`${entity['selector']}\`
${entity['exportAs'] ? `\n**Exported as:** \`${entity['exportAs']}\`\n` : ''}
${entity['inputsClass']?.length > 0 ? createInputsTable(entity['inputsClass'], entity['accessors']) : ''}${entity['propertiesClass']?.length > 0 ? createOutputTable(entity) : ''}${entity['methodsClass']?.length > 0 ? createMethodsTable(entity['methodsClass']) : ''}${entity['slots']?.length > 0 ? createSlotsTable(entity['slots']) : ''}${entity['cssProps']?.length > 0 ? createCssPropsTable(entity['cssProps']) : ''}${entity['cssParts']?.length > 0 ? createCssPartsTable(entity['cssParts']) : ''}`,
    )
    .join('');
};

const createDocsTypeAliases = (typeAliases: any[], type: string): string => {
  return typeAliases
    .map(
      (alias) => `## ${alias['name']}\n
**Type:** ${type}\n
\`type ${alias['name']} = ${alias['rawtype']};\`\n\n`,
    )
    .join('');
};

const createDocsEnumerations = (enums: any[], type: string): string => {
  return enums
    .map(
      (enumVal) =>
        `## ${enumVal['name']}\n
**Type:** ${type}\n
\`enum ${enumVal['name']} = { ${(enumVal['childs'] as any[]).map((c) => `${c.name}`).join(', ')} }\`\n\n`,
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
  const filteredMethods = methods.filter((method) => !(method['name'] as string).startsWith('ng'));
  if (filteredMethods?.length === 0) {
    return '';
  }

  return `### Methods

| Name | Parameters | Return type | Description |
| --- | --- | --- | --- |
${filteredMethods
  .map(
    (method) =>
      `| ${method['name']} | ${createParametersForTable(method['args'])} | ${createTypeForTable(method['returnType'])} | ${createDescriptionForTable(method['rawdescription'])} |\n`,
  )
  .join('')}\n`;
};

const createSlotsTable = (slots: { name: string; description: string }[]): string => {
  return `### Slots

| Name | Description |
| --- | --- |
${slots.map((slot) => `| ${slot.name} | ${slot.description} |\n`).join('')}\n`;
};

const createCssPropsTable = (
  slots: { name: string; default: string; description: string }[],
): string => {
  return `### CSS Properties

| Name | Default | Description |
| --- | --- | --- |
${slots.map((slot) => `| ${slot.name} | ${slot.default} | ${slot.description} |\n`).join('')}\n`;
};

const createCssPartsTable = (slots: { name: string; description: string }[]): string => {
  return `### CSS Parts

| Name | Description |
| --- | --- |
${slots.map((slot) => `| ${slot.name} | ${slot.description} |\n`).join('')}\n`;
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

appendAdditionalInformation(documentation);
await generateApiFiles('angular');
await generateApiFiles('angular-experimental');
