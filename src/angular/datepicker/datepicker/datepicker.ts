/* eslint-disable @angular-eslint/directive-selector, @angular-eslint/directive-class-suffix */
import { Directive, ElementRef, inject, Input, NgZone, Output } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import { SbbValidationChangeEvent } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type {
  SbbDatepickerElement,
  SbbInputUpdateEvent,
} from '@sbb-esta/lyne-elements/datepicker/datepicker.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/datepicker/datepicker.js';

@Directive({
  selector: 'sbb-datepicker',
  standalone: true,
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
  @Output() public change: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'change',
  );

  // eslint-disable-next-line @angular-eslint/no-output-rename, @angular-eslint/no-output-native
  @Output('input') public inputEvent: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'input',
  );

  @Output() public inputUpdated: Observable<SbbInputUpdateEvent> = fromEvent<SbbInputUpdateEvent>(
    this.#element.nativeElement,
    'inputUpdated',
  );

  @Output() public datePickerUpdated: Observable<void> = fromEvent<void>(
    this.#element.nativeElement,
    'datePickerUpdated',
  );

  @Output() public validationChange: Observable<SbbValidationChangeEvent> =
    fromEvent<SbbValidationChangeEvent>(this.#element.nativeElement, 'validationChange');

  public get inputElement(): HTMLInputElement | null {
    return this.#element.nativeElement.inputElement;
  }

  public findPreviousAvailableDate(date: T): T {
    return this.#element.nativeElement.findPreviousAvailableDate(date);
  }

  public findNextAvailableDate(date: T): T {
    return this.#element.nativeElement.findNextAvailableDate(date);
  }
}
