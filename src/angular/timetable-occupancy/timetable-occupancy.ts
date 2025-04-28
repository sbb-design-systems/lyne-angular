import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbOccupancy } from '@sbb-esta/lyne-elements/core/interfaces.js';
import type { SbbTimetableOccupancyElement } from '@sbb-esta/lyne-elements/timetable-occupancy.js';
import '@sbb-esta/lyne-elements/timetable-occupancy.js';

@Directive({
  selector: 'sbb-timetable-occupancy',
})
export class SbbTimetableOccupancy {
  #element: ElementRef<SbbTimetableOccupancyElement> = inject(
    ElementRef<SbbTimetableOccupancyElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set firstClassOccupancy(value: SbbOccupancy | null) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.firstClassOccupancy = value));
  }
  public get firstClassOccupancy(): SbbOccupancy | null {
    return this.#element.nativeElement.firstClassOccupancy;
  }

  @Input()
  public set secondClassOccupancy(value: SbbOccupancy | null) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.secondClassOccupancy = value),
    );
  }
  public get secondClassOccupancy(): SbbOccupancy | null {
    return this.#element.nativeElement.secondClassOccupancy;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}
