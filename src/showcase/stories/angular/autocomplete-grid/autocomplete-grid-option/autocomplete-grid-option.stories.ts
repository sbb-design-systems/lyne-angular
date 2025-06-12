import { SbbAutocompleteGrid } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid';
import { SbbAutocompleteGridOption } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-option';
import { SbbAutocompleteGridRow } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-row';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { InputType, StoryContext } from 'storybook/internal/types';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const selected: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

export const Standalone = {
  argTypes: { selected },
  render: ({ value, ...args }: Args) => ({
    props: { value, ...args },
    template: `
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value='{{value}} - 1' ${argsToTemplate(args)}>Option 1</sbb-autocomplete-grid-option>
      </sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value='{{value}} - 2' ${argsToTemplate(args)}>Option 2</sbb-autocomplete-grid-option>
      </sbb-autocomplete-grid-row>
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value='{{value}} - 3' ${argsToTemplate(args)}>Option 3</sbb-autocomplete-grid-option>
      </sbb-autocomplete-grid-row>
    `,
  }),
};

export const Autocomplete = {
  argTypes: { negative, selected },
  render: ({ value, negative, ...args }: Args) => ({
    props: { value, negative, ...args },
    template: `
      <sbb-form-field [negative]="negative">
        <label>sbb-autocomplete-grid</label>
        <input placeholder="Please select." />
        <sbb-autocomplete-grid>
          <sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-option value='{{value}} - 1' ${argsToTemplate(args)}>Option 1</sbb-autocomplete-grid-option>
          </sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-option value='{{value}} - 2' ${argsToTemplate(args)}>Option 2</sbb-autocomplete-grid-option>
          </sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-option value='{{value}} - 3' ${argsToTemplate(args)}>Option 3</sbb-autocomplete-grid-option>
          </sbb-autocomplete-grid-row>
        </sbb-autocomplete-grid>
      </sbb-form-field>
    `,
  }),
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbFormField, SbbAutocompleteGridRow, SbbAutocompleteGrid],
    }),
  ],
  title: 'elements/sbb-autocomplete-grid/sbb-autocomplete-grid-option',
  component: SbbAutocompleteGridOption,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
};
export default meta;
