import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbTimetableOccupancyModule } from '@sbb-esta/lyne-angular/timetable-occupancy';

/**
 * @title Basic timetable-occupancy
 */
@Component({
  selector: 'sbb-timetable-occupancy-basic-example',
  templateUrl: 'timetable-occupancy-basic-example.html',
  imports: [SbbTimetableOccupancyModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetableOccupancyBasicExample {}
