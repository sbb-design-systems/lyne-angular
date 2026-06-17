# Train

The train module contains components to visualize train formations in a timetable context.
It is divided into the following components:

```html
<sbb-train-formation>
  <sbb-train>
    <sbb-train-wagon></sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
  </sbb-train>
</sbb-train-formation>
```

- The **`<sbb-train-formation>`** is a container for one or more `<sbb-train>` components.
  It ensures orchestration of the contained `<sbb-train>` components and provides a common context
  for them, such as the perspective of the train (side or top view), the orientation (horizontal or vertical) and inline padding.
- The **`<sbb-train>`** is a container for one or more `<sbb-train-wagon>`, `<sbb-train-wagon-button>`, `<sbb-train-wagon-link>` or `<sbb-train-blocked-passage>` component.
  It provides the context for the contained components, such as the direction of the train and the station label.
- The **`<sbb-train-wagon>`** , **`<sbb-train-wagon-button>`** and **`<sbb-train-wagon-link>`** are components which represents a train compartment.
- The **`<sbb-train-blocked-passage>`** is a component which visually displays a blocked passage between two wagon components.

## sbb-train-formation

```html
<sbb-train-formation>
  <sbb-train
    directionLabel="Direction of travel"
    station="Bern"
    direction="left"
    accessibilityLabel="The top of the train is in Sector A. The train leaves the station in this direction"
  >
    <sbb-train-wagon
      sector="A"
      wagonType="locomotive"
      additionalAccessibilityText="Top of the train"
    ></sbb-train-wagon>
    <sbb-train-wagon sector="A" wagonType="closed"> </sbb-train-wagon>
    <sbb-train-blocked-passage></sbb-train-blocked-passage>
    <sbb-train-wagon
      sector="A"
      wagonType="wagon"
      label="38"
      occupancy="low"
      wagonClass="1"
      blockedPassage="previous"
    >
      <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
      <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
      <sbb-icon
        aria-hidden="false"
        aria-label="Business zone in 1st class: Reservation possible"
        name="sa-bz"
      ></sbb-icon>
    </sbb-train-wagon>
    ...
  </sbb-train>
  <sbb-train
    directionLabel="Direction of travel"
    station="Luzern"
    direction="left"
    accessibilityLabel="The top of the train is in Sector E. The train leaves the station in this direction"
  >
    ...
  </sbb-train>
</sbb-train-formation>
```

### View

The perspective of the train can be switched with the `view` property between `side` (default) and `top`.

### Orientation

The orientation of the train can be switched with the `orientation` property between `horizontal` (default) and `vertical`.

### Scroll padding

In certain circumstances there should be a left and right (or top and bottom in vertical orientation)
padding applied, while drawing the scrollbar to the end of the box. To achieve the padding, set a value to the
CSS variable `--sbb-train-formation-scroll-padding` like `var(--sbb-spacing-fixed-4x)`.

## sbb-train

```html
<sbb-train
  directionLabel="driving direction"
  directionLabelLevel="3"
  station="Genève-Aéroport"
  direction="left"
  accessibilityLabel="The top of the train is in Sector A. The train leaves the station in this direction"
>
  ...
</sbb-train>
```

The `station` property is used to set the destination label of the train, which is displayed in the
top left corner of the component. The `direction` property indicates the direction of the train,
which can be either `left` (default) or `right`.
The direction label and the level of its heading tag are set, respectively,
with the property `directionLabel` and `directionLabelLevel`.

The `accessibility-label` property should be used to give further information about the leaving direction of the `<sbb-train>`.
It should refer to the section where the locomotive is placed.

## sbb-train-wagon

### Variants

With the `wagonType` property the component can visualize different types of wagons and locomotives.
For the wagon types `wagon-end-left` and `wagon-end-right`, the blocked passage information is set automatically.

```html
<sbb-train-wagon wagonType="wagon"></sbb-train-wagon>
<sbb-train-wagon wagonType="wagon-end-left"></sbb-train-wagon>
<sbb-train-wagon wagonType="wagon-end-right"></sbb-train-wagon>
<sbb-train-wagon wagonType="couchette"></sbb-train-wagon>
<sbb-train-wagon wagonType="sleeping"></sbb-train-wagon>
<sbb-train-wagon wagonType="restaurant"></sbb-train-wagon>
<sbb-train-wagon wagonType="locomotive"></sbb-train-wagon>
<sbb-train-wagon wagonType="closed"></sbb-train-wagon>
```

The property `occupancy` sets the component's inner icon; available values are `high`, `medium`, `low`, `none` and `null`;
it's also possible to display the wagon class at component's end using the `wagonClass` property
and a wagon number (property `label`) above the component.

```html
<sbb-train-wagon wagonType="wagon" label="38" occupancy="low" wagonClass="1"></sbb-train-wagon>
```

**Note:**
An `<sbb-train-wagon>` with `wagon-type="wagon"` has the possibilities of slotting attribute icons.
They will be applied internally into a list (using `<ul>` and `<li>`) and requires an `aria-label` for each slotted icon.

```html
<sbb-train-wagon wagonType="wagon">
  <sbb-icon aria-hidden="false" aria-label="wheelchair space" name="sa-rs"></sbb-icon>
  <sbb-icon aria-hidden="false" aria-label="low-floor entry" name="sa-nf"></sbb-icon>
  <sbb-icon
    aria-hidden="false"
    aria-label="Business zone in 1st class: Reservation possible"
    name="sa-bz"
  ></sbb-icon>
</sbb-train-wagon>
```

### Button and link variants

In addition to the standard `<sbb-train-wagon>`, two interactive variants are available:

- **`<sbb-train-wagon-button>`** renders the wagon as a button element, making it actionable.
- **`<sbb-train-wagon-link>`** renders the wagon as an anchor element, allowing navigation.

```html
<!-- Button variant -->
<sbb-train-wagon-button wagonType="wagon" label="38" occupancy="low" wagonClass="1">
  <sbb-icon
    aria-hidden="false"
    aria-label="wheelchair space"
    name="sa-rs"
    aria-label="Wheelchair space available in this wagon"
  ></sbb-icon>
</sbb-train-wagon-button>

<!-- Link variant -->
<sbb-train-wagon-link
  href="/reserve/38"
  wagonType="wagon"
  label="38"
  occupancy="low"
  wagonClass="1"
>
  <sbb-icon
    aria-hidden="false"
    aria-label="wheelchair space"
    name="sa-rs"
    aria-label="Wheelchair space available in this wagon"
  ></sbb-icon>
</sbb-train-wagon-link>
```

### Active state

To indicate an active wagon, apply the CSS class `sbb-active` to the `<sbb-train-wagon>`,
`<sbb-train-wagon-button>` or `<sbb-train-wagon-link>` element.
This will visually highlight the wagon with a thicker border.

```html
<sbb-train-wagon class="sbb-active" wagonType="wagon" label="38" occupancy="low"></sbb-train-wagon>
```

## @sbb-esta/lyne-elements Docs

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-train--docs)
