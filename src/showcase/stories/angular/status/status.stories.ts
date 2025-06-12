import { SbbStatus } from '@sbb-esta/lyne-angular/status';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const titleLevel: InputType = {
  control: false,
  table: { disable: true },
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: [
    'info',
    'success',
    'warning',
    'error',
    'pending',
    'incomplete',
    'not-started',
    'in-progress',
  ],
};

const text: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  titleLevel,
  type,
  text,
};

const args: Args = {
  type: type.options![0],
  text: 'Status info text',
};

const meta: Meta = {
  title: 'elements/sbb-status',
  component: SbbStatus,
  argTypes,
  args,
  render: ({ text, ...args }: Args) => ({
    props: { text, ...args },
    template: `<sbb-status ${argsToTemplate(args)}>${text}</sbb-status>`,
  }),
};
export default meta;

export const Default = {};
