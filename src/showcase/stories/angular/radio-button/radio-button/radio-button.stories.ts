import { SbbRadioButton } from '@sbb-esta/lyne-angular/radio-button/radio-button';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

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
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `
      <sbb-radio-button ${argsToTemplate(args)}>
        ${label}
      </sbb-radio-button>
    `,
  }),
};
export default meta;

export const Default = {};
