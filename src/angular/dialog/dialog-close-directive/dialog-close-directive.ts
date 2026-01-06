import { Directive } from '@angular/core';

@Directive({
  selector: '[sbb-dialog-close]',
  host: {
    '[attr.sbb-dialog-close]': '""',
  },
})
export class SbbDialogCloseDirective {}
