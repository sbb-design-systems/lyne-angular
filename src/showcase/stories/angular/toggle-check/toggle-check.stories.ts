import { SbbToggleCheck } from '@sbb-esta/lyne-angular/toggle-check';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

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

const argTypes: ArgTypes = {
  size,
  label,
  'label-position': labelPosition,
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const args: Args = {
  size: size.options![1],
  label: 'Label',
  'label-position': labelPosition.options![1],
  value,
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
