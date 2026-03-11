The `seat-reservation-place-control` is a component that renders a control element for a seat or a bicycle space. Type, status and place test can be defined through properties. Other properties such as dimension and rotation can be defined via style custom properties. The graphic is integrated via [sbb-seat-reservation-graphic](/docs/experimental-sbb-seat-reservation-sbb-seat-reservation-graphic--docs). An event `selectplace` is emitted on click.

```html
<seat-reservation-place-control></seat-reservation-place-control>
```

## Style Custom Properties

| Name                                                    | Type       | Default | Description                 |
| ------------------------------------------------------- | ---------- | ------- | --------------------------- |
| `--sbb-seat-reservation-place-control-width`            | `<number>` | 16      | Place control width         |
| `--sbb-seat-reservation-place-control-height`           | `<number>` | 16      | Place control height        |
| `--sbb-seat-reservation-place-control-rotation`         | `<number>` | 0       | Place control rotation      |
| `--sbb-seat-reservation-place-control-text-rotation`    | `<number>` | 0       | Place control text rotation |
| `--sbb-seat-reservation-place-control-text-scale-value` | `<number>` | 1       | Place control text scaling  |
