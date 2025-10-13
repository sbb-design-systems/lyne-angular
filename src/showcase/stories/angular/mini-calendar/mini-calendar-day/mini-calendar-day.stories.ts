import { SbbMiniCalendarDay } from '@sbb-esta/lyne-angular/mini-calendar';
import { SbbTooltipModule } from '@sbb-esta/lyne-angular/tooltip';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType } from 'storybook/internal/types';

const value: InputType = {
  control: false,
  table: { disable: true },
};

const type: InputType = {
  control: false,
  table: { disable: true },
};

const form: InputType = {
  control: false,
  table: { disable: true },
};

const name: InputType = {
  control: false,
  table: { disable: true },
};

const marker: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [null, 'circle', 'target', 'slash', 'cross'],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [null, 'charcoal', 'cloud', 'orange', 'red', 'sky'],
};

const date: InputType = {
  control: {
    type: 'date',
  },
};

const argTypes: ArgTypes = {
  value,
  type,
  form,
  name,
  date,
  marker,
  color,
};

const args: Args = {
  date: new Date('08-15-2025'),
  marker: marker.options![0],
  color: color.options![0],
};

const Template = ({ date, ...args }: Args): string => {
  return `
    <sbb-mini-calendar-day
      date="${defaultDateAdapter.toIso8601(new Date(date))}"
      ${argsToTemplate(args)}
    ></sbb-mini-calendar-day>
  `;
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbTooltipModule],
    }),
  ],
  title: 'elements/sbb-mini-calendar/sbb-mini-calendar-day',
  component: SbbMiniCalendarDay,
  argTypes,
};
export default meta;

export const Default = {
  args,
  render: (args: Args) => ({
    props: { ...args },
    template: Template(args),
  }),
};

export const WithTooltip = {
  args: {
    ...args,
    'sbb-tooltip': defaultDateAdapter.format(args['date'], { weekdayStyle: 'none' }),
    'sbb-tooltip-open-delay': 200,
  },
  render: (args: Args) => ({
    props: { ...args },
    template: Template(args),
  }),
};
