import { SbbBlockLink } from '@sbb-esta/lyne-angular/link/block-link';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from '@storybook/types';

const text: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
};

const iconPlacement: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'end'],
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

const accessibilityCurrent: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes: ArgTypes = {
  text,
  size,
  iconPlacement,
  href,
  accessibilityCurrent,
};

const args: Args = {
  text: 'Travelcards & tickets',
  size: size.options![1],
  href: href.options![1],
  target: '_blank',
  negative: false,
  iconPlacement: iconPlacement.options![0],
  download: false,
  disabled: false,
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-link/sbb-block-link',
  component: SbbBlockLink,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ...args }: Args) => ({
    props: { text, ...args },
    template: `<sbb-block-link ${argsToTemplate(args)}>${text}</sbb-block-link>`,
  }),
};
export default meta;

export const Default = {};
