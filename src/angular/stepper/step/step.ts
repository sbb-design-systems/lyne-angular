import { Directive, ElementRef, inject, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbStepLabelElement } from '@sbb-esta/lyne-elements/stepper/step-label.js';
import type { SbbStepElement } from '@sbb-esta/lyne-elements/stepper/step.js';
import type { SbbStepperElement } from '@sbb-esta/lyne-elements/stepper/stepper.js';
import type { SbbStepValidateEventDetails } from '@sbb-esta/lyne-elements/stepper.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/stepper/step.js';

/**
 * Combined with a `sbb-stepper`, it displays a step's content.
 *
 * @slot  - Use the unnamed slot to provide content.
 */
@Directive({
  selector: 'sbb-step',
  exportAs: 'sbbStep',
})
export class SbbStep {
  #element: ElementRef<SbbStepElement> = inject(ElementRef<SbbStepElement>);

  /**
   * The label of the step.
   */
  public get label(): SbbStepLabelElement | null {
    return this.#element.nativeElement.label;
  }

  public get stepper(): SbbStepperElement | null {
    return this.#element.nativeElement.stepper;
  }

  protected _validateOutput: OutputRef<CustomEvent<SbbStepValidateEventDetails>> =
    outputFromObservable<CustomEvent<SbbStepValidateEventDetails>>(NEVER, { alias: 'validate' });
  /**
   * The validate event is dispatched when a step change is triggered. Can be canceled to abort the step change.
   */
  public validateOutput: OutputRef<CustomEvent<SbbStepValidateEventDetails>> =
    internalOutputFromObservable(
      fromEvent<CustomEvent<SbbStepValidateEventDetails>>(this.#element.nativeElement, 'validate'),
    );
}
