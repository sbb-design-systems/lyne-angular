/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, NgZone, inject } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbTeaserProductStaticElement } from '@sbb-esta/lyne-elements/teaser-product/teaser-product-static.js';
import '@sbb-esta/lyne-elements/teaser-product/teaser-product-static.js';

@Directive({
  selector: 'sbb-teaser-product-static',
  standalone: true,
})
export class SbbTeaserProductStaticDirective {
  #element: ElementRef<SbbTeaserProductStaticElement> = inject(
    ElementRef<SbbTeaserProductStaticElement>,
  );
  #ngZone: NgZone = inject(NgZone);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input({ alias: 'image-alignment' })
  public set imageAlignment(value: 'after' | 'before') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.imageAlignment = value));
  }
  public get imageAlignment(): 'after' | 'before' {
    return this.#element.nativeElement.imageAlignment;
  }

  @Input({ transform: booleanAttribute })
  public set negative(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.negative = value));
  }
  public get negative(): boolean {
    return this.#element.nativeElement.negative;
  }
}