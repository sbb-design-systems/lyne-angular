import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbDateInputModule } from '@sbb-esta/lyne-angular/date-input';

/**
 * @title Basic date-input
 */
@Component({
  selector: 'sbb-date-input-basic-example',
  templateUrl: 'date-input-basic-example.html',
  imports: [SbbDateInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateInputBasicExample {}
