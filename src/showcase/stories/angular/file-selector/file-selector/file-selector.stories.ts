import { SbbFileSelector } from '@sbb-esta/lyne-angular/file-selector/file-selector';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const multipleMode: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'persistent'],
};

const argTypes: ArgTypes = {
  size,
  'multiple-mode': multipleMode,
};

const args: Args = {
  size: size.options![0],
  'multiple-mode': multipleMode.options![0],
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-file-selector/sbb-file-selector',
  component: SbbFileSelector,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: (args) => ({
    props: { ...args },
    template: `<sbb-file-selector ${spreadArgs(args)}></sbb-file-selector>`,
  }),
};
export default meta;

export const Default = {};
