import { SbbSeatReservationNavigationServices } from '@sbb-esta/lyne-angular-experimental/seat-reservation/seat-reservation-navigation/seat-reservation-navigation-services';
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
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-navigation-services',
  component: SbbSeatReservationNavigationServices,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-seat-reservation-navigation-services ${argsToTemplate(args)}></sbb-seat-reservation-navigation-services>`,
  }),
};
export default meta;

export const Default = {};
