import { SbbButtonLink } from '@sbb-esta/lyne-angular/button/button-link';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

const accessibilityCurrent: InputType = {
  control: false,
  table: { disable: true },
};

const text: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm', 's'],
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
  accessibilityCurrent,
  text,
  size,
  href,
};

const args: Args = {
  text: 'Button',
  href: href.options![0],
  target: '_blank',
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-button/sbb-button-link',
  component: SbbButtonLink,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-iron)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ...args }: Args) => ({
    props: { text, ...args },
    template: `<sbb-button-link ${argsToTemplate(args)}>${text}</sbb-button-link>`,
  }),
};
export default meta;

export const Default = {};
