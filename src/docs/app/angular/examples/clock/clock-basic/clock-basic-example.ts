import { Component } from '@angular/core';
import { SbbClockModule } from '@sbb-esta/lyne-angular/clock';

/**
 * @title Basic clock
 * @order 1
 */
@Component({
  selector: 'sbb-clock-basic-example',
  templateUrl: 'clock-basic-example.html',
  imports: [SbbClockModule],
})
export class ClockBasicExample {}
