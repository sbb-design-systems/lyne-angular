import { Directive, ElementRef, inject, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type { SbbStepLabelElement } from '@sbb-esta/lyne-elements/stepper/step-label.js';
import type { SbbStepElement } from '@sbb-esta/lyne-elements/stepper/step.js';
import type { SbbStepValidateEventDetails } from '@sbb-esta/lyne-elements/stepper.js';
import { fromEvent, NEVER } from 'rxjs';

import '@sbb-esta/lyne-elements/stepper/step.js';

@Directive({
  selector: 'sbb-step',
  exportAs: 'sbbStep',
})
export class SbbStep {
  #element: ElementRef<SbbStepElement> = inject(ElementRef<SbbStepElement>);

  public get label(): SbbStepLabelElement | null {
    return this.#element.nativeElement.label;
  }

  protected _validateOutput: OutputRef<CustomEvent<SbbStepValidateEventDetails>> =
    outputFromObservable<CustomEvent<SbbStepValidateEventDetails>>(NEVER, { alias: 'validate' });
  public validateOutput: OutputRef<CustomEvent<SbbStepValidateEventDetails>> =
    internalOutputFromObservable(
      fromEvent<CustomEvent<SbbStepValidateEventDetails>>(this.#element.nativeElement, 'validate'),
    );
}
