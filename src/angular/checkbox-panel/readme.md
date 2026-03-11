The `<sbb-checkbox-panel>` component provides the same functionality as a native `<input type="checkbox"/>` enhanced with the selection panel design and functionalities.

## Slots

It is possible to provide a label via an unnamed slot;
additionally the slots named `subtext` can be used to provide a subtext and
the slot named `suffix` can be used to provide suffix items.
If you use a <sbb-card-badge>, the slot `badge` is automatically assigned.

```html
<sbb-checkbox-panel>
  <sbb-card-badge>%</sbb-card-badge>
  Label
  <span slot="subtext">Subtext</span>
  <span slot="suffix">Suffix</span>
</sbb-checkbox-panel>
```

## States

The component could be checked or not depending on the value of the `checked` attribute.

```html
<sbb-checkbox-panel value="example-value" checked>Checked state</sbb-checkbox-panel>
```

It has a third state too, which is set if the `indeterminate` property is true.
This is useful when multiple dependent checkbox-panels are used
(e.g., a parent which is checked only if all the children are checked, otherwise is in indeterminate state).
Clicking on a `<sbb-checkbox-panel>` in this state sets `checked` to `true` and `indeterminate` to false.

```html
<sbb-checkbox-panel value="indeterminate-checkbox-panel" indeterminate="true"
  >Indeterminate state</sbb-checkbox-panel
>
```

The component can be disabled by using the `disabled` property.

```html
<sbb-checkbox-panel value="disabled-checkbox" disabled="true">Disabled</sbb-checkbox-panel>
```

## Style

The component's label can be displayed in bold using the `sbb-text--bold` class on a wrapper tag:

```html
<sbb-checkbox-panel value="bold">
  <span class="sbb-text--bold">Bold label</span>
</sbb-checkbox-panel>
```

The component has three possible `size` values, named `xs`, `s` and `m` (default).
If the component is used within a group, the size is inherited from the group.

```html
<sbb-checkbox-panel size="s">Size</sbb-checkbox-panel>
```

## Events

Consumers can listen to the native `change` event on the `<sbb-checkbox-panel>` component to intercept the input's change;
the current state can be read from `event.target.checked`, while the value from `event.target.value`.

## Accessibility

The component provides the same accessibility features as the native checkbox.

Always provide an accessible label via `aria-label` for checkboxes without descriptive text content.
If you don't want the label to appear next to the checkbox, you can use `aria-label` to specify an appropriate label.

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbCheckboxPanel<T>`.

```html
<sbb-checkbox-panel [value]="{value: 'value', name: 'name'}" name="name">Checkbox Panel</sbb-checkbox-panel>
```
