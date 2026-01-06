import { Directive } from '@angular/core';

/**
 * Directive to mark the initial focusable element inside an overlay component.
 * Only one element inside the overlay should be marked with this directive.
 */
@Directive({
  selector: '[sbb-focus-initial]',
  host: {
    '[attr.sbb-focus-initial]': '""',
  },
})
export class SbbFocusInitialDirective {}
