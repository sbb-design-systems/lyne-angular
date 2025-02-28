import { SbbTag } from '@sbb-esta/lyne-angular/tag/tag';
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
  options: ['s', 'm'],
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  label,
  size,
  type,
  value,
};

const args: Args = {
  label: 'Label',
  size: size.options![1],
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
