import { SbbSeatReservationPlaceControl } from '@sbb-esta/lyne-angular-experimental/seat-reservation/seat-reservation-place-control';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';

const defaultArgs: Args = {
  type: 'SEAT',
  state: 'FREE',
  width: 32,
  height: 32,
  rotation: 0,
  text: '',
};

const meta: Meta = {
  decorators: [withActions],
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-place-control',
  component: SbbSeatReservationPlaceControl,
  parameters: {
    actions: {
      handles: ['selectPlace'],
    },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-seat-reservation-place-control ${argsToTemplate(args)}></sbb-seat-reservation-place-control>`,
  }),
};

export default meta;

export const placeSeatFree = {
  args: {
    ...defaultArgs,
  },
};

export const placeSeatSelected = {
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'SELECTED' },
};

export const placeSeatRestricted = {
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'RESTRICTED' },
};

export const placeSeatAllocated = {
  args: { ...defaultArgs, text: '123', type: 'SEAT', state: 'ALLOCATED' },
};

export const placeBicycleAvailable = {
  args: { ...defaultArgs, text: '123', type: 'BICYCLE', state: 'FREE' },
};

export const placeBicycleSelected = {
  args: { ...defaultArgs, text: '123', type: 'BICYCLE', state: 'SELECTED' },
};

export const placeBicycleRestricted = {
  args: { ...defaultArgs, text: '123', type: 'BICYCLE', state: 'RESTRICTED' },
};

export const placeBicycleAllocated = {
  args: { ...defaultArgs, text: '123', type: 'BICYCLE', state: 'ALLOCATED' },
};
