import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbOccupancy } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbTimetableOccupancyIconElement } from '@sbb-esta/lyne-elements/timetable-occupancy-icon.js';

import '@sbb-esta/lyne-elements/timetable-occupancy-icon.js';

/**
 * It displays a wagon's occupancy icon.
 * @cssprop [--sbb-icon-svg-width=auto] - Can be used to set a custom width.
 * @cssprop [--sbb-icon-svg-height=auto] - Can be used to set a custom height.
 */
@Directive({
  selector: 'sbb-timetable-occupancy-icon',
  exportAs: 'sbbTimetableOccupancyIcon',
})
export class SbbTimetableOccupancyIcon {
  #element: ElementRef<SbbTimetableOccupancyIconElement> = inject(
    ElementRef<SbbTimetableOccupancyIconElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Wagon occupancy.
   */
  @Input()
  public set occupancy(value: SbbOccupancy) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.occupancy = value));
  }
  public get occupancy(): SbbOccupancy {
    return this.#element.nativeElement.occupancy;
  }

  /**
   * Negative coloring variant flag.
   */
  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  /**
   * When set to `true`, SVG content that is HTTP fetched will not be checked
   * if the response SVG content has any `<script>` elements, or any attributes
   * that start with `on`, such as `onclick`.
   */
  @Input({ transform: booleanAttribute })
  public set noSanitize(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.noSanitize = value));
  }
  public get noSanitize(): boolean {
    return this.#element.nativeElement.noSanitize;
  }
}
