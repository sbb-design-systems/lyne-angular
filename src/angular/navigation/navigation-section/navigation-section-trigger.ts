import { Directive, Input } from '@angular/core';
import { SbbTriggerBase } from '@sbb-esta/lyne-angular/core';

import type { SbbNavigationSection } from './navigation-section';

@Directive({
  selector: `[sbbNavigationSection]`,
  exportAs: 'sbbNavigationSectionTrigger',
})
export class SbbNavigationSectionTrigger extends SbbTriggerBase<SbbNavigationSection> {
  /** The navigation section to be attached to this trigger. */
  @Input('sbbNavigationSection')
  get navigationSection(): SbbNavigationSection | null {
    return this.referenceElement;
  }
  set navigationSection(navigationSection: SbbNavigationSection) {
    this.referenceElement = navigationSection;
  }
}
