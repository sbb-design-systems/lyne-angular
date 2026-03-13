The `<sbb-seat-reservation>` is a visualized seat/bicycle parking space reservation component, with which the user can view the position of a seat as well as its state (FREE, SELECTED, ALLOCATED, RESTRICTED) within a means of transport/wagon and select it accordingly.
Currently, these components are available for all wagons of a means of transport, but only represent one level of it.
For the entire presentation, navigation and functionality of such a seat reservation, this main component includes the following child components:

sbb-seat-reservation-navigation-coaches => Enables quick navigation between individual wagons

sbb-seat-reservation-place-control => Representation of a seat

sbb-seat-reservation-area => For the representation of certain areas within a wagon

sbb-seat-reservation-graphics => Contains various graphics that are required to render a wagon

```html
<sbb-seat-reservation [seatReservations]="seatReservationArray"></sbb-seat-reservation>
```

## Data structure of SeatReservation

#### SeatReservation

```typescript
interface SeatReservation {
  vehicleType: VehicleType;
  deckCoachIndex: number;
  deckCoachLevel: CoachDeckLevel;
  coachItems: CoachItem[];
}
```

#### CoachItem

```typescript
interface CoachItem {
  id: string;
  number: string;
  dimension: ElementDimension;
  type?: CoachType;
  places?: Place[];
  graphicElements?: BaseElement[];
  serviceElements?: BaseElement[];
  travelClass: PlaceTravelClass[];
  propertyIds?: string[];
}
```

#### Place

```typescript
interface Place extends BaseElement {
  number: string;
  state: PlaceState;
  type: PlaceType;
  travelClass?: PlaceTravelClass;
  propertyIds?: string[];
}
```

#### ElementDimension

```typescript
interface ElementDimension {
  w: number;
  h: number;
}
```

#### ElementPosition

```typescript
interface ElementPosition {
  x: number;
  y: number;
  z: number;
}
```

#### PlaceSelection

```typescript
interface PlaceSelection {
  id: string;
  number: string;
  coachIndex: number;
  deckIndex: number;
  state: PlaceState;
}
```

#### SeatReservationPlaceSelection

```typescript
interface SeatReservationPlaceSelection {
  id: string;
  coachId: string;
  coachNumber: string;
  coachIndex: number;
  deckIndex: number;
  placeNumber: string;
  placeType: PlaceType;
  placeTravelClass: PlaceTravelClass;
  propertyIds: string[];
}
```

#### SeatReservationSelectedCoach

```typescript
interface SeatReservationSelectedCoach {
  coachId: string;
  coachNumber: string;
  coachIndex: number;
  coachType?: CoachType;
  coachTravelClass: PlaceTravelClass[];
  coachPropertyIds?: string[];
}
```

#### SeatReservationSelectedPlaces

```typescript
interface SeatReservationSelectedPlaces {
  seats: SeatReservationPlaceSelection[];
  bicycles: SeatReservationPlaceSelection[];
}
```

#### Other

```typescript
type CoachDeckLevel = 'SINGLE_DECK' | 'LOWER_DECK' | 'MIDDLE_DECK' | 'UPPER_DECK';
type PlaceType = 'SEAT' | 'BICYCLE';
type CoachType =
  | 'RESTAURANT_COACH'
  | 'BICYCLE_COACH'
  | 'LUGGAGE_COACH'
  | 'TRAIN_HEAD'
  | 'LOCOMOTIVE_COACH';
type PlaceState = 'FREE' | 'ALLOCATED' | 'RESTRICTED' | 'SELECTED';
type PlaceTravelClass = 'FIRST' | 'SECOND' | 'ANY_CLASS';
type VehicleType = 'TRAIN' | 'BUS';
type TravelDirection = 'LEFT' | 'RIGHT' | 'NONE';
```

#### BaseElement

```typescript
interface BaseElement {
  icon?: string | null;
  rotation?: number;
  position: ElementPosition;
  dimension: ElementDimension;
}
```

## Customizing

### Coloring place by css properties

Custom CSS properties allows you to customize the style of the place. Depending on the current state of the place ("FREE", "SELECTED") and the current state of the place-button ("default," "hover," "focus"), the colors of the background, the backrest and textcolor of the place can be customized. The currently specified values var(--sbb-color-black) are the built-in default values.

By using the pseudo-element ::part(sbb-sr-place-part) in your own css, the individual custom properties can be overwritten.

```css
::part(sbb-sr-place-part) {
 // Color definition for text
  --sbb-seat-reservation-place-control-default-text: light-dark(
    var(--sbb-color-black),
    var(--sbb-color-white)
  );
  --sbb-seat-reservation-place-control-hover-text: light-dark(
    var(--sbb-color-iron), var(--sbb-color-silver)
  );
  --sbb-seat-reservation-place-control-focus-text: light-dark(
    var(--sbb-color-anthracite),
    var(--sbb-color-graphite)
  );
  --sbb-seat-reservation-place-control-allocated-text: light-dark(
    var(--sbb-color-smoke),
    var(--sbb-color-metal)
  );

  // Color background definition for place with state FREE
  --sbb-seat-reservation-place-control-free-background-default: var(--sbb-background-color-2);
  --sbb-seat-reservation-place-control-free-background-hover: light-dark(
    var(--sbb-color-cloud),
    var(--sbb-color-midnight)
  );
  --sbb-seat-reservation-place-control-free-background-focus: light-dark(
    var(--sbb-color-silver),
    var(--sbb-color-black)
  );

  // Color background definition for backrest with state FREE
  --sbb-seat-reservation-place-control-free-backrest-background-default: light-dark(
    var(--sbb-color-black),
    var(--sbb-color-white)
  );
  --sbb-seat-reservation-place-control-free-backrest-background-hover: light-dark(
    var(--sbb-color-black),
    var(--sbb-color-white)
  );
  --sbb-seat-reservation-place-control-free-backrest-background-focus: light-dark(
    var(--sbb-color-black),
    var(--sbb-color-white)
  );

  // Color background definition for place with state SELECTED
  --sbb-seat-reservation-place-control-selected-background-default: var(--sbb-color-primary);
  --sbb-seat-reservation-place-control-selected-background-hover: var(--sbb-color-primary125);
  --sbb-seat-reservation-place-control-selected-background-focus: var(--sbb-color-primary150);

  // Color background definition for backrest with state SELECTED
  --sbb-seat-reservation-place-control-selected-backrest-background-default: var(
    --sbb-color-primary150
  );
  --sbb-seat-reservation-place-control-selected-backrest-background-hover: #7d000f;
  --sbb-seat-reservation-place-control-selected-backrest-background-focus: #5a000b;

  // Color background definition for place with state ALLOCATED
  --sbb-seat-reservation-place-control-allocated-background-default: light-dark(
    var(--sbb-color-milk),
    var(--sbb-color-midnight)
  );
}
```

### Example of customizing CASA (blue)

```css
::part(sbb-sr-place-part) {
  --sbb-seat-reservation-place-control-selected-background-default: var(--casa-blue);
  --sbb-seat-reservation-place-control-selected-background-hover: var(--casa-blue);
  --sbb-seat-reservation-place-control-selected-background-focus: var(--casa-blue);
  --sbb-seat-reservation-place-control-selected-backrest-background-default: var(--casa-blue-hover);
  --sbb-seat-reservation-place-control-selected-backrest-background-hover: var(--casa-blue-hover);
  --sbb-seat-reservation-place-control-selected-backrest-background-focus: var(--casa-blue-hover);
}
```

## Accessibility

The `<sbb-seat-reservation>` component is designed to be accessible. It uses ARIA roles and
properties to ensure that screen readers can interpret the seat reservation structure correctly.
Each seat and coach is represented with appropriate roles, and the component emits custom events
to communicate user interactions.

Keyboard navigation is supported, allowing users to navigate through the seat reservation navigation
with TAB and arrow keys. The component also provides visual focus indicators to help users understand
their current position within the reservation area.

## Properties

| Name                     | Attribute                  | Privacy | Type                | Default  | Description                                                                                                                          |
| ------------------------ | -------------------------- | ------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `alignVertical`          | `align-vertical`           | public  | `boolean`           | `false`  | The seat reservation area is aligned vertically                                                                                      |
| `baseGridSize`           | `base-grid-size`           | public  | `number`            | `16`     | The seat reservation area's base grid size                                                                                           |
| `hasNavigation`          | `has-navigation`           | public  | `boolean`           | `true`   | The seat reservation navigation can be toggled by this property                                                                      |
| `height`                 | `height`                   | public  | `number`            | `null!`  | The seat reservation area's width                                                                                                    |
| `maxBicycleReservations` | `max-bicycle-reservations` | public  | `number`            | `-1`     | Maximal number of possible clickable bicycle places                                                                                  |
| `maxSeatReservations`    | `max-seat-reservations`    | public  | `number`            | `-1`     | Maximal number of possible clickable seats                                                                                           |
| `preselectCoachIndex`    | `preselect-coach-index`    | public  | `number`            | `-1`     |                                                                                                                                      |
| `preventPlaceClick`      | `prevent-place-click`      | public  | `boolean`           | `false`  | Any click functionality is prevented                                                                                                 |
| `seatReservations`       | `seat-reservations`        | public  | `SeatReservation[]` | `null!`  | The seat reservations array contains all coaches and places                                                                          |
| `showTitleInfo`          | `show-title-info`          | public  | `boolean`           | `false`  | The seat reservation title information at place-controls, navigation-coaches and navigation-services can be toggled by this property |
| `travelDirection`        | `travel-direction`         | public  | `TravelDirection`   | `'NONE'` | Displays an arrow showing what direction does train drive                                                                            |

## Events

| Name             | Type                                         | Description                                                                         | Inherited From             |
| ---------------- | -------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------- |
| `selectedcoach`  | `CustomEvent<SeatReservationSelectedCoach>`  | Emits when a coach was selected and returns a CoachSelection                        | SeatReservationBaseElement |
| `selectedplaces` | `CustomEvent<SeatReservationSelectedPlaces>` | Emits when a place was selected and returns a Place array with all selected places. | SeatReservationBaseElement |

## Seat Reservation Area

The component `<sbb-seat-reservation-area>` represents a grey or white background area within a wagon and is currently integrated directly into [sbb-seat-reservation](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation--docs). The dimension properties of the area can be defined via style custom properties. It is still unclear whether areas will be defined in the data once, and an icon will then be automatically included, or if the data for an icon will need to be passed separately and drawn independently. In the first scenario, it would be useful to be able to include a sbb-seat-reservation-graphic through a slot or by passing an icon code within the [sbb-seat-reservation-area](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation-graphic--docs).

```html
<sbb-seat-reservation-area></sbb-seat-reservation-area>
```

## Style Custom Properties

| Name                                 | Type       | Default | Description |
| ------------------------------------ | ---------- | ------- | ----------- |
| `--sbb-seat-reservation-area-width`  | `<number>` | -       | Area width  |
| `--sbb-seat-reservation-area-height` | `<number>` | -       | Area height |
