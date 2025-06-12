import { SbbSeatReservation } from '@sbb-esta/lyne-angular-experimental/seat-reservation/seat-reservation';
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
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation',
  component: SbbSeatReservation,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-seat-reservation ${argsToTemplate(args)}></sbb-seat-reservation>`,
  }),
};
export default meta;

export const Default = {};
