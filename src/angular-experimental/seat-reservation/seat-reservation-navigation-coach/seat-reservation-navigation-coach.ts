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
import type { SbbSeatReservationNavigationCoachElement } from '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-navigation-coach.js';
import type {
  CoachNumberOfFreePlaces,
  PlaceTravelClass,
  SelectCoachEventDetails,
} from '@sbb-esta/lyne-elements-experimental/seat-reservation.js';
import { fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-navigation-coach.js';

/**
 * This component will display the navigation coach item for Seat reservation.
 */
@Directive({
  selector: 'sbb-seat-reservation-navigation-coach',
  exportAs: 'sbbSeatReservationNavigationCoach',
})
export class SbbSeatReservationNavigationCoach {
  #element: ElementRef<SbbSeatReservationNavigationCoachElement> = inject(
    ElementRef<SbbSeatReservationNavigationCoachElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Coach ID, which is used to identify the coach in the navigation
   */
  @Input()
  public set coachId(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.coachId = value));
  }
  public get coachId(): string {
    return this.#element.nativeElement.coachId;
  }

  /**
   * Coach service property ids, which are used to display the services in the navigation
   */
  @Input()
  public set propertyIds(value: string[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.propertyIds = value));
  }
  public get propertyIds(): string[] {
    return this.#element.nativeElement.propertyIds;
  }

  /**
   * Select coach property
   */
  @Input({ transform: booleanAttribute })
  public set selected(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): boolean {
    return this.#element.nativeElement.selected;
  }

  /**
   * Focus coach property
   */
  @Input({ transform: booleanAttribute })
  public set focused(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.focused = value));
  }
  public get focused(): boolean {
    return this.#element.nativeElement.focused;
  }

  @Input({ transform: numberAttribute })
  public set index(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.index = value));
  }
  public get index(): number {
    return this.#element.nativeElement.index;
  }

  /**
   * Representation of places available for selecting, counting seat places and bicycle places separetely
   */
  @Input()
  public set freePlacesByType(value: CoachNumberOfFreePlaces) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.freePlacesByType = value));
  }
  public get freePlacesByType(): CoachNumberOfFreePlaces {
    return this.#element.nativeElement.freePlacesByType;
  }

  /**
   * Travel class of the coach
   */
  @Input()
  public set travelClass(value: PlaceTravelClass[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.travelClass = value));
  }
  public get travelClass(): PlaceTravelClass[] {
    return this.#element.nativeElement.travelClass;
  }

  /**
   * If the coach is a driver/restricted area
   */
  @Input({ transform: booleanAttribute })
  public set driverArea(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.driverArea = value));
  }
  public get driverArea(): boolean {
    return this.#element.nativeElement.driverArea;
  }

  /**
   * If the coach is the first in the navigation
   */
  @Input({ transform: booleanAttribute })
  public set first(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.first = value));
  }
  public get first(): boolean {
    return this.#element.nativeElement.first;
  }

  /**
   * If the coach is the last in the navigation
   */
  @Input({ transform: booleanAttribute })
  public set last(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.last = value));
  }
  public get last(): boolean {
    return this.#element.nativeElement.last;
  }

  /**
   * Disable the coach navigation
   */
  @Input({ transform: booleanAttribute })
  public set disable(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disable = value));
  }
  public get disable(): boolean {
    return this.#element.nativeElement.disable;
  }

  /**
   * If the coach navigation should be displayed vertically
   */
  @Input({ transform: booleanAttribute })
  public set vertical(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.vertical = value));
  }
  public get vertical(): boolean {
    return this.#element.nativeElement.vertical;
  }

  /**
   * Emits when a nav coach has the focus
   */
  public focusCoachOutput: OutputRef<Event> = outputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'focuscoach'),
    { alias: 'focusCoach' },
  );

  /**
   * Emits when a coach within the navigation was selected and returns the clicked coach nav index.
   */
  public selectCoachOutput: OutputRef<CustomEvent<SelectCoachEventDetails>> = outputFromObservable(
    fromEvent<CustomEvent<SelectCoachEventDetails>>(this.#element.nativeElement, 'selectcoach'),
    { alias: 'selectCoach' },
  );

  /**
   * Hover coach property
   */
  @Input({ transform: booleanAttribute })
  public set hovered(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.hovered = value));
  }
  public get hovered(): boolean {
    return this.#element.nativeElement.hovered;
  }

  /**
   * Native focus for this navigation coach is also set when the focused property is changed
   */
  @Input({ transform: booleanAttribute })
  public set nativeFocusActive(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.nativeFocusActive = value));
  }
  public get nativeFocusActive(): boolean {
    return this.#element.nativeElement.nativeFocusActive;
  }
}
