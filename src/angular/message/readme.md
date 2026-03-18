# Message

The `<sbb-message>` component can be used to display a complex message.

## Slots

The title slot should be used to slot a `<sbb-title>` element.
Optionally, the user can provide other elements such as a subtitle paragraph via the `subtitle` slot,
a [sbb-image](/angular/components/image/overview) to provide an image via the `image` slot,
a paragraph to provide an error code via the `legend` slot,
and a [sbb-button](/angular/components/button/overview) to provide a custom action via the `action` slot.

```html
<sbb-message>
  <sbb-image slot="image" [...]></sbb-image>
  <sbb-title slot="title" level="3">Title</sbb-title>
  <p slot="subtitle">Subtitle</p>
  <p slot="legend">Error code: 0001</p>
  <sbb-button slot="action" [...]>Action</sbb-button>
</sbb-message>
```

## @sbb-esta/lyne-elements Docs

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-message--docs)
