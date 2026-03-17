import { NgModule } from '@angular/core';

import { SbbCalendar } from './calendar/calendar';
import { SbbCalendarDay } from './calendar-day/calendar-day';
import { SbbCalendarMonth } from './calendar-month/calendar-month';
import { SbbCalendarWeekday } from './calendar-weekday/calendar-weekday';
import { SbbCalendarWeeknumber } from './calendar-weeknumber/calendar-weeknumber';
import { SbbCalendarYear } from './calendar-year/calendar-year';

const SBB_CALENDAR_EXPORTED_DECLARATIONS = [
  SbbCalendar,
  SbbCalendarDay,
  SbbCalendarMonth,
  SbbCalendarWeekday,
  SbbCalendarWeeknumber,
  SbbCalendarYear,
];

@NgModule({
  imports: SBB_CALENDAR_EXPORTED_DECLARATIONS,
  exports: SBB_CALENDAR_EXPORTED_DECLARATIONS,
})
export class SbbCalendarModule {}
