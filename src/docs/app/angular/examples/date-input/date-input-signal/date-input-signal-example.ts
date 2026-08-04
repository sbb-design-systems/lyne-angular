import { Component, signal } from '@angular/core';
import { form, FormField, minDate } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbDateInputModule } from '@sbb-esta/lyne-angular/date-input';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title date-input with signals
 * @order 2
 */
@Component({
  selector: 'sbb-date-input-signal-example',
  templateUrl: 'date-input-signal-example.html',
  imports: [FormField, SbbDateInputModule, SbbFormFieldModule, SbbCardModule],
})
export class DateInputSignalExample {
  protected readonly form = form(signal<Date>(new Date('2024-12-12')), (s) => {
    minDate(s, new Date('2024-12-01'));
  });
}
