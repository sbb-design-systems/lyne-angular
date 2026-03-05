import { NgModule } from '@angular/core';

import { SbbCalendar } from './calendar/calendar';
import { SbbCalendarDay } from './calendar-day/calendar-day';

const SBB_CALENDAR_EXPORTED_DECLARATIONS = [SbbCalendar, SbbCalendarDay];

@NgModule({
  imports: SBB_CALENDAR_EXPORTED_DECLARATIONS,
  exports: SBB_CALENDAR_EXPORTED_DECLARATIONS,
})
export class SbbCalendarModule {}
