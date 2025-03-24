import { Directive, ElementRef, inject, Output } from '@angular/core';
import { SbbStepLabelElement } from '@sbb-esta/lyne-elements/stepper/step-label.js';
import type {
  SbbStepElement,
  SbbStepValidateEventDetails,
} from '@sbb-esta/lyne-elements/stepper/step.js';
import { fromEvent, type Observable, NEVER } from 'rxjs';
import '@sbb-esta/lyne-elements/stepper/step.js';

@Directive({
  selector: 'sbb-step',
})
export class SbbStep {
  #element: ElementRef<SbbStepElement> = inject(ElementRef<SbbStepElement>);

   
  @Output('validate') protected _validate: (typeof this)['validate'] = NEVER;
  public validate: Observable<SbbStepValidateEventDetails> = fromEvent<SbbStepValidateEventDetails>(
    this.#element.nativeElement,
    'validate',
  );

  public get label(): SbbStepLabelElement | null {
    return this.#element.nativeElement.label;
  }
}
