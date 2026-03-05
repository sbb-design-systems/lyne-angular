import { SbbCalendar } from '@sbb-esta/lyne-angular/calendar';
import type {
  SbbCalendarElement,
  SbbMonthChangeEvent,
} from '@sbb-esta/lyne-elements/calendar/calendar.js';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';
import type { Args, Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const createDays = (wide: boolean): string => {
  const year = defaultDateAdapter.getYear(today);
  const month = defaultDateAdapter.getMonth(today);
  if (wide) {
    const todayNextMonth = defaultDateAdapter.addCalendarMonths(today, 1);
    const yearNextMonth = defaultDateAdapter.getYear(todayNextMonth);
    const nextMonth = defaultDateAdapter.getMonth(todayNextMonth);
    return `
      ${createSlottedDays(year, month)}
      ${createSlottedDays(yearNextMonth, nextMonth)}
    `;
  } else {
    return createSlottedDays(year, month);
  }
};

const createSlottedDays = (year: number, month: number): string => {
  const daysInMonth = defaultDateAdapter.getNumDaysInMonth(
    defaultDateAdapter.createDate(year, month, 1),
  );
  return `${new Array(daysInMonth)
    .fill(undefined)
    .map((_, index) => {
      const slotName = defaultDateAdapter.toIso8601(new Date(`${year}-${month}-${index + 1}`));
      return `<sbb-calendar-day slot=${slotName}>
        ${createPrice((index + 1) % 9 === 0)}
      </sbb-calendar-day>`;
    })
    .join('')}`;
};

const priceStyle = (greenBold: boolean): string => {
  return `display: flex; flex-direction: column; justify-content: center; ${greenBold ? 'color: var(--sbb-color-green); font-weight: bold;' : 'color: light-dark(var(--sbb-color-metal), var(--sbb-color-smoke));'}`;
};

const createPrice = (greenBold: boolean): string => {
  return `
    <span class="sbb-text-xxs" style="${priceStyle(greenBold)}">${greenBold ? '99.-' : '123.-'}</span>
  `;
};

const monthChangeHandler = (event: SbbMonthChangeEvent): void => {
  const calendar = event.target as SbbCalendarElement;
  Array.from(calendar.children).forEach((e) => e.remove());
  event.range?.map((day) => {
    const child = document.createElement('sbb-calendar-day');
    child.setAttribute('slot', day.value);
    const price = document.createElement('span');
    price.className = 'sbb-text-xxs';
    price.textContent = +day.dayValue % 9 === 0 ? '99.-' : '123.-';
    price.style = priceStyle(+day.dayValue % 9 === 0);
    child.appendChild(price);
    calendar.appendChild(child);
  });
};

const selected: InputType = {
  control: {
    type: 'date',
  },
};

const min: InputType = {
  control: {
    type: 'date',
  },
};

const max: InputType = {
  control: {
    type: 'date',
  },
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const view: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['day', 'month', 'year'],
};

const multiple: InputType = {
  control: {
    type: 'boolean',
  },
};

const weekNumbers: InputType = {
  control: {
    type: 'boolean',
  },
};

const filterFunctions = [
  undefined,
  (d: Date): boolean => d.getDay() !== 6 && d.getDay() !== 0,
  (d: Date): boolean => d.getDate() % 2 === 1,
  (d: Date): boolean => d.getFullYear() % 2 === 0,
  (d: Date): boolean => d.getMonth() > 6,
];
const dateFilter: InputType = {
  options: Object.keys(filterFunctions),
  mapping: filterFunctions,
  control: {
    type: 'select',
    labels: {
      0: 'No dateFilter function.',
      1: 'The dateFilter function includes only working days.',
      2: 'The dateFilter function excludes even days.',
      3: 'The dateFilter function excludes odd years.',
      4: 'The dateFilter function excludes months from January to July',
    },
  },
};

const argTypes: ArgTypes = {
  selected,
  min,
  max,
  view,
  dateFilter,
  orientation,
  multiple,
  weekNumbers,
  monthChangeHandler: { type: 'function', control: false, table: { disable: true } },
};

const today = new Date();
today.setDate(today.getDate() >= 15 ? 8 : 18);

const args: Args = {
  view: view.options![0],
  orientation: orientation.options![0],
  wide: false,
  selected: today,
  multiple: false,
  weekNumbers: false,
  monthChangeHandler: (e: SbbMonthChangeEvent): void => monthChangeHandler(e),
};

export const Default: StoryObj = {
  render: ({ selected, dateFilter, ...args }: Args) => ({
    props: { selected, dateFilter, multiple, ...args },
    // Selected property not working, needs to be converted to date. TODO: Find a way to do this.
    template: `
      <sbb-calendar ${argsToTemplate(args)} [selected]="multiple ? [selected] : selected" [dateFilter]="dateFilter" [multiple]="multiple"></sbb-calendar>`,
  }),
};

export const Enhanced: StoryObj = {
  render: ({ selected, dateFilter, ...args }: Args) => ({
    props: { selected, dateFilter, multiple, ...args },
    // Selected property not working, needs to be converted to date. TODO: Find a way to do this.
    template: `
      <sbb-calendar ${argsToTemplate(args)} [selected]="multiple ? [selected] : selected" [dateFilter]="dateFilter" [multiple]="multiple" (monthchange)="monthChangeHandler($event)">
        ${createDays(args['wide'])}
      </sbb-calendar>`,
  }),
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-datepicker/sbb-calendar',
  component: SbbCalendar,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
};
export default meta;
