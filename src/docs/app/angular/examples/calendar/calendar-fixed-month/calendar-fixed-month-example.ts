import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbCalendarModule } from '@sbb-esta/lyne-angular/calendar';

/**
 * @title Calendar with fixed month
 * @order 2
 */
@Component({
  selector: 'sbb-calendar-fixed-month-example',
  templateUrl: 'calendar-fixed-month-example.html',
  imports: [SbbCalendarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarFixedMonthExample {}
