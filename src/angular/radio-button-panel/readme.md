The `<sbb-radio-button-panel>` component provides the same functionality as a native `<input type="radio"/>` enhanced with the selection panel design and functionalities.

Radio-buttons should typically be placed inside a [sbb-radio-button-group](/docs/elements-radio-button--docs) component
in order to display a radio input within a group. Individual radio-buttons inside a radio-group will inherit the `name` of the group.

```html
<sbb-radio-button-group name="radio-group" value="Value one" aria-label="Radio group label">
  <sbb-radio-button-panel value="Value one">Option one</sbb-radio-button-panel>
  <sbb-radio-button-panel value="Value two">Option two</sbb-radio-button-panel>
</sbb-radio-button-group>
```

In cases where that's not possible, you can define a group of radios using the same `name` property

```html
<sbb-radio-button-panel name="radio-group" value="Value one">Option one</sbb-radio-button-panel>
<sbb-radio-button-panel name="radio-group" value="Value two">Option two</sbb-radio-button-panel>
```

## Slots

It is possible to provide a label via an unnamed slot;
additionally the slots named `subtext` can be used to provide a subtext and
the slot named `suffix` can be used to provide suffix items.
If you use a <sbb-card-badge>, the slot `badge` is automatically assigned.

```html
<sbb-radio-button-panel>
  <sbb-card-badge>%</sbb-card-badge>
  Label
  <span slot="subtext">Subtext</span>
  <span slot="suffix">Suffix</span>
</sbb-radio-button-panel>
```

## States

It is possible to display the component in `disabled` or `checked` state by using the self-named properties.
The `allowEmptySelection` property allows user to deselect the component.

```html
<sbb-radio-button-panel value="One" checked>Option one</sbb-radio-button-panel>
<sbb-radio-button-panel value="Two" disabled>Option two</sbb-radio-button-panel>
<sbb-radio-button-panel value="Three" allowEmptySelection>Option three</sbb-radio-button-panel>
```

## Style

The component has three different sizes, which can be changed using the `size` property (`m`, which is the default and `s`).
If used inside a `<sbb-radio-button-group>`, the `size` will be inherited from it.

```html
<sbb-radio-button-panel size="s">Size</sbb-radio-button-panel>
```

The component's label can be displayed in bold using the `sbb-text--bold` class on a wrapper tag:

```html
<sbb-radio-button-panel value="bold">
  <span class="sbb-text--bold">Bold label</span>
</sbb-radio-button-panel>
```

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbRadioButtonPanel<T>`.

```html
<sbb-radio-button-panel [value]="{value: 'value', name: 'name'}" name="name"
  >Option</sbb-radio-button-panel
>
```
