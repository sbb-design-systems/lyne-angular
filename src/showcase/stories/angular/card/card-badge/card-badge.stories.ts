import { SbbCard } from '@sbb-esta/lyne-angular/card/card';
import { SbbCardBadge } from '@sbb-esta/lyne-angular/card/card-badge';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, moduleMetadata } from '@storybook/angular';

import { spreadArgs } from '../../../../tools/spread-args';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbCard],
    }),
  ],
  title: 'elements/sbb-card/sbb-card-badge',
  component: SbbCardBadge,
  render: (args) => ({
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
