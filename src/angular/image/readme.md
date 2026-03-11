The `<sbb-image>` component is used to render an image.

Mainly from cdn.img.sbb.ch (with `imageSrc`), but we can set an external image too.
The size can be set with `pictureSizesConfig`.

```html
<sbb-image image-src="..." alt="..."></sbb-image>
```

## Usage

For image related elements, it is strongly recommended to wrap an `<sbb-image>` and all its related elements in a `figure` tag.
E.g. `<figcaption>` or `<sbb-chip-label>`.

```html
<figure class="sbb-figure">
  <sbb-image ...></sbb-image> or <img />
  <figcaption>Caption / Copyright</figcaption>
</figure>
```

You can place overlapping content by using the `sbb-figure-overlap-${horizontal-alignment}-${vertical-alignment}` utility classes.

| Position       | CSS class                        |
| -------------- | -------------------------------- |
| `top-left`     | `sbb-figure-overlap-start-start` |
| `top-right`    | `sbb-figure-overlap-start-end`   |
| `bottom-left`  | `sbb-figure-overlap-end-start`   |
| `bottom-right` | `sbb-figure-overlap-end-end`     |

```html
<figure class="sbb-figure">
  <sbb-image ...></sbb-image>
  <sbb-chip-label class="sbb-figure-overlap-start-start"></sbb-chip-label>
</figure>
```

Instead of a `<sbb-chip-label>`, it's also possible to slot images (e.g. logos).
In that case, the `<sbb-figure-overlap-image>` CSS class needs to be set on the image.

```html
<figure class="sbb-figure">
  <sbb-image ...></sbb-image>
  <img class="sbb-figure-overlap-image sbb-figure-overlap-end-end" src="logo.png" alt="Logo" />
</figure>
```

** Multiple `<sbb-chip-label>`s **

In order to place multiple `<sbb-chip-label>`s, a wrapping div can be used:

```html
<figure class="sbb-figure">
  <sbb-image ...></sbb-image>
  <div class="sbb-figure-overlap-end-end">
    <sbb-chip-label>AI generated</sbb-chip-label>
    <sbb-chip-label>Paid content</sbb-chip-label>
  </div>
</figure>
```

### Utility classes

Use the `sbb-image-border-radius-${value}` utility classes to set the image border radius.

| Border radius | CSS class                         |
| ------------- | --------------------------------- |
| `default`     | `sbb-image-border-radius-default` |
| `none`        | `sbb-image-border-radius-none`    |
| `round`       | `sbb-image-border-radius-round`   |

```html
<sbb-image class="sbb-image-border-radius-none"></sbb-image>
<!-- or -->
<img class="sbb-image-border-radius-round" />
```

Use the `sbb-image-${ratio}` utility classes to set the image aspect ratio.

| Aspect Ratio | CSS class        |
| ------------ | ---------------- |
| `free`       | `sbb-image-free` |
| `1-1`        | `sbb-image-1-1`  |
| `1-2`        | `sbb-image-1-2`  |
| `2-1`        | `sbb-image-2-1`  |
| `2-3`        | `sbb-image-2-3`  |
| `3-2`        | `sbb-image-3-2`  |
| `3-4`        | `sbb-image-3-4`  |
| `4-3`        | `sbb-image-4-3`  |
| `4-5`        | `sbb-image-4-5`  |
| `5-4`        | `sbb-image-5-4`  |
| `9-16`       | `sbb-image-9-16` |
| `16-9`       | `sbb-image-16-9` |

```html
<sbb-image class="sbb-image-16-9"></sbb-image>
<!-- or -->
<img class="sbb-image-4-3" />
```
