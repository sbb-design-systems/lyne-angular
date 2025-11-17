import { EXAMPLE_COMPONENTS } from './example-module';

/**
 * Example data with information about component name, selector, files used in
 * example, and path to examples.
 */
export class ExampleData {
  /** Id */
  id: string;

  /** Name of the example (matches the component type e.g. "AccordionBasicExample") */
  name: string;

  /** Description of the example. e.g. "Accordion Basic Example" */
  description: string;

  /** List of files that are part of this example. */
  exampleFiles: string[];

  /** Selector name of the example component. */
  selectorName: string;

  /** Name of the file that contains the example component. */
  // TODO: check if needed
  importPath: string;

  /** Names of the components being used in this example. */
  // TODO: check if needed
  componentNames: string[];

  static find(library: string, id: string, module?: string): ExampleData[] {
    return (EXAMPLE_COMPONENTS[module ? `${module}/${id}` : id] || []).map(
      (example) =>
        new ExampleData(library, id, typeof example === 'string' ? { id: example } : example),
    );
  }

  constructor(library: string, id: string, example: Partial<ExampleData>) {
    const exampleName = example.id!.replace(/^\w|\b\w/g, (letter) => letter.toUpperCase());

    this.id = example.id!;
    this.name = example.name ?? exampleName.replace(/-+/g, '') + 'Example';
    this.exampleFiles = example.exampleFiles ?? [
      `${example.id}-example.html`,
      `${example.id}-example.ts`,
    ];
    this.selectorName = example.selectorName ?? `sbb-${example}-example`;
    this.importPath = example.importPath ?? `../${library}/examples/${id}`;
    this.description = example.description ?? exampleName.replace(/-+/g, ' ') + ' Example';
    this.componentNames = example.componentNames ?? [this.name];
  }
}
