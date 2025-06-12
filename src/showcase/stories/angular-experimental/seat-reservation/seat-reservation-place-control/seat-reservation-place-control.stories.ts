import { SbbSeatReservationPlaceControl } from '@sbb-esta/lyne-angular-experimental/seat-reservation/seat-reservation-place-control';
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
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-place-control',
  component: SbbSeatReservationPlaceControl,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-seat-reservation-place-control ${argsToTemplate(args)}></sbb-seat-reservation-place-control>`,
  }),
};
export default meta;

export const Default = {};
