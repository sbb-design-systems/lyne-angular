import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbDatepickerModule } from '@sbb-esta/lyne-angular/datepicker';
import { SbbDivider } from '@sbb-esta/lyne-angular/divider';
import { SbbFormField } from '@sbb-esta/lyne-angular/form-field';
import { SbbSignet } from '@sbb-esta/lyne-angular/signet';
import { SbbTimeInput } from '@sbb-esta/lyne-angular/time-input';
import { SbbTimetableForm, SbbTimetableFormModule } from '@sbb-esta/lyne-angular/timetable-form';
import { SbbToggleModule } from '@sbb-esta/lyne-angular/toggle';
import type { Args, Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const fromToFields = (opt: { withVia?: boolean } = {}): string => `
  <sbb-timetable-form-field>
    <label>From</label>
    <input type="text" name="from" />
  </sbb-timetable-form-field>
  <sbb-timetable-form-swap-button></sbb-timetable-form-swap-button>
  ${
    opt.withVia
      ? ` <sbb-timetable-form-field>
        <label>Via</label>
        <input type="text" name="via" />
      </sbb-timetable-form-field>`
      : ''
  }
  <sbb-timetable-form-field>
    <label>To</label>
    <input type="text" name="to" />
  </sbb-timetable-form-field>
`;

const datepicker = (): string => `
  <sbb-form-field width="collapse" size="l" borderless class="sbb-timetable-form-mobile-block">
    <sbb-date-input
      value="2023-01-01"
      min="2000-01-01"
      max="2050-12-31"
      name="date"
    ></sbb-date-input>
    <sbb-datepicker-previous-day
      class="sbb-timetable-form-mobile-hidden"
    ></sbb-datepicker-previous-day>
    <sbb-datepicker-toggle></sbb-datepicker-toggle>
    <sbb-datepicker-next-day class="sbb-timetable-form-mobile-hidden"></sbb-datepicker-next-day>
    <sbb-datepicker></sbb-datepicker>
  </sbb-form-field>
  <sbb-divider orientation="vertical" class="sbb-timetable-form-mobile-hidden"></sbb-divider>
`;

const expandedDatepicker = (): string => `
  <sbb-form-field width="collapse" size="l" borderless class="sbb-timetable-form-block">
    <sbb-date-input
      value="2023-01-01"
      min="2000-01-01"
      max="2050-12-31"
      name="date"
    ></sbb-date-input>
    <sbb-datepicker-toggle></sbb-datepicker-toggle>
    <sbb-datepicker></sbb-datepicker>
  </sbb-form-field>
`;

const timetableDetails = (opt: { expandedDatepicker?: boolean } = {}): string => `
  <sbb-timetable-form-details>
    ${opt.expandedDatepicker ? expandedDatepicker() : datepicker()}
    <sbb-form-field width="collapse" size="l" borderless>
      <sbb-time-input value="13:30"></sbb-time-input>
    </sbb-form-field>
    <sbb-toggle size="s" name="departure-arrival">
      <sbb-toggle-option value="departure">Dep</sbb-toggle-option>
      <sbb-toggle-option value="arrival">Arr</sbb-toggle-option>
    </sbb-toggle>
    <div style="flex-grow: 1;"></div>
    <sbb-button type="submit" size="m">Search</sbb-button>
  </sbb-timetable-form-details>
`;

const meta: Meta = {
  decorators: [
    moduleMetadata({
      imports: [
        SbbTimetableFormModule,
        SbbSignet,
        SbbDivider,
        SbbButton,
        SbbToggleModule,
        SbbTimeInput,
        SbbFormField,
        SbbDatepickerModule,
      ],
    }),
  ],
  title: 'elements/sbb-timetable-form/sbb-timetable-form',
  component: SbbTimetableForm,
  render: (args: Args) => ({
    props: { ...args },
    template: `
      <form class="sbb-timetable-form">
        <sbb-signet></sbb-signet>
        <sbb-timetable-form> ${fromToFields(args)} ${timetableDetails(args)} </sbb-timetable-form>
      </form>
    `,
  }),
};
export default meta;

export const Default = {};
