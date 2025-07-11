import { SbbLoadingIndicator } from '@sbb-esta/lyne-angular/loading-indicator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'l', 'xl', 'xxl', 'xxxl'],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'smoke', 'white'],
};

const argTypes: ArgTypes = {
  size,
  color,
};

const args: Args = {
  size: size.options![0],
  color: color.options![0],
};

const meta: Meta = {
  title: 'elements/sbb-loading-indicator',
  component: SbbLoadingIndicator,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['color'] === 'white' ? 'var(--sbb-color-iron)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-loading-indicator ${argsToTemplate(args)}></sbb-loading-indicator>`,
  }),
};
export default meta;

export const Default = {};
