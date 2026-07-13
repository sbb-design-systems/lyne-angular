import { Directive, Input } from '@angular/core';
import { SbbTriggerBase } from '@sbb-esta/lyne-angular/core';

import type { SbbNavigation } from './navigation';

@Directive({
  selector: `[sbbNavigation]`,
  exportAs: 'sbbNavigationTrigger',
})
export class SbbNavigationTrigger extends SbbTriggerBase<SbbNavigation> {
  /** The navigation to be attached to this trigger. */
  @Input('sbbNavigation')
  get navigation(): SbbNavigation | null {
    return this.referenceElement;
  }
  set navigation(navigation: SbbNavigation) {
    this.referenceElement = navigation;
  }
}
