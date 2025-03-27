import { SbbSidebarCloseButton } from '@sbb-esta/lyne-angular/sidebar/sidebar-close-button';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

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
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  size,
  type,
  value,
};

const args: Args = {
  size: size.options![0],
  type: type.options![0],
};

const meta: Meta = {
  title: 'elements/sbb-sidebar/sbb-sidebar-close-button',
  component: SbbSidebarCloseButton,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-sidebar-close-button ${argsToTemplate(args)}></sbb-sidebar-close-button>`,
  }),
};
export default meta;

export const Default = {};
