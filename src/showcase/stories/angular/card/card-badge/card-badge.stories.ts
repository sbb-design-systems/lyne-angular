import { SbbCard } from '@sbb-esta/lyne-angular/card/card';
import { SbbCardBadge } from '@sbb-esta/lyne-angular/card/card-badge';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

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
