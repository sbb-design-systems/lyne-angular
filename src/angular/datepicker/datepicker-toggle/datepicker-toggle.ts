import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbButtonType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.js';
import type { SbbDatepickerToggleElement } from '@sbb-esta/lyne-elements/datepicker/datepicker-toggle.js';
import type { SbbDatepickerElement } from '@sbb-esta/lyne-elements/datepicker/datepicker.js';

import '@sbb-esta/lyne-elements/datepicker/datepicker-toggle.js';

@Directive({
  selector: 'sbb-datepicker-toggle',
  exportAs: 'sbbDatepickerToggle',
})
export class SbbDatepickerToggle<T = Date> {
  #element: ElementRef<SbbDatepickerToggleElement<T>> = inject(
    ElementRef<SbbDatepickerToggleElement<T>>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set datepicker(value: string | SbbDatepickerElement<T> | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.datepicker = value as SbbDatepickerElement<T> | null),
    );
  }
  public get datepicker(): SbbDatepickerElement<T> | null {
    return this.#element.nativeElement.datepicker;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  @Input()
  public set input(value: string | SbbDateInputElement<T> | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.input = value as SbbDateInputElement<T> | null),
    );
  }
  public get input(): SbbDateInputElement<T> | null {
    return this.#element.nativeElement.input;
  }

  @Input()
  public set value(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.value = value));
  }
  public get value(): string {
    return this.#element.nativeElement.value;
  }

  @Input()
  public set type(value: SbbButtonType) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.type = value));
  }
  public get type(): SbbButtonType {
    return this.#element.nativeElement.type;
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

  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
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
