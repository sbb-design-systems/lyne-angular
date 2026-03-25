import { NgModule } from '@angular/core';

import { SbbTimetableDuration } from './timetable-duration';

const SBB_TIMETABLE_DURATION_EXPORTED_DECLARATIONS = [SbbTimetableDuration];

@NgModule({
  imports: SBB_TIMETABLE_DURATION_EXPORTED_DECLARATIONS,
  exports: SBB_TIMETABLE_DURATION_EXPORTED_DECLARATIONS,
})
export class SbbTimetableDurationModule {}
