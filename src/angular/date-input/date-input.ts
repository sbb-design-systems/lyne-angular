import { Directive, ElementRef, Input, NgZone, Output, inject, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { booleanAttribute, SbbControlValueAccessorMixin } from '@sbb-esta/lyne-angular/core';
import type { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/date-input.js';

@Directive({
  selector: 'sbb-date-input',
  exportAs: 'sbbDateInput',
  host: {
    '(change)': 'this.onChangeFn(this.value)',
    '(blur)': 'this.onTouchedFn()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SbbDateInput),
      multi: true,
    },
  ],
})
export class SbbDateInput<T = Date> extends SbbControlValueAccessorMixin(class {}) {
  #element: ElementRef<SbbDateInputElement<T>> = inject(ElementRef<SbbDateInputElement<T>>);
  #ngZone: NgZone = inject(NgZone);

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

  @Input()
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

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public input: Observable<InputEvent> = fromEvent<InputEvent>(
    this.#element.nativeElement,
    'input',
  );

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public change: Observable<Event> = fromEvent<Event>(
    this.#element.nativeElement,
    'change',
  );

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
