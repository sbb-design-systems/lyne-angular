import { Directive, ElementRef, inject } from '@angular/core';
import { SbbStepLabelElement } from '@sbb-esta/lyne-elements/stepper/step-label.js';
import type {
  SbbStepElement,
  SbbStepValidateEventDetails,
} from '@sbb-esta/lyne-elements/stepper/step.js';
import { fromEvent, type Observable } from 'rxjs';
import '@sbb-esta/lyne-elements/stepper/step.js';

@Directive({
  selector: 'sbb-step',
})
export class SbbStep {
  #element: ElementRef<SbbStepElement> = inject(ElementRef<SbbStepElement>);

  public validate: Observable<SbbStepValidateEventDetails> = fromEvent<SbbStepValidateEventDetails>(
    this.#element.nativeElement,
    'validate',
  );

  public get label(): SbbStepLabelElement | null {
    return this.#element.nativeElement.label;
  }
}
