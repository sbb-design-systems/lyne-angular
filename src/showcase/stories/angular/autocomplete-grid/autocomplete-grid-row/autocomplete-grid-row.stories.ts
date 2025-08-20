import { SbbAutocompleteGridCell } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-cell';
import { SbbAutocompleteGridOptgroup } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-optgroup';
import { SbbAutocompleteGridOption } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-option';
import { SbbAutocompleteGridRow } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-row';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const argTypes: ArgTypes = {
  negative,
};

const args: Args = {
  negative: false,
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbAutocompleteGridCell, SbbAutocompleteGridOptgroup, SbbAutocompleteGridOption],
    }),
  ],
  title: 'elements/sbb-autocomplete-grid/sbb-autocomplete-grid-row',
  component: SbbAutocompleteGridRow,
  argTypes,
  args,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-autocomplete-grid-row ${args['negative'] ? 'data-negative' : ''}>
        <sbb-autocomplete-grid-option>Opt 1</sbb-autocomplete-grid-option>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button iconName="pie-small" [negative]=${args['negative']}></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-row ${args['negative'] ? 'data-negative' : ''}>
        <sbb-autocomplete-grid-option>Opt 2</sbb-autocomplete-grid-option>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button iconName="dog-small" [negative]=${args['negative']}></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
    `,
  }),
};
export default meta;

export const Default = {};
