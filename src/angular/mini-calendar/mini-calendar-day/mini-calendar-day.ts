import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbMiniCalendarDayElement } from '@sbb-esta/lyne-elements/mini-calendar/mini-calendar-day.js';

import '@sbb-esta/lyne-elements/mini-calendar/mini-calendar-day.js';

/**
 * It displays a day in the `sbb-mini-calendar-month`.
 */
@Directive({
  selector: 'sbb-mini-calendar-day',
  exportAs: 'sbbMiniCalendarDay',
})
export class SbbMiniCalendarDay<T = Date> {
  #element: ElementRef<SbbMiniCalendarDayElement<T>> = inject(
    ElementRef<SbbMiniCalendarDayElement<T>>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Date as ISO string (YYYY-MM-DD)
   */
  @Input()
  public set date(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.date = value));
  }
  public get date(): string {
    return this.#element.nativeElement.date;
  }

  /**
   * The type of the marker.
   */
  @Input()
  public set marker(value: 'target' | 'circle' | 'slash' | 'cross' | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.marker = value));
  }
  public get marker(): 'target' | 'circle' | 'slash' | 'cross' | string {
    return this.#element.nativeElement.marker;
  }

  /**
   * The color of the marker.
   */
  @Input()
  public set color(value: 'charcoal' | 'cloud' | 'orange' | 'red' | 'sky' | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'charcoal' | 'cloud' | 'orange' | 'red' | 'sky' | string {
    return this.#element.nativeElement.color;
  }

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
  public set type(value: SbbButtonType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): SbbButtonType {
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
