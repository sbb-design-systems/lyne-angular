### Creating toasts with SbbToastService

The `SbbToastService` service can be used to open `SbbToast`s programmatically.

A toast is opened by calling the `open` method with either a component or a template to be loaded, and an optional
config object. The `open` method will return an instance of `SbbToastRef`:

#### Component

```ts
const toastService = inject(SbbToastService);
let toastRef = toastService.open(UserProfileComponent, {
  // config options
});
```

#### Template

```ts
@ViewChild('template') templateContent!: TemplateRef<unknown>;

const toastService = inject(SbbToastService);
let toastRef = toastService.open(templateContent, {
  // config options
});
```

The `SbbToastRef` provides a handle on the opened toast. It can be used to close the toast and to
receive notifications when the toast state changes (`afterOpened`, `beforeClosed`, `afterClosed`).

```ts
toastRef.close();
```

Components created via `SbbToastService` can _inject_ `SbbToastRef` and use it to close the toast
in which they are contained.

```ts
@Component({
  /* ... */
})
export class YourToast {
  toastRef = inject(SbbToastRef);

  closeToast() {
    this.toastRef.close();
  }
}
```

### Configure your toast

If you want to set any properties on the `SbbToast` component, you can use the `setupContainer` function in the configuration object.

```ts
@Component({
  /* ... */
})
export class ParentComponent {
  toastService = inject(SbbToastService);

  openToast() {
    let toastRef = toast.open(YourToast, {
      setupContainer: (toast: SbbToast) => {
        toast.position = 'top-left';
        /* ... */
      },
    });
  }
}
```

### Sharing data with the slotted component.

If you want to share data with the component rendered in your toast, you can use the `data` property in the configuration object.

```ts
@Component({
  /* ... */
})
export class ParentComponent {
  toastService = inject(SbbToastService);

  openToast() {
    let toastRef = toast.open(YourToast, {
      data: { name: 'bern' },
    });
  }
}

@Component({
  selector: 'your-toast',
  template: 'passed in {{ data.name }}',
})
export class YourToast {
  toastData = inject<{ name: string }>(SBB_OVERLAY_DATA);
}
```

### Sharing data with the slotted template.

If you want to share data with the component rendered in your toast, you can use the `templateContext` property in the configuration object.

```ts
@Component({
  selector: 'parent-component',
  template: '<ng-template #template let-text>{{ text }}</ng-template>',
})
export class ParentComponent {
  @ViewChild('template') templateContent!: TemplateRef<unknown>;
  toastService = inject(SbbToastService);

  openToast() {
    let toastRef = toast.open(templateContent, {
      templateContext: { $implicit: 'bern' },
    });
  }
}
```
