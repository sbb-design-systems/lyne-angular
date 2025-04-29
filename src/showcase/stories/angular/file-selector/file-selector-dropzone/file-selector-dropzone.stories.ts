import { SbbFileSelectorDropzone } from '@sbb-esta/lyne-angular/file-selector/file-selector-dropzone';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

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

const name: InputType = {
  control: false,
  table: { disable: true },
};

const value: InputType = {
  control: false,
  table: { disable: true },
};

const files: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  size,
  multipleMode,
  name,
  value,
  files,
};

const args: Args = {
  size: size.options![0],
  multipleMode: multipleMode.options![0],
  titleContent: 'Title',
  accessibilityLabel: 'Select from hard disk',
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-file-selector/sbb-file-selector-dropzone',
  component: SbbFileSelectorDropzone,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-file-selector-dropzone ${argsToTemplate(args)}></sbb-file-selector-dropzone>`,
  }),
};
export default meta;

export const Default = {};
