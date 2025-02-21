import { SbbCard } from '@sbb-esta/lyne-angular/card/card';
import { SbbCardBadge } from '@sbb-esta/lyne-angular/card/card-badge';
import { Args, Meta, moduleMetadata } from '@storybook/angular';

import { spreadArgs } from '../../../../helpers/spread-args';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbCard],
    }),
  ],
  title: 'elements/sbb-card/sbb-card-badge',
  component: SbbCardBadge,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-card color="milk">
        <sbb-card-badge ${spreadArgs(args)}>
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
