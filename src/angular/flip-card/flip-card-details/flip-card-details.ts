import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/flip-card/flip-card-details.js';

/**
 * Combined with a `sbb-flip-card`, it displays its content when the card is flipped.
 *
 * @slot  - Use the unnamed slot to provide any kind of content.
 */
@Directive({
  selector: 'sbb-flip-card-details',
  exportAs: 'sbbFlipCardDetails',
})
export class SbbFlipCardDetails {}
