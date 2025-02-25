import { SbbDatepicker } from '@sbb-esta/lyne-angular/datepicker/datepicker';
import { SbbDatepickerNextDay } from '@sbb-esta/lyne-angular/datepicker/datepicker-next-day';
import { SbbDatepickerPreviousDay } from '@sbb-esta/lyne-angular/datepicker/datepicker-previous-day';
import { SbbDatepickerToggle } from '@sbb-esta/lyne-angular/datepicker/datepicker-toggle';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import { withActions } from '@storybook/addon-actions/decorator';
import { Args, argsToTemplate, Meta, moduleMetadata } from '@storybook/angular';
import { ArgTypes, InputType } from '@storybook/types';

import { convertMillisecondsToSeconds } from '../../../../helpers/converter';

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Native input',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Native input',
  },
};

const min: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Native input',
  },
};

const max: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Native input',
  },
};

const wide: InputType = {
  control: {
    type: 'boolean',
  },
};

const filterFunctions = [
  undefined,
  (d: Date) => d.getDay() !== 6 && d.getDay() !== 0,
  (d: Date) => d.getDate() % 2 === 1,
  (d: Date) => d.getFullYear() % 2 === 0,
  (d: Date) => d.getMonth() > 6,
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

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'],
  table: {
    category: 'Form-field',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field',
  },
};

const optional: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const now: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Testing',
  },
};

const argTypes: ArgTypes = {
  value,
  form,
  disabled,
  readonly,
  required,
  min,
  max,
  wide,
  dateFilter,
  now,
  'aria-label': ariaLabel,
  label,
  size,
  negative,
  optional,
  borderless,
};

const args: Args = {
  value: `15.02.2023`,
  form: undefined,
  disabled: false,
  readonly: false,
  required: false,
  min: undefined,
  max: undefined,
  wide: false,
  dateFilter: dateFilter.options![0],
  now: undefined,
  'aria-label': undefined,
  label: 'Label',
  size: size.options![1],
  negative: false,
  optional: false,
  borderless: false,
};

const meta: Meta = {
  decorators: [
    withActions,
    moduleMetadata({
      imports: [SbbFormField, SbbDatepickerPreviousDay, SbbDatepickerNextDay, SbbDatepickerToggle],
    }),
  ],
  title: 'elements/sbb-datepicker/sbb-datepicker',
  component: SbbDatepicker,
  parameters: {
    actions: { handles: ['click'] },
  },
  argTypes,
  args,
  render: ({
    size,
    negative,
    optional,
    borderless,
    label,
    wide,
    min,
    max,
    now,
    dateFilter,
    value,
    form,
    disabled,
    readonly,
    required,
    ...args
  }: Args) => ({
    props: {
      size,
      negative,
      optional,
      borderless,
      label,
      wide,
      min,
      max,
      now,
      dateFilter,
      value,
      form,
      disabled,
      readonly,
      required,
      ...args,
    },
    template: `
      <sbb-form-field size=${size} negative=${negative} optional=${optional} borderless=${borderless} width="collapse">
        ${label ? `<label>${label}</label>` : ''}
        <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
        <sbb-datepicker-next-day></sbb-datepicker-next-day>
        <sbb-datepicker-toggle></sbb-datepicker-toggle>
        <input
          value=${value}
          [form]=${form}
          [disabled]=${disabled}
          [readonly]=${readonly}
          [required]=${required}
          ${min ? `min=${convertMillisecondsToSeconds(min)}` : ''}
          ${max ? `max=${convertMillisecondsToSeconds(max)}` : ''}
        />
        <sbb-datepicker
          ${argsToTemplate(args)}
          date-filter=${dateFilter}
          wide=${wide}
          ${now ? `now=${convertMillisecondsToSeconds(now)}` : ''}
        ></sbb-datepicker>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
