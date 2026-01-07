import { Directive } from '@angular/core';

/**
 * Directive to close a navigation section. Can be placed on any action element inside the navigation section.
 */
@Directive({
  selector: '[sbb-navigation-section-close]',
  host: {
    '[attr.sbb-navigation-section-close]': '""',
  },
})
export class SbbNavigationSectionClose {}
