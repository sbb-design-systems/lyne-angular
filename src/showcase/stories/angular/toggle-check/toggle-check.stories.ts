import { SbbToggleCheck } from '@sbb-esta/lyne-angular/toggle-check';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm'],
};

const label: InputType = {
  control: {
    type: 'text',
  },
};

const labelPosition: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['before', 'after'],
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const required: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  size,
  label,
  labelPosition,
  value,
  ariaLabel,
  required,
};

const args: Args = {
  size: size.options![1],
  label: 'Label',
  labelPosition: labelPosition.options![1],
  checked: false,
  disabled: false,
  name: 'name',
  value: 'Value',
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-toggle/sbb-toggle-check',
  component: SbbToggleCheck,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `<sbb-toggle-check ${argsToTemplate(args)}>${label}</sbb-toggle-check>`,
  }),
};
export default meta;

export const Default = {};
