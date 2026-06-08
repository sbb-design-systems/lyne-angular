import { Directive } from '@angular/core';
import { SbbDialogActionsElement } from '@sbb-esta/lyne-elements/dialog.pure.js';

/**
 * Use this component to display a footer into an `sbb-dialog` with an action group.
 *
 * @slot  - Use the unnamed slot to add `sbb-block-link` or `sbb-button` elements to the `sbb-dialog-actions`.
 */
@Directive({
  selector: 'sbb-dialog-actions',
  exportAs: 'sbbDialogActions',
})
export class SbbDialogActions {
  static {
    SbbDialogActionsElement.define();
  }
}
