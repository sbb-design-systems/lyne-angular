import { Directive } from '@angular/core';

/**
 * Directive to close a dialog. Can be placed on any action element inside the dialog.
 */
@Directive({
  selector: '[sbb-dialog-close]',
  host: {
    '[attr.sbb-dialog-close]': '""',
  },
})
export class SbbDialogClose {}
