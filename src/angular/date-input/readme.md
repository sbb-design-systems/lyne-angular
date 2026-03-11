The `<sbb-date-input>` is an input component for a date. It is comparable to the
`<input type="date">` element, however without a datepicker attached (See
`<sbb-datepicker>` to provide a datepicker dropdown with the
`<sbb-date-input>`).

It supports a `value` attribute/property and a `valueAsDate` property.
The `valueAsDate` provides a date object (`Date` per default,
depending on the used `DateAdapter`), if `value` is parseable
to a valid date and null otherwise.

Both `value` and `valueAsDate` also work as setters and the other
property will be updated accordingly.

```html
<sbb-date-input value="2024-12-12"></sbb-date-input>
```

```html
<sbb-form-field>
  <label>Date</label>
  <sbb-date-input value="2024-12-12"></sbb-date-input>
</sbb-form-field>
```

## Validation

The `<sbb-date-input>` implements native form validation:
https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation

The validation state can be checked via the `validityState` property.

### min/max

It is possible to set a min and/or max date. Dates outside this range will
be marked as an error. The dates must either be passed via ISO strings
as attributes or as date objects via property access.

```html
<sbb-date-input min="2000-01-01" max="2050-12-31"></sbb-date-input>
```

An attached `<sbb-datepicker>` will also respect these limits.

### dateFilter

You can pass a function to the `dateFilter` property, which will
be used to validate the given date.

```ts
const input = document.querySelector('sbb-date-input');
// Exclude Saturday and Sunday
input.dateFilter = (d: Date): boolean => d.getDay() !== 6 && d.getDay() !== 0;
```

An attached `<sbb-datepicker>` will also use this function to
calculate selectable dates.

Important Note: Always use a `min` ad `max` value when using
`dateFilter` with a `<sbb-datepicker>` attached, as the calculation
for previous/next available date can become extremely expensive.

### setCustomValidity()

It is possible to set a custom validity for this component, similar to
native form elements. Use the `setCustomValidity(message: string)`
method to set a custom error message as the state and pass an empty
string to reset the error state.

```ts
const input = document.querySelector('sbb-date-input');
// Set error state/message
input.setCustomValidity('My custom error message');
// Remove error state/message
input.setCustomValidity('');
```

See e.g. https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity

### Validation table

| Attribute  | Property                             | Description                                                                          | ValidityState flag |
| ---------- | ------------------------------------ | ------------------------------------------------------------------------------------ | ------------------ |
| `required` | `required`                           | Requires the input not to be empty                                                   | `valueMissing`     |
| `value`    | `value`/`valueAsDate`                | Requires the given/entered value to be a valid date                                  | `badInput`         |
| `min`      | `min`                                | Requires the given/entered value to not be before the defined min date               | `rangeUnderflow`   |
| `max`      | `max`                                | Requires the given/entered value to not be after the defined min date                | `rangeOverflow`    |
|            | `dateFilter`                         | Requires the given/entered value to return true, when passed to the defined function | `sbbDateFilter`    |
|            | `setCustomValidity(message: string)` | If passed a non-empty string, assigns error state to the component                   | `customError`      |

## Weekday style

Due to business rules, a formatted date is always displayed with an abbreviated
weekday (e.g. `Th, 12.12.2024`).
To prevent this, set the `weekday-style` attribute to `none`.

```html
<sbb-date-input value="2024-12-12" weekday-style="none"></sbb-date-input>
```

## Events

Similar to the native `<input>` element, the `<sbb-date-input>` component
dispatches the usual `input`, `change`, `blur`, `invalid` and keyboard
and focus related events.
