import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import {
  type SbbTimetableOccupancy,
  SbbTimetableOccupancyModule,
} from '@sbb-esta/lyne-angular/timetable-occupancy';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title timetable-occupancy showcase
 */
@Component({
  selector: 'sbb-timetable-occupancy-showcase-example',
  templateUrl: 'timetable-occupancy-showcase-example.html',
  imports: [
    FormField,
    SbbTimetableOccupancyModule,
    SbbTitleModule,
    SbbCheckboxModule,
    SbbRadioButtonModule,
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
