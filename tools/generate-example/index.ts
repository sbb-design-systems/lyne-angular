import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, dirname, join } from 'path';
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

function generateExample(inputPath: string, includeScss: boolean): void {
  if (!inputPath) {
    console.error('Usage: yarn generate-example <path> [--scss]');
    console.error('Example: yarn generate-example accordion/accordion-basic');
    console.error('Example with style: yarn generate-example accordion/accordion-basic --scss');
    process.exit(1);
  }

  // Extract folder name from path
  const folderName = basename(inputPath);
  const exampleName = `${folderName}-example`;
  const exampleNameUpperCase = convertKebabCaseToPascalCase(exampleName);

  // Resolve target directory under src/docs/app/angular/examples
  const targetDirectory = join(EXAMPLES_BASE_DIR, inputPath);
  if (existsSync(targetDirectory)) {
    throw new Error(`Folder "${targetDirectory}" already exists.`);
  }

  // Create target directory and files
  mkdirSync(targetDirectory, { recursive: true });
  const boilerplateFiles = readdirSync(BOILERPLATE_DIR);
  for (const file of boilerplateFiles) {
    // Skip scss files if --scss flag is not provided
    if (file.endsWith('.scss') && !includeScss) {
      continue;
    }

    const sourcePath = join(BOILERPLATE_DIR, file);
    let content = readFileSync(sourcePath, 'utf8');

    content = content
      .replace(/__name__/g, exampleName)
      .replace(/__nameUpperCase__/g, exampleNameUpperCase);

    const newFileName = file.replace('component', exampleName);
    const targetPath = join(targetDirectory, newFileName);

    writeFileSync(targetPath, content);
    console.log(`Created: ${targetPath}`);
  }

  console.log(`\nExample "${exampleName}" created successfully in "${targetDirectory}"`);

  // Run lint:fix to export the new component and to add it in example-module.ts file.
  console.log('\nRunning lint:fix...');
  execSync(`yarn lint:fix`, { stdio: 'inherit' });
}

const { inputPath, includeScss } = parseArgs(process.argv.slice(2));
generateExample(inputPath, includeScss);
