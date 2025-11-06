import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { LinkTargetType } from '@sbb-esta/lyne-elements/core/base-elements.js';
import type { SbbTeaserProductElement } from '@sbb-esta/lyne-elements/teaser-product/teaser-product.js';

import '@sbb-esta/lyne-elements/teaser-product/teaser-product.js';

/**
 * Displays a text and a footnote, combined with an image, to tease a product
 *
 * @slot  - Use this slot to provide the main content.
 * @slot image - Use this slot to provide an image or a `sbb-image` as a background.
 * @slot footnote - Use this slot to provide a footnote.
 * @cssprop [--sbb-teaser-product-background-gradient-start=25%] - At which percentage the background should start getting transparent.
 * @cssprop [--sbb-teaser-product-background-gradient-end=75%] - At which percentage the background should be fully transparent.
 */
@Directive({
  selector: 'sbb-teaser-product',
  exportAs: 'sbbTeaserProduct',
})
export class SbbTeaserProduct {
  #element: ElementRef<SbbTeaserProductElement> = inject(ElementRef<SbbTeaserProductElement>);
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

  /**
   * The href value you want to link to.
   */
  @Input()
  public set href(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.href = value));
  }
  public get href(): string {
    return this.#element.nativeElement.href;
  }

  /**
   * Where to display the linked URL.
   */
  @Input()
  public set target(value: LinkTargetType | string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.target = value));
  }
  public get target(): LinkTargetType | string {
    return this.#element.nativeElement.target;
  }

  /**
   * The relationship of the linked URL as space-separated link types.
   */
  @Input()
  public set rel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.rel = value));
  }
  public get rel(): string {
    return this.#element.nativeElement.rel;
  }

  /**
   * Whether the browser will show the download dialog on click.
   */
  @Input({ transform: booleanAttribute })
  public set download(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.download = value));
  }
  public get download(): boolean {
    return this.#element.nativeElement.download;
  }

  /**
   * This will be forwarded as aria-label to the inner anchor element.
   */
  @Input()
  public set accessibilityLabel(value: string) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.accessibilityLabel = value));
  }
  public get accessibilityLabel(): string {
    return this.#element.nativeElement.accessibilityLabel;
  }

  /**
   * This will be forwarded as aria-current to the inner anchor element.
   */
  @Input()
  public set accessibilityCurrent(value: string) {
    this.#ngZone.runOutsideAngular(
      () => (this.#element.nativeElement.accessibilityCurrent = value),
    );
  }
  public get accessibilityCurrent(): string {
    return this.#element.nativeElement.accessibilityCurrent;
  }
}
