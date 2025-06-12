import { SbbTab } from '@sbb-esta/lyne-angular/tabs/tab';
import type { Args, Meta } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const text: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = { text };

const args: Args = { text: 'Content' };

const meta: Meta = {
  title: 'elements/sbb-tab/sbb-tab',
  component: SbbTab,
  argTypes,
  args,
  render: ({ text }: Args) => ({
    props: { text },
    template: `<sbb-tab>${text}</sbb-tab>`,
  }),
};
export default meta;

export const Default = {};
