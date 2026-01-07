import { Directive } from '@angular/core';

/**
 * Directive to close a popover. Can be placed on any action element inside the popover.
 */
@Directive({
  selector: '[sbb-popover-close]',
  host: {
    '[attr.sbb-popover-close]': '""',
  },
})
export class SbbPopoverClose {}
