import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSeatReservationGraphicElement } from '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-graphic.js';

import '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-graphic.js';

@Directive({
  selector: 'sbb-seat-reservation-graphic',
  exportAs: 'sbbSeatReservationGraphic',
})
export class SbbSeatReservationGraphic {
  #element: ElementRef<SbbSeatReservationGraphicElement> = inject(
    ElementRef<SbbSeatReservationGraphicElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

  @Input({ transform: booleanAttribute })
  public set stretch(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.stretch = value));
  }
  public get stretch(): boolean {
    return this.#element.nativeElement.stretch;
  }
}
