import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbTimeInputModule } from '@sbb-esta/lyne-angular/time-input';

/**
 * @title time-input with signals
 * @order 2
 */
@Component({
  selector: 'sbb-time-input-signal-example',
  templateUrl: 'time-input-signal-example.html',
  imports: [FormField, SbbCardModule, SbbFormFieldModule, SbbTimeInputModule],
})
export class TimeInputSignalExample {
  protected readonly form = form(signal<Date>(new Date('1900-01-01T15:15')));
}
