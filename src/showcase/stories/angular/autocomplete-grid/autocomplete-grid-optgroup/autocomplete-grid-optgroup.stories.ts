import {
  SbbAutocompleteGrid,
  SbbAutocompleteGridButton,
  SbbAutocompleteGridCell,
  SbbAutocompleteGridOptgroup,
  SbbAutocompleteGridOption,
  SbbAutocompleteGridRow,
} from '@sbb-esta/lyne-angular/autocomplete-grid';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const disabledSingle: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const argTypes: ArgTypes = {
  iconName,
  disabledSingle,
  negative,
};

const args: Args = {
  label: 'Option group',
  disabled: false,
  iconName: undefined,
  disabledSingle: false,
  negative: false,
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbFormField,
        SbbAutocompleteGrid,
        SbbAutocompleteGridOption,
        SbbAutocompleteGridRow,
        SbbAutocompleteGridCell,
        SbbAutocompleteGridButton,
      ],
    }),
  ],
  title: 'elements/sbb-autocomplete-grid/sbb-autocomplete-grid-optgroup',
  component: SbbAutocompleteGridOptgroup,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative']
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
  },
  argTypes,
  args,
  render: ({ label, iconName, disabled, disabledSingle, negative, ...args }: Args) => ({
    props: { label, iconName, disabled, disabledSingle, negative, ...args },
    template: `
      <sbb-form-field [negative]="negative">
        <label>Autocomplete</label>
        <input placeholder="Placeholder" />
        <sbb-autocomplete-grid>
          <sbb-autocomplete-grid-optgroup label="{{label}} 1" [disabled]="disabled">
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option [disabled]="disabledSingle" value="1">
                Option 1
              </sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button [disabled]="disabledSingle" [iconName]="iconName"></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="2">
                Option 2
              </sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button iconName="star-small"></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid-optgroup>
          <sbb-autocomplete-grid-optgroup label="{{label}} 2">
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="3">
                Option 3
              </sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button iconName="dog-small"></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid-optgroup>
        </sbb-autocomplete-grid>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
