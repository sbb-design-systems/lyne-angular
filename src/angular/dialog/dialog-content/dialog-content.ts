import { Directive } from '@angular/core';
import { SbbDialogContentElement } from '@sbb-esta/lyne-elements/dialog.pure.js';

/**
 * Use this component to provide a content for an `sbb-dialog`.
 *
 * @slot  - Use the unnamed slot to provide a dialog content.
 */
@Directive({
  selector: 'sbb-dialog-content',
  exportAs: 'sbbDialogContent',
})
export class SbbDialogContent {
  static {
    SbbDialogContentElement.define();
  }
}
