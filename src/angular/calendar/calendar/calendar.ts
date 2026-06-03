import {
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  type OutputRef,
  numberAttribute,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute, internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type {
  SbbCalendarElement,
  SbbDateSelectedEvent,
  SbbMonthChangeEvent,
} from '@sbb-esta/lyne-elements/calendar.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/calendar.js';

/**
 * It displays a calendar which allows choosing a date.
 *
 * @slot  - Use the unnamed slot to add customized `sbb-calendar-day` elements.
 */
@Directive({
  selector: 'sbb-calendar',
  exportAs: 'sbbCalendar',
})
export class SbbCalendar<T = Date> {
  #element: ElementRef<SbbCalendarElement<T>> = inject(ElementRef<SbbCalendarElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The amount of months to display in this calendar.
   */
  @Input({ transform: numberAttribute })
  public set amount(value: number) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.amount = value));
  }
  public get amount(): number {
    return this.#element.nativeElement.amount;
  }

  /**
   * The initial view of the calendar which should be displayed on opening.
   */
  @Input()
  public set view(value: 'day' | 'month' | 'year') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.view = value));
  }
  public get view(): 'day' | 'month' | 'year' {
    return this.#element.nativeElement.view;
  }

  /**
   * The minimum valid date. Accepts a date object or null.
   * Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute.
   */
  @Input()
  public set min(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.min = value));
  }
  public get min(): T | null {
    return this.#element.nativeElement.min;
  }

  /**
   * The maximum valid date. Accepts a date object or null.
   * Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute.
   */
  @Input()
  public set max(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.max = value));
  }
  public get max(): T | null {
    return this.#element.nativeElement.max;
  }

  /**
   * The selected date: accepts a date object, or, if `multiple`, an array of dates.
   */
  @Input()
  public set value(value: T | T[] | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): T | T[] | null {
    return this.#element.nativeElement.value;
  }

  /**
   * A function used to filter out dates.
   */
  @Input()
  public set dateFilter(value: ((date: T | null) => boolean) | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.dateFilter = value));
  }
  public get dateFilter(): ((date: T | null) => boolean) | null {
    return this.#element.nativeElement.dateFilter;
  }

  /**
   * The orientation of days in the calendar.
   */
  @Input()
  public set orientation(value: 'horizontal' | 'vertical') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): 'horizontal' | 'vertical' {
    return this.#element.nativeElement.orientation;
  }

  /**
   * Whether the calendar allows for multiple date selection.
   */
  @Input({ transform: booleanAttribute })
  public set multiple(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multiple = value));
  }
  public get multiple(): boolean {
    return this.#element.nativeElement.multiple;
  }

  /**
   * Whether it has to display the week numbers in addition to week days.
   */
  @Input({ transform: booleanAttribute })
  public set weekNumbers(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.weekNumbers = value));
  }
  public get weekNumbers(): boolean {
    return this.#element.nativeElement.weekNumbers;
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
   * Returns the form owner of this element.
   */
  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

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

  /**
   * Resets the active month according to the new state of the calendar.
   */
  public resetPosition(): void {
    return this.#element.nativeElement.resetPosition();
  }

  /**
   * Event emitted on date selection.
   */
  public dateSelectedOutput: OutputRef<SbbDateSelectedEvent<T>> = outputFromObservable(
    fromEvent<SbbDateSelectedEvent<T>>(this.#element.nativeElement, 'dateselected'),
    { alias: 'dateSelected' },
  );

  protected _monthchangeOutput: OutputRef<SbbMonthChangeEvent> =
    outputFromObservable<SbbMonthChangeEvent>(NEVER, { alias: 'monthchange' });
  /**
   * Emits when the month changes.
   * The `range` property contains the days array of the chosen month.
   */
  public monthchangeOutput: OutputRef<SbbMonthChangeEvent> = internalOutputFromObservable(
    fromEvent<SbbMonthChangeEvent>(this.#element.nativeElement, 'monthchange'),
  );
}
