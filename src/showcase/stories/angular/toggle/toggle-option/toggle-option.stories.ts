import { SbbToggleOption } from '@sbb-esta/lyne-angular/toggle/toggle-option';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  label,
};

const args: Args = {
  label: 'Option',
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
