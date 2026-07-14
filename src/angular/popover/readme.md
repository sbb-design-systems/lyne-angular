# Popover

The `<sbb-popover>` component can be useful for displaying contextual and additional information on mouse hover or click of a trigger element.

The component could be used:

- to describe icons and buttons;
- when more information is useful to help a user make decisions;
- when an element needs more context or explanation;
- when defining a term or inline item.

<!-- #region override trigger -->

The component can be connected with the trigger element using the `SbbPopoverTrigger` directive.

```html
<sbb-mini-button iconName="circle-information-small" [sbbPopover]="popover"></sbb-mini-button>

<sbb-popover #popover="sbbPopover">
  <sbb-popover-close-button></sbb-popover-close-button>
  <sbb-title level="2" visualLevel="6" style="margin-block-start: 0">Popover Title.</sbb-title>
  <p>Popover content.</p>
</sbb-popover>
```

<!-- #endregion -->

## Configuration

The open and close delays can be configured via global configuration. This values will be used as default, unless explicitly set on the element.

```ts
import { mergeConfig } from '@sbb-esta/lyne-elements/core.js';

mergeConfig({
  popover: {
    openDelay: 0, // ms before the popover opens
    closeDelay: 0, // ms before the popover closes
  },
});
```

## Interactions

The `<sbb-popover>` can be dismissed by clicking on an interactive element within its content,
by clicking on the close button or by performing another action on the page.

You can also indicate that an element within the popover content should close the `<sbb-popover>` when clicked
by marking it with the `sbb-popover-close` attribute.
To display a close button, place the `<sbb-popover-close-button>` inside the popover.
For accessibility reasons, the close button should be the first focusable element in the popover,
so it is recommended to place it at the beginning of the content.

```html
<sbb-popover>
  <sbb-popover-close-button></sbb-popover-close-button>
  <sbb-title level="2" visualLevel="6" style="margin-block-start: 0">Popover Title.</sbb-title>
  <p>Popover content. <sbbLink sbb-popover-close>Link</sbb-link></p>
</sbb-popover>
```

You can also indicate that the `<sbb-popover>` should be shown on hover with the property `hoverTrigger`
and set a custom delay for the open and close animations (defaults to 0).
When using `hoverTrigger`, it is the consumer's responsibility to omit the `<sbb-popover-close-button>`,
as a close button is not appropriate in hover-triggered popovers.

If hover is not supported by the current device, the component will be triggered on click/tap as default.
The `<sbb-popover>` will automatically disappear after the hiding delay
if neither the trigger element nor the popover are on hover or if another action is performed on the page.

```html
<sbb-popover hoverTrigger openDelay="500" closeDelay="750">
  <sbb-title level="2" visualLevel="6" style="margin-block-start: 0">Popover Title.</sbb-title>
  <p id="popover-content">Popover content. <sbb-link id="popover-link">Link</sbb-link></p>
</sbb-popover>
```

## Style

The `<sbb-popover>` automatically calculates where it should place itself, based on available space. Default is below and center.

## Accessibility

As the popover opens, the focus will automatically be set to the first focusable item within the component.
If the close button is not hidden, it's the first element and therefore gets focused (unless manually specified, see below).

Overlays should always contain a heading level 2 title. It can be visually hidden if necessary.

### Controlling initial focus

The first element with the attribute `sbb-focus-initial` will receive focus on opening.
If the attribute is not used, the first focusable element receives focus (recommended).

```html
<sbb-popover>
  <sbb-link href="#">Link</sbb-link>
  <sbb-link sbb-focus-initial href="#">Link 2</sbb-link>
</sbb-popover>
```

## @sbb-esta/lyne-elements Docs

[Link to related @sbb-esta/lyne-elements docs](https://lyne-elements.app.sbb.ch/?path=/docs/elements-popover--docs)
