import { SbbSecondaryButtonLink } from '@sbb-esta/lyne-angular/button/secondary-button-link';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType, StoryContext } from '@storybook/types';

import { spreadArgs } from '../../../../tools/spread-args';

const text: InputType = { control: { type: 'text' } };

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
  table: {
    category: 'Link',
  },
};

const argTypes: ArgTypes = {
  text,
  href,
};

const args: Args = {
  text: 'Button',
  href: href.options![0],
  target: '_blank',
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-button/sbb-secondary-button-link',
  component: SbbSecondaryButtonLink,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-iron)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ...args }) => ({
    props: { text, ...args },
    template: `<sbb-secondary-button-link ${spreadArgs(args)}>${text}</sbb-secondary-button-link>`,
  }),
};
export default meta;

export const Default = {};
