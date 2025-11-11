import {
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  numberAttribute,
  type OutputRef,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSeatReservationElement } from '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation.js';
import type {
  SeatReservation,
  SeatReservationSelectedCoach,
  SeatReservationSelectedPlaces,
} from '@sbb-esta/lyne-elements-experimental/seat-reservation.js';
import { fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation.js';

/**
 * Main component for the seat reservation.
 */
@Directive({
  selector: 'sbb-seat-reservation',
  exportAs: 'sbbSeatReservation',
})
export class SbbSeatReservation {
  #element: ElementRef<SbbSeatReservationElement> = inject(ElementRef<SbbSeatReservationElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The seat reservations array contains all coaches and places
   */
  @Input()
  public set seatReservations(value: SeatReservation[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.seatReservations = value));
  }
  public get seatReservations(): SeatReservation[] {
    return this.#element.nativeElement.seatReservations;
  }

  /**
   * The seat reservation navigation can be toggled by this property
   */
  @Input({ transform: booleanAttribute })
  public set hasNavigation(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hasNavigation = value));
  }
  public get hasNavigation(): boolean {
    return this.#element.nativeElement.hasNavigation;
  }

  /**
   * The seat reservation area is aligned vertically
   */
  @Input({ transform: booleanAttribute })
  public set alignVertical(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.alignVertical = value));
  }
  public get alignVertical(): boolean {
    return this.#element.nativeElement.alignVertical;
  }

  /**
   * Maximal number of possible clickable seats
   */
  @Input({ transform: numberAttribute })
  public set maxSeatReservations(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.maxSeatReservations = value));
  }
  public get maxSeatReservations(): number {
    return this.#element.nativeElement.maxSeatReservations;
  }

  /**
   * Maximal number of possible clickable bicycle places
   */
  @Input({ transform: numberAttribute })
  public set maxBicycleReservations(value: number) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.maxBicycleReservations = value),
    );
  }
  public get maxBicycleReservations(): number {
    return this.#element.nativeElement.maxBicycleReservations;
  }

  /**
   * Any click functionality is prevented
   */
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

  /**
   * The seat reservation area's base grid size
   */
  @Input({ transform: numberAttribute })
  public set baseGridSize(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.baseGridSize = value));
  }
  public get baseGridSize(): number {
    return this.#element.nativeElement.baseGridSize;
  }

  /**
   * The seat reservation area's width
   */
  @Input({ transform: numberAttribute })
  public set height(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.height = value));
  }
  public get height(): number {
    return this.#element.nativeElement.height;
  }

  /**
   * Emits when a coach was selected and returns a CoachSelection
   */
  public selectedCoachOutput: OutputRef<CustomEvent<SeatReservationSelectedCoach>> =
    outputFromObservable(
      fromEvent<CustomEvent<SeatReservationSelectedCoach>>(
        this.#element.nativeElement,
        'selectedcoach',
      ),
      { alias: 'selectedCoach' },
    );

  /**
   * Emits when a place was selected and returns a Place array with all selected places.
   */
  public selectedPlacesOutput: OutputRef<CustomEvent<SeatReservationSelectedPlaces>> =
    outputFromObservable(
      fromEvent<CustomEvent<SeatReservationSelectedPlaces>>(
        this.#element.nativeElement,
        'selectedplaces',
      ),
      { alias: 'selectedPlaces' },
    );
}
