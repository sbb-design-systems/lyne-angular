import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { disabled, form, FormField, maxDate, minDate } from '@angular/forms/signals';
import { SbbCard } from '@sbb-esta/lyne-angular/card';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import {
  type SbbDateInput,
  SbbDateInputModule,
  dateFilter,
} from '@sbb-esta/lyne-angular/date-input';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

interface Filters {
  none: SbbDateInput['dateFilter'];
  odd: SbbDateInput['dateFilter'];
  even: SbbDateInput['dateFilter'];
}

/**
 * @title date-input with configurable properties
 * @order 1
 */
@Component({
  selector: 'sbb-date-input-showcase-example',
  templateUrl: 'date-input-showcase-example.html',
  imports: [
    DatePipe,
    FormField,
    SbbCard,
    SbbCheckboxModule,
    SbbDateInputModule,
    SbbFormFieldModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class DateInputShowcaseExample {
  protected readonly filters: Filters = {
    none: () => true,
    odd: (d: Date) => d.getFullYear() % 2 === 0,
    even: (d: Date) => d.getFullYear() % 2 === 1,
  } as const;

  protected readonly controls = form(
    signal({
      model: new Date('2024-12-12') as Date | null,
      disabled: false,
      min: new Date('2024-01-01'),
      max: new Date('2027-01-01'),
      dateFilter: 'none' as keyof Filters,
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
