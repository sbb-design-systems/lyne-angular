import { SbbSeatReservationArea } from '@sbb-esta/lyne-angular-experimental/seat-reservation/seat-reservation-area';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';

const defaultArgs: Args = {
  style: '--sbb-reservation-area-width: 100;--sbb-reservation-area-height: 50;',
  background: 'dark',
  mounting: 'free',
};

const meta: Meta = {
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-area',
  component: SbbSeatReservationArea,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-seat-reservation-area ${argsToTemplate(args)}></sbb-seat-reservation-area>`,
  }),
};
export default meta;

export const Default = {
  args: {
    ...defaultArgs,
  },
};
