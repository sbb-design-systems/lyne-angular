import { Directive, ElementRef, forwardRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import type { AbstractControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import {
  booleanAttribute,
  internalOutputFromObservable,
  SbbControlValueAccessorMixin,
} from '@sbb-esta/lyne-angular/core';
import { readConfig } from '@sbb-esta/lyne-elements/core/config.js';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';
import type { SbbDateInputAssociated } from '@sbb-esta/lyne-elements/date-input.js';
import { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.js';
import type { SbbDatepickerElement } from '@sbb-esta/lyne-elements/datepicker/datepicker.js';
import { fromEvent, NEVER } from 'rxjs';

/**
 * Custom input for a date.
 */
@Directive({
  selector: 'sbb-date-input',
  exportAs: 'sbbDateInput',
  host: {
    '(change)': 'this.onChangeFn(this.valueAsDate)',
    '(blur)': 'this.onTouchedFn()',
    '(beforeinput)': 'this._onBeforeInput()',
    '(input)': 'this._onInput()',
    '(invalid)': 'this.validatorOnChange()',
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SbbDateInput), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => SbbDateInput), multi: true },
  ],
})
export class SbbDateInput<T = Date>
  extends SbbControlValueAccessorMixin(class {})
  implements Validator
{
  /**
   * Attempts to resolve the associated date input with the given element.
   */
  public static resolveAssociation<T>(host: HTMLElement & SbbDateInputAssociated<T>): void {
    return SbbDateInputElement.resolveAssociation(host);
  }

  #element: ElementRef<SbbDateInputElement<T>> = inject(ElementRef<SbbDateInputElement<T>>);
  #ngZone: NgZone = inject(NgZone);
  #dateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  #lastValue: T | null = null;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected validatorOnChange = () => {};

  /**
   * The value of the input. Reflects the current text value of this input.
   */
  @Input()
  public set value(value: string) {
    this.#runWithValidationCheck(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  @Input()
  public set valueAsDate(value: T | null) {
    this.#runWithValidationCheck(() => (this.#element.nativeElement.valueAsDate = value));
  }
  public get valueAsDate(): T | null {
    return this.#element.nativeElement.valueAsDate;
  }

  /**
   * The minimum valid date. Accepts a date object or null.
   * Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute.
   */
  @Input()
  public set min(value: T | null) {
    this.#runWithValidationCheck(() => (this.#element.nativeElement.min = value));
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
    this.#runWithValidationCheck(() => (this.#element.nativeElement.max = value));
  }
  public get max(): T | null {
    return this.#element.nativeElement.max;
  }

  /**
   * A function used to filter out dates.
   * It is strongly recommended to use min and max dates alongside
   * this filter.
   */
  @Input()
  public set dateFilter(value: (date: T | null) => boolean) {
    this.#runWithValidationCheck(() => (this.#element.nativeElement.dateFilter = value));
  }
  public get dateFilter(): (date: T | null) => boolean {
    return this.#element.nativeElement.dateFilter;
  }

  /**
   * How to format the displayed date.
   * `short`: Two letter abbreviation of the week day (e.g. Fr).
   * `none`: The weekday is not displayed.
   */
  @Input()
  public set weekdayStyle(value: 'short' | 'none') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.weekdayStyle = value));
  }
  public get weekdayStyle(): 'short' | 'none' {
    return this.#element.nativeElement.weekdayStyle;
  }

  /**
   * Whether the component is readonly.
   */
  @Input({ transform: booleanAttribute })
  public set readOnly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readOnly = value));
  }
  public get readOnly(): boolean {
    return this.#element.nativeElement.readOnly;
  }

  /**
   * Whether the component is disabled.
   */
  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }

  @Input()
  public set placeholder(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.placeholder = value));
  }
  public get placeholder(): string {
    return this.#element.nativeElement.placeholder;
  }

  /**
   * Whether the component is required.
   */
  @Input({ transform: booleanAttribute })
  public set required(value: boolean) {
    this.#runWithValidationCheck(() => (this.#element.nativeElement.required = value));
  }
  public get required(): boolean {
    return this.#element.nativeElement.required;
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
   * Form type of element.
   */
  public get type(): string {
    return this.#element.nativeElement.type;
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
   * returned, if it is still applicable). Also a custom validity message
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
   * Whether the input is empty
   */
  public get empty(): boolean {
    return this.#element.nativeElement.empty;
  }

  /** The form control validator for whether the input parses. */
  #parseValidator: ValidatorFn = (): ValidationErrors | null =>
    this.validity.badInput ? { sbbDateParse: { text: this.#element.nativeElement.value } } : null;

  /** The form control validator for the min date. */
  #minValidator: ValidatorFn = (): ValidationErrors | null =>
    this.validity.rangeUnderflow
      ? { sbbDateMin: { min: this.min, actual: this.valueAsDate } }
      : null;

  /** The form control validator for the max date. */
  #maxValidator: ValidatorFn = (): ValidationErrors | null =>
    this.validity.rangeOverflow
      ? { sbbDateMax: { max: this.max, actual: this.valueAsDate } }
      : null;

  /** The form control validator for the date filter. */
  #filterValidator: ValidatorFn = (): ValidationErrors | null =>
    this.validity.sbbDateFilter ? { sbbDateFilter: true } : null;

  /** The combined form control validator for this input. */
  #validator: ValidatorFn | null = Validators.compose([
    this.#parseValidator,
    this.#minValidator,
    this.#maxValidator,
    this.#filterValidator,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override writeValue(value: any): void {
    if (this.#dateAdapter.isDateInstance(value) && this.#dateAdapter.isValid(value)) {
      this.valueAsDate = value;
    } else {
      this.valueAsDate = this.#dateAdapter.parse(value);
      if (!this.valueAsDate) {
        this.value = value;
      }
    }
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.validatorOnChange = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.#validator?.(control) ?? null;
  }

  public focus(options: FocusOptions): void {
    return this.#element.nativeElement.focus(options);
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
   * Gets the associated datepicker, if any.
   * The sbb-date-input and the sbb-datepicker are assumed to be in the same parent container.
   */
  public get datepicker(): SbbDatepickerElement<T> | null {
    return this.#element.nativeElement.datepicker;
  }

  /**
   * Makes the selection equal to the current object.
   */
  public select(): void {
    return this.#element.nativeElement.select();
  }

  protected _inputOutput = outputFromObservable<InputEvent>(NEVER, { alias: 'input' });
  public inputOutput = internalOutputFromObservable(
    fromEvent<InputEvent>(this.#element.nativeElement, 'input'),
  );

  protected _changeOutput = outputFromObservable<Event>(NEVER, { alias: 'change' });
  public changeOutput = internalOutputFromObservable(
    fromEvent<Event>(this.#element.nativeElement, 'change'),
  );

  #runWithValidationCheck(action: () => void): void {
    this.#ngZone.runOutsideAngular(() => {
      const isValid = this.#element.nativeElement.validity.valid;
      action();
      if (this.#element.nativeElement.validity.valid !== isValid) {
        this.validatorOnChange();
      }
    });
  }

  _onBeforeInput() {
    this.#lastValue = this.#element.nativeElement.valueAsDate;
  }

  _onInput() {
    // We need to fire the CVA change event for all
    // nulls, otherwise the validators won't run.
    if (!this.valueAsDate || !this.#dateAdapter.sameDate(this.valueAsDate, this.#lastValue)) {
      this.onChangeFn(this.valueAsDate);
    }
  }
}
