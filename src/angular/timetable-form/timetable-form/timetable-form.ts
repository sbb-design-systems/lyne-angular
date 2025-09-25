import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/timetable-form/timetable-form.js';

@Directive({
  selector: 'sbb-timetable-form',
  exportAs: 'sbbTimetableForm',
})
export class SbbTimetableForm {}
