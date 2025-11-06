import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbCarouselElement } from '@sbb-esta/lyne-elements/carousel/carousel.js';

import '@sbb-esta/lyne-elements/carousel/carousel.js';

/**
 * It displays a carousel component.
 *
 * @slot  - Use the unnamed slot to add the `sbb-carousel-list` for content and a `sbb-paginator` for controls.
 */
@Directive({
  selector: 'sbb-carousel',
  exportAs: 'sbbCarousel',
})
export class SbbCarousel {
  #element: ElementRef<SbbCarouselElement> = inject(ElementRef<SbbCarouselElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Used to display a box-shadow around the component.
   */
  @Input({ transform: booleanAttribute })
  public set shadow(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.shadow = value));
  }
  public get shadow(): boolean {
    return this.#element.nativeElement.shadow;
  }
}
