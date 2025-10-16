import { NgModule } from '@angular/core';

import { SbbMiniCalendar } from './mini-calendar/mini-calendar';
import { SbbMiniCalendarDay } from './mini-calendar-day/mini-calendar-day';
import { SbbMiniCalendarMonth } from './mini-calendar-month/mini-calendar-month';

const EXPORTED_DECLARATIONS = [SbbMiniCalendar, SbbMiniCalendarMonth, SbbMiniCalendarDay];
@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbMiniCalendarModule {}
