import { SbbAutocomplete } from '@sbb-esta/lyne-angular/autocomplete';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbOptGroup, SbbOption } from '@sbb-esta/lyne-angular/option';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

import readme from './readme.md';

const trigger: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const origin: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const readOnly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
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
  trigger,
  origin,
  negative,
  disabled,
  readOnly,
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
  readOnly: false,
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
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes,
  args,
  render: ({
    negative,
    borderless,
    floatingLabel,
    size,
    disabled,
    readOnly,
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
      readOnly,
      iconName,
      disableOption,
      disableGroup,
      ...args,
    },
    template: `
      <sbb-form-field [negative]="negative" [borderless]="borderless" [floatingLabel]="floatingLabel" size="size">
        <label>Label</label>
        <input [disabled]="disabled" [readOnly]="readOnly" placeholder="Please select."/>
        <sbb-autocomplete ${argsToTemplate(args)}>
          <sbb-optgroup [disabled]="disableGroup" label="Group 1">
            <sbb-option [iconName]="iconName" [disabled]="disableOption" value="1">Value 1</sbb-option>
            <sbb-option [iconName]="iconName" value="2">Value 2</sbb-option>
          </sbb-optgroup>
          <sbb-optgroup label="Group 2">
            <sbb-option [iconName]="iconName" value="3">Value 3</sbb-option>
            <sbb-option [iconName]="iconName" value="4">Value 4</sbb-option>
          </sbb-optgroup>
        </sbb-autocomplete>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
