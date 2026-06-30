import { Component, inject, signal } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCardModule } from '@sbb-esta/lyne-angular/card';
import { SBB_OVERLAY_DATA } from '@sbb-esta/lyne-angular/core';
import { SbbDialogModule, SbbDialogRef, SbbDialogService } from '@sbb-esta/lyne-angular/dialog';

@Component({
  selector: 'sbb-dialog-service-content-example',
  template: `
    <sbb-dialog-title>Confirmation</sbb-dialog-title>
    <sbb-dialog-content>
      <p>Hello {{ dialogData.name }}, are you sure you want to proceed?</p>
    </sbb-dialog-content>
    <sbb-dialog-actions>
      <sbb-secondary-button sbb-dialog-close="cancel">Cancel</sbb-secondary-button>
      <sbb-button sbb-dialog-close="confirm" sbb-focus-initial>Confirm</sbb-button>
    </sbb-dialog-actions>
  `,
  imports: [SbbButtonModule, SbbDialogModule],
})
export class DialogServiceContentExample {
  // Fetch the dialog data using the injection token
  dialogData = inject<{ name: string }>(SBB_OVERLAY_DATA);
  #dialogRef = inject(SbbDialogRef);

  protected anotherClose(): void {
    // You can use the injected `dialogRef` to close the dialog programmatically.
    this.#dialogRef.close('another-close-result');
  }
}

/**
 * @title Dialog opened via service
 * @order 2
 */
@Component({
  selector: 'sbb-dialog-service-example',
  templateUrl: 'dialog-service-example.html',
  imports: [SbbButtonModule, SbbCardModule],
})
export class DialogServiceExample {
  private _dialogService = inject(SbbDialogService);

  protected lastResult = signal<string | null>(null);

  protected openDialog(): void {
    const dialogRef = this._dialogService.open<DialogServiceContentExample, string>(
      DialogServiceContentExample,
      {
        data: { name: 'Mario' },
        setupContainer: (dialog) => (dialog.backdropAction = 'none'),
      },
    );

    // Listen to the 'afterClosed' event to get the result of the dialog.
    dialogRef.afterClosed.subscribe((event) => {
      this.lastResult.set(event.result ?? null);
    });
  }
}
