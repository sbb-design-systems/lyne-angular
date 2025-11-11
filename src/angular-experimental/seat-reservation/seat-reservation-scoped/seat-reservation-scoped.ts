import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-scoped.js';

/**
 * Wrapper class for scoped elements with similar properties to set.
 */
@Directive({
  selector: 'sbb-seat-reservation-scoped',
  exportAs: 'sbbSeatReservationScoped',
})
export class SbbSeatReservationScoped {}
