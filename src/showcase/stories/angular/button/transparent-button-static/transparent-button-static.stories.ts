import { SbbTransparentButtonStatic } from '@sbb-esta/lyne-angular/button/transparent-button-static';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../helpers/spread-args';

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
  title: 'elements/sbb-button/sbb-transparent-button-static',
  component: SbbTransparentButtonStatic,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-iron)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ...args }: Args) => ({
    props: { text, ...args },
    template: `<sbb-transparent-button-static ${spreadArgs(args)}>${text}</sbb-transparent-button-static>`,
  }),
};
export default meta;

export const Default = {};
