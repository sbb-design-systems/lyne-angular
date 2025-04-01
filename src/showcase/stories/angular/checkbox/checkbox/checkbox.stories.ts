import { SbbCheckbox } from '@sbb-esta/lyne-angular/checkbox/checkbox';
import { withActions } from '@storybook/addon-actions/decorator';
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
  render: ({ label, ariaLabel, ...args }: Args) => ({
    props: { label, ariaLabel, ...args },
    template: `
      <sbb-checkbox ${argsToTemplate(args)} ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}>
        ${label}
      </sbb-checkbox>
    `,
  }),
};
export default meta;

export const Default = {};
