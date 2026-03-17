import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbSignetModule } from '@sbb-esta/lyne-angular/signet';
import { SbbTimetableFormModule } from '@sbb-esta/lyne-angular/timetable-form';

/**
 * @title Basic timetable-form
 */
@Component({
  selector: 'sbb-timetable-form-basic-example',
  templateUrl: 'timetable-form-basic-example.html',
  imports: [SbbTimetableFormModule, SbbSignetModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimetableFormBasicExample {}
