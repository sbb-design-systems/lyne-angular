import { NgModule } from '@angular/core';

import { SbbStep } from './step/step';
import { SbbStepLabel } from './step-label/step-label';
import { SbbStepper } from './stepper/stepper';
import { SbbStepperNextDirective } from './stepper-next-directive/stepper-next-directive';
import { SbbStepperPreviousDirective } from './stepper-previous-directive/stepper-previous-directive';

const SBB_STEPPER_EXPORTED_DECLARATIONS = [
  SbbStep,
  SbbStepLabel,
  SbbStepper,
  SbbStepperNextDirective,
  SbbStepperPreviousDirective,
];

@NgModule({
  imports: SBB_STEPPER_EXPORTED_DECLARATIONS,
  exports: SBB_STEPPER_EXPORTED_DECLARATIONS,
})
export class SbbStepperModule {}
