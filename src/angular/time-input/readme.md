# Time Input

The `<sbb-time-input>` is an input component that displays the typed value as a formatted time (HH:mm).

```html
<sbb-time-input value="15:00"></sbb-time-input>
```

The component allows the insertion of up to 4 numbers, possibly with a separator char like `.`, `:`, `,` or `-`,
then automatically formats the value as time and displays it (see ["Format example"](#format-example)).

## In `<sbb-form-field>`

The `<sbb-time-input>` can be used within an `<sbb-form-field>`:

```html
<sbb-form-field width="collapse" size="s">
  <sbb-time-input value="13:30"></sbb-time-input>
</sbb-form-field>
```

The initial value can be set using the `value` property (string) or attribute.
To get or set the value as a `Date` object, the `valueAsDate` property can be used.
The returned date has its date always set to 01.01.1970 and only the hours and minutes
are set to the current value of the element.
e.g.: with a value of `12:34`, the `valueAsDate` will be 01.01.1970, 12:34:00 UTC.

If the value is invalid because not real (e.g. 12:61 or 25:30), the component does
not format the `value`, and `valueAsDate` will return `null`.

## Format example

See the table below for some formatting examples:

| Input | Output |
| ----- | ------ |
| 12:34 | 12:34  |
| 1     | 01:00  |
| 12    | 12:00  |
| 123   | 01:23  |
| 1234  | 12:34  |
| 1.    | 01:00  |
| 1.2   | 01:02  |
| 1.23  | 01:23  |
| 12:   | 12:00  |
| 12.3  | 12:03  |
| 12,34 | 12:34  |
| 12-34 | 12:34  |

## Events

Similar to the native `<input>` element, the `<sbb-time-input>` component
dispatches the usual `input`, `change`, `blur`, `invalid` and keyboard
and focus related events.

<!-- #region override forms -->

## Angular Forms integration

When using the `<sbb-time-input>` with Angular Forms, the `valueAsDate` property is bound to the form control value.
The initial value therefore should be either a valid `Date` object or `null`.
The form control value will be set to `null` if the user enters an invalid time.

```ts
import { form, FormField } from '@angular/forms/signals';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbTimeInputModule } from '@sbb-esta/lyne-angular/time-input';

@Component({
  selector: 'sbb-time-input-example',
  imports: [FormField, SbbFormFieldModule, SbbTimeInputModule],
  template: `
    <sbb-form-field width="collapse" size="s">
      <sbb-time-input [formField]="control"></sbb-time-input>
    </sbb-form-field>
  `,
})
export class TimeInputExampleComponent {
  control = form(signal<Date | null>(new Date(2026, 0, 0, 12, 34))); // Initial value is 12:34
}
```

<!-- #endregion -->

## @sbb-esta/lyne-elements Docs

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-time-input--docs)
