The `<sbb-checkbox-group>` component is used as a container for a collection of either
[sbb-checkbox](/docs/elements-checkbox--docs)s, [sbb-checkbox-panel](/docs/elements-checkbox-panel--docs)s,
or [sbb-selection-expansion-panel](/docs/elements-selection-expansion-panel--docs).

```html
<sbb-checkbox-group>
  <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
  <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
  <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
</sbb-checkbox-group>

<sbb-checkbox-group>
  <sbb-selection-expansion-panel>
    <sbb-checkbox-panel>
      Value
      <span slot="suffix">
        <sbb-icon></sbb-icon>
        <span class="sbb-text-xs sbb-text--bold">CHF</span>
        <span class="sbb-text-m sbb-text--bold">40.00</span>
      </span>
    </sbb-checkbox-panel>
  </sbb-selection-expansion-panel>
</sbb-checkbox-group>
```

## Slots

The content is projected in an unnamed slot.

The component can display one or more [sbb-error](/docs/elements-form-field--docs) components
right below the `<sbb-checkbox-group>` using the `error` slot.

```html
<sbb-checkbox-group>
  <sbb-checkbox value="checkbox-1">Label 1</sbb-checkbox>
  <sbb-checkbox value="checkbox-2">Label 2</sbb-checkbox>
  <sbb-checkbox value="checkbox-3">Label 3</sbb-checkbox>
  <sbb-error slot="error">You must accept all the terms and conditions.</sbb-error>
</sbb-checkbox-group>
```

## States

It is possible to mark the entire group as disabled or required using the properties `disabled` and `required`.

```html
<!-- All the child sbb-checkbox will be marked as required. -->
<sbb-checkbox-group required> ... </sbb-checkbox-group>

<!-- All the child sbb-checkbox will be marked as disabled. -->
<sbb-checkbox-group disabled> ... </sbb-checkbox-group>
```

## Style

The `orientation` property is used to set item orientation.
Possible values are `horizontal` (default) and `vertical`.
The optional property `horizontalFrom` can be used in combination with `orientation='vertical'` to
indicate the minimum breakpoint from which the orientation changes to `horizontal`.

```html
<sbb-checkbox-group orientation="vertical" horizontalFrom="large"> ... </sbb-checkbox-group>
```

The component has a `size` property, which can be used to change the size
of all the inner `<sbb-checkbox>` or `<sbb-checkbox-panel>` elements. Available sizes are `xs`, `s` and `m`.

```html
<sbb-checkbox-group size="s"> ... </sbb-checkbox-group>
```
