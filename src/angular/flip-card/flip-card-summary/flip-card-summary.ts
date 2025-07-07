import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type {
  SbbFlipCardImageAlignment,
  SbbFlipCardSummaryElement,
} from '@sbb-esta/lyne-elements/flip-card/flip-card-summary.js';

import '@sbb-esta/lyne-elements/flip-card/flip-card-summary.js';

@Directive({
  selector: 'sbb-flip-card-summary',
  exportAs: 'sbbFlipCardSummary',
})
export class SbbFlipCardSummary {
  #element: ElementRef<SbbFlipCardSummaryElement> = inject(ElementRef<SbbFlipCardSummaryElement>);
  #ngZone: NgZone = inject(NgZone);

  @Input()
  public set imageAlignment(value: SbbFlipCardImageAlignment) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.imageAlignment = value));
  }
  public get imageAlignment(): SbbFlipCardImageAlignment {
    return this.#element.nativeElement.imageAlignment;
  }
}
