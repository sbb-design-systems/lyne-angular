import { Directive } from '@angular/core';
import { SbbSidebarContentElement } from '@sbb-esta/lyne-elements/sidebar.pure.js';

/**
 * Container for the sidebar content. Intended to be placed inside an `sbb-sidebar-container` element.
 *
 * @slot  - Use the unnamed slot to add any content elements. Further `<sbb-sidebar-container>` elements are possible.
 */
@Directive({
  selector: 'sbb-sidebar-content',
  exportAs: 'sbbSidebarContent',
})
export class SbbSidebarContent {
  static {
    SbbSidebarContentElement.define();
  }
}
