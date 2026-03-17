import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbTimeInputModule } from '@sbb-esta/lyne-angular/time-input';

/**
 * @title Basic time-input
 */
@Component({
  selector: 'sbb-time-input-basic-example',
  templateUrl: 'time-input-basic-example.html',
  imports: [SbbTimeInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeInputBasicExample {}
