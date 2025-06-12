import { SbbCheckbox } from '@sbb-esta/lyne-angular/checkbox/checkbox';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
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
  options: ['m', 's', 'xs'],
};

const iconPlacement: InputType = {
  control: {
    type: 'select',
  },
  options: ['start', 'end'],
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

const argTypes: ArgTypes = {
  label,
  size,
  iconPlacement,
  value,
  ariaLabel,
};

const args: Args = {
  label: 'Label',
  size: size.options![1],
  iconPlacement: undefined,
  checked: false,
  indeterminate: false,
  disabled: false,
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-checkbox/sbb-checkbox',
  component: SbbCheckbox,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `
      <sbb-checkbox ${argsToTemplate(args)}>
        ${label}
      </sbb-checkbox>
    `,
  }),
};
export default meta;

export const Default = {};
