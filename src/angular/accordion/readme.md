The `<sbb-accordion>` is a component which acts as a container
for one or more [sbb-expansion-panel](/docs/elements-expansion-panel--docs).

```html
<sbb-accordion>
  <sbb-expansion-panel>
    <sbb-expansion-panel-header>Header 1</sbb-expansion-panel-header>
    <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
  </sbb-expansion-panel>
  <sbb-expansion-panel>
    <sbb-expansion-panel-header>Header 2</sbb-expansion-panel-header>
    <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
  </sbb-expansion-panel>
</sbb-accordion>
```

## Interaction

The `multi` property, if set, allows having more than one `<sbb-expansion-panel>` expanded at the same time.

```html
<sbb-accordion multi> ... </sbb-accordion>
```

## Style

The component has two different sizes, `l` (default) and `s`, which can be changed using the `size` property.
The property overrides the `size` value of any inner `<sbb-expansion-panel>`.

```html
<sbb-accordion size="s"> ... </sbb-accordion>
```

The component has a `titleLevel` property, which is proxied to each inner `<sbb-expansion-panel-header>`, and can be used
to wrap the header of each `<sbb-expansion-panel>` in a heading tag; if the property is unset, a `div` is used.

In the following example, all the `<sbb-expansion-panel-header>` would be wrapped in a `h3` heading tag.

```html
<sbb-accordion titleLevel="3">
  <sbb-expansion-panel>
    <sbb-expansion-panel-header>Header 1</sbb-expansion-panel-header>
    <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
  </sbb-expansion-panel>
  ...
</sbb-accordion>
```
