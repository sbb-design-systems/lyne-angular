import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/timetable-form/timetable-form-details.js';

/**
 * Wraps the details section of the `sbb-timetable-form`.
 *
 * @slot  - Use the unnamed slot to add content to the details section.
 */
@Directive({
  selector: 'sbb-timetable-form-details',
  exportAs: 'sbbTimetableFormDetails',
})
export class SbbTimetableFormDetails {}
