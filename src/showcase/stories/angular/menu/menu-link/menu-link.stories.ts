import { SbbMenuLink } from '@sbb-esta/lyne-angular/menu/menu-link';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from '@storybook/types';

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

const amount: InputType = {
  control: false,
  table: { disable: true },
};

const accessibilityCurrent: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  text,
  badge,
  href,
  amount,
  accessibilityCurrent,
};

const args: Args = {
  text: 'Details',
  badge: '9',
  iconName: 'tick-small',
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
  render: ({ text, badge, ...args }: Args) => ({
    props: { text, badge, ...args },
    template: `
      <div style="width: 256px;">
       <sbb-menu-link ${argsToTemplate(args)} ${!args['disabled'] && badge ? `sbb-badge="${badge}"` : ''}>
          ${text} 1
        </sbb-menu-link>
        <sbb-menu-link ${argsToTemplate(args)} ${!args['disabled'] && badge ? `sbb-badge="${badge}"` : ''}>
          ${text} 2
        </sbb-menu-link>
        <sbb-menu-link ${argsToTemplate(args)} ${!args['disabled'] && badge ? `sbb-badge="${badge}"` : ''}>
          ${text} 3
        </sbb-menu-link>
      </div>
    `,
  }),
};
export default meta;

export const Default = {};
