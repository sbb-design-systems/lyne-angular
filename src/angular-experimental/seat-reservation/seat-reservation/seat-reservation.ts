import { Directive, ElementRef, inject, Input, NgZone, numberAttribute } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSeatReservationElement } from '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation.js';
import type { SeatReservation } from '@sbb-esta/lyne-elements-experimental/seat-reservation.js';

import '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation.js';

@Directive({
  selector: 'sbb-seat-reservation',
  exportAs: 'sbbSeatReservation',
})
export class SbbSeatReservation {
  #element: ElementRef<SbbSeatReservationElement> = inject(ElementRef<SbbSeatReservationElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set seatReservation(value: SeatReservation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.seatReservation = value));
  }
  public get seatReservation(): SeatReservation {
    return this.#element.nativeElement.seatReservation;
  }

  @Input({ transform: booleanAttribute })
  public set hasNavigation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hasNavigation = value));
  }
  public get hasNavigation(): boolean {
    return this.#element.nativeElement.hasNavigation;
  }

  @Input({ transform: booleanAttribute })
  public set alignVertical(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.alignVertical = value));
  }
  public get alignVertical(): boolean {
    return this.#element.nativeElement.alignVertical;
  }

  @Input({ transform: numberAttribute })
  public set maxReservations(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.maxReservations = value));
  }
  public get maxReservations(): number {
    return this.#element.nativeElement.maxReservations;
  }

  @Input({ transform: booleanAttribute })
  public set preventPlaceClick(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.preventPlaceClick = value));
  }
  public get preventPlaceClick(): boolean {
    return this.#element.nativeElement.preventPlaceClick;
  }

  @Input({ transform: numberAttribute })
  public set baseGridSize(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.baseGridSize = value));
  }
  public get baseGridSize(): number {
    return this.#element.nativeElement.baseGridSize;
  }

  @Input({ transform: numberAttribute })
  public set height(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.height = value));
  }
  public get height(): number {
    return this.#element.nativeElement.height;
  }
}
