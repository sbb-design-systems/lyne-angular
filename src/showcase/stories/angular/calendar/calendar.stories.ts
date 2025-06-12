import { SbbCalendar } from '@sbb-esta/lyne-angular/calendar';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType } from 'storybook/internal/types';

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

const now: InputType = {
  control: {
    type: 'date',
  },
};

const view: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['day', 'month', 'year'],
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
  now,
};

const today = new Date();
today.setDate(today.getDate() >= 15 ? 8 : 18);

const args: Args = {
  view: view.options![0],
  orientation: orientation.options![0],
  wide: false,
  selected: today,
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
  render: ({ selected, dateFilter, ...args }: Args) => ({
    props: { selected, dateFilter, ...args },
    template: `
      <sbb-calendar ${argsToTemplate(args)} selected=${selected / 1000} [dateFilter]="dateFilter"></sbb-calendar>`,
  }),
};
export default meta;

export const Default = {};
