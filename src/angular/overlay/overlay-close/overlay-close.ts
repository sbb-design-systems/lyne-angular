import { Directive } from '@angular/core';

/**
 * Directive to close an overlay. Can be placed on any action element inside the overlay.
 */
@Directive({
  selector: '[sbb-overlay-close]',
  host: { '[attr.sbb-overlay-close]': '""' },
})
export class SbbOverlayClose {}
