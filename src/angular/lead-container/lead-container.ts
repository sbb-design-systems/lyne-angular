import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/lead-container.js';

/**
 * The `sbb-lead-container` can be used for product pages to display a lead image and following content.
 *
 * @slot  - Use the unnamed slot to add any content to the container.
 * @slot image - Use the image slot to provide the lead image. `sbb-image`, `img` and `picture` elements are supported. For other elements the aspect ratio has to be set manually.
 */
@Directive({
  selector: 'sbb-lead-container',
  exportAs: 'sbbLeadContainer',
})
export class SbbLeadContainer {}
