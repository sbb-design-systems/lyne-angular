import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbCalendarModule } from '@sbb-esta/lyne-angular/calendar';

/**
 * @title Basic calendar
 */
@Component({
  selector: 'sbb-calendar-basic-example',
  templateUrl: 'calendar-basic-example.html',
  imports: [SbbCalendarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarBasicExample {}
