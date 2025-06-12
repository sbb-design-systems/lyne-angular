import {
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  numberAttribute,
  Output,
} from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type {
  SbbSeatReservationNavigationCoachElement,
  SelectCoachEventDetails,
} from '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-navigation/seat-reservation-navigation-coach.js';
import type { PlaceTravelClass } from '@sbb-esta/lyne-elements-experimental/seat-reservation.js';
import { fromEvent, NEVER, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-navigation/seat-reservation-navigation-coach.js';

@Directive({
  selector: 'sbb-seat-reservation-navigation-coach',
  exportAs: 'SbbSeatReservationNavigationCoach',
})
export class SbbSeatReservationNavigationCoach {
  #element: ElementRef<SbbSeatReservationNavigationCoachElement> = inject(
    ElementRef<SbbSeatReservationNavigationCoachElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set coachId(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.coachId = value));
  }
  public get coachId(): string {
    return this.#element.nativeElement.coachId;
  }

  @Input()
  public set propertyIds(value: string[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.propertyIds = value));
  }
  public get propertyIds(): string[] {
    return this.#element.nativeElement.propertyIds;
  }

  @Input({ transform: booleanAttribute })
  public set selected(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): boolean {
    return this.#element.nativeElement.selected;
  }

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

  @Input()
  public set travelClass(value: PlaceTravelClass[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.travelClass = value));
  }
  public get travelClass(): PlaceTravelClass[] {
    return this.#element.nativeElement.travelClass;
  }

  @Input({ transform: booleanAttribute })
  public set driverArea(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.driverArea = value));
  }
  public get driverArea(): boolean {
    return this.#element.nativeElement.driverArea;
  }

  @Input({ transform: booleanAttribute })
  public set first(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.first = value));
  }
  public get first(): boolean {
    return this.#element.nativeElement.first;
  }

  @Input({ transform: booleanAttribute })
  public set last(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.last = value));
  }
  public get last(): boolean {
    return this.#element.nativeElement.last;
  }

  @Input({ transform: booleanAttribute })
  public set disable(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disable = value));
  }
  public get disable(): boolean {
    return this.#element.nativeElement.disable;
  }

  @Input({ transform: booleanAttribute })
  public set vertical(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.vertical = value));
  }
  public get vertical(): boolean {
    return this.#element.nativeElement.vertical;
  }

  @Output('selectCoach') protected _selectCoach: (typeof this)['selectCoach'] = NEVER;
  public selectCoach: Observable<CustomEvent<SelectCoachEventDetails>> = fromEvent<
    CustomEvent<SelectCoachEventDetails>
  >(this.#element.nativeElement, 'selectCoach');

  @Output('focusCoach') protected _focusCoach: (typeof this)['focusCoach'] = NEVER;
  public focusCoach: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'focusCoach',
  );
}
