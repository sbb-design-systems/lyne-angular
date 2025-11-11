import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/sidebar/sidebar-content.js';

/**
 * Container for the sidebar content. Intended to be placed inside an `sbb-sidebar-container` element.
 *
 * @slot  - Use the unnamed slot to add any content elements. Further `sbb-sidebar-container`s are possible.
 */
@Directive({
  selector: 'sbb-sidebar-content',
  exportAs: 'sbbSidebarContent',
})
export class SbbSidebarContent {}
