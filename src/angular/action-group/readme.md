# Action Group

The `<sbb-action-group>` component is a generic content container for action items such as
[sbb-button](/angular/components/button/overview), [sbb-block-link](/angular/components/link/overview) or other HTML elements.

## Style

The `sbb-action-group` behaves like a standard flex element. It can be customized
via CSS rules directly on the `<sbb-action-group>` element or on the slotted action elements.

A set of CSS classes is available for common layout configurations such as vertical orientation
items and responsive breakpoint variants
(the complete list is available in the [layout](/angular/guides/layout) documentation).

```html
<sbb-action-group class="sbb-orientation-horizontal-from-small">
  <sbb-secondary-button>Action 1</sbb-secondary-button>
  <sbb-button>Action 2</sbb-button>
  <sbb-block-link
    iconName="chevron-small-left-small"
    href="https://github.com/sbb-design-systems/lyne-components"
  >
    Action 3
  </sbb-block-link>
</sbb-action-group>
```

Adding the `sbb-orientation-vertical-full-width` class switches the group to a vertical column layout
where each action item stretches to the full width of the container.

```html
<sbb-action-group class="sbb-orientation-vertical-full-width">
  <sbb-secondary-button>Action 1</sbb-secondary-button>
  <sbb-button>Action 2</sbb-button>
</sbb-action-group>
```

## @sbb-esta/lyne-elements Docs

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-action-group--docs)
