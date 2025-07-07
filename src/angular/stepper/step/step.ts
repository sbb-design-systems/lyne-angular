import { Directive, ElementRef, inject } from '@angular/core';
import { outputFromObservable, toSignal } from '@angular/core/rxjs-interop';
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

  protected _validateSignal = outputFromObservable<CustomEvent<SbbStepValidateEventDetails>>(
    NEVER,
    { alias: 'validate' },
  );
  public validateSignal = toSignal(
    fromEvent<CustomEvent<SbbStepValidateEventDetails>>(this.#element.nativeElement, 'validate'),
  );
}
