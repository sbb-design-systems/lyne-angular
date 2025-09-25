import { NgModule } from '@angular/core';

import { SbbTimetableForm } from './timetable-form/timetable-form';
import { SbbTimetableFormDetails } from './timetable-form-details/timetable-form-details';
import { SbbTimetableFormField } from './timetable-form-field/timetable-form-field';
import { SbbTimetableFormSwapButton } from './timetable-form-swap-button/timetable-form-swap-button';

const EXPORTED_DECLARATIONS = [
  SbbTimetableForm,
  SbbTimetableFormDetails,
  SbbTimetableFormField,
  SbbTimetableFormSwapButton,
];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbTimetableFormModule {}
