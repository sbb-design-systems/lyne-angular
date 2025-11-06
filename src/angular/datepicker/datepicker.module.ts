import { NgModule } from '@angular/core';

import { SbbDatepicker } from './datepicker/datepicker';
import { SbbDatepickerNextDay } from './datepicker-next-day/datepicker-next-day';
import { SbbDatepickerPreviousDay } from './datepicker-previous-day/datepicker-previous-day';
import { SbbDatepickerToggle } from './datepicker-toggle/datepicker-toggle';

const SBB_DATEPICKER_EXPORTED_DECLARATIONS = [
  SbbDatepicker,
  SbbDatepickerNextDay,
  SbbDatepickerPreviousDay,
  SbbDatepickerToggle,
];

@NgModule({
  imports: SBB_DATEPICKER_EXPORTED_DECLARATIONS,
  exports: SBB_DATEPICKER_EXPORTED_DECLARATIONS,
})
export class SbbDatepickerModule {}
