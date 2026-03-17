import { NgModule } from '@angular/core';

import { SbbTimetableOccupancyIcon } from './timetable-occupancy-icon';

const SBB_TIMETABLE_OCCUPANCY_ICON_EXPORTED_DECLARATIONS = [SbbTimetableOccupancyIcon];

@NgModule({
  imports: SBB_TIMETABLE_OCCUPANCY_ICON_EXPORTED_DECLARATIONS,
  exports: SBB_TIMETABLE_OCCUPANCY_ICON_EXPORTED_DECLARATIONS,
})
export class SbbTimetableOccupancyIconModule {}
