import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbTimetableDurationElement } from '@sbb-esta/lyne-elements-experimental/timetable-duration.js';
import '@sbb-esta/lyne-elements-experimental/timetable-duration.js';

@Directive({
  selector: 'sbb-timetable-duration',
  standalone: true,
})
export class SbbTimetableDuration {
  #element: ElementRef<SbbTimetableDurationElement> = inject(
    ElementRef<SbbTimetableDurationElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set config(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.config = value));
  }
  public get config(): string {
    return this.#element.nativeElement.config;
  }
}
