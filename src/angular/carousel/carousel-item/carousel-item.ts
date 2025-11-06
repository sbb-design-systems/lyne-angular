import { Directive, ElementRef, inject } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type {
  SbbCarouselItemElement,
  SbbCarouselItemEventDetail,
} from '@sbb-esta/lyne-elements/carousel/carousel-item.js';
import { NEVER, fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements/carousel/carousel-item.js';

/**
 * It displays an item contained into the `sbb-carousel` component.
 *
 * @slot  - Use the unnamed slot to add images for the carousel, as <img>, <sbb-image>, <picture>, ...
 */
@Directive({
  selector: 'sbb-carousel-item',
  exportAs: 'sbbCarouselItem',
})
export class SbbCarouselItem {
  #element: ElementRef<SbbCarouselItemElement> = inject(ElementRef<SbbCarouselItemElement>);

  protected _beforeshowOutput = outputFromObservable<CustomEvent<SbbCarouselItemEventDetail>>(
    NEVER,
    { alias: 'beforeshow' },
  );
  /**
   * Event emitted when the item is starting scrolling.
   */
  public beforeshowOutput = internalOutputFromObservable(
    fromEvent<CustomEvent<SbbCarouselItemEventDetail>>(this.#element.nativeElement, 'beforeshow'),
  );

  protected _showOutput = outputFromObservable<CustomEvent<SbbCarouselItemEventDetail>>(NEVER, {
    alias: 'show',
  });
  /**
   * Event emitted when the item is full visible after scrolling.
   */
  public showOutput = internalOutputFromObservable(
    fromEvent<CustomEvent<SbbCarouselItemEventDetail>>(this.#element.nativeElement, 'show'),
  );
}
