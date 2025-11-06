import { NgModule } from '@angular/core';

import { SbbMiniCalendar } from './mini-calendar/mini-calendar';
import { SbbMiniCalendarDay } from './mini-calendar-day/mini-calendar-day';
import { SbbMiniCalendarMonth } from './mini-calendar-month/mini-calendar-month';

const SBB_MINI_CALENDAR_EXPORTED_DECLARATIONS = [
  SbbMiniCalendar,
  SbbMiniCalendarMonth,
  SbbMiniCalendarDay,
];
@NgModule({
  imports: SBB_MINI_CALENDAR_EXPORTED_DECLARATIONS,
  exports: SBB_MINI_CALENDAR_EXPORTED_DECLARATIONS,
})
export class SbbMiniCalendarModule {}
