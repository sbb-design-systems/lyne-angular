/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbDatepickerNextDayElement } from '@sbb-esta/lyne-elements/datepicker/datepicker-next-day.js';
import '@sbb-esta/lyne-elements/datepicker/datepicker-next-day.js';
import { SbbDatepickerElement } from '@sbb-esta/lyne-elements/datepicker/datepicker.js';

@Directive({
  selector: 'sbb-datepicker-next-day',
  standalone: true,
})
export class SbbDatepickerNextDayDirective<T = Date> {
  #element: ElementRef<SbbDatepickerNextDayElement<T>> = inject(
    ElementRef<SbbDatepickerNextDayElement<T>>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'date-picker' })
  public set datePicker(value: string | SbbDatepickerElement<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.datePicker = value));
  }
  public get datePicker(): string | SbbDatepickerElement<T> | null {
    return this.#element.nativeElement.datePicker;
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
}
