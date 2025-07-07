import { SbbSeatReservationGraphic } from '@sbb-esta/lyne-angular-experimental/seat-reservation/seat-reservation-graphic';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';

const defaultArgs: Args = {
  name: 'BISTRO',
  stretch: false,
  width: 32,
  height: 32,
  rotation: 0,
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

export const pramAreaWidth32Height32 = {
  args: { ...defaultArgs, name: 'PRAM_AREA', width: 32, height: 32 },
};

export const StairAreaWidth32Height32Rotation315 = {
  args: { ...defaultArgs, name: 'STAIR_AREA', width: 32, height: 32, rotation: 315 },
};
