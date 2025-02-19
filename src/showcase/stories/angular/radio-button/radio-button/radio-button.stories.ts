import { SbbRadioButton } from '@sbb-esta/lyne-angular/radio-button/radio-button';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's', 'xs'],
};

const argTypes: ArgTypes = {
  label,
  size,
};

const args: Args = {
  label: 'Label',
  value: 'Value',
  size: size.options![0],
};

const meta: Meta = {
  title: 'elements/sbb-radio-button/sbb-radio-button',
  component: SbbRadioButton,
  argTypes,
  args,
  render: ({ label, ...args }) => ({
    props: { label, ...args },
    template: `
      <sbb-radio-button ${spreadArgs(args)}>
        ${label}
      </sbb-radio-button>
    `,
  }),
};
export default meta;

export const Default = {};
