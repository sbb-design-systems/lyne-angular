import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbTeaserProductStaticElement } from '@sbb-esta/lyne-elements/teaser-product/teaser-product-static.js';

import '@sbb-esta/lyne-elements/teaser-product/teaser-product-static.js';

/**
 * Displays a text and a footnote, combined with an image, to tease a product.
 *
 * @slot  - Use this slot to provide the main content.
 * @slot image - Use this slot to provide an image or a `sbb-image` as a background.
 * @slot footnote - Use this slot to provide a footnote.
 * @cssprop [--sbb-teaser-product-background-gradient-start=25%] - At which percentage the background should start getting transparent.
 * @cssprop [--sbb-teaser-product-background-gradient-end=75%] - At which percentage the background should be fully transparent.
 */
@Directive({
  selector: 'sbb-teaser-product-static',
  exportAs: 'sbbTeaserProductStatic',
})
export class SbbTeaserProductStatic {
  #element: ElementRef<SbbTeaserProductStaticElement> = inject(
    ElementRef<SbbTeaserProductStaticElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  /**
   * Whether the fully visible part of the image is aligned 'before' or 'after' the content.
   * Only relevant starting from large breakpoint.
   */
  @Input()
  public set imageAlignment(value: 'after' | 'before') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.imageAlignment = value));
  }
  public get imageAlignment(): 'after' | 'before' {
    return this.#element.nativeElement.imageAlignment;
  }

  /**
   * Negative coloring variant flag.
   */
  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}
