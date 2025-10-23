import {
  SbbMiniCalendar,
  SbbMiniCalendarDay,
  SbbMiniCalendarMonth,
} from '@sbb-esta/lyne-angular/mini-calendar';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import type { InputType } from 'storybook/internal/types';

const createDays = (year: number, month: number): string => {
  const numDays = defaultDateAdapter.getNumDaysInMonth(new Date(year, month));
  return `
    ${new Array(numDays)
      .fill(undefined)
      .map((_, index) => {
        const date = new Date(year, month, index + 1);
        return `
          <sbb-mini-calendar-day
            date=${defaultDateAdapter.toIso8601(date)}
            marker=${defaultDateAdapter.getDayOfWeek(date) === 0 || defaultDateAdapter.getDayOfWeek(date) === 6 ? 'circle' : ''}
          ></sbb-mini-calendar-day>
        `;
      })
      .join('')}
  `;
};

const Template = ({ orientation, year, offset }: Args): string => `
  <sbb-mini-calendar orientation=${orientation}>
    ${new Array(13)
      .fill(undefined)
      .map((_, index) => {
        const realYear = index > 12 - 1 - offset ? year + 1 : year;
        const month = (index + offset) % 12;
        const date = `${realYear}-${String(month + 1).padStart(2, '0')}`;
        return `
          <sbb-mini-calendar-month date=${date}>
            ${createDays(realYear, month)}
          </sbb-mini-calendar-month>
        `;
      })
      .join('')}
  </sbb-mini-calendar>
`;

const year: InputType = {
  control: {
    type: 'number',
  },
};

const offset: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [0, 3, 6, 9],
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const args: Args = {
  year: 2025,
  offset: offset.options![0],
  orientation: orientation.options![0],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbMiniCalendarDay, SbbMiniCalendarMonth, SbbTooltipModule],
    }),
  ],
  title: 'elements/sbb-mini-calendar/sbb-mini-calendar',
  component: SbbMiniCalendar,
  argTypes: {
    year,
    offset,
    orientation,
  },
  args,
};
export default meta;

export const Default = {
  render: (args: Args) => ({
    props: { ...args },
    template: Template(args),
  }),
};

export const Vertical = {
  args: {
    ...args,
    orientation: orientation.options![1],
  },
  render: (args: Args) => ({
    props: { ...args },
    template: Template(args),
  }),
};
