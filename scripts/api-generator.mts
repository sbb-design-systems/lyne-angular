import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { basename, dirname, join, normalize, relative } from 'path';

const root = fileURLToPath(new URL('../', import.meta.url));
const documentation = JSON.parse(readFileSync(join(root, `/src/docs/documentation.json`), 'utf8'));

/**
 * The configuration object used to merge different `api` files in a single one for the angular project.
 */
const mergeConfigAngular = {
  accordion: ['accordion', 'expansion-panel', 'expansion-panel-header', 'expansion-panel-content'],
  alert: ['alert', 'alert-group'],
  'autocomplete-grid': [
    'autocomplete-grid',
    'autocomplete-grid-row',
    'autocomplete-grid-optgroup',
    'autocomplete-grid-option',
    'autocomplete-grid-cell',
    'autocomplete-grid-button',
  ],
  breadcrumb: ['breadcrumb', 'breadcrumb-group'],
  button: [
    'button',
    'button-link',
    'button-static',
    'accent-button',
    'accent-button-link',
    'accent-button-static',
    'secondary-button',
    'secondary-button-link',
    'secondary-button-static',
    'transparent-button',
    'transparent-button-link',
    'transparent-button-static',
    'mini-button',
    'mini-button-group',
  ],
  card: ['card', 'card-button', 'card-link', 'card-badge'],
  carousel: ['carousel', 'carousel-list', 'carousel-item'],
  checkbox: ['checkbox', 'checkbox-group', 'checkbox-panel'],
  chip: ['chip', 'chip-group'],
  container: ['container', 'sticky-bar'],
  dialog: ['dialog', 'dialog-title', 'dialog-content', 'dialog-actions', 'dialog-close-button'],
  'file-selector': ['file-selector', 'file-selector-dropzone'],
  'flip-card': ['flip-card', 'flip-card-summary', 'flip-card-details'],
  'form-field': ['form-field', 'form-field-clear', 'form-error'],
  header: ['header', 'header-button', 'header-link', 'header-environment'],
  'link-list': ['link-list', 'link-list-anchor'],
  link: [
    'link',
    'link-button',
    'link-static',
    'block-link',
    'block-link-button',
    'block-link-static',
  ],
  menu: ['menu', 'menu-button', 'menu-link'],
  'mini-calendar': ['mini-calendar', 'mini-calendar-month', 'mini-calendar-day'],
  navigation: [
    'navigation',
    'navigation-section',
    'navigation-list',
    'navigation-marker',
    'navigation-link',
    'navigation-button',
  ],
  option: ['option', 'optgroup', 'option-hint'],
  paginator: ['paginator', 'compact-paginator'],
  popover: ['popover', 'popover-trigger'],
  'radio-button': ['radio-button', 'radio-button-group', 'radio-button-panel'],
  sidebar: [
    'sidebar',
    'sidebar-container',
    'sidebar-content',
    'sidebar-title',
    'sidebar-close-button',
  ],
  'icon-sidebar': [
    'icon-sidebar',
    'icon-sidebar-container',
    'icon-sidebar-content',
    'icon-sidebar-button',
    'icon-sidebar-link',
  ],
  stepper: ['stepper', 'step', 'step-label'],
  table: ['table', 'table-wrapper', 'sort'],
  tab: ['tab', 'tab-group', 'tab-label'],
  tag: ['tag', 'tag-group'],
  teaser: ['teaser', 'teaser-hero', 'teaser-product', 'teaser-product-static'],
  'timetable-form': [
    'timetable-form',
    'timetable-form-field',
    'timetable-form-details',
    'timetable-form-swap-button',
  ],
  timetable: [
    'train-formation',
    'train',
    'train-wagon',
    'train-blocked-passage',
    'timetable-occupancy',
    'timetable-occupancy-icon',
  ],
  toggle: ['toggle', 'toggle-option', 'toggle-check'],
};

/**
 * The configuration object used to merge different `api` files in a single one for the angular-experimental project.
 */
const mergeConfigAngularExperimental = {
  'seat-reservation': [
    'seat-reservation-area',
    'seat-reservation-graphic',
    'seat-reservation-navigation-coach',
    'seat-reservation-navigation-services',
    'seat-reservation-place-control',
    'seat-reservation-scoped',
  ],
};

const mergeConfig: Record<string, Record<string, string[]>> = {
  angular: mergeConfigAngular,
  'angular-experimental': mergeConfigAngularExperimental,
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
const generateApiFiles = (projectFolder: string) => {
  const projectPath = join(root, 'src', projectFolder);
  const outputPath = join(root, 'src/docs/app', projectFolder, 'api');
  if (existsSync(outputPath)) {
    rmSync(outputPath, { recursive: true, force: true });
  }
  mkdirSync(outputPath, { recursive: true });
  scanFoldersAndWriteFiles(projectPath, outputPath);
  mergeFilesInModule(outputPath, mergeConfig[projectFolder]);
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

/**
 * Based on the provided `config` object, it creates a single file from several ones.
 * The config's values are mapped as `<config.value[i]>-api.md` files,
 * then these files are read and joined as a single file, named as `<config.key>-api.md`.
 * @param path the project path
 * @param config the key-values object used to generate the file
 */
const mergeFilesInModule = (path: string, config: Record<string, string[]>): void => {
  Object.entries(config).forEach(([mainFile, subFiles]: [string, string[]]) => {
    let outputDoc = '';
    subFiles
      .map((fileName) => join(path, `${fileName}-api.md`))
      .forEach((file) => {
        outputDoc += readFileSync(file, 'utf8');
        rmSync(file, { force: true });
        writeFileSync(join(path, `${mainFile}-api.md`), outputDoc, { encoding: 'utf-8' });
      });
  });
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
${entity['inputsClass']?.length > 0 ? createInputsTable(entity['inputsClass'], entity['accessors']) : ''}${entity['propertiesClass']?.length > 0 ? createOutputTable(entity) : ''}${entity['methodsClass']?.length > 0 ? createMethodsTable(entity['methodsClass']) : ''}`,
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
