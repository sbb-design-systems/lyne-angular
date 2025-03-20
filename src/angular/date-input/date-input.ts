import { Directive, ElementRef, Input, NgZone, inject, forwardRef, Output } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { booleanAttribute, SbbControlValueAccessorMixin } from '@sbb-esta/lyne-angular/core';
import { readConfig } from '@sbb-esta/lyne-elements/core/config.js';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';
import type { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.js';
import { fromEvent, type Observable, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/date-input.js';

@Directive({
  selector: 'sbb-date-input',
  exportAs: 'sbbDateInput',
  host: {
    '(change)': 'this.onChangeFn(this.valueAsDate)',
    '(blur)': 'this.onTouchedFn()',
    '(input)': 'this.validatorOnChange()',
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
  #element: ElementRef<SbbDateInputElement<T>> = inject(ElementRef<SbbDateInputElement<T>>);
  #ngZone: NgZone = inject(NgZone);
  #dateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected validatorOnChange = () => {};

  @Input()
  public set value(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  @Input()
  public set valueAsDate(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.valueAsDate = value));
  }
  public get valueAsDate(): T | null {
    return this.#element.nativeElement.valueAsDate;
  }

  @Input()
  public set min(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.min = value));
  }
  public get min(): T | null {
    return this.#element.nativeElement.min;
  }

  @Input()
  public set max(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.max = value));
  }
  public get max(): T | null {
    return this.#element.nativeElement.max;
  }

  @Input({ alias: 'date-filter' })
  public set dateFilter(value: (date: T | null) => boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.dateFilter = value));
  }
  public get dateFilter(): (date: T | null) => boolean {
    return this.#element.nativeElement.dateFilter;
  }

  @Input({ alias: 'weekday-style' })
  public set weekdayStyle(value: 'short' | 'none') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.weekdayStyle = value));
  }
  public get weekdayStyle(): 'short' | 'none' {
    return this.#element.nativeElement.weekdayStyle;
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
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.required = value));
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

  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output('input') protected _input: (typeof this)['input'] = NEVER;
  public input: Observable<InputEvent> = fromEvent<InputEvent>(
    this.#element.nativeElement,
    'input',
  );

  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output('change') protected _change: (typeof this)['change'] = NEVER;
  public change: Observable<Event> = fromEvent<Event>(this.#element.nativeElement, 'change');

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

  /** The form control validator for whether the input parses. */
  private _parseValidator: ValidatorFn = (): ValidationErrors | null =>
    this.validity.badInput ? { sbbDateParse: { text: this.#element.nativeElement.value } } : null;

  /** The form control validator for the min date. */
  private _minValidator: ValidatorFn = (): ValidationErrors | null =>
    this.validity.rangeUnderflow
      ? { sbbDateMin: { min: this.min, actual: this.valueAsDate } }
      : null;

  /** The form control validator for the max date. */
  private _maxValidator: ValidatorFn = (): ValidationErrors | null =>
    this.validity.rangeOverflow
      ? { sbbDateMax: { max: this.max, actual: this.valueAsDate } }
      : null;

  /** The form control validator for the date filter. */
  private _filterValidator: ValidatorFn = (): ValidationErrors | null =>
    this.validity.sbbDateFilter ? { sbbDateFilter: true } : null;

  /** The combined form control validator for this input. */
  private _validator: ValidatorFn | null = Validators.compose([
    this._parseValidator,
    this._minValidator,
    this._maxValidator,
    this._filterValidator,
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
    return this._validator?.(control) ?? null;
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
}
