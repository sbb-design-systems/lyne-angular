import { NgModule } from '@angular/core';

import { SbbTimetableForm } from './timetable-form/timetable-form';
import { SbbTimetableFormDetails } from './timetable-form-details/timetable-form-details';
import { SbbTimetableFormField } from './timetable-form-field/timetable-form-field';
import { SbbTimetableFormSwapButton } from './timetable-form-swap-button/timetable-form-swap-button';

const SBB_TIMETABLE_FORM_EXPORTED_DECLARATIONS = [
  SbbTimetableForm,
  SbbTimetableFormDetails,
  SbbTimetableFormField,
  SbbTimetableFormSwapButton,
];

@NgModule({
  imports: SBB_TIMETABLE_FORM_EXPORTED_DECLARATIONS,
  exports: SBB_TIMETABLE_FORM_EXPORTED_DECLARATIONS,
})
export class SbbTimetableFormModule {}
