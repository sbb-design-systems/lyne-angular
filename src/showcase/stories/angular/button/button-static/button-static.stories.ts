import { SbbButtonStatic } from '@sbb-esta/lyne-angular/button/button-static';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from '@storybook/types';

const text: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm', 's'],
};

const argTypes: ArgTypes = {
  text,
  size,
};

const args: Args = {
  text: 'Button',
  size: size.options![0],
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-button/sbb-button-static',
  component: SbbButtonStatic,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-iron)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ...args }: Args) => ({
    props: { text, ...args },
    template: `<sbb-button-static ${argsToTemplate(args)}>${text}</sbb-button-static>`,
  }),
};
export default meta;

export const Default = {};
