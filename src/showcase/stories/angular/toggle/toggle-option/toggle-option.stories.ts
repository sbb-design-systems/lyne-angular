import { SbbToggleOption } from '@sbb-esta/lyne-angular/toggle/toggle-option';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  label,
  ariaLabel,
};

const args: Args = {
  label: 'Option',
  value: 'Value',
  checked: false,
  disabled: false,
};

const meta: Meta = {
  title: 'elements/sbb-toggle/sbb-toggle-option',
  component: SbbToggleOption,
  argTypes,
  args,
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `<sbb-toggle-option ${argsToTemplate(args)}>${label}</sbb-toggle-option>`,
  }),
};
export default meta;

export const Default = {};
