import { NgModule } from '@angular/core';

import { SbbStep } from './step/step';
import { SbbStepLabel } from './step-label/step-label';
import { SbbStepper } from './stepper/stepper';

const EXPORTED_DECLARATIONS = [SbbStep, SbbStepLabel, SbbStepper];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbStepperModule {}
