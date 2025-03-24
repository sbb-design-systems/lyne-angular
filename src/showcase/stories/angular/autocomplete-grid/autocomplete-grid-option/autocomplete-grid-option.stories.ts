import { SbbAutocompleteGridOption } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-option';
import { SbbAutocompleteGridRow } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-row';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { InputType } from '@storybook/types';

const selected: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbAutocompleteGridRow],
    }),
  ],
  title: 'elements/sbb-autocomplete-grid/sbb-autocomplete-grid-option',
  component: SbbAutocompleteGridOption,
  argTypes: { selected },
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value='1' ${argsToTemplate(args)}>1</sbb-autocomplete-grid-option>
      </sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value='2' ${argsToTemplate(args)}>2</sbb-autocomplete-grid-option>
      </sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value='3' ${argsToTemplate(args)}>3</sbb-autocomplete-grid-option>
      </sbb-autocomplete-grid-row>
    `,
  }),
};
export default meta;

export const Default = {};
