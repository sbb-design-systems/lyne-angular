The `<sbb-overlay>` component provides a way to present content on top of the app's content,
and it's similar to the [sbb-dialog](/docs/elements-dialog--docs).
It offers the following features:

- disables scrolling of the page content while open;
- manages focus properly by setting it on the first focusable element;
- has a close button, which is always visible;
- adds the appropriate ARIA roles automatically.

```html
<sbb-overlay id="my-overlay">
  <p>Overlay content.</p>
</sbb-overlay>
```

<!-- #region override intro-end -->

The `SbbOverlayService` service can be used to open `SbbOverlay`s programmatically.

A overlay is opened by calling the `open` method with either a component or a template to be loaded, and an optional
config object. The `open` method will return an instance of `SbbOverlayRef`:

#### Component

```ts
const overlayService = inject(SbbOverlayService);
type OverlayResult = { confirmed: boolean };

let overlayRef = overlayService.open<UserProfileComponent, OverlayResult>(UserProfileComponent, {
  // config options
});
```

#### Template

```ts
@ViewChild('template') templateContent!: TemplateRef<unknown>;

const overlayService = inject(SbbOverlayService);
let overlayRef = overlayService.open(templateContent, {
  // config options
});
```

The `SbbOverlayRef` provides a handle on the opened overlay. It can be used to close the overlay and to
receive notifications when the overlay state changes (`afterOpened`, `beforeClosed`, `afterClosed`).
When closing, an optional result value can be provided. This result value is forwarded as the result of the `afterClosed` Observable.

```ts
overlayRef.afterClosed.subscribe((event) => {
  console.log(`Overlay result: ${event.result}`); // Pizza!
});

overlayRef.close('Pizza!');
```

Components created via `SbbOverlayService` can _inject_ `SbbOverlayRef` and use it to close the overlay in which they are contained.

```ts
@Component({
  /* ... */
})
export class YourOverlay {
  overlayRef = inject(SbbOverlayRef);

  closeOverlay() {
    this.overlayRef.close('Pizza!');
  }
}
```

Alternatively, you can use the `sbb-overlay-close` directive to close the overlay without explicitly injecting `SbbOverlayRef`.
The directive can be applied to any element (e.g., an `<sbb-button>`) and will automatically close the overlay when clicked:

```ts
@Component({
  selector: 'your-overlay',
  template: `
    <sbb-overlay>
      <sbb-secondary-button sbb-overlay-close>Cancel</sbb-secondary-button>
      <sbb-button [sbb-overlay-close]="result">Confirm</sbb-button
    </sbb-overlay>
  `,
})
export class YourOverlay {
  result = { confirmed: true };
}
```

You can optionally pass a value to the directive, which will be returned as the overlay result:

```html
<!-- Close overlay without result -->
<sbb-secondary-button sbb-overlay-close>Cancel</sbb-secondary-button>

<!-- Close overlay with static value -->
<sbb-button sbb-overlay-close="cancelled">Cancel</sbb-button>

<!-- Close overlay with dynamic value -->
<sbb-button [sbbOverlayClose]="data">Save</sbb-button>
```

The passed value will be available through the `afterClosed` Observable:

```ts
type OverlayResult = 'cancelled' | { confirmed: true };

const overlayRef = overlayService.open<YourOverlay, OverlayResult>(YourOverlay);

overlayRef.afterClosed.subscribe((event) => {
  console.log(`Overlay result: ${event.result}`);
});
```

### Configure your overlay

If you want to set any properties on the `SbbOverlay` component, you can use the `setupContainer` function in the configuration object.

```ts
@Component({
  /* ... */
})
export class ParentComponent {
  overlayService = inject(SbbOverlayService);

  openOverlay() {
    let overlayRef = overlay.open(YourOverlay, {
      setupContainer: (overlay: SbbOverlay) => {
        overlay.negative = true;
        /* ... */
      },
    });
  }
}
```

### Sharing data with the slotted component.

If you want to share data with the component rendered in your overlay, you can use the `data` property in the configuration object.

```ts
@Component({
  /* ... */
})
export class ParentComponent {
  overlayService = inject(SbbOverlayService);

  openOverlay() {
    let overlayRef = overlay.open(YourOverlay, {
      data: { name: 'bern' },
    });
  }
}

@Component({
  selector: 'your-overlay',
  template: 'passed in {{ data.name }}',
})
export class YourOverlay {
  overlayData = inject<{ name: string }>(SBB_OVERLAY_DATA);
}
```

### Sharing data with the slotted template.

If you want to share data with the component rendered in your overlay, you can use the `templateContext` property in the configuration object.

```ts
@Component({
  selector: 'parent-component',
  template: '<ng-template #template let-text>{{ text }}</ng-template>',
})
export class ParentComponent {
  @ViewChild('template') templateContent!: TemplateRef<unknown>;
  overlayService = inject(SbbOverlayService);

  openOverlay() {
    let overlayRef = overlay.open(templateContent, {
      templateContext: { $implicit: 'bern' },
    });
  }
}
```

<!-- #endregion -->

## Slots

There is only one unnamed slot to provide the overlay content.

## Style

Setting the `expanded` property will cause the `<sbb-overlay>` component to take up the full width of the page.

It's possible to display the component in `negative` variant using the self-named property.

```html
<sbb-overlay negative>
  <p>Overlay content.</p>
</sbb-overlay>
```

## Interactions

In order to show the overlay, you need to provide a trigger or call the `open()` method on the `<sbb-overlay>` component.

```html
<sbb-button id="overlay-trigger">Open overlay</sbb-button>

<sbb-overlay trigger="overlay-trigger">
  <p>Overlay content.</p>
</sbb-overlay>
```

### Closing the overlay

The overlay can be closed in several ways:

1. **Close button**: The overlay has a built-in close button that is always visible.

2. **sbb-overlay-close attribute**: Add the `sbb-overlay-close` attribute to any element within the overlay
   to close it when clicked. You can optionally provide a result value:

   ```html
   <sbb-overlay>
     <p>Overlay content.</p>
     <sbb-button sbb-overlay-close="cancel">Cancel</sbb-button>
     <sbb-button sbb-overlay-close="confirm">Confirm</sbb-button>
   </sbb-overlay>
   ```

   Alternatively, you can use the `assignOverlayResult()` helper to programmatically assign a complex result to an element:

   ```js
   import { assignOverlayResult } from '@sbb-esta/lyne-elements/overlay.js';

   const confirmButton = document.querySelector('sbb-button');
   assignOverlayResult(confirmButton, { action: 'confirm', otherProp: 'any value' });
   ```

3. **Escape key**: Pressing the `Esc` key will close the overlay.

4. **Programmatically**: Call the `close(result?: any)` method on the `<sbb-overlay>` element.
   This method closes the overlay and emits `beforeclose` and `close` events with the provided result as a payload.

   ```js
   const overlay = document.querySelector('sbb-overlay');
   overlay.close({ confirmed: true });
   ```

### Handling close events

When the overlay closes, it emits two events:

- `beforeclose`: Emitted before the closing transition begins. This event is cancelable by calling `event.preventDefault()`.
- `close`: Emitted after the overlay has fully closed.

Both events are of type `SbbOverlayCloseEvent` and provide access to:

- `result`: The result value passed to `close()`, assigned via `assignOverlayResult()`, or the value of the `sbb-overlay-close` attribute
- `closeTarget`: The element that triggered the close action (e.g., the clicked button), or `null` if closed programmatically or via Escape key

```js
overlay.addEventListener('close', (event) => {
  console.log('Result:', event.result);
  console.log('Close target:', event.closeTarget);
});
```

## Accessibility

### Controlling initial focus

The first element with the attribute `sbb-focus-initial` will receive focus on opening.
If the attribute is not used, the first focusable element receives focus.

### Focus restoration

When closed, the overlay restores focus to the element that previously held focus when the
overlay opened by default. However, focus restoration can be disabled
by setting the `skipFocusRestoration` property to `true`.
As this is an accessibility feature, it is recommended to focus
an alternative element by listening to the `didClose` event.
