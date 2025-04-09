import { SbbBreadcrumb } from '@sbb-esta/lyne-angular/breadcrumb/breadcrumb';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

const accessibilityLabel: InputType = {
  control: false,
  table: { disable: true },
};

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

const target: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  accessibilityCurrent,
  accessibilityLabel,
  text,
  href,
  target,
};

const args: Args = {
  text: 'Breadcrumb',
  href: href.options![0],
  target: '_blank',
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-breadcrumb/sbb-breadcrumb',
  component: SbbBreadcrumb,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({ text, ...args }: Args) => ({
    props: { text, ...args },
    template: `<sbb-breadcrumb ${argsToTemplate(args)}>${text}</sbb-breadcrumb>`,
  }),
};
export default meta;

export const Default = {};
