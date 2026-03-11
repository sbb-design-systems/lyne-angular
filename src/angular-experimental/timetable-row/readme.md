The `<sbb-timetable-row>` component displays a journey.
A Journey consists of various icons that display information about the means of transport,
the occupancy in the first and second class, the most important warning for the trip and travel hints.
Train changes are displayed in a pearl chain, which has the capability to show,
if a connection is in the past, future or cancelled.
In addition to that, the current position within the journey can be shown.

The whole component is clickable and therefore emits a click-event.

## Usage with props

_`priceProp` property_

```json
{ "price": "12", "text": "CHF", "isDiscount": true }
```

_`tripProp` property_

```json
{
  "legs": [
    {
      "duration": 360,
      "id": "test",
      "arrival": { "time": "2022-08-40T15:00:00+02:00" },
      "departure": { "time": "2022-04-30T15:00:00+02:00" },
      "serviceJourney": {
        "serviceAlteration": {
          "cancelled": false
        }
      }
    }
  ]
}
```

```html
<sbb-timetable-row price="{priceProp}" trip="{tripProp}"></sbb-timetable-row>
```

To simulate the current datetime, you can use the `now` property,
which accepts a `Date` or a timestamp in milliseconds (as number or string).
This is helpful if you need a specific state of the component.
