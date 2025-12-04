import {
  Directive,
  ElementRef,
  forwardRef,
  inject,
  Input,
  NgZone,
  type OutputRef,
} from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import type { AbstractControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import {
  booleanAttribute,
  internalOutputFromObservable,
  SbbControlValueAccessorMixin,
} from '@sbb-esta/lyne-angular/core';
import type { SbbTimeInputElement } from '@sbb-esta/lyne-elements/time-input.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/time-input.js';

/**
 * Custom input for a time.
 */
@Directive({
  selector: 'sbb-time-input',
  exportAs: 'sbbTimeInput',
  host: {
    '(change)': 'this.onChangeFn(this.valueAsDate)',
    '(blur)': 'this.onTouchedFn()',
    '(input)': 'this._onInput()',
    '(invalid)': 'this.validatorOnChange()',
  },
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SbbTimeInput), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => SbbTimeInput), multi: true },
  ],
})
export class SbbTimeInput extends SbbControlValueAccessorMixin(class {}) implements Validator {
  #element: ElementRef<SbbTimeInputElement> = inject(ElementRef<SbbTimeInputElement>);
  #ngZone: NgZone = inject(NgZone);
  #lastValue: Date | null = null;

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

  /**
   * Formats the current input's value as date.
   */
  @Input()
  public set valueAsDate(value: Date | null) {
    this.#runWithValidationCheck(() => (this.#element.nativeElement.valueAsDate = value));
  }
  public get valueAsDate(): Date | null {
    return this.#element.nativeElement.valueAsDate;
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

  /** The form control validator for whether the input parses. */
  #parseValidator: ValidatorFn = (): ValidationErrors | null =>
    this.validity.badInput ? { sbbTimeParse: { text: this.#element.nativeElement.value } } : null;

  /** The form control validator for the max time. */
  #maxValidator: ValidatorFn = (): ValidationErrors | null =>
    this.validity.rangeOverflow ? { sbbTimeMax: { actual: this.valueAsDate } } : null;

  /** The combined form control validator for this input. */
  #validator: ValidatorFn | null = Validators.compose([this.#parseValidator, this.#maxValidator]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override writeValue(value: any): void {
    if (value instanceof Date) {
      this.valueAsDate = value;
    } else {
      this.value = value;
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
   * Makes the selection equal to the current object.
   */
  public select(): void {
    return this.#element.nativeElement.select();
  }

  protected _inputOutput: OutputRef<InputEvent> = outputFromObservable<InputEvent>(NEVER, {
    alias: 'input',
  });
  /**
   * The input event fires when the value has been changed as a direct result of a user action.
   */
  public inputOutput: OutputRef<InputEvent> = internalOutputFromObservable(
    fromEvent<InputEvent>(this.#element.nativeElement, 'input'),
  );

  protected _changeOutput: OutputRef<Event> = outputFromObservable<Event>(NEVER, {
    alias: 'change',
  });
  /**
   * The change event is fired when the user modifies the element's value. Unlike the input event, the change event is not necessarily fired for each alteration to an element's value.
   */
  public changeOutput: OutputRef<Event> = internalOutputFromObservable(
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
    if (
      !this.valueAsDate ||
      this.valueAsDate.getHours() !== this.#lastValue?.getHours() ||
      this.valueAsDate.getMinutes() !== this.#lastValue?.getMinutes()
    ) {
      this.onChangeFn(this.valueAsDate);
    }
  }
}
