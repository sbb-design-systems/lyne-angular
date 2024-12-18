/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, Output, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { CalendarView, SbbCalendarElement } from '@sbb-esta/lyne-elements/calendar.js';
import { SbbDateLike } from '@sbb-esta/lyne-elements/core/interfaces.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/calendar.js';

@Directive({
  selector: 'sbb-calendar',
  standalone: true,
})
export class SbbCalendarDirective<T = Date> {
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
  public set min(value: SbbDateLike<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.min = value));
  }
  public get min(): T | null {
    return this.#element.nativeElement.min;
  }

  @Input()
  public set max(value: SbbDateLike<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.max = value));
  }
  public get max(): T | null {
    return this.#element.nativeElement.max;
  }

  @Input()
  public set now(value: SbbDateLike<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.now = value));
  }
  public get now(): T {
    return this.#element.nativeElement.now;
  }

  @Input()
  public set selected(value: SbbDateLike<T> | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.selected = value));
  }
  public get selected(): T | null {
    return this.#element.nativeElement.selected;
  }

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'date-filter' })
  public set dateFilter(value: ((date: T | null) => boolean) | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.dateFilter = value));
  }
  public get dateFilter(): ((date: T | null) => boolean) | null {
    return this.#element.nativeElement.dateFilter;
  }

  @Output() public dateSelected: Observable<T> = fromEvent<T>(
    this.#element.nativeElement,
    'dateSelected',
  );

  public resetPosition(): void {
    return this.#element.nativeElement.resetPosition();
  }
}