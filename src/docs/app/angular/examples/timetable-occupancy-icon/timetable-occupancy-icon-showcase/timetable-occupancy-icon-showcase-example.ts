import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import type { SbbTimetableOccupancyIcon } from '@sbb-esta/lyne-angular/timetable-occupancy-icon';
import { SbbTimetableOccupancyIconModule } from '@sbb-esta/lyne-angular/timetable-occupancy-icon';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title timetable-occupancy-icon showcase
 */
@Component({
  selector: 'sbb-timetable-occupancy-icon-showcase-example',
  templateUrl: 'timetable-occupancy-icon-showcase-example.html',
  imports: [
    FormField,
    SbbCheckboxModule,
    SbbRadioButtonModule,
    SbbTimetableOccupancyIconModule,
    SbbTitleModule,
  ],
})
export class TimetableOccupancyIconShowcaseExample {
  protected controls = form(
    signal({
      occupancy: 'high' as SbbTimetableOccupancyIcon['occupancy'],
      negative: false,
    }),
  );
}
