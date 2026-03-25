import { NgModule } from '@angular/core';

import { SbbTimetableRow } from './timetable-row';

const SBB_TIMETABLE_ROW_EXPORTED_DECLARATIONS = [SbbTimetableRow];

@NgModule({
  imports: SBB_TIMETABLE_ROW_EXPORTED_DECLARATIONS,
  exports: SBB_TIMETABLE_ROW_EXPORTED_DECLARATIONS,
})
export class SbbTimetableRowModule {}
