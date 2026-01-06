import { Directive } from '@angular/core';

/**
 * Directive to close a toast. Can be placed on any action element inside the toast.
 */
@Directive({
  selector: '[sbb-toast-close]',
  host: {
    '[attr.sbb-toast-close]': '""',
  },
})
export class SbbToastClose {}
