import { SbbAutocomplete } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { SbbOptGroup } from '@sbb-esta/lyne-angular/option/optgroup';
import { SbbOption } from '@sbb-esta/lyne-angular/option/option';
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

const iconName: InputType = {
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
  iconName,
  disableOption,
  disableGroup,
};

const args: Args = {
  negative: false,
  disabled: false,
  readonly: false,
  borderless: false,
  size: size.options![0],
  floatingLabel: false,
  iconName: 'clock-small',
  disableOption: false,
  disableGroup: false,
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbFormField, SbbOptGroup, SbbOption],
    }),
  ],
  title: 'elements/sbb-autocomplete',
  component: SbbAutocomplete,
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
    iconName,
    disableOption,
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
      iconName,
      disableOption,
      disableGroup,
      ...args,
    },
    template: `
      <sbb-form-field [negative]=${negative} [borderless]=${borderless} [floating-label]=${floatingLabel} size=${size}>
        <label>Label</label>
        <input [disabled]=${disabled} [readonly]=${readonly} />
        <sbb-autocomplete ${argsToTemplate(args)}>
          <sbb-optgroup disabled=${disableGroup} label="Group 1">
            <sbb-option icon-name=${iconName} disabled=${disableOption} value="1">Value 1</sbb-option>
            <sbb-option icon-name=${iconName} value="2">Value 2</sbb-option>
          </sbb-optgroup>
          <sbb-optgroup label="Group 2">
            <sbb-option icon-name=${iconName} value="3">Value 3</sbb-option>
            <sbb-option icon-name=${iconName} value="4">Value 4</sbb-option>
          </sbb-optgroup>
        </sbb-autocomplete>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
