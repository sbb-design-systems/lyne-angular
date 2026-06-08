import { Directive, ElementRef, inject, Input, NgZone } from '@angular/core';
import { SbbCardBadgeElement } from '@sbb-esta/lyne-elements/card.pure.js';

/**
 * It displays content within a badge.
 *
 * @slot  - Use the unnamed slot to add content to the badge. Content parts should be wrapped in `<span>` tags to achieve correct spacings.
 */
@Directive({
  selector: 'sbb-card-badge',
  exportAs: 'sbbCardBadge',
})
export class SbbCardBadge {
  static {
    SbbCardBadgeElement.define();
  }

  #element: ElementRef<SbbCardBadgeElement> = inject(ElementRef<SbbCardBadgeElement>);
  #ngZone: NgZone = inject(NgZone);

  /**
   * Color of the card badge.
   */
  @Input()
  public set color(value: 'charcoal' | 'white') {
    this.#ngZone.runOutsideAngular(() => (this.#element.nativeElement.color = value));
  }
  public get color(): 'charcoal' | 'white' {
    return this.#element.nativeElement.color;
  }
}
