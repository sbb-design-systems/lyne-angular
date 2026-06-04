import { Directive } from '@angular/core';
import { SbbSeatReservationScopedElement } from '@sbb-esta/lyne-elements-experimental/seat-reservation.pure.js';

/**
 * Wrapper class for scoped elements with similar properties to set.
 */
@Directive({
  selector: 'sbb-seat-reservation-scoped',
  exportAs: 'sbbSeatReservationScoped',
})
export class SbbSeatReservationScoped {
  static {
    SbbSeatReservationScopedElement.define();
  }
}
