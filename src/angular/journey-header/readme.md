# Journey Header

The `<sbb-journey-header>` element inherits from the `<sbb-title>` component,
which is used to display the title of the journey.

The component has two required properties, named `origin` and `destination`,
which represents the two ends of the journey.
An icon is placed between them: if the property `roundTrip` is set to false (default),
the icon is an arrow pointing to the `destination`, otherwise it is a double arrow to display the round-trip.

```html
<sbb-journey-header origin="Point A" destination="Point B"></sbb-journey-header>

<sbb-journey-header origin="Point A" destination="Point B" roundTrip></sbb-journey-header>
```

## Style

The component has a `level` property, which is passed to its inner `<sbb-title>` component;
it is rendered as a heading from `h1` to `h6`. Default `level` is `3`.
It also has a `visualLevel` property, which can be used in scenarios
where the visual representation needs to be different from the semantic meaning of the title level.
The default `visualLevel` is `5`.

The component also has a `negative` background variant.

```html
<sbb-journey-header origin="Point A" destination="Point B" visualLevel="4"></sbb-journey-header>

<sbb-journey-header origin="Point A" destination="Point B" level="5"></sbb-journey-header>

<sbb-journey-header origin="Point A" destination="Point B" negative></sbb-journey-header>
```

## Accessibility

The component sets an `aria-label` on its host element which is read by screen readers to provide a description of the journey.

The following example will be read as (locale: EN): `Connection from Point A to Point B.`.

```html
<sbb-journey-header origin="Point A" destination="Point B"></sbb-journey-header>
```

The following one will be read as (locale: EN): `Connection from Point A to Point B and back to Point A.`.

```html
<sbb-journey-header origin="Point A" destination="Point B" roundTrip></sbb-journey-header>
```

## @sbb-esta/lyne-elements Docs

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-journey-header--docs)
