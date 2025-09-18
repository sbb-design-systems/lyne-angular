import { SbbSidebarCloseButton } from '@sbb-esta/lyne-angular/sidebar';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const disabledControl: InputType = {
  control: false,
  table: { disable: true },
};

const size: InputType = disabledControl;
const type: InputType = disabledControl;
const disabled: InputType = disabledControl;
const disabledInteractive: InputType = disabledControl;
const form: InputType = disabledControl;
const iconName: InputType = disabledControl;
const name: InputType = disabledControl;
const negative: InputType = disabledControl;
const value: InputType = disabledControl;

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  size,
  type,
  disabled,
  disabledInteractive,
  form,
  iconName,
  name,
  negative,
  value,
  ariaLabel,
};

const meta: Meta = {
  title: 'elements/sbb-sidebar/sbb-sidebar-close-button',
  component: SbbSidebarCloseButton,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative']
        ? 'var(--sbb-background-color-1-negative)'
        : 'var(--sbb-background-color-1)',
  },
  argTypes,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-sidebar-close-button ${argsToTemplate(args)}></sbb-sidebar-close-button>`,
  }),
};
export default meta;

export const Default = {};
