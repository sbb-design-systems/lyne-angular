The `<sbb-toggle-check>` is a component which provides the same functionality as a native `<input type="checkbox" />`
enhanced with the SBB Design.

```html
<sbb-toggle-check name="check" value="single-checkbox">Example</sbb-toggle-check>
```

## Slots

It is possible to provide a label via an unnamed slot; the component can optionally display a `<sbb-icon>`
using the `iconName` property or via custom content using the `icon` slot.
The icon can be at the component start or end based on the value of the `labelPosition` property (default: `after`).

```html
<sbb-toggle-check name="check" value="single-checkbox" iconName="pie-small">
  Example
</sbb-toggle-check>

<sbb-toggle-check name="other" value="single-checkbox" iconName="pie-small" labelPosition="start">
  Another example
</sbb-toggle-check>
```

## States

The component can be displayed in `checked` or `disabled` states using the self-named properties.

```html
<sbb-toggle-check name="check" value="Value" checked>Option</sbb-toggle-check>

<sbb-toggle-check name="other" value="Value" disabled>Option</sbb-toggle-check>
```

## Style

The component has three different sizes (`xs`, `s`, which is the default, and `m`),
which can be changed using the `size` property.

```html
<sbb-toggle-check size="m" value="single-checkbox"> Example in m size</sbb-toggle-check>

<sbb-toggle-check size="xs" value="single-checkbox"> Example in xs size </sbb-toggle-check>
```

## Events

Consumers can listen to the native `change` event on the `<sbb-toggle-check>` component to intercept the input's change;
the current state can be read from `event.target.checked` and the value from `event.target.value`.

## Accessibility

The component provides the same accessibility features as the native checkbox.

Avoid adding other interactive controls into the content of `<sbb-toggle-check>`, as this degrades the experience for users of assistive technology.

If you don't want the label to appear next to the `<sbb-toggle-check>` component,
you can not provide it and then use `aria-label` to specify an appropriate label for screen-readers.

```html
<sbb-toggle-check aria-label="Subscribed to email message"></sbb-toggle-check>
```

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbToggleCheck<T>`.

```html
<sbb-toggle-check [value]="{value: 'value', name: 'name'}" name="name">Toggle Check</sbb-toggle-check>
```
