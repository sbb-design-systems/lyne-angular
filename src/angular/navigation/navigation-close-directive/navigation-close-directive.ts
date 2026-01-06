import { Directive } from '@angular/core';

@Directive({
  selector: '[sbb-navigation-close]',
  host: {
    '[attr.sbb-navigation-close]': '""',
  },
})
export class SbbNavigationCloseDirective {}
