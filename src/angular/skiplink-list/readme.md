The `<sbb-skiplink-list>` is a component that can be used to collect one or more hidden [sbb-block-link](/docs/elements-link--docs)s,
which become visible only when focused, e.g., using the `Tab` key.

When the component contains multiple link elements, only one of them is shown (the focused one), while the others stay visually hidden.

It has an optional `<sbb-title>` element, which is visually hidden too, but it's read from screen-readers,
and it can be set using the `title-content` property.

```html
<sbb-skiplink-list title-level="2" title-content="Title text">
  <sbb-block-link href="https://www.sbb.ch/">Content</sbb-block-link>
  <sbb-block-link href="https://www.sbb.ch/en/help-and-contact.html">Contact</sbb-block-link>
  ...
</sbb-skiplink-list>
```
