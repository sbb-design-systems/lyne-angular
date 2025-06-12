import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbSeatReservationAreaElement } from '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-area.js';

import '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-area.js';

@Directive({
  selector: 'sbb-seat-reservation-area',
  exportAs: 'SbbSeatReservationArea',
})
export class SbbSeatReservationArea {
  #element: ElementRef<SbbSeatReservationAreaElement> = inject(
    ElementRef<SbbSeatReservationAreaElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set mounting(value: 'free' | 'upper-border' | 'lower-border' | 'upper-to-lower-border') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.mounting = value));
  }
  public get mounting(): 'free' | 'upper-border' | 'lower-border' | 'upper-to-lower-border' {
    return this.#element.nativeElement.mounting;
  }

  @Input()
  public set background(value: 'light' | 'dark') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.background = value));
  }
  public get background(): 'light' | 'dark' {
    return this.#element.nativeElement.background;
  }
}
