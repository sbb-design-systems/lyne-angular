import { Directive, Input } from '@angular/core';
import { SbbTriggerBase } from '@sbb-esta/lyne-angular/core';

import type { SbbDialog } from './dialog';

@Directive({
  selector: `[sbbDialogTrigger]`,
  exportAs: 'sbbDialogTrigger',
})
export class SbbDialogTrigger extends SbbTriggerBase<SbbDialog> {
  /** The dialog to be attached to this trigger. */
  @Input('sbbDialogTrigger')
  get dialog(): SbbDialog | null {
    return this.referenceElement;
  }
  set dialog(dialog: SbbDialog) {
    this.referenceElement = dialog;
  }
}
