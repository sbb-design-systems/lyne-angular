import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import {
  SBB_DIALOG_DATA,
  SbbDialogModule,
  SbbDialogRef,
  SbbDialogService,
} from '@sbb-esta/lyne-angular/dialog';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Shared Data Dialog
 * @order 4
 */
@Component({
  selector: 'sbb-dialog-shared-data-example',
  templateUrl: 'dialog-shared-data-example.html',
  imports: [FormField, SbbButtonModule, SbbFormFieldModule],
})
export class DialogSharedDataExample {
  protected readonly form = form(signal<DialogData>({ name: '', animal: '' }));
  private dialogService = inject(SbbDialogService);

  protected openDialog(): void {
    const dialogRef = this.dialogService.open<SharedDataDialogComponent, string>(
      SharedDataDialogComponent,
      {
        data: {
          name: this.form.name().value(),
          animal: this.form.animal().value(),
        } satisfies DialogData,
      },
    );

    dialogRef.afterClosed.subscribe((closeEvent) => {
      console.log('Dialog sharing data was closed');
      if (closeEvent.result) {
        this.form.animal().value.set(closeEvent.result);
      }
    });
  }
}

@Component({
  selector: 'sbb-shared-data-dialog-component',
  template: `
    <sbb-dialog-title>Hi {{ data.name }}</sbb-dialog-title>
    <sbb-dialog-content>
      <form id="form" (submit)="confirm($event)">
        What's your favorite animal?
        <sbb-form-field>
          <label>Animal</label>
          <input type="text" [formField]="form" sbb-focus-initial />
        </sbb-form-field>
      </form>
    </sbb-dialog-content>
    <sbb-dialog-actions>
      <sbb-button form="form" type="submit">Ok</sbb-button>
      <sbb-secondary-button sbb-dialog-close>No Thanks</sbb-secondary-button>
    </sbb-dialog-actions>
  `,
  imports: [SbbDialogModule, SbbFormFieldModule, FormField, SbbButtonModule],
})
export class SharedDataDialogComponent {
  protected readonly data = inject<DialogData>(SBB_DIALOG_DATA);
  protected readonly dialogRef = inject(SbbDialogRef<SharedDataDialogComponent>);
  protected readonly form = form(signal(this.data.animal));

  protected confirm(event?: SubmitEvent): void {
    // Prevent page change
    event?.preventDefault();
    this.dialogRef.close(this.form().value());
  }
}
