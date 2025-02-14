import { SbbHeaderLink } from '@sbb-esta/lyne-angular/header/header-link';
import { breakpoints } from '@sbb-esta/lyne-elements/core/dom.js';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

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
  'expand-from': expandFrom,
  active,
};

const args: Args = {
  text: 'Menu',
  href: href.options![0],
  'expand-from': expandFrom.options![0],
  'icon-name': 'hamburger-menu-small',
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
  render: ({ active, text, ...args }) => ({
    props: { active, text, ...args },
    template: `
      <sbb-header-link ${spreadArgs(args)} class=${active ? 'sbb-active' : ''}>
        ${text}
      </sbb-header-link>
    `,
  }),
};
export default meta;

export const Default = {};
