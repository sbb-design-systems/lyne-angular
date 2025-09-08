import { Directive, ElementRef, forwardRef, inject, Input, NgZone } from '@angular/core';
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

  @Input()
  public set value(value: string) {
    this.#runWithValidationCheck(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  @Input()
  public set valueAsDate(value: Date | null) {
    this.#runWithValidationCheck(() => (this.#element.nativeElement.valueAsDate = value));
  }
  public get valueAsDate(): Date | null {
    return this.#element.nativeElement.valueAsDate;
  }

  @Input({ transform: booleanAttribute })
  public set readOnly(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.readOnly = value));
  }
  public get readOnly(): boolean {
    return this.#element.nativeElement.readOnly;
  }

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

  @Input({ transform: booleanAttribute })
  public set required(value: boolean) {
    this.#runWithValidationCheck(() => (this.#element.nativeElement.required = value));
  }
  public get required(): boolean {
    return this.#element.nativeElement.required;
  }

  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

  public get type(): string {
    return this.#element.nativeElement.type;
  }

  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  public get validity(): ValidityState {
    return this.#element.nativeElement.validity;
  }

  public get validationMessage(): string {
    return this.#element.nativeElement.validationMessage;
  }

  public get willValidate(): boolean {
    return this.#element.nativeElement.willValidate;
  }

  public get empty(): boolean {
    return this.#element.nativeElement.empty;
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

  public checkValidity(): boolean {
    return this.#element.nativeElement.checkValidity();
  }

  public reportValidity(): boolean {
    return this.#element.nativeElement.reportValidity();
  }

  public setCustomValidity(message: string): void {
    return this.#element.nativeElement.setCustomValidity(message);
  }

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
    if (
      !this.valueAsDate ||
      this.valueAsDate.getHours() !== this.#lastValue?.getHours() ||
      this.valueAsDate.getMinutes() !== this.#lastValue?.getMinutes()
    ) {
      this.onChangeFn(this.valueAsDate);
    }
  }
}
