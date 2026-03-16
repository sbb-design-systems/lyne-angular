The `<sbb-pearl-chain>` component displays all parts of a journey, including changes of trains or other kinds of transports.
Also, it is possible to render the current position.

The `legs` property is mandatory.

```json
[
  {
    "__typename": "PTRideLeg",
    "arrival": {
      "time": "2022-12-11T12:13:00+01:00"
    },
    "departure": {
      "time": "2022-12-07T12:11:00+01:00"
    },
    "serviceJourney": {
      "serviceAlteration": {
        "cancelled": false,
        "delayText": "string",
        "reachable": true,
        "unplannedStopPointsText": ""
      }
    }
  },
  {
    "__typename": "PTRideLeg",
    "arrival": {
      "time": "2022-12-11T12:13:00+01:00"
    },
    "departure": {
      "time": "2022-12-07T12:11:00+01:00"
    },
    "serviceJourney": {
      "serviceAlteration": {
        "cancelled": false,
        "delayText": "string",
        "reachable": true,
        "unplannedStopPointsText": ""
      }
    }
  }
]
```

```html
<sbb-pearl-chain legs="{legs}"></sbb-pearl-chain>
```

To simulate the current datetime, you can use the `now` property,
which accepts a `Date` or a timestamp in milliseconds (as number or string).
This is helpful if you need a specific state of the component.
