import { Component } from '@angular/core';
import { SbbCalendarModule } from '@sbb-esta/lyne-angular/calendar';

/**
 * @title Calendar with fixed month
 * @order 3
 */
@Component({
  selector: 'sbb-calendar-with-filter-example',
  templateUrl: 'calendar-with-filter-example.html',
  imports: [SbbCalendarModule],
})
export class CalendarWithFilterExample {
  protected value = new Date();

  protected excludeWeekendsFn = (d: Date | null): boolean => d?.getDay() !== 6 && d?.getDay() !== 0;
}
