import { Component, computed, signal } from '@angular/core';
import { SbbSeatReservationModule } from '@sbb-esta/lyne-angular-experimental/seat-reservation';
import type { SeatReservation } from '@sbb-esta/lyne-elements-experimental/seat-reservation.pure.js';

/**
 * @title Multiple Decks Seat Reservation
 * @order 2
 */
@Component({
  selector: 'sbb-seat-reservation-multiple-decks-example',
  templateUrl: 'seat-reservation-multiple-decks-example.html',
  imports: [SbbSeatReservationModule],
})
export class SeatReservationMultipleDecksExample {
  protected readonly seatReservations = signal<SeatReservation[]>([
    MOCK_DATA_SEAT_RESERVATION_MULTIPLE_DECKS,
  ]);
  protected readonly seatReservationsMultipleDecks = computed(() => {
    const seatReservationLowerDeck: SeatReservation = {
      ...this.seatReservations()[0],
      deckCoachLevel: 'LOWER_DECK',
    };
    const seatReservationUpperDeck: SeatReservation = {
      ...(JSON.parse(JSON.stringify(seatReservationLowerDeck)) as SeatReservation),
      deckCoachLevel: 'UPPER_DECK',
      deckCoachIndex: 1,
    };
    return [seatReservationUpperDeck, seatReservationLowerDeck];
  });
}

const MOCK_DATA_SEAT_RESERVATION_MULTIPLE_DECKS: SeatReservation = {
  vehicleType: 'TRAIN',
  deckCoachIndex: 0,
  deckCoachLevel: 'SINGLE_DECK',
  coachItems: [
    {
      id: '80',
      number: 'B10(501) - not touch',
      dimension: {
        w: 58,
        h: 10,
      },
      places: [
        {
          number: '153',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'FIRST',
          propertyIds: [],
        },
        {
          number: '151',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'FIRST',
          propertyIds: [],
        },
        {
          number: '154',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'FIRST',
          propertyIds: [],
        },
        {
          number: '152',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'FIRST',

          propertyIds: [],
        },
        {
          number: '48',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 20,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 20,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '35',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 0,
            z: 0,
          },
          rotation: 90,
          travelClass: 'SECOND',

          propertyIds: ['AISLE_SEAT', 'WINDOW_SEAT'],
        },
        {
          number: '37',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 15,
            y: 0,
            z: 0,
          },
          rotation: 90,
          travelClass: 'SECOND',

          propertyIds: ['AISLE_SEAT', 'WINDOW_SEAT'],
        },
        {
          number: '36',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 17,
            y: 0,
            z: 0,
          },
          rotation: 90,
          travelClass: 'SECOND',

          propertyIds: ['AISLE_SEAT', 'WINDOW_SEAT'],
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
            x: 38,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 38,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 43,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '58',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '71',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '73',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '72',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '78',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '31',
          state: 'ALLOCATED',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '33',
          state: 'RESTRICTED',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '32',
          state: 'SELECTED',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 17,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 17,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '55',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 38,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '57',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 38,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '56',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '54',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '45',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 19,
            y: 0,
            z: 0,
          },
          rotation: 90,
          travelClass: 'SECOND',

          propertyIds: ['AISLE_SEAT', 'WINDOW_SEAT'],
        },
        {
          number: '47',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 21,
            y: 0,
            z: 0,
          },
          rotation: 90,
          travelClass: 'SECOND',

          propertyIds: ['AISLE_SEAT', 'WINDOW_SEAT'],
        },
        {
          number: '46',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 23,
            y: 0,
            z: 0,
          },
          rotation: 90,
          travelClass: 'SECOND',

          propertyIds: ['AISLE_SEAT', 'WINDOW_SEAT'],
        },
        {
          number: '65',
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
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '67',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 45,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '66',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 49,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '64',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 49,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 45,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '63',
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
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 49,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '68',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 49,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '75',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '77',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '76',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '74',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
      ],
      serviceElements: [
        {
          icon: 'WHEELCHAIR_ICON',
          position: {
            x: 40,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'BICYCLE_LOW_ICON',
          position: {
            x: 28,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'WHEELCHAIR_ICON',
          position: {
            x: 40,
            y: 2,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'BICYCLE_LOW_ICON',
          position: {
            x: 28,
            y: 2,
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
            w: 12,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'STAIR_AREA',
          position: {
            x: 7,
            y: 4,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'WIFI',
          position: {
            x: 7,
            y: 1,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'ENTRY_EXIT',
          position: {
            x: 33,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'LUGGAGE_AREA',
          position: {
            x: 22,
            y: 8,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'TOILET_AREA',
          position: {
            x: 28,
            y: 8,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'ENTRY_EXIT',
          position: {
            x: 33,
            y: 9,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'COMPARTMENT_PASSAGE',
          position: {
            x: 31,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COMPARTMENT_PASSAGE',
          position: {
            x: 37,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_PASSAGE',
          position: {
            x: 57,
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
          icon: 'PLAYGROUND_AREA',
          position: {
            x: 40,
            y: 4,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'TOILET_WHEELCHAIR_AREA',
          position: {
            x: 28,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'SKI_AREA',
          position: {
            x: 13,
            y: 3,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'MULTI_FUNCTION_AREA',
          position: {
            x: 18,
            y: 3,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'EASY_ACCESS_AREA',
          position: {
            x: 22,
            y: 3,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'PRAM_AREA',
          position: {
            x: 33,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
      ],
      travelClass: ['FIRST', 'SECOND'],
      propertyIds: ['BICYCLE', 'WHEELCHAIR_ICON', 'ANY_SEAT'],
    },
    {
      id: '81',
      number: 'B10(501) - not touch',
      dimension: {
        w: 58,
        h: 10,
      },
      places: [
        {
          number: '153',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '151',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '154',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '152',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '48',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 20,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 20,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '15',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 1,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '17',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 1,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '16',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 5,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 5,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 1,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 1,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 5,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '18',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 5,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '25',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '27',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '26',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '24',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '21',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '23',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 11,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '28',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '35',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '37',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '36',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 17,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 17,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 38,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 38,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 43,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '58',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '71',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '73',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '72',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '78',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 13,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 13,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 17,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '38',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 17,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '55',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 38,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '57',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 38,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '56',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '54',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '45',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 19,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '47',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 19,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '46',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 23,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '44',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 23,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '65',
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
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '67',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 45,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '66',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 49,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '64',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 49,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 45,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '63',
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
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 49,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '68',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 49,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '75',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '77',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '74',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
      ],
      serviceElements: [
        {
          icon: 'WHEELCHAIR_ICON',
          position: {
            x: 40,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'BICYCLE_LOW_ICON',
          position: {
            x: 28,
            y: 7,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'WHEELCHAIR_ICON',
          position: {
            x: 40,
            y: 2,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'BICYCLE_LOW_ICON',
          position: {
            x: 28,
            y: 1,
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
          icon: 'ENTRY_EXIT',
          position: {
            x: 33,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'SILENCE_AREA_ICON',
          position: {
            x: 22,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_PASSAGE',
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'ENTRY_EXIT',
          position: {
            x: 33,
            y: 9,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'COMPARTMENT_PASSAGE',
          position: {
            x: 31,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COMPARTMENT_PASSAGE',
          position: {
            x: 37,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_PASSAGE',
          position: {
            x: 57,
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
          icon: 'BUSINESS',
          position: {
            x: 34,
            y: 2,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'BISTRO',
          position: {
            x: 34,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'RESTAURANT_ICON',
          position: {
            x: 40,
            y: 4,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
      ],
      travelClass: ['SECOND'],
      propertyIds: ['BICYCLE_HIGH', 'ANY_SEAT'],
    },
    {
      id: '82',
      number: 'B10(501) - not touch',
      dimension: {
        w: 46,
        h: 10,
      },
      places: [
        {
          number: '15',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 1,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '17',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 1,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '16',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 5,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 5,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 1,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 1,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 5,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '18',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 5,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '25',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '27',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '26',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '24',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '21',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '23',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 11,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '28',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '153',
          state: 'ALLOCATED',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '151',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '154',
          state: 'RESTRICTED',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '152',
          state: 'SELECTED',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '48',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 20,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'FIRST',

          propertyIds: [],
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
            x: 20,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'FIRST',

          propertyIds: [],
        },
        {
          number: '35',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'FIRST',

          propertyIds: [],
        },
        {
          number: '37',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'FIRST',

          propertyIds: [],
        },
        {
          number: '36',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 17,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'FIRST',

          propertyIds: [],
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
            x: 17,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'FIRST',

          propertyIds: [],
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
            x: 38,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 38,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 43,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '58',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 13,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 13,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 17,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '38',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 17,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '55',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 38,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '57',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 38,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '56',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '54',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '45',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 19,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '47',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 19,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '46',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 23,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '44',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 23,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
      ],
      serviceElements: [
        {
          icon: 'WHEELCHAIR_ICON',
          position: {
            x: 40,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'BICYCLE_LOW_ICON',
          position: {
            x: 28,
            y: 7,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'WHEELCHAIR_ICON',
          position: {
            x: 40,
            y: 2,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'BICYCLE_LOW_ICON',
          position: {
            x: 28,
            y: 1,
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
          icon: 'COACH_PASSAGE',
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'ENTRY_EXIT',
          position: {
            x: 33,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'LUGGAGE_AREA',
          position: {
            x: 22,
            y: 8,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'ENTRY_EXIT',
          position: {
            x: 33,
            y: 9,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'COMPARTMENT_PASSAGE',
          position: {
            x: 31,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_WALL_NO_PASSAGE',
          position: {
            x: 45,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 180,
        },
      ],
      travelClass: ['SECOND', 'FIRST'],
      propertyIds: ['BISTRO', 'FAMILY', 'ANY_SEAT', 'WHEELCHAIR_NO_SEAT', 'BICYCLE_ICON', 'PRAM'],
    },
    {
      id: '86',
      number: 'B10(501) - not touch',
      dimension: {
        w: 32,
        h: 10,
      },
      places: [],
      serviceElements: [],
      graphicElements: [
        {
          icon: 'COACH_WALL_NO_PASSAGE',
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_WALL_NO_PASSAGE',
          position: {
            x: 31,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 180,
        },
      ],
      travelClass: [],
      propertyIds: [],
    },
    {
      id: '84',
      number: 'B10(501) - not touch',
      dimension: {
        w: 46,
        h: 10,
      },
      places: [
        {
          number: '15',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 1,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '17',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 1,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '16',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 5,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 5,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 1,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 1,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 5,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '18',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 5,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '25',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '27',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '26',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '24',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '21',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '23',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 11,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '28',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '153',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '151',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: ['BICYCLE_LOW'],
        },
        {
          number: '154',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '152',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '48',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 20,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'FIRST',

          propertyIds: [],
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
            x: 20,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'FIRST',

          propertyIds: [],
        },
        {
          number: '35',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'FIRST',

          propertyIds: [],
        },
        {
          number: '37',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'FIRST',

          propertyIds: [],
        },
        {
          number: '36',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 17,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'FIRST',

          propertyIds: [],
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
            x: 17,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'FIRST',

          propertyIds: [],
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
            x: 38,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 38,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 43,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '58',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 13,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 13,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 17,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '38',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 17,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '55',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 38,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '57',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 38,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '56',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '54',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '45',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 19,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '47',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 19,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '46',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 23,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '44',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 23,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
      ],
      serviceElements: [
        {
          icon: 'WHEELCHAIR_ICON',
          position: {
            x: 40,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'BICYCLE_LOW_ICON',
          position: {
            x: 28,
            y: 7,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'WHEELCHAIR_ICON',
          position: {
            x: 40,
            y: 2,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'BICYCLE_LOW_ICON',
          position: {
            x: 28,
            y: 1,
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
          icon: 'ENTRY_EXIT',
          position: {
            x: 33,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'LUGGAGE_AREA',
          position: {
            x: 22,
            y: 8,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'ENTRY_EXIT',
          position: {
            x: 33,
            y: 9,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'COMPARTMENT_PASSAGE',
          position: {
            x: 31,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COMPARTMENT_PASSAGE',
          position: {
            x: 37,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_WALL_NO_PASSAGE',
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_WALL_NO_PASSAGE',
          position: {
            x: 45,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 180,
        },
      ],
      travelClass: ['SECOND', 'FIRST'],
      propertyIds: ['ANY_SEAT', 'BICYCLE_ICON', 'PRAM'],
    },
    {
      id: '85',
      number: 'B10(501) - not touch',
      dimension: {
        w: 58,
        h: 10,
      },
      places: [
        {
          number: '153',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '151',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '154',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '152',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '48',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 20,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 20,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '15',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 1,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '17',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 1,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '16',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 5,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 5,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 1,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 1,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 5,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '18',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 5,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '25',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '27',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '26',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '24',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '21',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '23',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 11,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '28',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '35',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '37',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '36',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 17,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 17,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 38,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 38,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 43,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '58',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '71',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '73',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '72',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '78',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 13,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 13,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 17,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '38',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 17,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '55',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 38,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '57',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 38,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '56',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '54',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '45',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 19,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '47',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 19,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '46',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 23,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '44',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 23,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '65',
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
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '67',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 45,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '66',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 49,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '64',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 49,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 45,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '63',
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
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 49,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '68',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 49,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '75',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '77',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '74',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
      ],
      serviceElements: [
        {
          icon: 'WHEELCHAIR_ICON',
          position: {
            x: 40,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'BICYCLE_LOW_ICON',
          position: {
            x: 28,
            y: 7,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'WHEELCHAIR_ICON',
          position: {
            x: 40,
            y: 2,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'BICYCLE_LOW_ICON',
          position: {
            x: 28,
            y: 1,
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
          icon: 'ENTRY_EXIT',
          position: {
            x: 33,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'SILENCE_AREA_ICON',
          position: {
            x: 22,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_PASSAGE',
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'ENTRY_EXIT',
          position: {
            x: 33,
            y: 9,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'COMPARTMENT_PASSAGE',
          position: {
            x: 31,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COMPARTMENT_PASSAGE',
          position: {
            x: 37,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_PASSAGE',
          position: {
            x: 57,
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
          icon: 'BUSINESS',
          position: {
            x: 34,
            y: 2,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'BISTRO',
          position: {
            x: 34,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'RESTAURANT_ICON',
          position: {
            x: 40,
            y: 4,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
      ],
      travelClass: ['SECOND'],
      propertyIds: ['BICYCLE_HIGH', 'ANY_SEAT'],
    },
    {
      id: '86',
      number: 'B10(501) - not touch',
      dimension: {
        w: 58,
        h: 10,
      },
      places: [
        {
          number: '153',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '151',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '154',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '152',
          state: 'FREE',
          type: 'BICYCLE',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 26,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '48',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 20,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 20,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '15',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 1,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '17',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 1,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '16',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 5,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 5,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 1,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 1,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 5,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '18',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 5,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '25',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '27',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '26',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '24',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '21',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '23',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 7,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 11,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '28',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 11,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '35',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '37',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 13,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '36',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 17,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 17,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 38,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 38,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 43,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '58',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '71',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '73',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '72',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '78',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 13,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 13,
            y: 6,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 17,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '38',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 17,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '55',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 38,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '57',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 38,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '56',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '54',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 43,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '45',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 19,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '47',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 19,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '46',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 23,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '44',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 23,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '65',
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
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '67',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 45,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '66',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 49,
            y: 0,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '64',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 49,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 45,
            y: 8,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '63',
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
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
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
            x: 49,
            y: 8,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '68',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 49,
            y: 6,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '75',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 0,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '77',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 51,
            y: 2,
            z: 0,
          },
          rotation: 0,
          travelClass: 'SECOND',

          propertyIds: [],
        },
        {
          number: '74',
          state: 'FREE',
          type: 'SEAT',
          dimension: {
            w: 2,
            h: 2,
          },
          position: {
            x: 55,
            y: 2,
            z: 0,
          },
          rotation: 180,
          travelClass: 'SECOND',

          propertyIds: [],
        },
      ],
      serviceElements: [
        {
          icon: 'WHEELCHAIR_ICON',
          position: {
            x: 40,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'BICYCLE_LOW_ICON',
          position: {
            x: 28,
            y: 7,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'WHEELCHAIR_ICON',
          position: {
            x: 40,
            y: 2,
            z: 0,
          },
          dimension: {
            w: 2,
            h: 2,
          },
        },
        {
          icon: 'BICYCLE_LOW_ICON',
          position: {
            x: 28,
            y: 1,
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
          icon: 'ENTRY_EXIT',
          position: {
            x: 33,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'SILENCE_AREA_ICON',
          position: {
            x: 22,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_PASSAGE',
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'ENTRY_EXIT',
          position: {
            x: 33,
            y: 9,
            z: 0,
          },
          dimension: {
            w: 4,
            h: 1,
          },
          rotation: 90,
        },
        {
          icon: 'COMPARTMENT_PASSAGE',
          position: {
            x: 31,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COMPARTMENT_PASSAGE',
          position: {
            x: 37,
            y: 0,
            z: 0,
          },
          dimension: {
            w: 1,
            h: 10,
          },
          rotation: 0,
        },
        {
          icon: 'COACH_PASSAGE',
          position: {
            x: 57,
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
          icon: 'BUSINESS',
          position: {
            x: 34,
            y: 2,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'BISTRO',
          position: {
            x: 34,
            y: 6,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
        {
          icon: 'RESTAURANT_ICON',
          position: {
            x: 40,
            y: 4,
            z: 0,
          },
          dimension: {
            w: 3,
            h: 2,
          },
          rotation: 0,
        },
      ],
      travelClass: ['SECOND'],
      propertyIds: ['BICYCLE_HIGH', 'ANY_SEAT'],
    },
  ],
};
