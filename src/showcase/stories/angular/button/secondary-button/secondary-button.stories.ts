import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

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

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
  },
};

const argTypes: ArgTypes = {
  text,
  size,
  type,
};

const args: Args = {
  text: 'Button',
  size: size.options![0],
  type: type.options![0],
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-button/sbb-secondary-button',
  component: SbbSecondaryButton,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-iron)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ...args }) => ({
    props: { text, ...args },
    template: `<sbb-secondary-button ${spreadArgs(args)}>${text}</sbb-secondary-button>`,
  }),
};
export default meta;

export const Default = {};
