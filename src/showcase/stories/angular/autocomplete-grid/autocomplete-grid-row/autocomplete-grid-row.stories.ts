import { SbbAutocompleteGridCell } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-cell';
import { SbbAutocompleteGridOptgroup } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-optgroup';
import { SbbAutocompleteGridOption } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-option';
import { SbbAutocompleteGridRow } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-row';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

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
  render: (args) => ({
    props: { ...args },
    template: `
      <sbb-autocomplete-grid-row [data-negative]=${args['negative']}>
        <sbb-autocomplete-grid-option>Opt 1</sbb-autocomplete-grid-option>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button icon-name="pie-small" [negative]=${args['negative']}></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-row [data-negative]=${args['negative']}>
        <sbb-autocomplete-grid-option>Opt 2</sbb-autocomplete-grid-option>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button icon-name="dog-small" [negative]=${args['negative']}></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
    `,
  }),
};
export default meta;

export const Default = {};
