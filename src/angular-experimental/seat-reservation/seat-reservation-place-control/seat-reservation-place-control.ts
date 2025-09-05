import { Directive, ElementRef, inject, Input, NgZone, numberAttribute } from '@angular/core';
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

@Directive({
  selector: 'sbb-seat-reservation-place-control',
  exportAs: 'sbbSeatReservationPlaceControl',
})
export class SbbSeatReservationPlaceControl {
  #element: ElementRef<SbbSeatReservationPlaceControlElement> = inject(
    ElementRef<SbbSeatReservationPlaceControlElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set placeType(value: PlaceType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.placeType = value));
  }
  public get placeType(): PlaceType {
    return this.#element.nativeElement.placeType;
  }

  @Input()
  public set state(value: PlaceState) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.state = value));
  }
  public get state(): PlaceState {
    return this.#element.nativeElement.state;
  }

  @Input()
  public set propertyIds(value: string[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.propertyIds = value));
  }
  public get propertyIds(): string[] {
    return this.#element.nativeElement.propertyIds;
  }

  @Input()
  public set text(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.text = value));
  }
  public get text(): string {
    return this.#element.nativeElement.text;
  }

  @Input({ transform: numberAttribute })
  public set coachIndex(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.coachIndex = value));
  }
  public get coachIndex(): number {
    return this.#element.nativeElement.coachIndex;
  }

  @Input({ transform: booleanAttribute })
  public set preventClick(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.preventClick = value));
  }
  public get preventClick(): boolean {
    return this.#element.nativeElement.preventClick;
  }

  @Input()
  public set keyfocus(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.keyfocus = value));
  }
  public get keyfocus(): string {
    return this.#element.nativeElement.keyfocus;
  }

  @Input({ transform: numberAttribute })
  public set deckIndex(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.deckIndex = value));
  }
  public get deckIndex(): number {
    return this.#element.nativeElement.deckIndex;
  }

  public selectPlaceOutput = outputFromObservable(
    fromEvent<CustomEvent<PlaceSelection>>(this.#element.nativeElement, 'selectplace'),
    { alias: 'selectPlace' },
  );
}
