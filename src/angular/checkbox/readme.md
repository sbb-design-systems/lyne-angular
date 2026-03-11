The `<sbb-checkbox>` component provides the same functionality as a native `<input type="checkbox"/>` enhanced with the SBB Design.

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `<sbb-icon>` using
the `iconName` property or via custom SVG using the `icon` slot.
The icon can be placed before or after the label based on the value of the `iconPlacement` property (default: `end`).

```html
<sbb-checkbox value="checkbox">Example</sbb-checkbox>

<sbb-checkbox value="icon" icon-name="tickets-class-small">Icon</sbb-checkbox>

<sbb-checkbox value="start-icon" icon-name="tickets-class-small" icon-placement="start"
  >Icon at start</sbb-checkbox
>
```

## States

The component could be checked or not depending on the value of the `checked` attribute.

```html
<sbb-checkbox value="checked-checkbox" checked>Checked state</sbb-checkbox>
```

It has a third state too, which is set if the `indeterminate` property is true.
This is useful when multiple dependent checkboxes are used
(e.g., a parent which is checked only if all the children are checked, otherwise is in indeterminate state).
Clicking on a `<sbb-checkbox>` in this state sets `checked` to `true` and `indeterminate` to false.

```html
<sbb-checkbox value="indeterminate-checkbox" indeterminate="true">Indeterminate state</sbb-checkbox>
```

The component can be displayed in `disabled` or `required` state by using the self-named properties.

```html
<sbb-checkbox value="required-checkbox" required="true">Required</sbb-checkbox>

<sbb-checkbox value="disabled-checkbox" disabled="true">Disabled</sbb-checkbox>
```

## Style

The component has three possible `size` values, named `xs`, `s` and `m` (default).

```html
<sbb-checkbox value="size" size="xs">Size</sbb-checkbox>

<sbb-checkbox value="size" size="s">Size</sbb-checkbox>
```

The component's label can be displayed in bold using the `<sbb-text--bold>` class on a wrapper tag:

```html
<sbb-checkbox value="bold">
  <span class="sbb-text--bold">Bold label</span>
</sbb-checkbox>
```

## Events

Consumers can listen to the native `change` event on the `<sbb-checkbox>` component to intercept the input's change;
the current state can be read from `event.target.checked`, while the value from `event.target.value`.

## Accessibility

The component provides the same accessibility features as the native checkbox.

Avoid adding other interactive controls into the content of `<sbb-checkbox>`, as this degrades the experience for users of assistive technology.

Always provide an accessible label via `aria-label` for checkboxes without descriptive text content.
If you don't want the label to appear next to the checkbox, you can use `aria-label` to specify an appropriate label.

```html
<sbb-checkbox aria-label="Subscribed to email message"></sbb-checkbox>
```

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbCheckbox<T>`.

```html
<sbb-checkbox .value=${{value: 'value', name: 'name'}} name="name">Checkbox</sbb-checkbox>
```
