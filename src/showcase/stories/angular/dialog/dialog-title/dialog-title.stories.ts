import { SbbDialogTitle } from '@sbb-esta/lyne-angular/dialog';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const visualLevel: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  level,
  visualLevel,
};

const args: Args = {
  level: 3,
  negative: false,
};

const meta: Meta = {
  title: 'elements/sbb-dialog/sbb-dialog-title',
  component: SbbDialogTitle,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-dialog-title ${argsToTemplate(args)}>Dialog title</sbb-dialog-title>`,
  }),
};
export default meta;

export const Default = {};
