import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSeatReservationNavigationServicesElement } from '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-navigation/seat-reservation-navigation-services.js';

import '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-navigation/seat-reservation-navigation-services.js';

@Directive({
  selector: 'sbb-seat-reservation-navigation-services',
  exportAs: 'SbbSeatReservationNavigationServices',
})
export class SbbSeatReservationNavigationServices {
  #element: ElementRef<SbbSeatReservationNavigationServicesElement> = inject(
    ElementRef<SbbSeatReservationNavigationServicesElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set propertyIds(value: string[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.propertyIds = value));
  }
  public get propertyIds(): string[] {
    return this.#element.nativeElement.propertyIds;
  }

  @Input({ transform: booleanAttribute })
  public set vertical(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.vertical = value));
  }
  public get vertical(): boolean {
    return this.#element.nativeElement.vertical;
  }
}
