import { Directive, Input } from '@angular/core';
import { SbbTriggerBase } from '@sbb-esta/lyne-angular/core';

import type { SbbPopover } from './popover';

@Directive({
  selector: `[sbbPopoverTrigger]`,
  exportAs: 'sbbPopoverTrigger',
})
export class SbbPopoverTrigger extends SbbTriggerBase<SbbPopover> {
  /** The popover to be attached to this trigger. */
  @Input('sbbPopoverTrigger')
  get popover(): SbbPopover | null {
    return this.referenceElement;
  }
  set popover(popover: SbbPopover) {
    this.referenceElement = popover;
  }
}
