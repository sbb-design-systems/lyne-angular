import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import type { SbbCardElement } from '@sbb-esta/lyne-elements/card/card.js';

import '@sbb-esta/lyne-elements/card/card.js';

/**
 * It displays content related to a single subject.
 *
 * @slot  - Use the unnamed slot to add content to the card.
 * @slot badge - Use this slot to render a `sbb-card-badge` component.
 * @slot action - Use this slot to render a `sbb-card-button` or a `sbb-card-link` component.
 */
@Directive({
  selector: 'sbb-card',
  exportAs: 'sbbCard',
})
export class SbbCard {
  #element: ElementRef<SbbCardElement> = inject(ElementRef<SbbCardElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Size variant, either xs, s, m, l, xl, xxl or xxxl.
   */
  @Input()
  public set size(value: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.size = value));
  }
  public get size(): 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' {
    return this.#element.nativeElement.size;
  }

  /**
   * Option to set the component's background color.
   */
  @Input()
  public set color(
    value: 'white' | 'milk' | 'transparent-bordered' | 'transparent-bordered-dashed',
  ) {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'white' | 'milk' | 'transparent-bordered' | 'transparent-bordered-dashed' {
    return this.#element.nativeElement.color;
  }
}
