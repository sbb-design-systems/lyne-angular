import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbMiniCalendarMonthElement } from '@sbb-esta/lyne-elements/mini-calendar/mini-calendar-month.js';

import '@sbb-esta/lyne-elements/mini-calendar/mini-calendar-month.js';

/**
 * It displays a month in the `sbb-mini-calendar`.
 *
 * @slot  - Use the unnamed slot to add `sbb-mini-calendar-day` elements.
 */
@Directive({
  selector: 'sbb-mini-calendar-month',
  exportAs: 'sbbMiniCalendarMonth',
})
export class SbbMiniCalendarMonth<T = Date> {
  #element: ElementRef<SbbMiniCalendarMonthElement<T>> = inject(
    ElementRef<SbbMiniCalendarMonthElement<T>>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Date as ISO string (YYYY-MM-DD)
   */
  @Input()
  public set date(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.date = value));
  }
  public get date(): string {
    return this.#element.nativeElement.date;
  }
}
