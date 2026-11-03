import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { SbbCardElement } from '@sbb-esta/lyne-elements/card.pure.js';

/**
 * It displays content related to a single subject.
 *
 * @slot  - Use the unnamed slot to add content to the card. For specific use cases, `<sbb-card-button>`, `<sbb-card-link>` or `<sbb-card-badge>` elements can be slotted.
 */
@Directive({
  selector: 'sbb-card',
  exportAs: 'sbbCard',
})
export class SbbCard {
  static {
    SbbCardElement.define();
  }

  #element: ElementRef<SbbCardElement> = inject(ElementRef<SbbCardElement>);
  #ngZone: NgZone = inject(NgZone);

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
