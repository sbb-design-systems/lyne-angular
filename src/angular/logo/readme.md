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

## Docs on @sbb-esta/lyne-elements

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-logo--docs)
