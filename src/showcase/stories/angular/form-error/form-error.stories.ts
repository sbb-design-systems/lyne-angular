import { SbbFormError } from '@sbb-esta/lyne-angular/form-error';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt
quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus.`;

const errorText: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  errorText,
};

const args: Args = {
  errorText: longText,
};

const meta: Meta = {
  title: 'elements/sbb-form-error',
  component: SbbFormError,
  argTypes,
  args,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  render: ({ errorText, ...args }) => ({
    props: { errorText, ...args },
    template: `<sbb-form-error ${spreadArgs(args)}>${errorText}</sbb-form-error>`,
  }),
};
export default meta;

export const Default = {};
