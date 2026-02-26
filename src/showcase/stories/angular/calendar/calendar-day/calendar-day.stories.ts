import { SbbCalendarDay } from '@sbb-esta/lyne-angular/calendar';
import type { Meta } from '@storybook/angular';

const meta: Meta = {
  title: 'elements/sbb-datepicker/sbb-calendar-day',
  component: SbbCalendarDay,
  render: () => ({
    template: `
    <div>
      'sbb-calendar-day' is an element to be only used together with 'sbb-calendar'.
      See 'sbb-calendar' examples to see it in action.
    </div>
    `,
  }),
};
export default meta;

export const Default = {};
