import { SbbSeatReservationNavigationServices } from '@sbb-esta/lyne-angular-experimental/seat-reservation';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';

const defaultArgs: Args = {
  propertyIds: ['BISTRO'],
};

const meta: Meta = {
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-navigation-services',
  component: SbbSeatReservationNavigationServices,
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-seat-reservation-navigation-services ${argsToTemplate(args)}></sbb-seat-reservation-navigation-services>`,
  }),
};
export default meta;

export const Bistro = {
  args: {
    ...defaultArgs,
  },
};

export const MultipleServiceIcons = {
  args: { ...defaultArgs, propertyIds: ['BISTRO', 'SILENCE', 'WHEELCHAIR'] },
};
