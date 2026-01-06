import { Directive } from '@angular/core';

/**
 * Directive to close a navigation. Can be placed on any action element inside the navigation.
 */
@Directive({
  selector: '[sbb-navigation-close]',
  host: {
    '[attr.sbb-navigation-close]': '""',
  },
})
export class SbbNavigationClose {}
