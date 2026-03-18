# Logo

The `<sbb-logo>` is used as a wrapper for the SBB logo and ensures his aspect ratio and protective room.
To use the component, please define the desired height or width on `<sbb-logo>`.

```html
<style>
  sbb-logo {
    height: 20px;
  }
</style>
<sbb-logo></sbb-logo>
```

## Style

The component has a negative variant which can be set using the `negative` property.

```html
<sbb-logo negative></sbb-logo>
```

The aspect ratio of the logo can be changed using the `protectiveRoom` property.
Possible values are `ideal` (default), `minimal` and `none`.

```html
<sbb-logo protectiveRoom="minimal"></sbb-logo>
```

## @sbb-esta/lyne-elements Docs

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-logo--docs)
