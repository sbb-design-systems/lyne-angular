import { SbbMenuButton } from '@sbb-esta/lyne-angular/menu/menu-button';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const text: InputType = {
  control: {
    type: 'text',
  },
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
  text,
  type,
  value,
};

const args: Args = {
  text: 'Details',
  amount: '99',
  'icon-name': 'tick-small',
  type: type.options![0],
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-menu/sbb-menu-button',
  component: SbbMenuButton,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: () => 'var(--sbb-color-black)',
  },
  argTypes,
  args,
  render: ({ text, ...args }: Args) => ({
    props: { text, ...args },
    template: `
      <div style="width: 256px;">
        <sbb-menu-button ${argsToTemplate(args)}>${text} 1</sbb-menu-button>
        <sbb-menu-button ${argsToTemplate(args)}>${text} 2</sbb-menu-button>
        <sbb-menu-button ${argsToTemplate(args)}>${text} 3</sbb-menu-button>
      </div>
      `,
  }),
};
export default meta;

export const Default = {};
