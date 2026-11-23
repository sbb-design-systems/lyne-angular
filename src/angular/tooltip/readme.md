# Tooltip

The `<sbb-tooltip>` component displays contextual information related to an element.

<!-- #region override trigger -->

The trigger can be connected via the `SbbTooltipTrigger` directive.

```html
<sbb-button [sbbTooltip]="tooltip">Button</sbb-button>
<sbb-tooltip #tooltip="sbbTooltip">Tooltip message</sbb-tooltip>
```

<!-- #endregion -->

## Attribute usage

It's also possible to use the component by setting the `sbb-tooltip` attribute on the trigger element.  
The attribute's value is the tooltip's rendered message
(_Note: it does not work if used in a Shadow DOM_).

```html
<sbb-button sbb-tooltip="Tooltip message">Button</sbb-button>
```

If the component is used this way, it's also possible to set the open and close delays
using the `sbb-tooltip-open-delay` and the `sbb-tooltip-close-delay` attributes.

```html
<sbb-button
  sbb-tooltip="Tooltip message"
  sbb-tooltip-open-delay="250"
  sbb-tooltip-close-delay="250"
>
  Button
</sbb-button>
```

To disable the tooltip, you can set the `sbb-tooltip-disabled` attribute on the trigger element.
When disabled, the tooltip will not open.

```html
<sbb-button sbb-tooltip="Tooltip message" sbb-tooltip-disabled>Button</sbb-button>
```

## Interactions

The tooltip opens when the user hovers the trigger element and closes on mouse leave. A delay can be optionally set, both on open and close actions.

On touch devices, the tooltip opens on long press and closes automatically after a `longPressCloseDelay` (default: 1500 ms).

## Positioning

The tooltip uses the [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using) to anchor itself to the trigger element.
Specifically, it uses the "[position-area](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using#setting_a_position-area)"
and "[position-try-fallbacks](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Try_options_hiding#using_position-area_try_fallback_options)" CSS properties to define where the tooltip should be positioned.

By default, the tooltip appears above the trigger element and, if there is insufficient space, it automatically chooses the best available position.

You can control the positioning of the tooltip with the `positions` property.
The first entry is used as primary position, the following entries as fallbacks.

The attribute accepts a comma-separated list, the property accepts either a comma-separated string or an array.

```html
<sbb-tooltip trigger="trigger-id" positions="block-end, block-start, inline-end">
  Tooltip
</sbb-tooltip>
```

Alternatively, you can override the `--sbb-overlay-position-area` and `--sbb-overlay-position-try-fallbacks` CSS variables.
These are used if the `positions` property is not set.

```scss
// Primary position
--sbb-overlay-position-area: block-start;

// Fallback positions. The first one that fits will be used.
--sbb-overlay-position-try-fallbacks:
  block-start span-inline-end, block-start span-inline-start, block-end, block-end span-inline-end,
  block-end span-inline-start;
```

> ⓘ The CSS anchor positioning feature is not yet fully [supported](https://caniuse.com/css-anchor-positioning) by all browsers.
>
> Therefore, a polyfill is used which limits the available positions to the following:
>
> | Logical positions               | Physical positions  |
> | ------------------------------- | ------------------- |
> | `block-start`                   | `top`               |
> | `block-end`                     | `bottom`            |
> | `inline-start`                  | `left`              |
> | `inline-end`                    | `right`             |
> | `block-start span-inline-start` | `top span-left`     |
> | `block-start span-inline-end`   | `top span-right`    |
> | `block-end span-inline-start`   | `bottom span-left`  |
> | `block-end span-inline-end`     | `bottom span-right` |
> | `inline-start span-block-start` | `left span-top`     |
> | `inline-start span-block-end`   | `left span-bottom`  |
> | `inline-end span-block-start`   | `right span-top`    |
> | `inline-end span-block-end`     | `right span-bottom` |

### Attribute usage

When using the `sbb-tooltip` attribute, you can configure the position by setting the `sbb-tooltip-positions` attribute on the trigger element.
The value of the attribute is a comma-separated list of positions and is applied to the `positions` property of the created tooltip.

```html
<sbb-button
  sbb-tooltip="Tooltip message"
  sbb-tooltip-positions="block-end, block-start, inline-end"
>
  Button
</sbb-button>
```

## Configuration

The open and close delays can be configured via global configuration. These values will be used as default, unless explicitly set on the element.

```ts
import { mergeConfig } from '@sbb-esta/lyne-elements/core.js';

mergeConfig({
  tooltip: {
    openDelay: 0, // Delay before the tooltip opens (in ms)
    closeDelay: 0, // Delay before the tooltip closes (in ms)
    longPressCloseDelay: 1500, // Duration before the tooltip auto-closes after a long press (in ms)
  },
});
```

## Accessibility

The `<sbb-tooltip>` adds an `ariaDescribedby` reference to an element containing the tooltip's message.
If the tooltip is disabled, the reference is removed.

Avoid interactions that exclusively show a tooltip with pointer events like click and mouseenter.
Always ensure that keyboard users can perform the same set of actions available to mouse and touch users.

## Docs on @sbb-esta/lyne-elements

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-tooltip--docs)
