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
import type {
  PlaceState,
  PlaceType,
  SbbPlaceSelectionEvent,
  TravelDirection,
} from '@sbb-esta/lyne-elements-experimental/seat-reservation.pure.js';
import { SbbSeatReservationPlaceControlElement } from '@sbb-esta/lyne-elements-experimental/seat-reservation.pure.js';
import { fromEvent } from 'rxjs';

/**
 * Output the graphic of a seat or a bicycle place as a control element.
 */
@Directive({
  selector: 'sbb-seat-reservation-place-control',
  exportAs: 'sbbSeatReservationPlaceControl',
})
export class SbbSeatReservationPlaceControl {
  static {
    SbbSeatReservationPlaceControlElement.define();
  }

  #element: ElementRef<SbbSeatReservationPlaceControlElement> = inject(
    ElementRef<SbbSeatReservationPlaceControlElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Value of the form element.
   */
  @Input()
  public set value(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  /**
   * The type attribute to use for the button.
   */
  @Input()
  public set type(value: 'button' | 'reset' | 'submit') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): 'button' | 'reset' | 'submit' {
    return this.#element.nativeElement.type;
  }

  /**
   * The `<form>` element to associate the button with.
   */
  @Input()
  public set form(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.form = value));
  }
  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  /**
   * Name of the form element. Will be read from name attribute.
   */
  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

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
   * direction of a whole train, used to compute an orientation of a place
   */
  @Input()
  public set travelDirection(value: TravelDirection) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.travelDirection = value));
  }
  public get travelDirection(): TravelDirection {
    return this.#element.nativeElement.travelDirection;
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

  /**
   * Emits when a place was selected via user interaction and returns a
   * PlaceSelection object with necessary place information.
   */
  public selectPlaceOutput: OutputRef<SbbPlaceSelectionEvent> = outputFromObservable(
    fromEvent<SbbPlaceSelectionEvent>(this.#element.nativeElement, 'selectplace'),
    { alias: 'selectPlace' },
  );

  /**
   * Returns the ValidityState object for this element.
   */
  public get validity(): ValidityState {
    return this.#element.nativeElement.validity;
  }

  /**
   * Returns the current error message, if available, which corresponds
   * to the current validation state.
   * Please note that only one message is returned at a time (e.g. if
   * multiple validity states are invalid, only the chronologically first one
   * is returned until it is fixed, at which point the next message might be
   * returned, if it is still applicable). Also, a custom validity message
   * (see below) has precedence over native validation messages.
   */
  public get validationMessage(): string {
    return this.#element.nativeElement.validationMessage;
  }

  /**
   * Returns true if this element will be validated
   * when the form is submitted; false otherwise.
   */
  public get willValidate(): boolean {
    return this.#element.nativeElement.willValidate;
  }
  /**
   * Returns true if this element has no validity problems; false otherwise.
   * Fires an invalid event at the element in the latter case.
   */
  public checkValidity(): boolean {
    return this.#element.nativeElement.checkValidity();
  }
  /**
   * Returns true if this element has no validity problems; otherwise,
   * returns false, fires an invalid event at the element,
   * and (if the event isn't canceled) reports the problem to the user.
   */
  public reportValidity(): boolean {
    return this.#element.nativeElement.reportValidity();
  }
  /**
   * Sets the custom validity message for this element. Use the empty string
   * to indicate that the element does not have a custom validity error.
   */
  public setCustomValidity(message: string): void {
    return this.#element.nativeElement.setCustomValidity(message);
  }
}
