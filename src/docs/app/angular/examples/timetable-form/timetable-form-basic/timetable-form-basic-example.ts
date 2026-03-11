import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbTimetableFormModule } from '@sbb-esta/lyne-angular/timetable-form';

/**
 * @title Basic timetable-form
 */
@Component({
  selector: 'sbb-timetable-form-basic-example',
  templateUrl: 'timetable-form-basic-example.html',
  imports: [SbbTimetableFormModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetableFormBasicExample {}
