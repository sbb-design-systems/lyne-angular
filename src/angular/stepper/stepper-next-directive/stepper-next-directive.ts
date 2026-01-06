import { Directive } from '@angular/core';

@Directive({
  selector: '[sbb-stepper-next]',
  host: {
    '[attr.sbb-stepper-next]': '""',
  },
})
export class SbbStepperNextDirective {}
