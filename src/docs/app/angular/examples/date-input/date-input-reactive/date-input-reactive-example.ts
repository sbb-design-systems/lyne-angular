import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SbbDateInputModule } from '@sbb-esta/lyne-angular/date-input';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

/**
 * @title date-input with reactive form
 * @order 2
 */
@Component({
  selector: 'sbb-date-input-reactive-example',
  templateUrl: 'date-input-reactive-example.html',
  imports: [ReactiveFormsModule, SbbCardModule, SbbDateInputModule, SbbFormFieldModule],
})
export class DateInputReactiveExample {
  protected control = new FormControl<Date | null>(new Date('2024-12-12'));
}
