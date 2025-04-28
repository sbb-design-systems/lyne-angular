import { SbbLink } from '@sbb-esta/lyne-angular/link/link';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { InputType, StoryContext } from '@storybook/types';

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

const size: InputType = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
};

const accessibilityCurrent: InputType = {
  control: false,
  table: { disable: true },
};

const argTypes = {
  text,
  href,
  size,
  accessibilityCurrent,
};

const args = {
  text: 'Travelcards & tickets',
  href: href.options![1],
  size: size.options![1],
  target: '_blank',
  disabled: false,
  download: false,
  negative: false,
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-link/sbb-link',
  component: SbbLink,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ text, ...args }: Args) => ({
    props: { text, ...args },
    template: `
      <p
        style="${args['negative'] ? 'color: var(--sbb-color-aluminium);' : 'color: var(--sbb-color-iron)'}"
        class="sbb-text-m"
      >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
        sit amet. <sbb-link ${argsToTemplate(args)}>${text}</sbb-link>
      </p>
      `,
  }),
};
export default meta;

export const Default = {};
