import { NgModule } from '@angular/core';

import { SbbTimetableOccupancy } from './timetable-occupancy';

const SBB_TIMETABLE_OCCUPANCY_EXPORTED_DECLARATIONS = [SbbTimetableOccupancy];

@NgModule({
  imports: SBB_TIMETABLE_OCCUPANCY_EXPORTED_DECLARATIONS,
  exports: SBB_TIMETABLE_OCCUPANCY_EXPORTED_DECLARATIONS,
})
export class SbbTimetableOccupancyModule {}
