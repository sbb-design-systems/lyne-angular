# Download

The `<sbb-download>` is a component that displays a downloadable document, styled as a
[sbb-card](/angular/components/card/overview). The whole area is rendered as a link with the download
behavior always enabled, so activating it triggers the browser download dialog.

```html
<sbb-download href="annual-report.pdf">
  <sbb-download-info size="1234567" changed="2026-12-24"></sbb-download-info>
</sbb-download>
```

The `label` shown as the title defaults to the file name extracted from the `href`,
but can be set explicitly.

It's possible to set the link related properties `href`, `rel` and `target`.

```html
<sbb-download href="files/2026/annual-report.pdf" label="Annual report"></sbb-download>
```

## Icon

An icon is automatically derived from the `href` file extension. The following extensions
are mapped to a dedicated document icon; any other (or missing) extension falls back to the
generic `document-standard-small` icon.

| File extension                                   | Icon                      |
| ------------------------------------------------ | ------------------------- |
| `.pdf`                                           | `document-pdf-small`      |
| `.xls`, `.xlsx`                                  | `document-xls-small`      |
| `.ppt`, `.pptx`                                  | `document-ppt-small`      |
| `.doc`, `.docx`                                  | `document-doc-small`      |
| `.zip`                                           | `document-zip-small`      |
| `.jpg`, `.jpeg`, `.png`, `.gif`, `.svg`, `.webp` | `document-image-small`    |
| _anything else / no extension_                   | `document-standard-small` |

A custom icon can be set with the `iconName` property or via the `icon` slot, which overrides
the automatic derivation.

```html
<sbb-download href="document.pdf" iconName="circle-information-small"></sbb-download>
```

## Content

The content of the unnamed slot and the `<sbb-download-info>` block are both optional and
independent. You can render custom content, a `<sbb-download-info>`, both, or none of them.

A `<sbb-download-info>` placed in the unnamed slot is automatically moved to the dedicated
`info` slot, so it always renders in the correct position. The `<sbb-download-info>` assigns
itself to the `info` slot in its `connectedCallback`, which only runs on the client; during
server-side rendering the element stays in the unnamed slot until it is hydrated.

```html
<sbb-download href="report.pdf" label="Annual report">
  <span>Custom description for the downloadable document.</span>
  <sbb-download-info type="PDF" size="123 KB" changed="2026-12-24"></sbb-download-info>
</sbb-download>
```

## Document metadata

Use the optional `<sbb-download-info>` component to display the document's metadata.
The information is rendered in the order `type`, `size`, non-accessible, `changed`,
skipping any value that has not been provided.

- `type` falls back to the file extension of the parent `sbb-download`.
- `size`, if it contains only digits, is interpreted as a number of bytes and shortened to the
  closest unit (e.g. `1234567` becomes `1 MB`); otherwise it is displayed as is.
- `changed` accepts an ISO 8601 date string and is rendered as a formatted date.
- `nonAccessible` renders a localized "not accessible" hint.

```html
<sbb-download href="report.pdf">
  <sbb-download-info
    type="PDF"
    size="123 KB"
    changed="2026-12-24"
    nonAccessible
  ></sbb-download-info>
</sbb-download>
```

## @sbb-esta/lyne-elements Docs

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-download--docs)
