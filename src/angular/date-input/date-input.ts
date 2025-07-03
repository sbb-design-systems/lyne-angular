import { Directive, ElementRef, forwardRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
import type { AbstractControl, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { booleanAttribute, SbbControlValueAccessorMixin } from '@sbb-esta/lyne-angular/core';
import { readConfig } from '@sbb-esta/lyne-elements/core/config.js';
import { defaultDateAdapter } from '@sbb-esta/lyne-elements/core/datetime.js';
import type { SbbDateInputAssociated } from '@sbb-esta/lyne-elements/date-input.js';
import { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.js';
import type { SbbDatepickerElement } from '@sbb-esta/lyne-elements/datepicker/datepicker.js';
import { fromEvent, NEVER } from 'rxjs';

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
  public static resolveAssociation<T>(host: HTMLElement & SbbDateInputAssociated<T>): void {
    return SbbDateInputElement.resolveAssociation(host);
  }

  #element: ElementRef<SbbDateInputElement<T>> = inject(ElementRef<SbbDateInputElement<T>>);
  #ngZone: NgZone = inject(NgZone);
  #dateAdapter = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected validatorOnChange = () => {};

  @Input()
  public set value(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
    this.validatorOnChange?.();
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  @Input()
  public set valueAsDate(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.valueAsDate = value));
    this.validatorOnChange?.();
  }
  public get valueAsDate(): T | null {
    return this.#element.nativeElement.valueAsDate;
  }

  @Input()
  public set min(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.min = value));
    this.validatorOnChange?.();
  }
  public get min(): T | null {
    return this.#element.nativeElement.min;
  }

  @Input()
  public set max(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.max = value));
    this.validatorOnChange?.();
  }
  public get max(): T | null {
    return this.#element.nativeElement.max;
  }

  @Input()
  public set dateFilter(value: (date: T | null) => boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.dateFilter = value));
    this.validatorOnChange?.();
  }
  public get dateFilter(): (date: T | null) => boolean {
    return this.#element.nativeElement.dateFilter;
  }

  @Input()
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

  public checkValidity(): boolean {
    return this.#element.nativeElement.checkValidity();
  }

  public reportValidity(): boolean {
    return this.#element.nativeElement.reportValidity();
  }

  public setCustomValidity(message: string): void {
    return this.#element.nativeElement.setCustomValidity(message);
  }

  public get datepicker(): SbbDatepickerElement<T> | null {
    return this.#element.nativeElement.datepicker;
  }

  public select(): void {
    return this.#element.nativeElement.select();
  }

  protected _inputSignal = outputFromObservable<InputEvent>(NEVER, { alias: 'input' });
  public inputSignal = toSignal(fromEvent<InputEvent>(this.#element.nativeElement, 'input'));

  protected _changeSignal = outputFromObservable<Event>(NEVER, { alias: 'change' });
  public changeSignal = toSignal(fromEvent<Event>(this.#element.nativeElement, 'change'));
}
