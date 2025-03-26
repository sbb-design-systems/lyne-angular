import { SbbHeaderButton } from '@sbb-esta/lyne-angular/header/header-button';
import { breakpoints } from '@sbb-esta/lyne-elements/core/dom.js';
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

const expandFrom: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [...breakpoints],
};

const active: InputType = {
  control: {
    type: 'boolean',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  text,
  type,
  expandFrom,
  active,
  value,
};

const args: Args = {
  text: 'Menu',
  type: type.options![0],
  expandFrom: expandFrom.options![0],
  iconName: 'hamburger-menu-small',
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-header/sbb-header-button',
  component: SbbHeaderButton,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ active, text, ...args }: Args) => ({
    props: { active, text, ...args },
    template: `
      <sbb-header-button ${argsToTemplate(args)} class=${active ? 'sbb-active' : ''}>
        ${text}
      </sbb-header-button>
    `,
  }),
};
export default meta;

export const Default = {};
