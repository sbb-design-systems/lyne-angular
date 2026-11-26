import { NgModule } from '@angular/core';

import { SbbCalendar } from './calendar/calendar';
import { SbbCalendarDay } from './calendar-day/calendar-day';
import { SbbCalendarMonth } from './calendar-month/calendar-month';
import { SbbCalendarSelectAll } from './calendar-select-all/calendar-select-all';
import { SbbCalendarWeekday } from './calendar-weekday/calendar-weekday';
import { SbbCalendarWeeknumber } from './calendar-weeknumber/calendar-weeknumber';
import { SbbCalendarYear } from './calendar-year/calendar-year';

const SBB_CALENDAR_EXPORTED_DECLARATIONS = [
  SbbCalendar,
  SbbCalendarDay,
  SbbCalendarMonth,
  SbbCalendarSelectAll,
  SbbCalendarWeekday,
  SbbCalendarWeeknumber,
  SbbCalendarYear,
];

@NgModule({
  imports: SBB_CALENDAR_EXPORTED_DECLARATIONS,
  exports: SBB_CALENDAR_EXPORTED_DECLARATIONS,
})
export class SbbCalendarModule {}
