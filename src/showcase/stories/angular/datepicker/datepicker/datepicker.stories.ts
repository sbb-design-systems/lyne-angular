import { SbbDateInput } from '@sbb-esta/lyne-angular/date-input';
import { SbbDatepicker } from '@sbb-esta/lyne-angular/datepicker/datepicker';
import { SbbDatepickerNextDay } from '@sbb-esta/lyne-angular/datepicker/datepicker-next-day';
import { SbbDatepickerPreviousDay } from '@sbb-esta/lyne-angular/datepicker/datepicker-previous-day';
import { SbbDatepickerToggle } from '@sbb-esta/lyne-angular/datepicker/datepicker-toggle';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field/form-field';
import type { Args, Meta } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { withActions } from 'storybook/actions/decorator';
import type { ArgTypes, InputType, StoryContext } from 'storybook/internal/types';

import {
  convertMillisecondsToDate,
  convertMillisecondsToSeconds,
} from '../../../../helpers/converter';

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'sbb-date-input',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'sbb-date-input',
  },
};

const readOnly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'sbb-date-input',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'sbb-date-input',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'sbb-date-input',
  },
};

const min: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'sbb-date-input',
  },
};

const max: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'sbb-date-input',
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

const input: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const valueAsDate: InputType = {
  control: false,
  table: {
    disable: true,
  },
};

const argTypes: ArgTypes = {
  value,
  form,
  disabled,
  readOnly,
  required,
  min,
  max,
  wide,
  dateFilter,
  ariaLabel,
  label,
  size,
  negative,
  optional,
  borderless,
  input,
  valueAsDate,
  'date-filter': { table: { disable: true } },
};

const args: Args = {
  value: `15.02.2023`,
  form: undefined,
  disabled: false,
  readOnly: false,
  required: false,
  min: undefined,
  max: undefined,
  wide: false,
  dateFilter: dateFilter.options![0],
  ariaLabel: undefined,
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
      imports: [
        SbbFormField,
        SbbDatepickerPreviousDay,
        SbbDatepickerNextDay,
        SbbDatepickerToggle,
        SbbDateInput,
      ],
    }),
  ],
  title: 'elements/sbb-datepicker/sbb-datepicker',
  component: SbbDatepicker,
  parameters: {
    actions: { handles: ['click'] },
    backgroundColor: (context: StoryContext) =>
      context.args['negative'] ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
  },
  argTypes: {
    ...argTypes,
    convertMillisecondsToDate: { type: 'function', control: false, table: { disable: true } },
    convertMillisecondsToSeconds: { type: 'function', control: false, table: { disable: true } },
  },
  args: {
    ...args,
    convertMillisecondsToDate: (e: number): Date => convertMillisecondsToDate(e),
    convertMillisecondsToSeconds: (e: number): number => convertMillisecondsToSeconds(e),
  },
  render: ({
    size,
    negative,
    optional,
    borderless,
    label,
    wide,
    min,
    max,
    value,
    form,
    disabled,
    readOnly,
    required,
    dateFilter,
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
      value,
      form,
      disabled,
      readOnly,
      required,
      dateFilter,
      ...args,
    },
    template: `
      <sbb-form-field [size]="size" [negative]="negative" [optional]="optional" [borderless]="borderless" width="collapse">
        ${label ? `<label>${label}</label>` : ''}
        <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
        <sbb-date-input
          value=${value}
          [disabled]="disabled"
          [readOnly]="readOnly"
          [required]="required"
          [min]="convertMillisecondsToDate(min)"
          [max]="convertMillisecondsToDate(max)"
          [dateFilter]="dateFilter"
        ></sbb-date-input>
        <sbb-datepicker
          ${argsToTemplate(args)}
          [wide]="wide"
        ></sbb-datepicker>
        <sbb-datepicker-toggle></sbb-datepicker-toggle>
        <sbb-datepicker-next-day></sbb-datepicker-next-day>
      </sbb-form-field>
    `,
  }),
};
export default meta;

export const Default = {};
