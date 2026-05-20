import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbClockElement } from '@sbb-esta/lyne-elements/clock.js';

import '@sbb-esta/lyne-elements/clock.js';

/**
 * It displays an analog clock with the classic SBB face.
 */
@Directive({
  selector: 'sbb-clock',
  exportAs: 'sbbClock',
})
export class SbbClock {
  #element: ElementRef<SbbClockElement> = inject(ElementRef<SbbClockElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Define a specific time which the clock should show statically.
   */
  @Input()
  public set now(value: `${number}:${number}:${number}` | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): `${number}:${number}:${number}` | null {
    return this.#element.nativeElement.now;
  }
}
