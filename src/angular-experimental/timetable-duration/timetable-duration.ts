import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { SbbTimetableDurationElement } from '@sbb-esta/lyne-elements-experimental/timetable-duration.pure.js';

/**
 * Used in `sbb-timetable-row`, it displays information about the trip duration.
 */
@Directive({
  selector: 'sbb-timetable-duration',
  exportAs: 'sbbTimetableDuration',
})
export class SbbTimetableDuration {
  static {
    SbbTimetableDurationElement.define();
  }

  #element: ElementRef<SbbTimetableDurationElement> = inject(
    ElementRef<SbbTimetableDurationElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Stringified JSON which defines most of the
   * content of the component. Please check the
   * individual stories to get an idea of the
   * structure.
   */
  @Input()
  public set config(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.config = value));
  }
  public get config(): string {
    return this.#element.nativeElement.config;
  }
}
