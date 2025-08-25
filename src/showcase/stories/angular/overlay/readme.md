### Creating overlays with SbbOverlayService

The `SbbOverlayService` service can be used to open `SbbOverlay`s programmatically.

A overlay is opened by calling the `open` method with either a component or a template to be loaded, and an optional
config object. The `open` method will return an instance of `SbbOverlayRef`:

#### Component

```ts
const overlayService = inject(SbbOverlayService);
let overlayRef = overlayService.open(UserProfileComponent, {
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
overlayRef.afterClosed().subscribe((result) => {
  console.log(`Overlay result: ${result}`); // Pizza!
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
