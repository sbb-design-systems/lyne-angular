import { Component } from '@angular/core';
import { SbbStepperModule } from '@sbb-esta/lyne-angular/stepper';

/**
 * @title lazy-loaded stepper
 * @order 2
 */
@Component({
  selector: 'sbb-stepper-lazy-loaded-example',
  templateUrl: 'stepper-lazy-loaded-example.html',
  imports: [SbbStepperModule],
})
export class StepperLazyLoadedExample {}
