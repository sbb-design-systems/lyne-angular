# Teaser

The `<sbb-teaser>` is a component which can display an image with a caption, and it behaves like a link on user interaction.

Use the `<sbb-teaser-static>` variant instead, if the teaser must not behave like a link itself,
e.g. because it already contains one or more interactive/focusable elements
(more than a single static action is not supported within a link).

Simple teaser example:

```html
<sbb-teaser href="https://www.sbb.ch">
  <img slot="image" src="..." alt="400x300" />
  <sbb-chip-label>Chip label</sbb-chip-label>
  <sbb-title level="2">Title</sbb-title>
  A brief description.
</sbb-teaser>
```

## Slots

The default slot is reserved for the description and,
optionally, a [sbb-title](/angular/components/title/overview) and a [sbb-chip-label](/angular/components/chip-label/overview).
The component displays the `image` with the self-named slot.

Use the `image` slot to pass a `figure` containing an `<sbb-image>` or an `img` that will be used as background.
Optionally, you can add an overlapping `<sbb-chip-label>` to the slotted `figure` (see [sbb-image doc](/angular/components/image/overview#utility-classes)).

```html
<sbb-teaser href="https://www.sbb.ch">
  <figure slot="image" class="sbb-figure">
    <img src="..." alt="400x300" />
    <sbb-chip-label class="sbb-figure-overlap-start-start">AI Generated</sbb-chip-label>
  </figure>
  <sbb-chip-label>Chip label</sbb-chip-label>
  <sbb-title level="2">Title</sbb-title>
  A brief description.
</sbb-teaser>
```

Use the `action` slot to display a static action
e.g. a [sbb-secondary-button-static](/angular/components/button-secondary-button-static/overview) within an `<sbb-teaser>` element
or interactive action (e.g. a [sbb-secondary-button-link](/angular/components/button-secondary-button-link/overview) within a `<sbb-teaser-static>` element)
below the description.
Lyne buttons are automatically assigned to the `action` slot when slotted in the default slot.

```html
<sbb-teaser href="https://www.sbb.ch">
  <img slot="image" src="..." alt="400x300" />
  <sbb-chip-label>Chip label</sbb-chip-label>
  <sbb-title level="2">Title</sbb-title>
  A brief description.
  <sbb-secondary-button-static>Read more</sbb-secondary-button-static>
</sbb-teaser>
```

## Style

Using the `alignment` property, it is possible to change the text position respect to the image.
Possible values are `before`, `after-centered`, `after-centered` (default), `after` and `below`.

```html
<sbb-teaser href="https://www.sbb.ch" alignment="below"> ... </sbb-teaser>
```

The component has two different sizes (`m` and `l`), which can be changed using the `size` property.
The size defaults to `m` in both the standard and the lean theme.

```html
<sbb-teaser size="l" href="https://www.sbb.ch"> ... </sbb-teaser>
```

By default, the image dimensions are set using the width and the aspect ratio.
Default values are `300px` and `4/3`. Consumers can change these values on their slotted image element.

### Flexible Layouts

If using the teaser in a flexible layout like CSS grid or flex together with `alignment=below`,
the CSS variable `--sbb-teaser-align-items` with `stretch` as value can be used
to achieve the image width taking the full available space. On the image itself, the width must be set to `100%`.

```html
<div style="display: grid; gap: 1rem; grid-template-rows: repeat(2, 1fr)">
  <sbb-teaser style="--sbb-teaser-align-items: stretch" href="https://www.sbb.ch" alignment="below">
    <sbb-image style="width: 100%;" slot="image" imageSrc="..." alt="description"></sbb-image>
    ...
  </sbb-teaser>
  <sbb-teaser style="--sbb-teaser-align-items: stretch" href="https://www.sbb.ch" alignment="below">
    <sbb-image style="width: 100%;" slot="image" imageSrc="..." alt="description"></sbb-image>
    ...
  </sbb-teaser>
</div>
```

## Accessibility

It's important to set the `accessibilityLabel` on the `<sbb-teaser>`, which describes the `<sbb-teaser>` for screen-reader users.

The description text is wrapped into an `<p>` element to guarantee the semantic meaning.

## Static variant

The `<sbb-teaser-static>` is a non-interactive version of the `<sbb-teaser>` component.
Unlike `<sbb-teaser>`, it does not render an anchor and therefore has no `href`, `target`, `rel`,
`download`, `accessibilityLabel` or `accessibilityCurrent` property.
It should be used whenever the teaser has to contain more than one interactive element,
e.g. multiple links or buttons, since nesting interactive elements inside a link is not allowed.

```html
<sbb-teaser-static>
  <img slot="image" src="..." alt="400x300" />
  <sbb-chip-label>Chip label</sbb-chip-label>
  <sbb-title level="2">Title</sbb-title>
  A brief description.
  <sbb-secondary-button-link href="#">Read more</sbb-secondary-button-link>
</sbb-teaser-static>
```

## Docs on @sbb-esta/lyne-elements

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-teaser--docs)
