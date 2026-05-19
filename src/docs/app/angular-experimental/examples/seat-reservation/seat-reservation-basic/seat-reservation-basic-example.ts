import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbSeatReservationModule } from '@sbb-esta/lyne-angular-experimental/seat-reservation';
/**
 * @title Basic clock
 */
@Component({
  selector: 'sbb-seat-reservation-basic-example',
  templateUrl: 'seat-reservation-basic-example.html',
  imports: [SbbSeatReservationModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatReservationBasicExample {}
