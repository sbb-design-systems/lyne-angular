import { SbbSeatReservationGraphic } from '@sbb-esta/lyne-angular-experimental/seat-reservation';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';

const defaultArgs: Args = {
  name: 'BISTRO',
  stretch: false,
};

const meta: Meta = {
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-graphic',
  component: SbbSeatReservationGraphic,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-seat-reservation-graphic ${argsToTemplate(args)}></sbb-seat-reservation-graphic>`,
  }),
};

export default meta;

export const Bistro = {
  args: { ...defaultArgs },
};

export const pramArea = {
  args: { ...defaultArgs, name: 'PRAM_AREA' },
};
