import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCalendarModule } from '@sbb-esta/lyne-angular/calendar';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';

/**
 * @title Reactive form integration
 * @order 1
 */
@Component({
  selector: 'sbb-calendar-reactive-form-example',
  templateUrl: 'calendar-reactive-form-example.html',
  imports: [SbbCalendarModule, SbbCardModule, ReactiveFormsModule],
})
export class CalendarReactiveFormExample {
  protected control = new FormControl(new Date(), { nonNullable: true });
}
