import { SbbDialogTitle } from '@sbb-esta/lyne-angular/dialog/dialog-title';
import { breakpoints } from '@sbb-esta/lyne-elements/core/dom.js';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const hideOnScroll: InputType = {
  control: {
    type: 'select',
  },
  options: [...breakpoints],
};

const argTypes: ArgTypes = {
  level,
  'hide-on-scroll': hideOnScroll,
};

const args: Args = {
  'hide-on-scroll': hideOnScroll.options![0],
  'back-button': true,
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
