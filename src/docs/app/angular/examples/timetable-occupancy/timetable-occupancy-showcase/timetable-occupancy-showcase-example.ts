import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckbox } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButton } from '@sbb-esta/lyne-angular/radio-button';
import { SbbRadioButtonGroup } from '@sbb-esta/lyne-angular/radio-button-group';
import {
  type SbbTimetableOccupancy,
  SbbTimetableOccupancyModule,
} from '@sbb-esta/lyne-angular/timetable-occupancy';
import { SbbTitle } from '@sbb-esta/lyne-angular/title';

/**
 * @title timetable-occupancy showcase
 */
@Component({
  selector: 'sbb-timetable-occupancy-showcase-example',
  templateUrl: 'timetable-occupancy-showcase-example.html',
  imports: [
    SbbTimetableOccupancyModule,
    SbbCheckbox,
    SbbRadioButton,
    SbbRadioButtonGroup,
    SbbTitle,
    FormField,
  ],
})
export class TimetableOccupancyShowcaseExample {
  protected controls = form(
    signal({
      firstClassOccupancy: 'low' as SbbTimetableOccupancy['firstClassOccupancy'],
      secondClassOccupancy: 'high' as SbbTimetableOccupancy['secondClassOccupancy'],
    }),
  );
}
