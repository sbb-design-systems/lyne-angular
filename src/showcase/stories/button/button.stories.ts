import { withActions } from '@storybook/addon-actions/decorator';
import { Meta } from '@storybook/angular';

import { SbbButton } from '../../../angular/button/button';
import { spreadArgs } from '../../tools/spread-args';

import readme from './readme.md';

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-button',
  component: SbbButton,
  parameters: {
    actions: { handles: ['click'] },
    docs: { description: { component: readme } },
  },
  // Controls are automatically set by compodoc; extra controls must be manually added.
  argTypes: {
    text: { control: 'text' },
  },
  args: {
    text: 'Button',
  },
  // render via template is needed due to the directive implementation
  render: ({ text, ...args }) => ({
    prop: { text, ...args },
    template: `<sbb-button ${spreadArgs(args)}>${text ?? ''}</sbb-button>`,
  }),
};
export default meta;

export const Default = {};

export const SizeM = {
  args: {
    size: 'm',
  },
};

export const Negative = {
  args: {
    negative: true,
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
};

export const Icon = {
  args: {
    'icon-name': 'pie-small',
    text: undefined,
  },
};
