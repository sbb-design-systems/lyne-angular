import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SbbSeatReservationModule } from '@sbb-esta/lyne-angular-experimental/seat-reservation';
import type { SeatReservation } from '@sbb-esta/lyne-elements-experimental/seat-reservation.js';

/**
 * @title Bus Seat Reservation
 * @order 3
 * */
@Component({
  selector: 'sbb-seat-reservation-bus-example',
  templateUrl: 'seat-reservation-bus-example.html',
  imports: [SbbSeatReservationModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeatReservationBusExample {
  protected readonly seatReservations = signal<SeatReservation[]>([
    EXAMPLE_DATA_SEAT_RESERVATION_BUS,
  ]);
}

const EXAMPLE_DATA_SEAT_RESERVATION_BUS: SeatReservation = {
  vehicleType: 'BUS',
  deckCoachIndex: 0,
  deckCoachLevel: 'SINGLE_DECK',
  coachItems: [
    {
      id: '20',
      number: 'WR6(501) - not touch',
      dimension: {
        w: 56,
        h: 10,
      },
      places: [
        {
          number: '21',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 31,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: ['WINDOW_SEAT', 'AISLE_SEAT', 'TABLE'],
        },
        {
          number: '22',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 37,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: ['WINDOW_SEAT', 'AISLE_SEAT', 'TABLE'],
        },
        {
          number: '41',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 39,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: ['WINDOW_SEAT', 'AISLE_SEAT', 'TABLE'],
        },
        {
          number: '42',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 45,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: ['WINDOW_SEAT', 'AISLE_SEAT', 'TABLE'],
        },
        {
          number: '61',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 47,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: ['WINDOW_SEAT', 'AISLE_SEAT', 'TABLE'],
        },
        {
          number: '62',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 53,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: ['WINDOW_SEAT', 'AISLE_SEAT', 'TABLE'],
        },
        {
          number: '13',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 31,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: ['AISLE_SEAT', 'TABLE'],
        },
        {
          number: '14',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 37,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: ['AISLE_SEAT', 'TABLE'],
        },
        {
          number: '11',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 31,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: ['WINDOW_SEAT', 'TABLE'],
        },
        {
          number: '12',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 37,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: ['WINDOW_SEAT', 'TABLE'],
        },
        {
          number: '33',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 39,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: ['AISLE_SEAT', 'TABLE'],
        },
        {
          number: '34',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 45,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: ['AISLE_SEAT', 'TABLE'],
        },
        {
          number: '31',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 39,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: ['WINDOW_SEAT', 'TABLE'],
        },
        {
          number: '32',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 45,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: ['WINDOW_SEAT', 'TABLE'],
        },
        {
          number: '53',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 47,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: ['AISLE_SEAT', 'TABLE'],
        },
        {
          number: '51',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 47,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',
          propertyIds: ['WINDOW_SEAT', 'TABLE'],
        },
        {
          number: '52',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 53,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',
          propertyIds: ['WINDOW_SEAT', 'TABLE'],
        },
      ],
      serviceElements: [
        {
          icon: 'RESTAURANT_ICON',
          position: {
            x: 32,
            y: 3,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'RESTAURANT_ICON',
          position: {
            x: 46,
            y: 3,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
      ],
      graphicElements: [
        {
          icon: 'DRIVER_AREA',
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 6,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_WALL_NO_PASSAGE',
          position: {
            x: 55,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 180,
        },
        {
          icon: 'TABLE_RESTAURANT',
          position: {
            x: 42,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 4,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE_RESTAURANT',
          position: {
            x: 50,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE_RESTAURANT',
          position: {
            x: 34,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE_RESTAURANT',
          position: {
            x: 34,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 4,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE_RESTAURANT',
          position: {
            x: 42,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE_RESTAURANT',
          position: {
            x: 50,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'TABLE_RESTAURANT',
          position: {
            x: 8,
            y: 2,
            z: 0,
          },
          dimension: {
            w: 6,
            h: 6,
          },
          rotation: 0,
        },
      ],
      travelClass: ['SECOND'],
      propertyIds: ['RESTAURANT'],
    },
  ],
};
