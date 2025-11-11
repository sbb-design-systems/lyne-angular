import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { CalendarView, SbbCalendarElement } from '@sbb-esta/lyne-elements/calendar.js';
import { fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements/calendar.js';

/**
 * It displays a calendar which allows choosing a date.
 */
@Directive({
  selector: 'sbb-calendar',
  exportAs: 'sbbCalendar',
})
export class SbbCalendar<T = Date> {
  #element: ElementRef<SbbCalendarElement<T>> = inject(ElementRef<SbbCalendarElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * If set to true, two months are displayed
   */
  @Input({ transform: booleanAttribute })
  public set wide(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.wide = value));
  }
  public get wide(): boolean {
    return this.#element.nativeElement.wide;
  }

  /**
   * The initial view of the calendar which should be displayed on opening.
   */
  @Input()
  public set view(value: CalendarView) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.view = value));
  }
  public get view(): CalendarView {
    return this.#element.nativeElement.view;
  }

  /**
   * The minimum valid date. Accepts a date object or null.
   * Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute.
   */
  @Input()
  public set min(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.min = value));
  }
  public get min(): T | null {
    return this.#element.nativeElement.min;
  }

  /**
   * The maximum valid date. Accepts a date object or null.
   * Accepts an ISO8601 formatted string (e.g. 2024-12-24) as attribute.
   */
  @Input()
  public set max(value: T | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.max = value));
  }
  public get max(): T | null {
    return this.#element.nativeElement.max;
  }

  /**
   * The selected date: accepts a date object, or, if `multiple`, an array of dates.
   */
  @Input()
  public set selected(value: T | T[] | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): T | T[] | null {
    return this.#element.nativeElement.selected;
  }

  /**
   * A function used to filter out dates.
   */
  @Input()
  public set dateFilter(value: ((date: T | null) => boolean) | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.dateFilter = value));
  }
  public get dateFilter(): ((date: T | null) => boolean) | null {
    return this.#element.nativeElement.dateFilter;
  }

  /**
   * The orientation of days in the calendar.
   */
  @Input()
  public set orientation(value: 'horizontal' | 'vertical') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): 'horizontal' | 'vertical' {
    return this.#element.nativeElement.orientation;
  }

  /**
   * Whether the calendar allows for multiple date selection.
   */
  @Input({ transform: booleanAttribute })
  public set multiple(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.multiple = value));
  }
  public get multiple(): boolean {
    return this.#element.nativeElement.multiple;
  }

  /**
   * Whether it has to display the week numbers in addition to week days.
   */
  @Input({ transform: booleanAttribute })
  public set weekNumbers(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.weekNumbers = value));
  }
  public get weekNumbers(): boolean {
    return this.#element.nativeElement.weekNumbers;
  }

  /**
   * Resets the active month according to the new state of the calendar.
   */
  public resetPosition(): void {
    return this.#element.nativeElement.resetPosition();
  }

  /**
   * Event emitted on date selection.
   */
  public dateSelectedOutput = outputFromObservable(
    fromEvent<CustomEvent<T | T[]>>(this.#element.nativeElement, 'dateselected'),
    { alias: 'dateSelected' },
  );
}
