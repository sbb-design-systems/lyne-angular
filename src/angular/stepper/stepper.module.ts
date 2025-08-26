import { SbbStep } from './step/step';
import { SbbStepLabel } from './step-label/step-label';
import { SbbStepper } from './stepper/stepper';

export const SbbStepperModule = [SbbStep, SbbStepLabel, SbbStepper] as const;
