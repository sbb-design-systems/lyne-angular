The `<sbb-signet>` is used as a wrapper for the SBB signet and ensures his aspect ratio and protective room.
To use the component, please define the desired height or width on `<sbb-signet>`.

```html
<style>
  sbb-signet {
    height: 20px;
  }
</style>
<sbb-signet></sbb-signet>
```

## Style

The aspect ratio of the logo can be changed using the `protectiveRoom` property.
Possible values are `ideal` (default), `minimal`, `panel` and `none`.

With `panel` value, the component is displayed with a left padding, similar to the `<sbb-logo>` component but without the text.
This is useful, for example, in the `<sbb-header>` with `size='s'`.

```html
<sbb-signet protectiveRoom="none"></sbb-signet>

<sbb-signet protectiveRoom="minimal"></sbb-signet>

<sbb-signet protectiveRoom="panel"></sbb-signet>
```
