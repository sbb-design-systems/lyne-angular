import { Directive } from '@angular/core';

@Directive({
  selector: '[sbb-stepper-previous]',
  host: {
    '[attr.sbb-stepper-previous]': '""',
  },
})
export class SbbStepperPreviousDirective {}
