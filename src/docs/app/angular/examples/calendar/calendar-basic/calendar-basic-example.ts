import { Component } from '@angular/core';
import { SbbCalendarModule } from '@sbb-esta/lyne-angular/calendar';

/**
 * @title Basic calendar
 * @order 1
 */
@Component({
  selector: 'sbb-calendar-basic-example',
  templateUrl: 'calendar-basic-example.html',
  imports: [SbbCalendarModule],
})
export class CalendarBasicExample {}
