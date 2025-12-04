import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.js';
import type { SbbDatepickerToggleElement } from '@sbb-esta/lyne-elements/datepicker/datepicker-toggle.js';
import type { SbbDatepickerElement } from '@sbb-esta/lyne-elements/datepicker/datepicker.js';

import '@sbb-esta/lyne-elements/datepicker/datepicker-toggle.js';

/**
 * Combined with a `sbb-datepicker`, it can be used to select a date from a `sbb-calendar`.
 */
@Directive({
  selector: 'sbb-datepicker-toggle',
  exportAs: 'sbbDatepickerToggle',
})
export class SbbDatepickerToggle<T = Date> {
  #element: ElementRef<SbbDatepickerToggleElement<T>> = inject(
    ElementRef<SbbDatepickerToggleElement<T>>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Datepicker reference.
   */
  @Input()
  public set datepicker(value: string | SbbDatepickerElement<T> | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.datepicker = value as SbbDatepickerElement<T> | null),
    );
  }
  public get datepicker(): SbbDatepickerElement<T> | null {
    return this.#element.nativeElement.datepicker;
  }

  /**
   * Negative coloring variant flag.
   */
  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  /**
   * The associated date input element.
   *
   * For attribute usage, provide an id reference.
   */
  @Input()
  public set input(value: string | SbbDateInputElement<T> | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.input = value as SbbDateInputElement<T> | null),
    );
  }
  public get input(): SbbDateInputElement<T> | null {
    return this.#element.nativeElement.input;
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
   * Whether this button is disabled.
   */
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
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
