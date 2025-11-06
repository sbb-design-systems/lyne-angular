import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/dialog/dialog-content.js';

/**
 * Use this component to provide a content for an `sbb-dialog`.
 *
 * @slot  - Use the unnamed slot to provide a dialog content.
 */
@Directive({
  selector: 'sbb-dialog-content',
  exportAs: 'sbbDialogContent',
})
export class SbbDialogContent {}
