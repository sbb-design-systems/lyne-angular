import { SbbAutocompleteGrid } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid';
import { SbbAutocompleteGridButton } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-button';
import { SbbAutocompleteGridCell } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-cell';
import { SbbAutocompleteGridOptgroup } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-optgroup';
import { SbbAutocompleteGridOption } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-option';
import { SbbAutocompleteGridRow } from '@sbb-esta/lyne-angular/autocomplete-grid/autocomplete-grid-row';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input',
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

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
  table: {
    category: 'Form field',
  },
};

const floatingLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const optionIconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const disableOption: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const buttonIconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const disableGroup: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const argTypes: ArgTypes = {
  negative,
  disabled,
  readonly,
  borderless,
  size,
  floatingLabel,
  optionIconName,
  disableOption,
  buttonIconName,
  disableGroup,
};

const args: Args = {
  negative: false,
  disabled: false,
  readonly: false,
  borderless: false,
  size: size.options![0],
  floatingLabel: false,
  optionIconName: 'clock-small',
  disableOption: false,
  buttonIconName: 'pen-small',
  disableGroup: false,
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbAutocompleteGridButton,
        SbbAutocompleteGridCell,
        SbbAutocompleteGridOptgroup,
        SbbAutocompleteGridOption,
        SbbAutocompleteGridRow,
        SbbFormField,
      ],
    }),
  ],
  title: 'elements/sbb-autocomplete-grid/sbb-autocomplete-grid',
  component: SbbAutocompleteGrid,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({
    negative,
    borderless,
    floatingLabel,
    size,
    disabled,
    readonly,
    optionIconName,
    disableOption,
    buttonIconName,
    disableGroup,
    ...args
  }: Args) => ({
    props: {
      negative,
      borderless,
      floatingLabel,
      size,
      disabled,
      readonly,
      optionIconName,
      disableOption,
      buttonIconName,
      disableGroup,
      ...args,
    },
    template: `
      <sbb-form-field
        [negative]=${negative}
        [borderless]=${borderless}
        [size]=${size}
        [floating-label]=${floatingLabel}
      >
        <label>Label</label>
        <input
          placeholder="Placeholder"
          aria-label="Listed options have extra buttons, use arrow keys to reach them."
          [disabled]=${disabled}
          [readonly]=${readonly}
        />
        <sbb-autocomplete-grid ${argsToTemplate(args)}>
          <sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-option value="Current location" icon-name="gps-small">Current location</sbb-autocomplete-grid-option>
          </sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-optgroup label="Group 1">
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="1" icon-name=${optionIconName} disabled=${disableOption}>Option 1-1</sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button icon-name=${buttonIconName} aria-label=${buttonIconName}></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="2" icon-name=${optionIconName}>Option 1-2</sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button icon-name=${buttonIconName} aria-label=${buttonIconName}></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
          </sbb-autocomplete-grid-optgroup>
          <sbb-autocomplete-grid-optgroup label="Group 2" disabled=${disableGroup}>
          <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="3" icon-name=${optionIconName}>Option 2-3</sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button icon-name=${buttonIconName} aria-label=${buttonIconName}></sbb-autocomplete-grid-button>
              </sbb-autocomplete-grid-cell>
            </sbb-autocomplete-grid-row>
            <sbb-autocomplete-grid-row>
              <sbb-autocomplete-grid-option value="4">Option 2-4</sbb-autocomplete-grid-option>
              <sbb-autocomplete-grid-cell>
                <sbb-autocomplete-grid-button icon-name=${buttonIconName} aria-label=${buttonIconName}></sbb-autocomplete-grid-button>
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
