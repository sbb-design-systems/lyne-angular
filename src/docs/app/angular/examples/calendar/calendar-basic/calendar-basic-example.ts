import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCalendarModule } from '@sbb-esta/lyne-angular/calendar';

/**
 * @title Basic calendar
 * @order 1
 */
@Component({
  selector: 'sbb-calendar-basic-example',
  templateUrl: 'calendar-basic-example.html',
  imports: [SbbCalendarModule, FormField],
})
export class CalendarBasicExample {
  protected form = form(signal({ calendar: new Date(Date.now()) }));
}
