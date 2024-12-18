/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import type {
  SbbFlipCardImageAlignment,
  SbbFlipCardSummaryElement,
} from '@sbb-esta/lyne-elements/flip-card/flip-card-summary.js';
import '@sbb-esta/lyne-elements/flip-card/flip-card-summary.js';

@Directive({
  selector: 'sbb-flip-card-summary',
  standalone: true,
})
export class SbbFlipCardSummaryDirective {
  #element: ElementRef<SbbFlipCardSummaryElement> = inject(ElementRef<SbbFlipCardSummaryElement>);
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'image-alignment' })
  public set imageAlignment(value: SbbFlipCardImageAlignment) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.imageAlignment = value));
  }
  public get imageAlignment(): SbbFlipCardImageAlignment {
    return this.#element.nativeElement.imageAlignment;
  }
}