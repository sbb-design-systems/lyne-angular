import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SbbCalendarModule } from '@sbb-esta/lyne-angular/calendar';

/**
 * @title Reactive form integration
 * @order 1
 */
@Component({
  selector: 'sbb-calendar-reactive-example',
  templateUrl: 'calendar-reactive-example.html',
  imports: [SbbCalendarModule, ReactiveFormsModule],
})
export class CalendarReactiveExample {
  protected control = new FormControl(new Date(Date.now()), { nonNullable: true });
}
