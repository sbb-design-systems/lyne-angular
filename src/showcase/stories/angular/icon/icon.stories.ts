import { SbbIcon } from '@sbb-esta/lyne-angular/icon';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { InputType } from 'storybook/internal/types';

const noSanitize: InputType = {
  control: false,
  table: { disable: true },
};

const name: InputType = {
  control: {
    type: 'select',
  },
  options: [
    'app-icon-medium',
    'train-medium',
    'swisspass-medium',
    'pie-medium',
    'chevron-small-left-small',
  ],
};

const argTypes = {
  name,
  noSanitize,
};

const args = {
  name: name.options![0],
};

const meta: Meta = {
  title: 'elements/sbb-icon',
  component: SbbIcon,
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-icon ${argsToTemplate(args)}></sbb-icon>`,
  }),
};
export default meta;

export const Default = {};
