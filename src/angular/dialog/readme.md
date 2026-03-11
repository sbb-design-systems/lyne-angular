The `<sbb-dialog>` component provides a way to present content on top of the app's content mainly to
interact with the user.

The component creates a backdrop to prevent interaction with content behind the modal, disables page
scrolling while open, manages focus by setting it to the first focusable element, and automatically
adds the appropriate ARIA roles.

The dialog should always consist of a title and content. Optionally, a close button and actions can
be provided.

```html
<sbb-dialog>
  <sbb-dialog-title>Title</sbb-dialog-title>
  <sbb-dialog-content>Dialog content.</sbb-dialog-content>
</sbb-dialog>
```

The component supports slotting the `<sbb-dialog-title>`, `<sbb-dialog-close-button>`, `<sbb-dialog-content>`
and an `<sbb-dialog-actions>` elements for structuring the content of a dialog..

```html
<sbb-dialog>
  <sbb-dialog-title>Title</sbb-dialog-title>
  <sbb-dialog-close-button></sbb-dialog-close-button>
  <sbb-dialog-content>Dialog content.</sbb-dialog-content>
  <sbb-dialog-actions>
    <sbb-secondary-button sbb-dialog-close>Cancel</sbb-secondary-button>
    <sbb-button sbb-dialog-close sbb-focus-initial>Confirm</sbb-button>
  </sbb-dialog-actions>
</sbb-dialog>
```

<!-- #region override intro-end -->

The `SbbDialogService` service can be used to open `SbbDialog`s programmatically.

A dialog is opened by calling the `open` method with either a component or a template to be loaded, and an optional
config object. The `open` method will return an instance of `SbbDialogRef`:

#### Component

```ts
const dialogService = inject(SbbDialogService);
type DialogResult = { confirmed: boolean };

let dialogRef = dialogService.open<UserProfileComponent, DialogResult>(UserProfileComponent, {
  // config options
});
```

#### Template

```ts
@ViewChild('template') templateContent!: TemplateRef<unknown>;

const dialogService = inject(SbbDialogService);
let dialogRef = dialogService.open(templateContent, {
  // config options
});
```

The `SbbDialogRef` provides a handle on the opened dialog. It can be used to close the dialog and to
receive notifications when the dialog state changes (`afterOpened`, `beforeClosed`, `afterClosed`).
When closing, an optional result value can be provided. This result value is forwarded as the result of the `afterClosed` Observable.

```ts
dialogRef.afterClosed.subscribe((event) => {
  console.log(`Dialog result: ${event.result}`); // Pizza!
});

dialogRef.close('Pizza!');
```

Components created via `SbbDialogService` can _inject_ `SbbDialogRef` and use it to close the dialog
in which they are contained.

```ts
@Component({
  /* ... */
})
export class YourDialog {
  dialogRef = inject(SbbDialogRef);

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
```

Alternatively, you can use the `sbb-dialog-close` directive to close the dialog without explicitly injecting `SbbDialogRef`.
The directive can be applied to any element (e.g., an `<sbb-button>`) and will automatically close the dialog when clicked:

```ts
@Component({
  selector: 'your-dialog',
  template: `
    <sbb-dialog>
      <sbb-dialog-title>Confirmation</sbb-dialog-title>
      <sbb-dialog-content>
        <p>Are you sure you want to proceed?</p>
      </sbb-dialog-content>
      <sbb-dialog-actions>
        <sbb-secondary-button sbb-dialog-close>Cancel</sbb-secondary-button>
        <sbb-button [sbb-dialog-close]="result">Confirm</sbb-button>
      </sbb-dialog-actions>
    </sbb-dialog>
  `,
})
export class YourDialog {
  result = { confirmed: true };
}
```

You can optionally pass a value to the directive, which will be returned as the dialog result:

```html
<!-- Close dialog without result -->
<sbb-secondary-button sbb-dialog-close>Cancel</sbb-secondary-button>

<!-- Close dialog with static value -->
<sbb-button sbb-dialog-close="cancelled">Cancel</sbb-button>

<!-- Close dialog with dynamic value -->
<sbb-button [sbb-dialog-close]="data">Save</sbb-button>
```

The passed value will be available through the `afterClosed` Observable:

```ts
type DialogResult = 'cancelled' | { confirmed: true };

const dialogRef = dialogService.open<YourDialog, DialogResult>(YourDialog);

dialogRef.afterClosed.subscribe((event) => {
  console.log(`Dialog result: ${event.result}`);
});
```

### Configure your dialog

If you want to set any properties on the `SbbDialog` component, you can use the `setupContainer` function in the configuration object.

```ts
@Component({
  /* ... */
})
export class ParentComponent {
  dialogService = inject(SbbDialogService);

  openDialog() {
    let dialogRef = dialog.open(YourDialog, {
      setupContainer: (dialog: SbbDialog) => {
        dialog.negative = true;
        dialog.backdropAction = 'none';
        /* ... */
      },
    });
  }
}
```

### Sharing data with the slotted component.

If you want to share data with the component rendered in your dialog, you can use the `data` property in the configuration object.

```ts
@Component({
  /* ... */
})
export class ParentComponent {
  dialogService = inject(SbbDialogService);

  openDialog() {
    let dialogRef = dialog.open(YourDialog, {
      data: { name: 'bern' },
    });
  }
}

@Component({
  selector: 'your-dialog',
  template: 'passed in {{ data.name }}',
})
export class YourDialog {
  dialogData = inject<{ name: string }>(SBB_OVERLAY_DATA);
}
```

### Sharing data with the slotted template.

If you want to share data with the component rendered in your dialog, you can use the `templateContext` property in the configuration object.

```ts
@Component({
  selector: 'parent-component',
  template: '<ng-template #template let-text>{{ text }}</ng-template>',
})
export class ParentComponent {
  @ViewChild('template') templateContent!: TemplateRef<unknown>;
  dialogService = inject(SbbDialogService);

  openDialog() {
    let dialogRef = dialog.open(templateContent, {
      templateContext: { $implicit: 'bern' },
    });
  }
}
```

<!-- #endregion -->

## Title

The `<sbb-dialog-title>` component extends the [sbb-title](/docs/elements-title--docs) component.
It should be used as a title for a dialog.

```html
<sbb-dialog>
  <sbb-dialog-title>A describing title of the dialog</sbb-dialog-title>
</sbb-dialog>
```

### States

The title can have a `negative` state which is automatically synchronized with the negative state of the dialog.

### Style

In scenarios where the visual representation needs to be different from the semantic meaning of the title level,
it is possible to use the `visualLevel` property (default value: `4`).

## Actions

The `<sbb-dialog-actions>` component extends the [sbb-action-group](/docs/elements-action-group--docs)
component. Use it to display a footer with an action group.

```html
<sbb-dialog>
  <sbb-dialog-actions>
    <sbb-block-link sbb-dialog-close>Link</sbb-block-link>
    <sbb-secondary-button sbb-dialog-close>Cancel</sbb-secondary-button>
    <sbb-button sbb-dialog-close sbb-focus-initial>Confirm</sbb-button>
  </sbb-dialog-actions>
</sbb-dialog>
```

## Interactions

To display the dialog, a trigger can be connected via the `trigger` property,
or the `open()` method on the `<sbb-dialog>` component can be called.

```html
<sbb-button id="dialog-trigger">Open dialog</sbb-button>

<sbb-dialog trigger="dialog-trigger">
  <sbb-dialog-title>Title</sbb-dialog-title>
  <sbb-dialog-content>Dialog content.</sbb-dialog-content>
  <sbb-dialog-actions><sbb-button sbb-dialog-close>Close</sbb-button></sbb-dialog-actions>
</sbb-dialog>
```

### Closing the dialog

The dialog can be closed in several ways:

1. **Close button**: Add an `<sbb-dialog-close-button>` component to provide a dedicated close button.
   This is recommended for dialogs with complex content.

   ```html
   <sbb-dialog>
     <sbb-dialog-title>Title</sbb-dialog-title>
     <sbb-dialog-close-button></sbb-dialog-close-button>
     <sbb-dialog-content>Dialog content.</sbb-dialog-content>
   </sbb-dialog>
   ```

   The `<sbb-dialog-close-button>` component extends the
   [sbb-secondary-button](/docs/elements-button--docs) component.
   An aria-label is automatically set. It is however possible to override it, if necessary.

2. **sbb-dialog-close attribute**: Add the `sbb-dialog-close` attribute to any element within the dialog
   (typically buttons in the actions section) to close the dialog when clicked. You can optionally provide a result value:

   ```html
   <sbb-dialog>
     <sbb-dialog-title>Title</sbb-dialog-title>
     <sbb-dialog-content>Dialog content.</sbb-dialog-content>
     <sbb-dialog-actions>
       <sbb-secondary-button sbb-dialog-close="cancel">Cancel</sbb-secondary-button>
       <sbb-button sbb-dialog-close="confirm">Confirm</sbb-button>
     </sbb-dialog-actions>
   </sbb-dialog>
   ```

   Alternatively, you can use the `assignDialogResult()` helper to programmatically assign a complex result to an element:

   ```js
   import { assignDialogResult } from '@sbb-esta/lyne-elements/dialog.js';

   const confirmButton = document.querySelector('sbb-button');
   assignDialogResult(confirmButton, { action: 'confirm', otherProp: 'any value' });
   ```

3. **Backdrop click**: By default, clicking on the backdrop will close the dialog.
   This behavior can be disabled by setting `backdrop-action="none"`.

4. **Escape key**: Pressing the `Esc` key will close the dialog.

5. **Programmatically**: Call the `close(result?: any)` method on the `<sbb-dialog>` element.
   This method closes the dialog and emits `beforeclose` and `close` events with the provided result as a payload.

   ```js
   const dialog = document.querySelector('sbb-dialog');
   dialog.close({ confirmed: true });
   ```

### Handling close events

When the dialog closes, it emits two events:

- `beforeclose`: Emitted before the closing transition begins. This event is cancelable by calling `event.preventDefault()`.
- `close`: Emitted after the dialog has fully closed.

Both events are of type `SbbDialogCloseEvent` and provide access to:

- `result`: The result value passed to `close()`, assigned via `assignDialogResult()`, or the value of the `sbb-dialog-close` attribute
- `closeTarget`: The element that triggered the close action (e.g., the clicked button), or `null` if closed programmatically or via Escape key

```js
dialog.addEventListener('close', (event) => {
  console.log('Result:', event.result);
  console.log('Close target:', event.closeTarget);
});
```

## Style

It's possible to display the component in `negative` variant using the self-named property.

```html
<sbb-dialog negative>
  <sbb-dialog-title>Title</sbb-dialog-title>
  <sbb-dialog-content>Dialog content.</sbb-dialog-content>
</sbb-dialog>
```

## Accessibility

We recommend to place at maximum two actions in the `<sbb-dialog-actions>` component.
More elements can potentially confuse users.

If there is more complex content than just a simple text / question, we recommend to slot the `<sbb-dialog-close-button>`.
This either provides an initial focus at the dialog start and also provides as a second exit possibility.

### Controlling initial focus

The first element with the attribute `sbb-focus-initial` will receive focus on opening.
If the attribute is not used, the first focusable element receives focus.
In case there is no `<sbb-dialog-close-button>` and complex content,
there should be a focusable element at the dialog start, e.g. the title itself.
This prevents screen reader users having to navigate backwards from the dialog actions.

### Focus restoration

When closed, the dialog restores focus to the element that previously held focus when the
dialog opened by default. However, focus restoration can be disabled
by setting the `skipFocusRestoration` property to `true`.
As this is an accessibility feature, it is recommended to focus
an alternative element by listening to the `didClose` event.
