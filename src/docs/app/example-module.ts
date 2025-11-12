import type { ExampleData } from './example-data';

export const EXAMPLE_COMPONENTS: Record<string, (string | Partial<ExampleData>)[]> = {
  accordion: ['accordion-basic'],
};

export async function loadExample(id: string): Promise<unknown> {
  switch (id) {
    case 'accordion-basic':
      return import('./angular/examples/accordion');
    default:
      return undefined;
  }
}
