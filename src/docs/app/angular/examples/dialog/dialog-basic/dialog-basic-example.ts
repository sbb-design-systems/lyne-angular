import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SbbButton } from '@sbb-esta/lyne-angular/button/button';
import { SbbSecondaryButton } from '@sbb-esta/lyne-angular/button/secondary-button';
import { SbbDialogModule } from '@sbb-esta/lyne-angular/dialog';

/**
 * @title Basic dialog
 */
@Component({
  selector: 'sbb-dialog-basic-example',
  templateUrl: 'dialog-basic-example.html',
  imports: [SbbDialogModule, SbbSecondaryButton, SbbButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogBasicExample {}
