import { SbbMenuButton } from '@sbb-esta/lyne-angular/menu/menu-button';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

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
  table: {
    category: 'Button',
  },
};

const argTypes: ArgTypes = {
  text,
  type,
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
        <sbb-menu-button ${spreadArgs(args)}>${text} 1</sbb-menu-button>
        <sbb-menu-button ${spreadArgs(args)}>${text} 2</sbb-menu-button>
        <sbb-menu-button ${spreadArgs(args)}>${text} 3</sbb-menu-button>
      </div>
      `,
  }),
};
export default meta;

export const Default = {};
