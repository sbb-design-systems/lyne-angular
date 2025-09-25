import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/timetable-form/timetable-form-details.js';

@Directive({
  selector: 'sbb-timetable-form-details',
  exportAs: 'sbbTimetableFormDetails',
})
export class SbbTimetableFormDetails {}
