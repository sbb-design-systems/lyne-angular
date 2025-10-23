import { SbbTab, SbbTabContent, SbbTabLabel } from '@sbb-esta/lyne-angular/tabs';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

import readme from '../../autocomplete/readme.md';

const text: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = { text };

const args: Args = { text: 'Content' };

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbTabLabel, SbbTabContent],
    }),
  ],
  title: 'elements/sbb-tab/sbb-tab',
  component: SbbTab,
  argTypes,
  args,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
export default meta;

export const Default = {
  render: ({ text }: Args) => ({
    props: { text },
    template: `
      <sbb-tab-label active>Label</sbb-tab-label>
      <sbb-tab>${text}</sbb-tab>
    `,
  }),
};

export const Directive = {
  render: ({ text }: Args) => ({
    props: { text },
    template: `
      <sbb-tab-label active>Label</sbb-tab-label>
      <sbb-tab>
        <ng-template sbbTabContent>${text}</ng-template>
      </sbb-tab>
    `,
  }),
};
