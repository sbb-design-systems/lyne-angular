This component is the layout container for the disruption map, the level 3 navigation and the future ATLAS.

## Slots

It provides two slots: one unnamed slot for the sidebar content, and one named `map` for the map.

```html
<sbb-map-container>
  <div>Content</div>
  <div slot="map">Here comes the map.</div>
</sbb-map-container>
```

On mobile, the map is sticky above the sidebar, and the sidebar content is scrolling over the map.
On desktop, the sidebar and the map are shown in a two column layout side by side.
