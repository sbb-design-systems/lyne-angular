import { Directive } from '@angular/core';

@Directive({
  selector: '[sbb-toast-close]',
  host: {
    '[attr.sbb-toast-close]': '""',
  },
})
export class SbbToastCloseDirective {}
