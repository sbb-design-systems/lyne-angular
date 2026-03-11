import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbTimetableOccupancyIconModule } from '@sbb-esta/lyne-angular/timetable-occupancy-icon';

/**
 * @title Basic timetable-occupancy-icon
 */
@Component({
  selector: 'sbb-timetable-occupancy-icon-basic-example',
  templateUrl: 'timetable-occupancy-icon-basic-example.html',
  imports: [SbbTimetableOccupancyIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetableOccupancyIconBasicExample {}
