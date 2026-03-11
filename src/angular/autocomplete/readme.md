The `<sbb-autocomplete>` is a component that can be used to display a panel of suggested options connected to a text input.
Use it when you need a basic autocomplete: a panel with a list of selectable and possibly grouped options.
If you need buttons connected to the options, use the [sbb-autocomplete-grid](/docs/experimental-sbb-autocomplete-grid-sbb-autocomplete-grid--docs).

It's possible to set the element to which the component's panel will be attached using the `origin` prop,
and the input which will work as a trigger using the `trigger` prop.
Both accept an id or an element reference.

<!-- #region override intro-example -->

```html
<sbb-form-field>
  <label>Autocomplete</label>
  <input [formControl]="control" [sbbAutocomplete]="auto" />
  <sbb-autocomplete [displayWith]="displayWith" #auto="sbbAutocomplete">
    @for (value of values; track value) {
    <sbb-option [value]="value">{{ value.property }}</sbb-option>
    }
  </sbb-autocomplete>
</sbb-form-field>
```

```ts
@Component({
  imports: [SbbAutocomplete, SbbAutocompleteTrigger, ReactiveFormsModule, SbbFormField, SbbOption],
  templateUrl: './template.html',
})
class TestComponentWithComplexValue {
  values = [
    { property: 'value 1', otherProp: 'test' },
    { property: 'value 2', otherProp: 'other test' },
  ];
  autocomplete = viewChild.required(SbbAutocomplete);
  options = viewChildren(SbbOption);
  control = new FormControl(this.values[0]);
  displayWith: ((value: { property: string; otherProperty: string }) => string) | null = (value) =>
    value ? value.property : value;
}
```

<!-- #endregion -->

<!-- #region override intro-end -->

On top of the Lyne Elements functionality, the Angular wrapper provides a `SbbAutocompleteTrigger` directive.
This directive is meant to be used if using complex values (other than type string). See the example below on how to connect.

<!-- #endregion -->

## In `<sbb-form-field>`

If the component is used within a [sbb-form-field](/docs/elements-form-field--docs),
it will automatically connect to the native `<input>` as trigger and will display the option panel above or below the `<sbb-form-field>`.

```html
<!-- Origin element -->
<sbb-form-field>
  <label>Label</label>
  <!-- Trigger element -->
  <input placeholder="Trigger element" />

  <sbb-autocomplete>
    <sbb-option icon-name="clock-small" value="Option 1"> Option 1 </sbb-option>
    <sbb-option icon-name="clock-small" value="Option 2"> Option 2 </sbb-option>
    <sbb-option icon-name="clock-small" value="Option 3"> Option 3 </sbb-option>
  </sbb-autocomplete>
</sbb-form-field>
```

## Style

### Option highlight

By default, the autocomplete will highlight the label of the `<sbb-option>` in the panel, if it matches the typed text.
See the [sbb-option](/docs/elements-option--docs) for more details.

### Option grouping

The displayed `<sbb-option>` can be collected into groups using `<sbb-optgroup>` element:

```html
<!-- Origin element -->
<sbb-form-field>
  <label>Label</label>
  <!-- Trigger element -->
  <input placeholder="Trigger element" />

  <sbb-autocomplete>
    <sbb-optgroup label="Group 1">
      <sbb-option icon-name="clock-small" value="Option 1"> Option 1 </sbb-option>
      ...
    </sbb-optgroup>
    <sbb-optgroup label="Group 2"> ... </sbb-optgroup>
  </sbb-autocomplete>
</sbb-form-field>
```

### Size

The component has no `size` property but, when slotted in a `<sbb-form-field>`, it adapts to the parent `size`.

```html
<sbb-form-field size="s">
  <label>Label</label>
  <input placeholder="Trigger element" />
  <sbb-autocomplete> ... </sbb-autocomplete>
</sbb-form-field>
```

### Ellipsis

It's possible to truncate the label (apply ellipsis) of slotted `<sbb-option>` elements with the `<sbb-options-nowrap>` CSS class.
To select which elements should be affected, the consumer can set the class on either the `html` tag, the `<sbb-autocomplete>`, or the single `<sbb-option>`.

## Events

The `<sbb-option>` emits the `optionSelected` event when selected via user interaction.

## Keyboard interaction

The options panel opens on `focus`, `click` or `input` events on the trigger element, or on `ArrowDown` keypress;
it can be closed on backdrop click, or using the `Escape` or `Tab` keys.

| Keyboard              | Action                                                  |
| --------------------- | ------------------------------------------------------- |
| <kbd>Down Arrow</kbd> | Navigate to the next option. Open the panel, if closed. |
| <kbd>Up Arrow</kbd>   | Navigate to the previous option.                        |
| <kbd>Enter</kbd>      | Select the active option.                               |
| <kbd>Escape</kbd>     | Close the autocomplete panel.                           |

### `autoSelectActiveOption`

With `autoSelectActiveOption` enabled, navigating between options also selects them, without having to press the `Enter`.
The `input` and `change` events emission are postponed to when the panel is closed or on blur.

### `autoSelectActiveOptionOnBlur`

With `autoSelectActiveOptionOnBlur` enabled, the active option is automatically selected when the input field loses focus.
To prevent accidental selections, this mechanism will not trigger if the input is cleared.

This can be used in combination with `autoActiveFirstOption` to speed up form completion in copy-paste scenarios.
Be aware that this can lead to unexpected behavior. Carefully test your use case.

### `requireSelection`

Use the `requireSelection` to clear the input if the user does not explicitly select an option, via mouse click or keyboard selection.

## Accessibility

The `<sbb-autocomplete>` implements the [ARIA combobox interaction pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

The text input trigger specifies `role="combobox"` while the content of the pop-up applies `role="listbox"`.
Because of this `listbox` pattern, you should not put other interactive controls, such as buttons or checkboxes, inside an autocomplete option.
Nesting interactive controls like this interferes with many assistive technologies.

The component preserves focus on the input trigger,
using `aria-activedescendant` to support navigation though the autocomplete options.

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbAutocomplete<T>` and `SbbOption<T>`.

```ts
const values = [
  { value: 'value 1', name: 'Option 1' },
  { value: 'value 2', name: 'Option 2' },
];
```

```html
<sbb-form-field>
  <input />
  <sbb-autocomplete .displayWith="${(value) => value.name}">
    <sbb-option .value="${values[0]}">Option 1</sbb-option>
    <sbb-option .value="${values[1]}">Option 2</sbb-option>
  </sbb-autocomplete>
</sbb-form-field>
```

### `displayWith` function

When using complex values, the selection should most likely still be represented as text.
To achieve this, you can use the `displayWith` property which accepts a function.
This function receives the selected value and should return a string.

Please note that the parameter is the assigned value of the selected option which does not necessarily
align with the type information.

<!-- #region override display-with -->

Additionally, when using Angular Forms, the initially passed value of `displayWith` can be `null`.

<!-- #endregion -->
