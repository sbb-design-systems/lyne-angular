import { SbbSeatReservationScoped } from '@sbb-esta/lyne-angular-experimental/seat-reservation/seat-reservation-scoped';
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
  title: 'experimental/sbb-seat-reservation-scoped',
  component: SbbSeatReservationScoped,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-seat-reservation-scoped ${argsToTemplate(args)}></sbb-seat-reservation-scoped>`,
  }),
};
export default meta;

export const Default = {};
