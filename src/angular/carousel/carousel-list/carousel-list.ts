import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/carousel/carousel-list.js';

/**
 * It displays a list of `sbb-carousel-item` components.
 *
 * @slot  - Use the unnamed slot to add `sbb-carousel-item` elements.
 */
@Directive({
  selector: 'sbb-carousel-list',
  exportAs: 'sbbCarouselList',
})
export class SbbCarouselList {}
