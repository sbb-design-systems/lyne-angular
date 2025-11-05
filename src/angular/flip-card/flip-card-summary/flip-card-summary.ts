import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type {
  SbbFlipCardImageAlignment,
  SbbFlipCardSummaryElement,
} from '@sbb-esta/lyne-elements/flip-card/flip-card-summary.js';

import '@sbb-esta/lyne-elements/flip-card/flip-card-summary.js';

/**
 * Combined with a `sbb-flip-card`, it displays its content when the card is not flipped.
 *
 * @slot  - Use the unnamed slot to provide a title for the `sbb-flip-card-summary`.
 * @slot image - Use this slot to provide an image for the `sbb-flip-card-summary`.
 */
@Directive({
  selector: 'sbb-flip-card-summary',
  exportAs: 'sbbFlipCardSummary',
})
export class SbbFlipCardSummary {
  #element: ElementRef<SbbFlipCardSummaryElement> = inject(ElementRef<SbbFlipCardSummaryElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * The position where to render the image.
   */
  @Input()
  public set imageAlignment(value: SbbFlipCardImageAlignment) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.imageAlignment = value));
  }
  public get imageAlignment(): SbbFlipCardImageAlignment {
    return this.#element.nativeElement.imageAlignment;
  }
}
