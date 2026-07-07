import { Directive } from '@angular/core';

/**
 * Directive to mark a scroll container as source of scrolling to the `sbb-header`.
 * Can be placed on any scrollable element.
 */
@Directive({
  // TODO: change selector to  [sbbHeaderScrollOrigin]
  selector: '[sbb-header-scroll-origin]',
  host: {
    '[attr.sbb-header-scroll-origin]': '""',
  },
})
export class SbbHeaderScrollOrigin {}
