import { Directive } from '@angular/core';

@Directive({
  selector: '[sbb-popover-close]',
  host: {
    '[attr.sbb-popover-close]': '""',
  },
})
export class SbbPopoverCloseDirective {}
