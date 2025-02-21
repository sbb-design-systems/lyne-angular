import { SbbToggleOption } from '@sbb-esta/lyne-angular/toggle/toggle-option';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../helpers/spread-args';

const label: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'select',
  },
  options: [null, 'arrow-right-small', 'app-icon-small', 'train-small', 'swisspass-small'],
};

const argTypes: ArgTypes = {
  label,
  'icon-name': iconName,
};

const args: Args = {
  label: 'Option',
  'icon-name': iconName.options![0],
};

const meta: Meta = {
  title: 'elements/sbb-toggle/sbb-toggle-option',
  component: SbbToggleOption,
  argTypes,
  args,
  render: ({ label, 'icon-name': iconName, ...args }: Args) => ({
    props: { label, 'icon-name': iconName, ...args },
    template: `<sbb-toggle-option ${iconName ? `icon-name="${iconName}"` : ''} ${spreadArgs(args)}>${label}</sbb-toggle-option>`,
  }),
};
export default meta;

export const Default = {};
