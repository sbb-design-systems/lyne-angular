import { SbbTabLabel } from '@sbb-esta/lyne-angular/tabs/tab-label';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

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
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const argTypes: ArgTypes = {
  label,
  'icon-name': iconName,
  amount,
  level,
};

const args: Args = {
  label: 'Tab title',
  'icon-name': iconName.options![0],
  amount: 123,
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
