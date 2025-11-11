import { Directive, ElementRef, inject, Input, NgZone, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { CalendarView, SbbCalendarElement } from '@sbb-esta/lyne-elements/calendar.js';
import { fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements/calendar.js';

@Directive({
  selector: 'sbb-calendar',
  exportAs: 'sbbCalendar',
})
export class SbbCalendar<T = Date> {
  #element: ElementRef<SbbCalendarElement<T>> = inject(ElementRef<SbbCalendarElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  @Input({ transform: booleanAttribute })
  public set wide(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.wide = value));
  }
  public get wide(): boolean {
    return this.#element.nativeElement.wide;
  }

  @Input()
  public set view(value: CalendarView) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.view = value));
  }
  public get view(): CalendarView {
    return this.#element.nativeElement.view;
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
  public set selected(value: T | T[] | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): T | T[] | null {
    return this.#element.nativeElement.selected;
  }

  @Input()
  public set dateFilter(value: ((date: T | null) => boolean) | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.dateFilter = value));
  }
  public get dateFilter(): ((date: T | null) => boolean) | null {
    return this.#element.nativeElement.dateFilter;
  }

  @Input()
  public set orientation(value: 'horizontal' | 'vertical') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): 'horizontal' | 'vertical' {
    return this.#element.nativeElement.orientation;
  }

  @Input({ transform: booleanAttribute })
  public set multiple(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multiple = value));
  }
  public get multiple(): boolean {
    return this.#element.nativeElement.multiple;
  }

  @Input({ transform: booleanAttribute })
  public set weekNumbers(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.weekNumbers = value));
  }
  public get weekNumbers(): boolean {
    return this.#element.nativeElement.weekNumbers;
  }

  public resetPosition(): void {
    return this.#element.nativeElement.resetPosition();
  }

  public dateSelectedOutput: OutputRef<CustomEvent<T[] | T>> = outputFromObservable(
    fromEvent<CustomEvent<T | T[]>>(this.#element.nativeElement, 'dateselected'),
    { alias: 'dateSelected' },
  );
}
