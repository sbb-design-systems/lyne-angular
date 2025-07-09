import { SbbSeatReservation } from '@sbb-esta/lyne-angular-experimental/seat-reservation/seat-reservation';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';

import { seatReservationBus, seatReservationTrain } from '../seat-reservation-sample-data';

const trainArgs: Args = {
  seatReservation: seatReservationTrain,
};

const busArgs: Args = {
  seatReservation: seatReservationBus,
};

const meta: Meta = {
  decorators: [withActions],
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation',
  component: SbbSeatReservation,
  parameters: {
    actions: {
      handles: ['selectedplaces', 'selectedcoach'],
    },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-seat-reservation ${argsToTemplate(args)}></sbb-seat-reservation>`,
  }),
};
export default meta;

export const Train = {
  args: {
    ...trainArgs,
  },
};
export const Bus = {
  args: {
    ...busArgs,
  },
};
