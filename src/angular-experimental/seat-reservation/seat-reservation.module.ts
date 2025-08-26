import { SbbSeatReservation } from './seat-reservation/seat-reservation';
import { SbbSeatReservationArea } from './seat-reservation-area/seat-reservation-area';
import { SbbSeatReservationGraphic } from './seat-reservation-graphic/seat-reservation-graphic';
import { SbbSeatReservationNavigationCoach } from './seat-reservation-navigation-coach/seat-reservation-navigation-coach';
import { SbbSeatReservationNavigationServices } from './seat-reservation-navigation-services/seat-reservation-navigation-services';
import { SbbSeatReservationPlaceControl } from './seat-reservation-place-control/seat-reservation-place-control';
import { SbbSeatReservationScoped } from './seat-reservation-scoped/seat-reservation-scoped';

export const SbbSeatReservationModule = [
  SbbSeatReservation,
  SbbSeatReservationArea,
  SbbSeatReservationGraphic,
  SbbSeatReservationNavigationCoach,
  SbbSeatReservationNavigationServices,
  SbbSeatReservationPlaceControl,
  SbbSeatReservationScoped,
];
