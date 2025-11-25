import { SbbError } from '@sbb-esta/lyne-angular/form-field';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

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
  negative: false,
};

const meta: Meta = {
  title: 'elements/sbb-form-field/sbb-form-error',
  component: SbbError,
  argTypes,
  args,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative']
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
  },
  render: ({ errorText, ...args }: Args) => ({
    props: { errorText, ...args },
    template: `<sbb-error ${argsToTemplate(args)}>${errorText}</sbb-error>`,
  }),
};
export default meta;

export const Default = {};
