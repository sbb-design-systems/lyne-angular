import { SbbCalendar } from '@sbb-esta/lyne-angular/calendar';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, Meta } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { spreadArgs } from '../../../tools/spread-args';

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

const now: InputType = {
  control: {
    type: 'date',
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
  dateFilter,
  now,
};

const meta: Meta = {
  decorators: [withActions],
  title: 'elements/sbb-datepicker/sbb-calendar',
  component: SbbCalendar,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <sbb-calendar ${spreadArgs(args)} selected=${args['selected'] / 1000}></sbb-calendar>`,
  }),
};
export default meta;

export const Default = {};
