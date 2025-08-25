import { SbbCard, SbbCardBadge } from '@sbb-esta/lyne-angular/card';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const argTypes: ArgTypes = {
  ariaLabel,
};

const args: Args = {
  ariaLabel: 'Super saver sales ticket price starts at CHF 92.50 Black Friday Special',
};
const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbCard],
    }),
  ],
  title: 'elements/sbb-card/sbb-card-badge',
  component: SbbCardBadge,
  argTypes,
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-card color="milk">
        <sbb-card-badge ${argsToTemplate(args)}>
          <span>%</span>
          <span>from CHF</span>
          <span>92.50</span>
          <span> <time datetime="2021-11-25">Black Friday</time> Special </span>
        </sbb-card-badge>
      </sbb-card>
    `,
  }),
};
export default meta;

export const Default = {};
