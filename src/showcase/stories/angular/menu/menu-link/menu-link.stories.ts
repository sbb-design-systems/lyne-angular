import { SbbMenuLink } from '@sbb-esta/lyne-angular/menu/menu-link';
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

const argTypes: ArgTypes = {
  text,
  href,
};

const args: Args = {
  text: 'Details',
  amount: '99',
  'icon-name': 'tick-small',
  href: href.options![0],
  target: '_blank',
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-menu/sbb-menu-link',
  component: SbbMenuLink,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: () => 'var(--sbb-color-black)',
  },
  argTypes,
  args,
  render: ({ text, ...args }) => ({
    props: { text, ...args },
    template: `
      <div style="width: 256px;">
       <sbb-menu-link ${spreadArgs(args)}>${text} 1</sbb-menu-link>
       <sbb-menu-link ${spreadArgs(args)}>${text} 2</sbb-menu-link>
       <sbb-menu-link ${spreadArgs(args)}>${text} 3</sbb-menu-link>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
