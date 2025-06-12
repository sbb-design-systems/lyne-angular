import { SbbTag } from '@sbb-esta/lyne-angular/tag/tag';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm'],
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

const type: InputType = {
  control: false,
  table: { disable: true },
};

const form: InputType = {
  control: false,
  table: { disable: true },
};

const name: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  label,
  size,
  type,
  value,
  form,
  name,
  ariaLabel,
};

const args: Args = {
  label: 'Label',
  value: 'Value',
  size: size.options![1],
  checked: false,
  disabled: false,
  disabledInteractive: false,
};

const meta: Meta = {
  title: 'elements/sbb-tag/sbb-tag',
  component: SbbTag,
  argTypes,
  args,
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `<sbb-tag ${argsToTemplate(args)}>${label}</sbb-tag>`,
  }),
};
export default meta;

export const Default = {};
