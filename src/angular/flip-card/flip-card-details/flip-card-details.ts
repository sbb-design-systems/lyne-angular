import { Directive } from '@angular/core';
import { SbbFlipCardDetailsElement } from '@sbb-esta/lyne-elements/flip-card.pure.js';

/**
 * Combined with a `sbb-flip-card`, it displays its content when the card is flipped.
 *
 * @slot  - Use the unnamed slot to provide any kind of content.
 */
@Directive({
  selector: 'sbb-flip-card-details',
  exportAs: 'sbbFlipCardDetails',
})
export class SbbFlipCardDetails {
  static {
    SbbFlipCardDetailsElement.define();
  }
}
