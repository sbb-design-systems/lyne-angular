import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { disabled, form, FormField, maxDate, minDate } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import {
  dateFilter,
  type SbbDateInput,
  SbbDateInputModule,
} from '@sbb-esta/lyne-angular/date-input';
import { type SbbDatepicker, SbbDatepickerModule } from '@sbb-esta/lyne-angular/datepicker';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

interface Filters {
  none: SbbDateInput['dateFilter'];
  odd: SbbDateInput['dateFilter'];
  oddDays: SbbDateInput['dateFilter'];
  even: SbbDateInput['dateFilter'];
  evenDays: SbbDateInput['dateFilter'];
}

/**
 * @title datepicker with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-datepicker-showcase-example',
  templateUrl: 'datepicker-showcase-example.html',
  imports: [
    DatePipe,
    FormField,
    SbbCheckboxModule,
    SbbDatepickerModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbTitleModule,
    SbbDateInputModule,
    SbbFormFieldModule,
    SbbCardModule,
  ],
})
export class DatepickerShowcaseExample {
  protected readonly filters: Filters = {
    none: () => true,
    odd: (d: Date) => d.getFullYear() % 2 === 0,
    oddDays: (d: Date) => d.getDate() % 2 === 0,
    even: (d: Date) => d.getFullYear() % 2 === 1,
    evenDays: (d: Date) => d.getDate() % 2 === 1,
  } as const;

  protected readonly controls = form(
    signal({
      model: new Date('2024-12-12') as Date | null,
      disabled: false,
      min: new Date('2024-01-01'),
      max: new Date('2027-01-01'),
      dateFilter: 'none' as keyof Filters,
      wide: false,
      view: 'day' as SbbDatepicker['view'],
    }),
    (s) => {
      disabled(s.model, { when: ({ valueOf }) => valueOf(s.disabled) });
      minDate(s.model, ({ valueOf }) => valueOf(s.min), {
        when: ({ valueOf }) => !!valueOf(s.min),
      });
      maxDate(s.model, ({ valueOf }) => valueOf(s.max), {
        when: ({ valueOf }) => !!valueOf(s.max),
      });
      dateFilter(s.model, (ctx) => this.filters[ctx.valueOf(s.dateFilter)]);
    },
  );
}
