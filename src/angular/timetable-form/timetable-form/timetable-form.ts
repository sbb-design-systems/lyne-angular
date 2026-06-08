import { Directive } from '@angular/core';
import { SbbTimetableFormElement } from '@sbb-esta/lyne-elements/timetable-form.pure.js';

/**
 * Serves as a building block of a sbb 'timetable-form'.
It automatically handles the styles and part of its behaviors
 *
 * @slot  - Use the unnamed slot to add content to the 'timetable-form'
 */
@Directive({
  selector: 'sbb-timetable-form',
  exportAs: 'sbbTimetableForm',
})
export class SbbTimetableForm {
  static {
    SbbTimetableFormElement.define();
  }
}
