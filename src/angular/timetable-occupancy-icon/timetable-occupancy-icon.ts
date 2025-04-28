import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbOccupancy } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbTimetableOccupancyIconElement } from '@sbb-esta/lyne-elements/timetable-occupancy-icon.js';
import '@sbb-esta/lyne-elements/timetable-occupancy-icon.js';

@Directive({
  selector: 'sbb-timetable-occupancy-icon',
})
export class SbbTimetableOccupancyIcon {
  #element: ElementRef<SbbTimetableOccupancyIconElement> = inject(
    ElementRef<SbbTimetableOccupancyIconElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set occupancy(value: SbbOccupancy) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.occupancy = value));
  }
  public get occupancy(): SbbOccupancy {
    return this.#element.nativeElement.occupancy;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }

  @Input({ transform: booleanAttribute })
  public set noSanitize(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.noSanitize = value));
  }
  public get noSanitize(): boolean {
    return this.#element.nativeElement.noSanitize;
  }
}
