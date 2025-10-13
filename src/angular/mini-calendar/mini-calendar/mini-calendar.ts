import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type { SbbOrientation } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbMiniCalendarElement } from '@sbb-esta/lyne-elements/mini-calendar/mini-calendar.js';

import '@sbb-esta/lyne-elements/mini-calendar/mini-calendar.js';

@Directive({
  selector: 'sbb-mini-calendar',
  exportAs: 'sbbMiniCalendar',
})
export class SbbMiniCalendar<T = Date> {
  #element: ElementRef<SbbMiniCalendarElement<T>> = inject(ElementRef<SbbMiniCalendarElement<T>>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set orientation(value: SbbOrientation) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.orientation = value));
  }
  public get orientation(): SbbOrientation {
    return this.#element.nativeElement.orientation;
  }
}
