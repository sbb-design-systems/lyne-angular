import { SbbFileSelectorDropzone } from '@sbb-esta/lyne-angular/file-selector/file-selector-dropzone';
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

const value: InputType = {
  control: {
    type: 'text',
  },
};

const files: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const argTypes: ArgTypes = {
  size,
  'multiple-mode': multipleMode,
  value,
  files,
};

const args: Args = {
  size: size.options![0],
  'multiple-mode': multipleMode.options![0],
  'title-content': 'Title',
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
