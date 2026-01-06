import { Directive } from '@angular/core';

@Directive({
  selector: '[sbb-overlay-close]',
  host: { '[attr.sbb-overlay-close]': '""' },
})
export class SbbOverlayCloseDirective {}
