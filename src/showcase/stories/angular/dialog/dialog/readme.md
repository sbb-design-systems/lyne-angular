### Creating dialogs with SbbDialogService

The `SbbDialogService` service can be used to open `SbbDialog`s programmatically.

A dialog is opened by calling the `open` method with either a component or a template to be loaded, and an optional
config object. The `open` method will return an instance of `SbbDialogRef`:

#### Component

```ts
const dialogService = inject(SbbDialogService);
let dialogRef = dialogService.open(UserProfileComponent, {
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
dialogRef.afterClosed().subscribe((result) => {
  console.log(`Dialog result: ${result}`); // Pizza!
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

The passed value will be available through the `afterClosed()` Observable:

```ts
import { SbbDialogCloseEvent } from '@sbb-esta/lyne-elements/dialog/dialog.js';

dialogRef.afterClosed().subscribe((event: SbbDialogCloseEvent) => {
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
