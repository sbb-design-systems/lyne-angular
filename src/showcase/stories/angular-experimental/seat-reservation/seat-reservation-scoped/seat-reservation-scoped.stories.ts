import { SbbSeatReservationScoped } from '@sbb-esta/lyne-angular-experimental/seat-reservation/seat-reservation-scoped';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';

const defaultArgs: Args = {};

const meta: Meta = {
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-scoped',
  component: SbbSeatReservationScoped,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-seat-reservation-scoped ${argsToTemplate(args)}> <sbb-seat-reservation-graphic
          name="COACH_BORDER_MIDDLE"
          width=100
          height=40
          role="presentation"
        ></sbb-seat-reservation-graphic></sbb-seat-reservation-scoped>`,
  }),
};
export default meta;

export const Default = {
  args: {
    ...defaultArgs,
  },
};
