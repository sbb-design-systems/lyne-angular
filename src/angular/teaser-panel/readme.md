# Teaser Panel

The `<sbb-teaser-panel>` is a simple component that displays content in a vertically centered trapezoidal shape.
By default, the component displays a background color fade effect on mouse hover.

```html
<div style="height: ...px;">
  <!-- The panel expands to fill the parent container's size -->
  <sbb-teaser-panel> Panel content </sbb-teaser-panel>
</div>
```

To make the `<sbb-teaser-panel>` overlap other content, you can set `position: absolute`.
The parent element must have `position: relative`.

```html
<div style="height: ...px; position: relative;">
  <!-- It expands to overlap the parent element -->
  <sbb-teaser-panel style="position: absolute"> Panel content </sbb-teaser-panel>

  <div>Other content</div>
</div>
```

## Accessibility

The component does not introduce any interactive elements by itself. Ensure that the content slotted into the panel is semantically correct and accessible.
If the panel is used as a clickable element, wrap it with an appropriate interactive component (e.g., `<sbb-button>` or `<sbb-link>`).

## @sbb-esta/lyne-elements Docs

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-teaser-panel--docs)
