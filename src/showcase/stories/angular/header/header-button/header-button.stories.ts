import { SbbHeaderButton } from '@sbb-esta/lyne-angular/header';
import { breakpoints } from '@sbb-esta/lyne-elements/core/dom.js';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

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

const ariaLabel: InputType = {
  control: { type: 'text' },
};

const argTypes: ArgTypes = {
  text,
  type,
  expandFrom,
  active,
  value,
  ariaLabel,
};

const args: Args = {
  text: 'Menu',
  type: type.options![0],
  expandFrom: expandFrom.options![0],
  active: false,
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
      <sbb-header-button ${active ? 'class="sbb-active"' : ''}${argsToTemplate(args)}>
        ${text}
      </sbb-header-button>
    `,
  }),
};
export default meta;

export const Default = {};
