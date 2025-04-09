import { SbbFileSelector } from '@sbb-esta/lyne-angular/file-selector/file-selector';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

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

const files: InputType = {
  control: false,
  table: { disable: true },
};

const name: InputType = {
  control: false,
  table: { disable: true },
};

const value: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  size,
  multipleMode,
  files,
  name,
  value,
};

const args: Args = {
  size: size.options![0],
  multipleMode: multipleMode.options![0],
  accessibilityLabel: 'Select from hard disk',
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
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-file-selector ${argsToTemplate(args)}></sbb-file-selector>`,
  }),
};
export default meta;

export const Default = {};
