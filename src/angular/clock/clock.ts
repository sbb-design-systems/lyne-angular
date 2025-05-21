import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbClockElement } from '@sbb-esta/lyne-elements/clock.js';
import type { SbbTime } from '@sbb-esta/lyne-elements/core/interfaces.js';

import '@sbb-esta/lyne-elements/clock.js';

@Directive({
  selector: 'sbb-clock',
  exportAs: 'sbbClock',
})
export class SbbClock {
  #element: ElementRef<SbbClockElement> = inject(ElementRef<SbbClockElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set now(value: SbbTime | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): SbbTime | null {
    return this.#element.nativeElement.now;
  }
}
