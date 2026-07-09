import { NgModule } from '@angular/core';
import { SbbDateInputModule } from '@sbb-esta/lyne-angular/date-input';

import { SbbDatepicker } from './datepicker/datepicker';
import { SbbDatepickerTrigger } from './datepicker/datepicker-trigger';
import { SbbDatepickerNextDay } from './datepicker-next-day/datepicker-next-day';
import { SbbDatepickerPreviousDay } from './datepicker-previous-day/datepicker-previous-day';
import { SbbDatepickerToggle } from './datepicker-toggle/datepicker-toggle';

const SBB_DATEPICKER_EXPORTED_DECLARATIONS = [
  SbbDatepicker,
  SbbDatepickerNextDay,
  SbbDatepickerPreviousDay,
  SbbDatepickerTrigger,
  SbbDatepickerToggle,
  SbbDateInputModule,
];

@NgModule({
  imports: SBB_DATEPICKER_EXPORTED_DECLARATIONS,
  exports: SBB_DATEPICKER_EXPORTED_DECLARATIONS,
})
export class SbbDatepickerModule {}
