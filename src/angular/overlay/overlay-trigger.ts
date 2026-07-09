import { Directive, Input } from '@angular/core';
import { SbbTriggerBase } from '@sbb-esta/lyne-angular/core';

import type { SbbOverlay } from './overlay';

@Directive({
  selector: `[sbbOverlay]`,
  exportAs: 'sbbOverlayTrigger',
})
export class SbbOverlayTrigger extends SbbTriggerBase<SbbOverlay> {
  /** The overlay to be attached to this trigger. */
  @Input('sbbOverlay')
  get overlay(): SbbOverlay | null {
    return this.referenceElement;
  }
  set overlay(overlay: SbbOverlay) {
    this.referenceElement = overlay;
  }
}
