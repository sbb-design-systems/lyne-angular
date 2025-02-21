import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { SbbTimeInput } from '@sbb-esta/lyne-angular/time-input';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Native input',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
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

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'],
  table: {
    category: 'Form-field',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field',
  },
};

const optional: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const iconStart: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field',
  },
};

const iconEnd: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field',
  },
};

const argTypes: ArgTypes = {
  value,
  disabled,
  readonly,
  required,
  negative,
  label,
  size,
  optional,
  borderless,
  iconStart,
  iconEnd,
};

const args: Args = {
  value: '12:00',
  label: 'Label',
  size: size.options![1],
  iconStart: 'clock-small',
  iconEnd: 'circle-information-small',
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormField, SbbIcon],
    }),
  ],
  title: 'elements/sbb-time-input',
  component: SbbTimeInput,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  // FIXME https://github.com/sbb-design-systems/lyne-components/issues/3415
  render: ({ size, optional, borderless, negative, label, iconStart, iconEnd, ...args }) => ({
    props: { size, optional, borderless, negative, label, iconStart, iconEnd, ...args },
    template: `
      <sbb-form-field size=${size} [optional]=${optional} [borderless]=${borderless} [negative]=${negative} width="collapse">
        ${label ? `<label>${label}</label>` : ''}
        ${iconStart ? `<sbb-icon slot="prefix" name=${iconStart}></sbb-icon>` : ''}
        <input ${spreadArgs(args)}>
        <sbb-time-input></sbb-time-input>
        ${iconEnd ? `<sbb-icon slot="suffix" name=${iconEnd}></sbb-icon>` : ''}
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
