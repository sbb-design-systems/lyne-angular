/**
 * Script based on the `generate-component` script of `lyne-components`.
 *
 * Given a path as `component/example-name`, it creates an example under the `component` folder;
 * the content is taken from the files under the 'boilerplate' folder.
 * If the style file is needed, the `--scss` flag can be used.
 * The `lint:fix` command is run as child process to correctly export the component and update the example data.
 *
 * The command can be used with a full path, so:
 *
 * `yarn generate-example alert/alert-variants`
 *
 * otherwise, since the example name must have the same prefix of the folder name, with the shorthand:
 *
 * `yarn generate alert/variants`
 *
 * For both commands the same structure is generated:
 *
 * ├─ alert/
 *    └─ alert-variants/
 *        ├─ alert-variants.html
 *        └─ alert-variants.ts
 *
 * Example with style:
 * `yarn generate clock/basic --scss`
 *
 * ├─clock/
 *   └─ clock-basic/
 *      ├─ clock-basic-example.html
 *      ├─ clock-basic-example.scss
 *      └─ clock-basic-example.ts
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BOILERPLATE_DIR = join(__dirname, 'boilerplate');
const EXAMPLES_BASE_DIR = 'src/docs/app/angular/examples';

function parseArgs(args: string[]): { inputPath: string; includeScss: boolean } {
  const includeScss = args.includes('--scss');
  const inputPath = args.find((arg) => !arg.startsWith('--')) || '';

  return { inputPath, includeScss };
}

function convertKebabCaseToPascalCase(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function normalizeInputPath(inputPath: string): {
  componentName: string;
  exampleFolderName: string;
} {
  const segments = inputPath.split('/').filter(Boolean);

  if (segments.length !== 2) {
    throw new Error(
      `Invalid path "${inputPath}". Use "component/basic" or "component/component-basic".`,
    );
  }

  const [componentName, rawExampleName] = segments;
  const exampleFolderName = rawExampleName.startsWith(`${componentName}-`)
    ? rawExampleName
    : `${componentName}-${rawExampleName}`;

  return { componentName, exampleFolderName };
}

function generateExample(inputPath: string, includeScss: boolean): void {
  if (!inputPath) {
    console.error('Usage: yarn generate-example <path> [--scss]');
    console.error('Example: yarn generate-example accordion/basic');
    console.error('Also supported: yarn generate-example accordion/accordion-basic');
    console.error('Example with style: yarn generate-example accordion/accordion-basic --scss');
    process.exit(1);
  }

  const { componentName, exampleFolderName } = normalizeInputPath(inputPath);
  const exampleName = `${exampleFolderName}-example`;
  const exampleNameUpperCase = convertKebabCaseToPascalCase(exampleName);

  // Resolve target directory under src/docs/app/angular/examples
  const targetDirectory = join(EXAMPLES_BASE_DIR, componentName, exampleFolderName);
  if (existsSync(targetDirectory)) {
    throw new Error(`Folder ${targetDirectory} already exists.`);
  }

  // Create target directory and files
  mkdirSync(targetDirectory, { recursive: true });
  const boilerplateFiles = readdirSync(BOILERPLATE_DIR);
  for (const file of boilerplateFiles) {
    const sourcePath = join(BOILERPLATE_DIR, file);
    let content = readFileSync(sourcePath, 'utf8');

    // If --scss flag is not provided, do not add the style and remove its reference from the .ts file.
    if (!includeScss) {
      if (file.endsWith('.scss')) {
        continue;
      }
      if (file.endsWith('.ts')) {
        content = content.replace("  styleUrl: '__name__.scss',\n", '');
      }
    }

    content = content
      .replace(/__name__/g, exampleName)
      .replace(/__nameUpperCase__/g, exampleNameUpperCase);

    const newFileName = file.replace('component', exampleName);
    const targetPath = join(targetDirectory, newFileName);

    writeFileSync(targetPath, content);
    console.log(`Created: ${targetPath}`);
  }

  console.log(`\nExample ${exampleName} created successfully in ${targetDirectory}`);

  // Run lint:fix to export the new component and to add it in example-module.ts file.
  console.log('\nRunning lint:fix...');
  execSync(`yarn lint:fix`, { stdio: 'inherit' });
}

const { inputPath, includeScss } = parseArgs(process.argv.slice(2));
generateExample(inputPath, includeScss);
