The `<sbb-toast>` is a component that can be used to display toast notifications.

It can be shown/dismissed by calling the `open/close` methods.
Only one toast can ever be opened at one time:
if a new `<sbb-toast>` is opened while a previous message is still showing, the older message will be automatically dismissed.

```html
<sbb-button onclick="document.querySelector('sbb-toast').open()">Open toast</sbb-button>
<sbb-toast>Toast content</sbb-toast>
```

<!-- #region override intro-end -->

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

<!-- #endregion -->

## Important note

You should carefully consider every use of the `<sbb-toast>` component since it can be a source of
stress for people with visual impairments (see the ["Accessibility"](#accessibility) section for more info).

Here are a few tips for correct usage:

- Try to avoid actions inside a `<sbb-toast>` since they are not easily reachable;
- If an action is needed, you should provide an alternative way to perform it;
- If not strictly necessary, use the `polite` (_default_) configuration since it is less aggressive for screen-reader users.

## Slots

It is possible to provide a text via an unnamed slot; the component can optionally display a `<sbb-icon>`
at the component start using the `iconName` property or via custom content using the `icon` slot.

```html
<sbb-button onclick="document.querySelector('sbb-toast').open()">Open toast</sbb-button>
<sbb-toast iconName="dog-small">Toast content</sbb-toast>
```

A `<sbb-toast>` can also be given a custom action that, if marked with the `sbb-toast-close` attribute, will also dismiss it.

```html
<sbb-button onclick="document.querySelector('sbb-toast').open()">Open toast</sbb-button>
<sbb-toast position="bottom-left">
  Toast content
  <!-- Toast action can be a button -->
  <sbb-transparent-button
    slot="action"
    iconName="clock-small"
    sbb-toast-close
  ></sbb-transparent-button>
  <!-- Or a link -->
  <sbb-link-button slot="action">Link action</sbb-link-button>
</sbb-toast>
```

## Style

If the `readOnly` property (attribute `readonly`) is set to true, the close button is hidden.
The time before the component automatically closes can be set with the `timeout` property (in milliseconds,
default is 0, which is equal to never closing automatically).

The position on the page where the toast will be opened can be configured with the `position` property,
which accepts all the combinations of the vertical positions `top` and `bottom`
with the horizontal positions `left`, `start`, `center`, `right` and `end` (default: `bottom-center`).

```html
<sbb-button onclick="document.querySelector('sbb-toast').open()">Open toast bottom left</sbb-button>
<sbb-toast position="bottom-left">Toast content</sbb-toast>

<sbb-button onclick="document.querySelector('sbb-toast#top-center').open()">
  Open toast top center with timeout
</sbb-button>
<sbb-toast position="top-center" timeout="20000" id="top-center">Toast content</sbb-toast>
```

## Accessibility

The `<sbb-toast>` announces messages via an aria-live region.
Use the `politeness` property to customize the politeness announcement behavior.
Check [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#live_regions) for further info.

The `<sbb-toast>` does not move focus to the toast element, because it would disrupt users in the middle of a workflow.

For any action offered in the `<sbb-toast>`, your application should provide an alternative way to perform the action
(e.g. a keyboard combination).

Avoid setting a `timeout` for toasts that have an action available,
as screen reader users may want to navigate to the toast element to activate the action.

### Known issue

Slotted text is not interpreted correctly by screen readers on Chrome.
To address the problem, the component will automatically wrap any slotted text in a `span` element.
Unless strictly necessary, we advise you not to wrap it preventively and let the component do it for you.

```html
<sbb-toast position="bottom-left">
  <!-- This text would not be read on Chrome -->
  Free text node
</sbb-toast>

<sbb-toast position="bottom-left">
  <span>Toast content</span>
  <!-- This is OK! -->
</sbb-toast>
```
