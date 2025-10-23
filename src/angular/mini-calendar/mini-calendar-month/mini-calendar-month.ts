import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbMiniCalendarMonthElement } from '@sbb-esta/lyne-elements/mini-calendar/mini-calendar-month.js';

import '@sbb-esta/lyne-elements/mini-calendar/mini-calendar-month.js';

@Directive({
  selector: 'sbb-mini-calendar-month',
  exportAs: 'sbbMiniCalendarMonth',
})
export class SbbMiniCalendarMonth<T = Date> {
  #element: ElementRef<SbbMiniCalendarMonthElement<T>> = inject(
    ElementRef<SbbMiniCalendarMonthElement<T>>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set date(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.date = value));
  }
  public get date(): string {
    return this.#element.nativeElement.date;
  }
}
