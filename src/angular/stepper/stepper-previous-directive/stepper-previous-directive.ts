import { Directive } from '@angular/core';

/**
 * Directive to navigate to the previous step in a stepper. Can be placed on any action element inside the stepper.
 */
@Directive({
  selector: '[sbb-stepper-previous]',
  host: {
    '[attr.sbb-stepper-previous]': '""',
  },
})
export class SbbStepperPreviousDirective {}
