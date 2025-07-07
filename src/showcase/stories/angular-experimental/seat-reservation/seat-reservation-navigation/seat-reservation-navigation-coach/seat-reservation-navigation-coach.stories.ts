import { SbbSeatReservationNavigationCoach } from '@sbb-esta/lyne-angular-experimental/seat-reservation/seat-reservation-navigation/seat-reservation-navigation-coach';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';

import { seatReservationTrain } from '../../seat-reservation-sample-data';

const defaultArgs: Args = {
  coachId: seatReservationTrain.coachItems[0].id,
  propertyIds: seatReservationTrain.coachItems[0].propertyIds,
};

const meta: Meta = {
  decorators: [withActions],
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-navigation-coach',
  component: SbbSeatReservationNavigationCoach,
  parameters: {
    actions: {
      handles: ['selectCoach', 'focusCoach'],
    },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-seat-reservation-navigation-coach ${argsToTemplate(args)}></sbb-seat-reservation-navigation-coach>`,
  }),
};
export default meta;

export const Default = {
  args: {
    ...defaultArgs,
  },
};
