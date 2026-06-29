import { Component, computed, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbClockModule } from '@sbb-esta/lyne-angular/clock';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

const NOW_REGEX = /(\d{1,2}):(\d{1,2}):(\d{1,2})/;

/**
 * @title Clock with paused time
 * @order 2
 */
@Component({
  selector: 'sbb-clock-paused-example',
  templateUrl: 'clock-paused-example.html',
  imports: [FormField, SbbClockModule, SbbTitleModule],
})
export class ClockPausedExample {
  protected now = computed(() =>
    NOW_REGEX.test(this.controls.now().value())
      ? (this.controls.now().value() as `${number}:${number}:${number}`)
      : null,
  );

  protected controls = form(
    signal({
      now: '09:10:30',
    }),
  );
}
