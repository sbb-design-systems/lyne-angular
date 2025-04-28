import { SbbTabLabel } from '@sbb-esta/lyne-angular/tabs/tab-label';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'select',
  },
  options: ['app-icon-small', 'train-small', 'swisspass-small', 'pie-small'],
};

const amount: InputType = {
  control: {
    type: 'number',
  },
};

const level: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  label,
  iconName,
  amount,
  level,
};

const args: Args = {
  label: 'Tab title',
  iconName: iconName.options![0],
  amount: 123,
  active: false,
  disabled: false,
};

const meta: Meta = {
  title: 'elements/sbb-tab/sbb-tab-label',
  component: SbbTabLabel,
  argTypes,
  args,
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `
      <sbb-tab-label ${argsToTemplate(args)}>
        ${label}
      </sbb-tab-label>
    `,
  }),
};
export default meta;

export const Default = {};
