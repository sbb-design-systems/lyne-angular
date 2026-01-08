### Creating dialogs with SbbDialogService

The `SbbDialogService` service can be used to open `SbbDialog`s programmatically.

A dialog is opened by calling the `open` method with either a component or a template to be loaded, and an optional
config object. The `open` method will return an instance of `SbbOverlayRef`:

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

The `SbbOverlayRef` provides a handle on the opened dialog. It can be used to close the dialog and to
receive notifications when the dialog state changes (`afterOpened`, `beforeClosed`, `afterClosed`).
When closing, an optional result value can be provided. This result value is forwarded as the result of the `afterClosed` Observable.

```ts
dialogRef.afterClosed().subscribe((result) => {
  console.log(`Dialog result: ${result}`); // Pizza!
});

dialogRef.close('Pizza!');
```

Components created via `SbbDialogService` can _inject_ `SbbOverlayRef` and use it to close the dialog
in which they are contained.

```ts
@Component({
  /* ... */
})
export class YourDialog {
  dialogRef = inject(SbbOverlayRef);

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
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
