import { Directive, ElementRef, inject, Input, NgZone, numberAttribute } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSeatReservationElement } from '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation.js';
import type {
  SeatReservation,
  SeatReservationCoachSelection,
  SeatReservationSelectedPlacesEventDetails,
} from '@sbb-esta/lyne-elements-experimental/seat-reservation.js';
import { fromEvent } from 'rxjs';

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
  public set maxSeatReservations(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.maxSeatReservations = value));
  }
  public get maxSeatReservations(): number {
    return this.#element.nativeElement.maxSeatReservations;
  }

  @Input({ transform: numberAttribute })
  public set maxBicycleReservations(value: number) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.maxBicycleReservations = value),
    );
  }
  public get maxBicycleReservations(): number {
    return this.#element.nativeElement.maxBicycleReservations;
  }

  @Input({ transform: booleanAttribute })
  public set preventPlaceClick(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.preventPlaceClick = value));
  }
  public get preventPlaceClick(): boolean {
    return this.#element.nativeElement.preventPlaceClick;
  }

  @Input({ transform: numberAttribute })
  public set preselectCoachIndex(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.preselectCoachIndex = value));
  }
  public get preselectCoachIndex(): number {
    return this.#element.nativeElement.preselectCoachIndex;
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

  public selectedCoachSignal = outputFromObservable(
    fromEvent<CustomEvent<SeatReservationCoachSelection>>(
      this.#element.nativeElement,
      'selectedcoach',
    ),
    { alias: 'selectedCoach' },
  );

  public selectedPlacesSignal = outputFromObservable(
    fromEvent<CustomEvent<SeatReservationSelectedPlacesEventDetails>>(
      this.#element.nativeElement,
      'selectedplaces',
    ),
    { alias: 'selectedPlaces' },
  );
}
