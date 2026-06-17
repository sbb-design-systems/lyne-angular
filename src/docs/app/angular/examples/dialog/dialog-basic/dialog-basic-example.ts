import { Component } from '@angular/core';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbDialogModule } from '@sbb-esta/lyne-angular/dialog';

/**
 * @title Basic dialog
 */
@Component({
  selector: 'sbb-dialog-basic-example',
  templateUrl: 'dialog-basic-example.html',
  imports: [SbbDialogModule, SbbButtonModule],
})
export class DialogBasicExample {}
