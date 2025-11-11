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
import type { SbbSeatReservationPlaceControlElement } from '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-place-control.js';
import type {
  PlaceSelection,
  PlaceState,
  PlaceType,
} from '@sbb-esta/lyne-elements-experimental/seat-reservation.js';
import { fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-place-control.js';

/**
 * Output the graphic of a seat or a bicycle place as a control element.
 */
@Directive({
  selector: 'sbb-seat-reservation-place-control',
  exportAs: 'sbbSeatReservationPlaceControl',
})
export class SbbSeatReservationPlaceControl {
  #element: ElementRef<SbbSeatReservationPlaceControlElement> = inject(
    ElementRef<SbbSeatReservationPlaceControlElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * placeType of the place, e.g. 'SEAT', 'BICYCLE'
   */
  @Input()
  public set placeType(value: PlaceType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.placeType = value));
  }
  public get placeType(): PlaceType {
    return this.#element.nativeElement.placeType;
  }

  /**
   * state of the place, e.g. 'FREE', 'SELECTED', 'BLOCKED'
   */
  @Input()
  public set state(value: PlaceState) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.state = value));
  }
  public get state(): PlaceState {
    return this.#element.nativeElement.state;
  }

  /**
   * property ids of the place, to display more info about the place
   */
  @Input()
  public set propertyIds(value: string[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.propertyIds = value));
  }
  public get propertyIds(): string[] {
    return this.#element.nativeElement.propertyIds;
  }

  /**
   * label of the place, e.g. '1A', '2B'
   */
  @Input()
  public set text(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.text = value));
  }
  public get text(): string {
    return this.#element.nativeElement.text;
  }

  /**
   * Coach Index Prop to identifier the right place to coach
   */
  @Input({ transform: numberAttribute })
  public set coachIndex(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.coachIndex = value));
  }
  public get coachIndex(): number {
    return this.#element.nativeElement.coachIndex;
  }

  /**
   * Prevent click prop prevent any place action
   */
  @Input({ transform: booleanAttribute })
  public set preventClick(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.preventClick = value));
  }
  public get preventClick(): boolean {
    return this.#element.nativeElement.preventClick;
  }

  /**
   * Set the place focus outline style
   */
  @Input()
  public set keyfocus(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.keyfocus = value));
  }
  public get keyfocus(): string {
    return this.#element.nativeElement.keyfocus;
  }

  /**
   * Deck Index Prop to identifier the right place to deck
   */
  @Input({ transform: numberAttribute })
  public set deckIndex(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.deckIndex = value));
  }
  public get deckIndex(): number {
    return this.#element.nativeElement.deckIndex;
  }

  /**
   * Emits when a place was selected via user interaction and returns a
   * PlaceSelection object with necessary place information.
   */
  public selectPlaceOutput: OutputRef<CustomEvent<PlaceSelection>> = outputFromObservable(
    fromEvent<CustomEvent<PlaceSelection>>(this.#element.nativeElement, 'selectplace'),
    { alias: 'selectPlace' },
  );
}
