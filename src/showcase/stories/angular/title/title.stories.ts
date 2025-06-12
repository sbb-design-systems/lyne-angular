import { SbbTitle } from '@sbb-esta/lyne-angular/title';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const text: InputType = {
  control: {
    type: 'text',
  },
};

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const argTypes: ArgTypes = {
  text,
  level,
  visualLevel: level,
};

const args: Args = {
  text: 'Data without insights are trivial, and insights without action are pointless',
  level: level.options![0],
  negative: false,
  visuallyHidden: false,
};

const meta: Meta = {
  title: 'elements/sbb-title',
  component: SbbTitle,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ...args }: Args) => ({
    props: { text, ...args },
    template: `<sbb-title ${argsToTemplate(args)}>${text}</sbb-title>`,
  }),
};
export default meta;

export const Default = {};
