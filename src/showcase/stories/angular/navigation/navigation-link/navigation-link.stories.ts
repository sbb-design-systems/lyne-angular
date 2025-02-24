import { SbbNavigationLink } from '@sbb-esta/lyne-angular/navigation/navigation-link';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const label: InputType = {
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
  label,
  size,
  href,
};

const args: Args = {
  label: 'Label',
  size: size.options![0],
  href: href.options![0],
  target: '_blank',
};

const meta: Meta = {
  title: 'elements/sbb-navigation/sbb-navigation-link',
  component: SbbNavigationLink,
  parameters: {
    backgroundColor: () => 'var(--sbb-color-midnight)',
  },
  argTypes,
  args,
  render: ({ label, ...args }: Args) => ({
    props: { label, ...args },
    template: `<sbb-navigation-link ${argsToTemplate(args)}>${label}</sbb-navigation-link>`,
  }),
};
export default meta;

export const Default = {};
