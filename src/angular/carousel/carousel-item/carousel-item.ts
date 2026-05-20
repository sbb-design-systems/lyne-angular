import { Directive, ElementRef, inject, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type {
  SbbCarouselItemElement,
  SbbCarouselItemShowEvent,
} from '@sbb-esta/lyne-elements/carousel.js';
import { NEVER, fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements/carousel.js';

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

  protected _beforeshowOutput: OutputRef<SbbCarouselItemShowEvent> =
    outputFromObservable<SbbCarouselItemShowEvent>(NEVER, { alias: 'beforeshow' });
  /**
   * Event emitted when the item is starting scrolling.
   */
  public beforeshowOutput: OutputRef<SbbCarouselItemShowEvent> = internalOutputFromObservable(
    fromEvent<SbbCarouselItemShowEvent>(this.#element.nativeElement, 'beforeshow'),
  );

  protected _showOutput: OutputRef<SbbCarouselItemShowEvent> =
    outputFromObservable<SbbCarouselItemShowEvent>(NEVER, {
      alias: 'show',
    });
  /**
   * Event emitted when the item is full visible after scrolling.
   */
  public showOutput: OutputRef<SbbCarouselItemShowEvent> = internalOutputFromObservable(
    fromEvent<SbbCarouselItemShowEvent>(this.#element.nativeElement, 'show'),
  );
}
