The `<sbb-tooltip>` component displays contextual information related to an element.

The standard way to use it is through the `trigger` property, referencing the element which activate the tooltip.

```html
<sbb-button id="tooltip-trigger">Button</sbb-button>
<sbb-tooltip trigger="tooltip-trigger">Tooltip message</sbb-tooltip>
```

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
<sbb-button sbb-tooltip="Tooltip message" sbb-tooltip-open-delay="250" sbb-tooltip-close-delay="250"
  >Button</sbb-button
>
```

## Interactions

The tooltip opens when the user hovers the trigger element and closes on mouse leave. A delay can be optionally set, both on open and close actions.

On touch devices, the tooltip opens on long press and closes automatically after a `longPressCloseDelay` (default: 1500 ms).

## Positioning

The tooltip uses the [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using) to anchor itself to the trigger element.
Specifically, it uses the "[position-area](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using#setting_a_position-area)"
and "[position-try-fallbacks](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Try_options_hiding#using_position-area_try_fallback_options)" CSS properties to define where the tooltip should be positioned.

You can control the positioning of the tooltip by overriding the `--sbb-overlay-position-area` and `--sbb-overlay-position-try-fallbacks` CSS variables.
By default, it appears above the trigger element and, if there is insufficient space, it automatically chooses the best available position.

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

When using the `sbb-tooltip` attribute, you can configure the position by setting the `sbb-tooltip-position` attribute.
The value of the attribute is a comma-separated list of positions.

```html
<sbb-button sbb-tooltip="Tooltip message" sbbTooltipPosition="block-end, block-start, inline-end"
  >Button</sbb-button
>
```

## Configuration

The open and close delays can be configured via global configuration. These values will be used as default, unless explicitly set on the element.

```ts
import { mergeConfig } from '@sbb-esta/lyne-elements/core/config.js';

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

Avoid interactions that exclusively show a tooltip with pointer events like click and mouseenter.
Always ensure that keyboard users can perform the same set of actions available to mouse and touch users.
