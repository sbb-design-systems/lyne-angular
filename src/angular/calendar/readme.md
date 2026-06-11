# Calendar

The `<sbb-calendar>` component displays a calendar that allows the user to select a date.

```html
<sbb-calendar></sbb-calendar>
```

## Slots and day customization

The component uses the `<sbb-calendar-day>` component to render day cells.

Consumers can override this behavior by slotting their own customized `<sbb-calendar-day>`,
mainly if some extra content is needed.
The slot name is mandatory, and it requires a date in ISO8601 format (e.g. 2025-01-01).

```html
<sbb-calendar-day slot="2025-01-01"></sbb-calendar-day>
```

The `<sbb-calendar>` creates its own slots based on the month to be displayed;
during initialization, the month is the current one (if there's no date assigned to `value`).
So for the first render, the slotted `<sbb-calendar-day>` elements must match that month.
The `amount` property can be used to display more than one month; in this case, additional
`<sbb-calendar-day>` must be rendered for each month (they must not be grouped, just
sequentially rendered as direct children of the `<sbb-calendar>` element).

Each time the month changes due to user interaction with the previous/next month buttons,
or via selecting a different year and then a month, a `monthchange` event is emitted, typed as
`SbbMonthChangeEvent`. The event has a `range: Day[]` property, which can be accessed to have
information about the days to render. Consumers can listen to this event to dynamically create
and slot the `<sbb-calendar-day>`s of the chosen month.

<!-- #region override calendar-day-example -->

```css
/* Custom CSS for the extra content */
.my-custom-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: light-dark(var(--sbb-color-metal), var(--sbb-color-smoke));
}
```

```html
<!-- Slot days based on the current date, or the selected one if available.-->
<sbb-calendar selected="2025-01-15" (monthchange)="(event) => monthChangeHandler(event)">
  @for (day of days(); track day) {
  <sbb-calendar-day [slot]="day">
    <span class="sbb-text-xxs my-custom-content"> {{ calculateDayText(day) }} </span>
  </sbb-calendar-day>
  }
</sbb-calendar>
```

```ts
@Component({
  selector: 'example',
  templateUrl: './example.html',
})
export class Example {
  days = signal(calculateCurrentDaysAsISOString());

  handleMonthChange(event: SbbMonthChangeEvent) {
    const newDays = event.range.map((d) => d.value);
    this.days.set(newDays);
  }

  calculateDayText(day: string) {
    return doSomeCalculation(day);
  }
}
```

<!-- #endregion -->

### States

The `<sbb-calendar-day>` component has a `current` state, which is set if the slot name matches
the current day.

It also has other states based on the properties of the parent `<sbb-calendar>`.
The disabled and the crossed-out states are based on the value of the `min`, `max` and `dateFilter`
properties, while `selected` matches the parent `value` property, including the multiple
variant.

## Configuration

It's possible to set a date using the `value` property. Also, it's possible to place limits
on the selection using the two properties named `min` and `max`. For these three properties, the
accepted formats are:

- Date objects
- ISO String
- Unix Timestamp (number of seconds since Jan 1, 1970)

It's recommended to set the time to 00:00:00.

```html
<sbb-calendar min="1599955200" max="1699920000" value="1649980800"></sbb-calendar>
```

By default, the component takes, in order of priority,
the `value` property or the current date to calculate which month it has to show.
It's possible to move to the previous/next month using the two buttons at the top of the component.

It's also possible to select a specific date by clicking on the month label between the buttons:
this action opens a list of twenty-four selectable years, and, after the year selection, the list
of months of that year. Clicking on an element will set the month and restore the first view,
allowing to select the desired day.

The `<sbb-calendar>` can be directly displayed in one of these modalities using the `view` property
(default: `day`).

```html
<sbb-calendar value="1585699200" view="month"></sbb-calendar>

<sbb-calendar value="1585699200" view="year"></sbb-calendar>
```

The `<sbb-calendar>` uses two different components to render years and months in their view,
named `<sbb-calendar-month>` and `<sbb-calendar-year>`.
These are 'internal-use-only' components, and they are **not** meant to be used by consumers.

Unwanted dates can be filtered out using the `dateFilter` property.
Note that the `dateFilter` function should not be used as a replacement for the `min` and `max`
properties. The `dateFilter` is applied in all the views, so if some months or years are not
allowed they will be displayed as disabled in the corresponding view.

```ts
/** Returns only working days (Mon-Fri). */
const dateFilterFn: (d: Date) => boolean = d.getDay() !== 6 && d.getDay() !== 0;
```

```html
<sbb-calendar [dateFilter]="dateFilterFn"></sbb-calendar>
```

### Multiple mode

By default, the component allows selecting a single date:
this behavior can be changed by setting the `multiple` attribute to true.
In this case the `value` property, if set, must be an array; moreover,
the days of the week become clickable, allowing to select an entire column
(e.g. all the Mondays, all the Tuesdays and so on).
Additionally it is possible to select a range of dates, by clicking on a
date and then Shift clicking on another date.

```html
<sbb-calendar multiple></sbb-calendar>
```

If the `week-numbers` property is set, the ISO week dates are also clickable, allowing to select
all the days in the week.

```html
<sbb-calendar multiple weekNumbers></sbb-calendar>
```

### Fixed month

In the case where a fixed month (or months with `amount`) should be displayed,
the `fixedMonth` property should be used.
With this configuration, the currently displayed month cannot be changed by the user.

The value must be provided as a valid ISO format with `YYYY-MM`.

```html
<sbb-calendar fixedMonth="2025-01"></sbb-calendar>
```

## Style

The component displays by default a single month in the `day` view, a list of twenty-four years
in the `year` view, or a list of months in the `month` view.
When setting the `amount` to a value greater than 1, it will display the given amount of months.

```html
<sbb-calendar wide="true" value="1699920000"></sbb-calendar>
```

It's also possible to change the orientation of dates by setting the `orientation` property to
`vertical`. In this variant, the weekdays are displayed on the left side of the component and the
days progress along the vertical direction.
This visual change is applied only to the day view.

```html
<sbb-calendar orientation="vertical"></sbb-calendar>
```

In both orientations, the week days are always displayed. Using the `week-numbers` property, it's
possible to display the ISO week dates perpendicularly to week days,so on the left side in
`horizontal` and on top in `vertical`.

```html
<sbb-calendar weekNumbers></sbb-calendar>

<sbb-calendar orientation="vertical" weekNumbers></sbb-calendar>
```

## Events

The `change` event is dispatched every time a user selects or deselects a date.

Check the [Slot and day customization](docs/elements-calendar--docs#slots-and-day-customization) paragraph
for more information about the `monthchange` event.

## Keyboard interaction

It's possible to move within the component using the keyboard.

The days disabled due to the presence of the `min`, `max` and `dateFilter` properties are taken into account: for example,
pressing the `<kbd>Home</kbd>` when the first day of the month is disabled will result in moving to the first non-disabled day.

### Horizontal orientation

| Keyboard               | Action                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| <kbd>Left Arrow</kbd>  | Go to previous day.                                                                      |
| <kbd>Right Arrow</kbd> | Go to next day.                                                                          |
| <kbd>Up Arrow</kbd>    | Go to the same day in the previous week (eg. from Monday to previous Monday).            |
| <kbd>Down Arrow</kbd>  | Go to the same day in the next week (eg. from Monday to next Monday).                    |
| <kbd>Home</kbd>        | Go to the first day of the month.                                                        |
| <kbd>End</kbd>         | Go to the last day of the month.                                                         |
| <kbd>Page Up</kbd>     | Go to the same day in the first week (eg. from Monday to the first Monday of the month). |
| <kbd>Page Down</kbd>   | Go to the same day in the last week (eg. from Monday to the last Monday of the month).   |

### Vertical orientation

| Keyboard               | Action                                                                         |
| ---------------------- | ------------------------------------------------------------------------------ |
| <kbd>Left Arrow</kbd>  | Go to the same day in the next week (eg. from Monday to next Monday).          |
| <kbd>Right Arrow</kbd> | Go to the same day in the next week (eg. from Monday to next Monday).          |
| <kbd>Up Arrow</kbd>    | Go to previous day.                                                            |
| <kbd>Down Arrow</kbd>  | Go to next day.                                                                |
| <kbd>Home</kbd>        | Go to the first day of the month.                                              |
| <kbd>End</kbd>         | Go to the last day of the month.                                               |
| <kbd>Page Up</kbd>     | Go to the first day of the week (eg. from any day to Monday of the same week). |
| <kbd>Page Down</kbd>   | Go to the last day of the week (eg. from any day to Sunday of the same week).  |

## Accessibility

For accessibility purposes, the component is rendered as a native table element and each day is a button.

## @sbb-esta/lyne-elements Docs

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-calendar--docs)
