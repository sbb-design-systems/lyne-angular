import { Directive } from '@angular/core';

/**
 * Directive to navigate to the next step in a stepper. Can be placed on any action element inside the stepper.
 */
@Directive({
  selector: '[sbb-stepper-next]',
  host: {
    '[attr.sbb-stepper-next]': '""',
  },
})
export class SbbStepperNext {}
