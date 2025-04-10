import { SbbHeaderLink } from '@sbb-esta/lyne-angular/header/header-link';
import { breakpoints } from '@sbb-esta/lyne-elements/core/dom.js';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const accessibilityCurrent: InputType = {
  control: false,
  table: { disable: true },
};

const text: InputType = {
  control: {
    type: 'text',
  },
};

const hrefs = ['https://www.sbb.ch', 'https://github.com/sbb-design-systems/lyne-components'];
const href: InputType = {
  options: Object.keys(hrefs),
  mapping: hrefs,
  control: {
    type: 'select',
    labels: {
      0: 'sbb.ch',
      1: 'GitHub Lyne Components',
    },
  },
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

const argTypes: ArgTypes = {
  text,
  href,
  expandFrom,
  active,
  accessibilityCurrent,
};

const args: Args = {
  text: 'Menu',
  href: href.options![0],
  expandFrom: expandFrom.options![0],
  iconName: 'hamburger-menu-small',
  target: '_blank',
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-header/sbb-header-link',
  component: SbbHeaderLink,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ active, text, ...args }: Args) => ({
    props: { active, text, ...args },
    template: `
      <sbb-header-link ${argsToTemplate(args)} ${active ? 'class="sbb-active"' : ''}>
        ${text}
      </sbb-header-link>
    `,
  }),
};
export default meta;

export const Default = {};
