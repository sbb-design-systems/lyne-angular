import { SbbDateInput } from '@sbb-esta/lyne-angular/date-input';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import type { ArgTypes, InputType, StoryContext } from '@storybook/types';

const weekdayStyle: InputType = {
  control: {
    type: 'select',
  },
  options: ['short', 'none'],
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

const value: InputType = {
  control: {
    type: 'text',
  },
};

const negative: InputType = {
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

const valueAsDate: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const argTypes: ArgTypes = {
  weekdayStyle,
  dateFilter,
  min,
  max,
  value,
  valueAsDate,
  negative,
};

const args: Args = {
  disabled: false,
  readOnly: false,
  negative: false,
  value: '2024-01-01',
  weekdayStyle: weekdayStyle.options![0],
  dateFilter: dateFilter.options![0],
};

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [SbbFormField],
    }),
  ],
  title: 'elements/sbb-date-input',
  component: SbbDateInput,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes,
  args,
  render: ({ value, negative, dateFilter, ...args }) => ({
    props: { value, negative, dateFilter, ...args },
    template: `
      <sbb-form-field [negative]='negative'>
        <label>Label</label>
        <sbb-date-input ${argsToTemplate(args)} value=${value} [dateFilter]="dateFilter"></sbb-date-input>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
