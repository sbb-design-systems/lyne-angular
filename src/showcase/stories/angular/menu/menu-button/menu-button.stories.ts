import { SbbMenuButton } from '@sbb-esta/lyne-angular/menu';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const text: InputType = {
  control: {
    type: 'text',
  },
};

const badge: InputType = {
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

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  badge,
  text,
  type,
  value,
  ariaLabel,
};

const args: Args = {
  text: 'Details',
  badge: '9',
  iconName: 'tick-small',
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
  render: ({ text, badge, ...args }: Args) => ({
    props: { text, badge, ...args },
    template: `
      <div style="width: 256px;">
        <sbb-menu-button ${argsToTemplate(args)} ${!args['disabled'] && badge ? `sbb-badge="${badge}"` : ''}>
          ${text} 1
        </sbb-menu-button>
        <sbb-menu-button ${argsToTemplate(args)} ${!args['disabled'] && badge ? `sbb-badge="${badge}"` : ''}>
          ${text} 2
        </sbb-menu-button>
        <sbb-menu-button ${argsToTemplate(args)} ${!args['disabled'] && badge ? `sbb-badge="${badge}"` : ''}>
          ${text} 3
        </sbb-menu-button>
      </div>
      `,
  }),
};
export default meta;

export const Default = {};
