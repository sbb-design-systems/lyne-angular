import { Directive, Input } from '@angular/core';
import { SbbTriggerBase } from '@sbb-esta/lyne-angular/core';

import type { SbbPopover } from './popover';

@Directive({
  selector: `[sbbPopover]`,
  exportAs: 'sbbPopoverTrigger',
})
export class SbbPopoverTrigger extends SbbTriggerBase<SbbPopover> {
  /** The popover to be attached to this trigger. */
  @Input('sbbPopover')
  get popover(): SbbPopover | null {
    return this.referenceElement;
  }
  set popover(popover: SbbPopover) {
    this.referenceElement = popover;
  }
}
