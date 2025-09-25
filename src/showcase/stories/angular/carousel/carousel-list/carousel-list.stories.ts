import { SbbCard } from '@sbb-esta/lyne-angular/card';
import { SbbCarouselList } from '@sbb-esta/lyne-angular/carousel';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbCard],
    }),
  ],
  title: 'elements/sbb-carousel/sbb-carousel-list',
  component: SbbCarouselList,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-card color="milk">
        <b>sbb-carousel-list</b> is an element meant to be used in combination with the
        'sbb-carousel'.
        <p style="margin-block-end: 0">
          See the <b>sbb-carousel</b> examples to see it in action.
        </p>
      </sbb-card>
    `,
  }),
};
export default meta;

export const Default = {};
