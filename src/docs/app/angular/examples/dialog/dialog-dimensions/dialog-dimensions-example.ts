import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { SBB_DIALOG_DATA } from '@sbb-esta/lyne-angular/core';
import { SbbDialogModule, SbbDialogService } from '@sbb-esta/lyne-angular/dialog';
import { SbbFormFieldModule } from '@sbb-esta/lyne-angular/form-field';
import { SbbLinkModule } from '@sbb-esta/lyne-angular/link';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

@Component({
  selector: 'sbb-dialog-dimensions-content-example',
  template: `
    <sbb-dialog-title>Title</sbb-dialog-title>
    <sbb-dialog-content>
      <p>Content</p>
      @if (dialogData) {
        @for (_i of [].constructor(10); track _i) {
          <p>
            {{ dialogData }}
          </p>
        }
      }
    </sbb-dialog-content>
    <sbb-dialog-actions>
      <sbb-button sbb-dialog-close="confirm" sbb-focus-initial>Confirm</sbb-button>
    </sbb-dialog-actions>
  `,
  imports: [SbbButtonModule, SbbDialogModule],
})
export class DialogDimensionsContentExample {
  protected dialogData = inject<string>(SBB_DIALOG_DATA, { optional: true }) ?? null;
}

/**
 * @title dialog opened via service with dimensions set
 * @order 10
 */
@Component({
  selector: 'sbb-dialog-dimensions-example',
  templateUrl: 'dialog-dimensions-example.html',
  imports: [
    FormField,
    SbbButtonModule,
    SbbCheckboxModule,
    SbbLinkModule,
    SbbFormFieldModule,
    SbbTitleModule,
  ],
})
export class DialogDimensionsExample {
  protected static loremIpsum = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `;

  protected dimensions = form(
    signal({
      height: '',
      width: '',
      maxHeight: '',
      maxWidth: '',
      longContent: false,
    }),
  );

  private dialogService = inject(SbbDialogService);

  protected openDialog(): void {
    this.dialogService.open<DialogDimensionsContentExample, string>(
      DialogDimensionsContentExample,
      {
        height: this.convertDimension(this.dimensions().value().height),
        width: this.convertDimension(this.dimensions().value().width),
        maxHeight: this.convertDimension(this.dimensions().value().maxHeight),
        maxWidth: this.convertDimension(this.dimensions().value().maxWidth),
        data: this.dimensions().value().longContent ? DialogDimensionsExample.loremIpsum : null,
      },
    );
  }

  private convertDimension(d: string): string | number | undefined {
    if (!d) {
      return undefined;
    }
    return isNaN(Number(d)) ? d : Number(d);
  }
}
