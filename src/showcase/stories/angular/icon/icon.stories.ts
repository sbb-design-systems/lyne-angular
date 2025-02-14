import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import { Meta } from '@storybook/angular';
import { InputType } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

const iconName: InputType = {
  control: {
    type: 'select',
  },
  options: [
    'app-icon-medium',
    'train-medium',
    'swisspass-medium',
    'pie-medium',
    'chevron-small-left-small',
  ],
};

const argTypes = { name: iconName };

const args = { name: iconName.options![0] };

const meta: Meta = {
  title: 'elements/sbb-icon',
  component: SbbIcon,
  argTypes,
  args,
  render: (args) => ({
    props: { ...args },
    template: `<sbb-icon ${spreadArgs(args)}></sbb-icon>`,
  }),
};
export default meta;

export const Default = {};
