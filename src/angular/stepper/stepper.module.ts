import { NgModule } from '@angular/core';

import { SbbStep } from './step/step';
import { SbbStepLabel } from './step-label/step-label';
import { SbbStepper } from './stepper/stepper';
import { SbbStepperNext } from './stepper-next/stepper-next';
import { SbbStepperPrevious } from './stepper-previous/stepper-previous';

const SBB_STEPPER_EXPORTED_DECLARATIONS = [
  SbbStep,
  SbbStepLabel,
  SbbStepper,
  SbbStepperNext,
  SbbStepperPrevious,
];

@NgModule({
  imports: SBB_STEPPER_EXPORTED_DECLARATIONS,
  exports: SBB_STEPPER_EXPORTED_DECLARATIONS,
})
export class SbbStepperModule {}
