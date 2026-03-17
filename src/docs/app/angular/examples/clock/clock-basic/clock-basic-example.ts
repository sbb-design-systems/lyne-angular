import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbClockModule } from '@sbb-esta/lyne-angular/clock';

/**
 * @title Basic clock
 */
@Component({
  selector: 'sbb-clock-basic-example',
  templateUrl: 'clock-basic-example.html',
  imports: [SbbClockModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClockBasicExample {}
