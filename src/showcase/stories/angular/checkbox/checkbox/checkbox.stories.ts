import { SbbCheckbox } from '@sbb-esta/lyne-angular/checkbox/checkbox';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

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

const argTypes: ArgTypes = {
  label,
  size,
  'icon-placement': iconPlacement,
};

const args: Args = {
  label: 'Label',
  size: size.options![0],
  'icon-placement': undefined,
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
  render: ({ label, ...args }) => ({
    props: { label, ...args },
    template: `<sbb-checkbox ${spreadArgs(args)}>${label}</sbb-checkbox>`,
  }),
};
export default meta;

export const Default = {};
