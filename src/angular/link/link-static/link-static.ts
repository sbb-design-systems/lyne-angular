import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { booleanAttribute } from '@sbb-esta/lyne-angular/core';
import type { SbbLinkStaticElement } from '@sbb-esta/lyne-elements/link/link-static.js';
import type { SbbLinkSize } from '@sbb-esta/lyne-elements/link.js';

import '@sbb-esta/lyne-elements/link/link-static.js';

/**
 * It displays a static link enhanced with the SBB Design.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-link-static`.
 */
@Directive({
  selector: 'sbb-link-static',
  exportAs: 'sbbLinkStatic',
})
export class SbbLinkStatic {
  #element: ElementRef<SbbLinkStaticElement> = inject(ElementRef<SbbLinkStaticElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Text size, the link should get in the non-button variation.
   * With inline variant, the text size adapts to where it is used.
   */
  @Input()
  public set size(value: SbbLinkSize) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): SbbLinkSize {
    return this.#element.nativeElement.size;
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
   * Whether the component is disabled.
   */
  @Input({ transform: booleanAttribute })
  public set disabled(value: boolean) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.disabled = value));
  }
  public get disabled(): boolean {
    return this.#element.nativeElement.disabled;
  }
}
