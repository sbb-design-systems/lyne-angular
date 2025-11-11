import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbSeatReservationNavigationServicesElement } from '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-navigation-services.js';

import '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-navigation-services.js';

/**
 * Component displays the available service icons of one coach.
 */
@Directive({
  selector: 'sbb-seat-reservation-navigation-services',
  exportAs: 'sbbSeatReservationNavigationServices',
})
export class SbbSeatReservationNavigationServices {
  #element: ElementRef<SbbSeatReservationNavigationServicesElement> = inject(
    ElementRef<SbbSeatReservationNavigationServicesElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Coach service property ids, which are used to display the services in the navigation
   */
  @Input()
  public set propertyIds(value: string[]) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.propertyIds = value));
  }
  public get propertyIds(): string[] {
    return this.#element.nativeElement.propertyIds;
  }

  /**
   * If true, the service icons are displayed vertically
   */
  @Input({ transform: booleanAttribute })
  public set vertical(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.vertical = value));
  }
  public get vertical(): boolean {
    return this.#element.nativeElement.vertical;
  }
}
