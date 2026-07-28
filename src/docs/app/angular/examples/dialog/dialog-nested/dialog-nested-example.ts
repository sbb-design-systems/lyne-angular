import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbDialogModule } from '@sbb-esta/lyne-angular/dialog';

/**
 * @title nested dialogs
 * @order 3
 */
@Component({
  selector: 'sbb-dialog-nested-example',
  templateUrl: 'dialog-nested-example.html',
  imports: [SbbDialogModule, SbbButtonModule],
})
export class DialogNestedExample {}
