The `<sbb-radio-button>` component provides the same functionality as a native `<input type="radio"/>` enhanced with the SBB Design.

Radio-buttons should typically be placed inside a [sbb-radio-button-group](/docs/elements-radio-button-group--docs) component
in order to display a radio input within a group. Individual radio-buttons inside a radio-group will inherit the `name` of the group.

```html
<sbb-radio-button-group name="radio-group" value="Value one" aria-label="Radio group label">
  <sbb-radio-button value="Value one">Option one</sbb-radio-button>
  <sbb-radio-button value="Value two">Option two</sbb-radio-button>
</sbb-radio-button-group>
```

In cases where that's not possible, you can define a group of radios using the same `name` property

```html
<sbb-radio-button name="radio-group" value="Value one" checked>Option one</sbb-radio-button>
<sbb-radio-button name="radio-group" value="Value two">Option two</sbb-radio-button>
```

## States

It is possible to display the component in `disabled` or `checked` state by using the self-named properties.

The component has a `required` property, which can be useful
for setting a custom [sbb-error](/docs/elements-form-field--docs) message
within a [sbb-form-field](/docs/elements-form-field--docs).

The `allowEmptySelection` property allows user to deselect the component.

```html
<sbb-radio-button value="One" checked>Option one</sbb-radio-button>

<sbb-radio-button value="Two" disabled>Option two</sbb-radio-button>

<sbb-radio-button value="Three" required>Option three</sbb-radio-button>

<sbb-radio-button value="Four" allowEmptySelection>Option four</sbb-radio-button>
```

## Style

The component has three different sizes, which can be changed using the `size` property (`m`, which is the default, `s` and `xs`).
If used inside a `<sbb-radio-button-group>`, the `size` will be inherited from it.

```html
<sbb-radio-button value="small" size="s">Size</sbb-radio-button>
```

The component's label can be displayed in bold using the `sbb-text--bold` class on a wrapper tag:

```html
<sbb-radio-button value="bold">
  <span class="sbb-text--bold">Bold label</span>
</sbb-radio-button>
```

## Complex Values

This component supports any types of values, including complex objects.
The type can be specified using the generic type parameter `T` of `SbbRadioButton<T>`.

```html
<sbb-radio-button [value]="{value: 'value', name: 'name'}" name="name">Option</sbb-radio-button>
```
