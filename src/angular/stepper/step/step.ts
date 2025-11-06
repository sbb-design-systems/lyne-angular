import { Directive, ElementRef, inject } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbStepLabelElement } from '@sbb-esta/lyne-elements/stepper/step-label.js';
import type { SbbStepElement } from '@sbb-esta/lyne-elements/stepper/step.js';
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

  protected _validateOutput = outputFromObservable<CustomEvent<SbbStepValidateEventDetails>>(
    NEVER,
    { alias: 'validate' },
  );
  /**
   * The validate event is dispatched when a step change is triggered. Can be canceled to abort the step change.
   */
  public validateOutput = internalOutputFromObservable(
    fromEvent<CustomEvent<SbbStepValidateEventDetails>>(this.#element.nativeElement, 'validate'),
  );
}
