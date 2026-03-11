import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbTimetableRowModule } from '@sbb-esta/lyne-angular-experimental/timetable-row';

/**
 * @title Basic timetable-row
 */
@Component({
  selector: 'sbb-timetable-row-basic-example',
  templateUrl: 'timetable-row-basic-example.html',
  imports: [SbbTimetableRowModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetableRowBasicExample {}
