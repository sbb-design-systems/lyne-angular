import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbDatepickerPreviousDayElement } from '@sbb-esta/lyne-elements/datepicker/datepicker-previous-day.js';
import '@sbb-esta/lyne-elements/datepicker/datepicker-previous-day.js';
import { SbbDatepickerElement } from '@sbb-esta/lyne-elements/datepicker/datepicker.js';

@Directive({
  selector: 'sbb-datepicker-previous-day',
})
export class SbbDatepickerPreviousDay<T = Date> {
  #element: ElementRef<SbbDatepickerPreviousDayElement<T>> = inject(
    ElementRef<SbbDatepickerPreviousDayElement<T>>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  @Input()
  public set datepicker(value: SbbDatepickerElement<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.datepicker = value));
  }
  public get datepicker(): SbbDatepickerElement<T> | null {
    return this.#element.nativeElement.datepicker;
  }

  @Input()
  public set form(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.form = value));
  }
  public get form(): HTMLFormElement | null {
    return this.#element.nativeElement.form;
  }

  @Input()
  public set name(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.name = value));
  }
  public get name(): string {
    return this.#element.nativeElement.name;
  }

  @Input()
  public set value(value: string | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string | null {
    return this.#element.nativeElement.value;
  }

  @Input()
  public set type(value: SbbButtonType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): SbbButtonType {
    return this.#element.nativeElement.type;
  }

  @Input({ alias: 'date-picker' })
  public set datePicker(value: string | SbbDatepickerElement<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.datePicker = value));
  }
  public get datePicker(): string | SbbDatepickerElement<T> | null {
    return this.#element.nativeElement.datePicker;
  }
}
