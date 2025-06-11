import { SbbSeatReservationArea } from '@sbb-esta/lyne-angular-experimental/seat-reservation/seat-reservation-area';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      // add slotted components or remove
      imports: [],
    }),
  ],
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-area',
  component: SbbSeatReservationArea,
  parameters: {
    // add events or remove the 'action' object
    actions: { handles: ['click'] },
  },
  render: (args: Args) => ({
    props: { ...args },
    template: `<sbb-seat-reservation-area ${argsToTemplate(args)}></sbb-seat-reservation-area>`,
  }),
};
export default meta;

export const Default = {};
