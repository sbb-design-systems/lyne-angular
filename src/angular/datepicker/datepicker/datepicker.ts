import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbValidationChangeEvent } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbDateInputElement } from '@sbb-esta/lyne-elements/date-input.js';
import type {
  SbbDatepickerElement,
  SbbInputUpdateEvent,
} from '@sbb-esta/lyne-elements/datepicker/datepicker.js';
import { fromEvent, NEVER, type Observable } from 'rxjs';

import '@sbb-esta/lyne-elements/datepicker/datepicker.js';

@Directive({
  selector: 'sbb-datepicker',
  exportAs: 'sbbDatepicker',
})
export class SbbDatepicker<T = Date> {
  #element: ElementRef<SbbDatepickerElement<T>> = inject(ElementRef<SbbDatepickerElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set wide(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.wide = value));
  }
  public get wide(): boolean {
    return this.#element.nativeElement.wide;
  }

  @Input()
  public set dateFilter(value: (date: T | null) => boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.dateFilter = value));
  }
  public get dateFilter(): (date: T | null) => boolean {
    return this.#element.nativeElement.dateFilter;
  }

  @Input()
  public set input(value: string | HTMLElement | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.input = value));
  }
  public get input(): string | HTMLElement | null {
    return this.#element.nativeElement.input;
  }

  @Input()
  public set now(value: T) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): T {
    return this.#element.nativeElement.now;
  }

  @Input()
  public set valueAsDate(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.valueAsDate = value));
  }
  public get valueAsDate(): T | null {
    return this.#element.nativeElement.valueAsDate;
  }

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output('change') protected _change: (typeof this)['change'] = NEVER;
  public change: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'change',
  );

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output('input') protected _input: (typeof this)['inputEvent'] = NEVER;
  public inputEvent: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'input',
  );

  @Output('inputUpdated') protected _inputUpdated: (typeof this)['inputUpdated'] = NEVER;
  public inputUpdated: Observable<CustomEvent<SbbInputUpdateEvent>> = fromEvent<
    CustomEvent<SbbInputUpdateEvent>
  >(this.#element.nativeElement, 'inputUpdated');

  @Output('datePickerUpdated') protected _datePickerUpdated: (typeof this)['datePickerUpdated'] =
    NEVER;
  public datePickerUpdated: Observable<CustomEvent<void>> = fromEvent<CustomEvent<void>>(
    this.#element.nativeElement,
    'datePickerUpdated',
  );

  @Output('validationChange') protected _validationChange: (typeof this)['validationChange'] =
    NEVER;
  public validationChange: Observable<CustomEvent<SbbValidationChangeEvent>> = fromEvent<
    CustomEvent<SbbValidationChangeEvent>
  >(this.#element.nativeElement, 'validationChange');

  public get inputElement(): HTMLInputElement | SbbDateInputElement<T> | null {
    return this.#element.nativeElement.inputElement;
  }

  public findPreviousAvailableDate(date: T): T {
    return this.#element.nativeElement.findPreviousAvailableDate(date);
  }

  public findNextAvailableDate(date: T): T {
    return this.#element.nativeElement.findNextAvailableDate(date);
  }
}
