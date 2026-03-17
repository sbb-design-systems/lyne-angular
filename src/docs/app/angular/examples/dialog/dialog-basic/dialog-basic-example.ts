import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbDialogModule } from '@sbb-esta/lyne-angular/dialog';

/**
 * @title Basic dialog
 */
@Component({
  selector: 'sbb-dialog-basic-example',
  templateUrl: 'dialog-basic-example.html',
  imports: [SbbDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogBasicExample {}
