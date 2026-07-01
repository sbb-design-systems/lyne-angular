import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbCheckboxModule } from '@sbb-esta/lyne-angular/checkbox';
import { type SbbDialog, SbbDialogModule } from '@sbb-esta/lyne-angular/dialog';
import { SbbPopoverModule } from '@sbb-esta/lyne-angular/popover';
import { SbbRadioButtonModule } from '@sbb-esta/lyne-angular/radio-button';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title Basic dialog
 * @order 1
 */
@Component({
  selector: 'sbb-dialog-basic-example',
  templateUrl: 'dialog-basic-example.html',
  imports: [
    FormField,
    SbbButtonModule,
    SbbCheckboxModule,
    SbbDialogModule,
    SbbPopoverModule,
    SbbRadioButtonModule,
    SbbTitleModule,
  ],
})
export class DialogBasicExample {
  protected controls = form(
    signal({
      negative: false,
      closeButton: true,
      backdrop: 'opaque' as SbbDialog['backdrop'],
      backdropAction: 'close' as SbbDialog['backdropAction'],
    }),
  );
}
