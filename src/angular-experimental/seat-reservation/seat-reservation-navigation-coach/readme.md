The `<sbb-seat-reservation-navigation-coach>` is a component which represents one coach in
a train or bus coach layout. Additionally service icons are also generated in this
component if present in the incoming COACH_DATA.

The purpose of this component is to be used in the main [sbb-reservation-navigation](/docs/experimental-sbb-seat-reservation-navigation--docs) component

```html
<sbb-seat-reservation-navigation-coach
  index="0"
  ?selected="true"
  ?focused="false"
  ?hovered="false"
  ?nativeFocusActive="false"
  .coachItemDetails="{
    coachId: '80',
    freePlacesByType: {
      seats: 0,
      bicycles: 0
    },
    isDriverArea: false,
    travelClass: 'FIRST',
    propertyIds: ['WIFI', 'POWER_OUTLET']
  }"
  ?vertical="false"
>
</sbb-seat-reservation-navigation-coach>
```

## Events

> @event selectcoach - Emits when a coach was selected and returns the coach index number.
> @event focuscoach - Emits when a coach was focused

## Data structure of SeatReservationNavigationCoach

#### SeatReservation

```typescript
type CoachItemDetails = {
  id: string;
  travelClass: PlaceTravelClass;
  propertyIds: string[];
  freePlaces: CoachNumberOfFreePlaces;
  isDriverArea: boolean;
  driverAreaSide?: Record<string, boolean>;
  driverAreaElements: {
    driverArea: BaseElement | undefined;
    driverAreaNoVerticalWall: BaseElement | undefined;
  };
};
```

#### Other

```typescript
type PlaceTravelClass = 'FIRST' | 'SECOND' | 'ANY_CLASS';
type CoachNumberOfFreePlaces = {
  seats: number;
  bicycles: number;
};
```

## Keyboard interaction

| Keyboard         | Action                                                                      |
| ---------------- | --------------------------------------------------------------------------- |
| <kbd>Enter</kbd> | Selects the coach as the active/selected coach and emits selectCoach Event. |

## Accessibility

> Component was successfully tested with different High-Contrast Modes
