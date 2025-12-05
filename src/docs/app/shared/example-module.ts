import type { ExampleData } from './example-data';

export const EXAMPLE_COMPONENTS: Record<string, (string | Partial<ExampleData>)[]> = {
  accordion: [{ id: 'accordion-basic', hasStyle: true }],
  alert: ['alert-basic'],
  'button/mini-button': ['mini-button-basic'],
};

export async function loadExample(id: string): Promise<unknown> {
  switch (id) {
    case 'accordion-basic':
      return import('../angular/examples/accordion');
    case 'alert-basic':
      return import('../angular/examples/alert');
    case 'mini-button-basic':
      return import('../angular/examples/button/mini-button');
    default:
      console.warn(`No example found for component with id "${id}".`);
      return undefined;
  }
}
