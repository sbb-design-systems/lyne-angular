import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbTimeInputModule } from '@sbb-esta/lyne-angular/time-input';

/**
 * @title time-input with reactive form
 * @order 3
 */
@Component({
  selector: 'sbb-time-input-reactive-example',
  templateUrl: 'time-input-reactive-example.html',
  imports: [ReactiveFormsModule, SbbCardModule, SbbFormFieldModule, SbbTimeInputModule],
})
export class TimeInputReactiveExample {
  protected readonly control = new FormControl<Date | null>(new Date('1900-01-01T15:15'));
}
