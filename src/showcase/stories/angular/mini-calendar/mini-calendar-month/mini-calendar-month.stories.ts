import {
  SbbMiniCalendar,
  SbbMiniCalendarDay,
  SbbMiniCalendarMonth,
} from '@sbb-esta/lyne-angular/mini-calendar';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import type { InputType } from 'storybook/internal/types';

const date: InputType = {
  control: false,
  table: { disable: true },
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const marker: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [null, 'circle', 'target', 'slash', 'cross'],
  table: {
    category: 'Day',
  },
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [null, 'charcoal', 'cloud', 'orange', 'red', 'sky'],
  table: {
    category: 'Day',
  },
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbMiniCalendar, SbbMiniCalendarDay],
    }),
  ],
  title: 'elements/sbb-mini-calendar/sbb-mini-calendar-month',
  component: SbbMiniCalendarMonth,
  argTypes: { date, orientation, marker, color },
  args: {
    orientation: orientation.options![0],
    marker: marker.options![0],
    color: color.options![0],
  },
  render: ({ orientation, marker, color }: Args) => ({
    props: { orientation, marker, color },
    template: `
    <sbb-mini-calendar orientation=${orientation}>
      <sbb-mini-calendar-month date="2025-01">
        ${new Array(31)
          .fill(undefined)
          .map(
            (_, index) => `
            <sbb-mini-calendar-day
              date=2025-01-${String(index + 1).padStart(2, '0')}
              color=${color}
              marker=${index > 11 && index < 19 ? marker : ''}
            ></sbb-mini-calendar-day>
          `,
          )
          .join('')}
      </sbb-mini-calendar-month>
    </sbb-mini-calendar>
  `,
  }),
};
export default meta;

export const Default = {};
