import { Directive } from '@angular/core';

@Directive({
  selector: '[sbb-navigation-section-close]',
  host: {
    '[attr.sbb-navigation-section-close]': '""',
  },
})
export class SbbNavigationSectionCloseDirective {}
