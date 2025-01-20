import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { CalendarView } from '@sbb-esta/lyne-elements/calendar.js';
import type { SbbDatepickerToggleElement } from '@sbb-esta/lyne-elements/datepicker/datepicker-toggle.js';
import { SbbDatepickerElement } from '@sbb-esta/lyne-elements/datepicker/datepicker.js';
import '@sbb-esta/lyne-elements/datepicker/datepicker-toggle.js';

@Directive({
  selector: 'sbb-datepicker-toggle',
})
export class SbbDatepickerToggle<T = Date> {
  #element: ElementRef<SbbDatepickerToggleElement<T>> = inject(
    ElementRef<SbbDatepickerToggleElement<T>>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set datepicker(value: SbbDatepickerElement<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.datepicker = value));
  }
  public get datepicker(): SbbDatepickerElement<T> | null {
    return this.#element.nativeElement.datepicker;
  }

  @Input()
  public set view(value: CalendarView) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.view = value));
  }
  public get view(): CalendarView {
    return this.#element.nativeElement.view;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  public open(): void {
    return this.#element.nativeElement.open();
  }

  @Input({ alias: 'date-picker' })
  public set datePicker(value: string | SbbDatepickerElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.datePicker = value));
  }
  public get datePicker(): string | SbbDatepickerElement | null {
    return this.#element.nativeElement.datePicker;
  }
}
