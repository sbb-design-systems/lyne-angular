import { SbbCarouselItem } from '@sbb-esta/lyne-angular/carousel';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      // add slotted components or remove
      imports: [],
    }),
  ],
  title: 'elements/sbb-carousel-item',
  component: SbbCarouselItem,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-carousel-item ${argsToTemplate(args)}></sbb-carousel-item>`,
  }),
};
export default meta;

export const Default = {};
