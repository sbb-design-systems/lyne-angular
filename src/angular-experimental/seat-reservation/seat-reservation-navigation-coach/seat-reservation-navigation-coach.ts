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
  CoachItemDetails,
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

  @Input()
  public set coachItemDetails(value: CoachItemDetails) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.coachItemDetails = value));
  }
  public get coachItemDetails(): CoachItemDetails {
    return this.#element.nativeElement.coachItemDetails;
  }

  /**
   * Disable the mouse over title information
   */
  @Input({ transform: booleanAttribute })
  public set showTitleInfo(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.showTitleInfo = value));
  }
  public get showTitleInfo(): boolean {
    return this.#element.nativeElement.showTitleInfo;
  }
}
