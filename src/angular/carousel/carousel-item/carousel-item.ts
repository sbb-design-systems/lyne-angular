import { Directive, ElementRef, inject, type OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { internalOutputFromObservable } from '@sbb-esta/lyne-angular/core';
import type {
  SbbCarouselItemElement,
  SbbCarouselItemEventDetail,
} from '@sbb-esta/lyne-elements/carousel/carousel-item.js';
import { NEVER, fromEvent } from 'rxjs';

import '@sbb-esta/lyne-elements/carousel/carousel-item.js';

@Directive({
  selector: 'sbb-carousel-item',
  exportAs: 'sbbCarouselItem',
})
export class SbbCarouselItem {
  #element: ElementRef<SbbCarouselItemElement> = inject(ElementRef<SbbCarouselItemElement>);

  protected _beforeshowOutput: OutputRef<CustomEvent<SbbCarouselItemEventDetail>> =
    outputFromObservable<CustomEvent<SbbCarouselItemEventDetail>>(NEVER, { alias: 'beforeshow' });
  public beforeshowOutput: OutputRef<CustomEvent<SbbCarouselItemEventDetail>> =
    internalOutputFromObservable(
      fromEvent<CustomEvent<SbbCarouselItemEventDetail>>(this.#element.nativeElement, 'beforeshow'),
    );

  protected _showOutput: OutputRef<CustomEvent<SbbCarouselItemEventDetail>> = outputFromObservable<
    CustomEvent<SbbCarouselItemEventDetail>
  >(NEVER, {
    alias: 'show',
  });
  public showOutput: OutputRef<CustomEvent<SbbCarouselItemEventDetail>> =
    internalOutputFromObservable(
      fromEvent<CustomEvent<SbbCarouselItemEventDetail>>(this.#element.nativeElement, 'show'),
    );
}
