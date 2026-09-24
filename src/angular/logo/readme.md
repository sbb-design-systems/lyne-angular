# Logo

The logo components from Lyne are used as a wrapper for the SBB logos, and they ensure the correct aspect ratio and protective room.

To use the component, please define the desired height or width on the components.

```css
/** Selector combination for demo purposes only. */
sbb-logo,
sbb-logo-cargo-international,
sbb-logo-cargo,
sbb-logo-elvetino {
  height: 20px;
}
```

```html
<sbb-logo></sbb-logo>
<sbb-logo-cargo></sbb-logo-cargo>
<sbb-logo-cargo-international></sbb-logo-cargo-international>
<sbb-logo-elvetino></sbb-logo-elvetino>
```

## Style

All the components have a negative variant which can be set using the `negative` property.

```html
<sbb-logo negative></sbb-logo>
<sbb-logo-cargo negative></sbb-logo-cargo>
<sbb-logo-cargo-international negative></sbb-logo-cargo-international>
<sbb-logo-elvetino negative></sbb-logo-elvetino>
```

The aspect ratio of the logos can be changed using the `protectiveRoom` property.
Possible values are `ideal` (default), `minimal` and `none`.

```html
<sbb-logo protectiveRoom="minimal"></sbb-logo>
<sbb-logo-cargo protectiveRoom="none"></sbb-logo-cargo>
<sbb-logo-cargo-international protectiveRoom="minimal"></sbb-logo-cargo-international>
<sbb-logo-elvetino protectiveRoom="none"></sbb-logo-elvetino>
```

## Anniversary Logo

The anniversary logo is an animated logo that can be used during the 125th anniversary year, 2027.
The intrinsic size of the logo matches the regular `<sbb-logo>`, so it can be used inside the
`<sbb-header>` in the same way as `<sbb-logo>`.

The anniversary logo does not support a protective room option. If a protective room is required,
a wrapping `<div>` with the desired dimensions and padding can be created instead.

For accessibility reasons, the text is set as the title of the image, which is read out by screen readers.

In order to correctly render the logo, the SBB font must be loaded and the global variables
of the logo must be included. When using a Lyne theme, this is automatically taken care of.

### Animation

The animation is triggered when the element is attached to the DOM. The initial delay is set to
3 seconds but can be configured via the `--sbb-logo-anniversary-initial-delay` CSS variable.

To prevent the animation from being triggered again on subsequent renders, consumers need to decide
when the animation is needed, or set the `sbb-disable-animation` class on the `<sbb-logo-anniversary>`
to display the end state immediately.

```html
<sbb-logo-anniversary></sbb-logo-anniversary>
```

## Docs on @sbb-esta/lyne-elements

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-logo--docs)
