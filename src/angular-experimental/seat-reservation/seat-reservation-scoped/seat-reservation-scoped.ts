import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements-experimental/seat-reservation/seat-reservation-scoped.js';

@Directive({
  selector: 'sbb-seat-reservation-scoped',
  exportAs: 'sbbSeatReservationScoped',
})
export class SbbSeatReservationScoped {}
