import { Directive } from '@angular/core';
import { SbbIconSidebarContentElement } from '@sbb-esta/lyne-elements/icon-sidebar.pure.js';

/**
 * Container for the icon sidebar content. Intended to be placed inside an `sbb-icon-sidebar-container` element.
 *
 * @slot  - Use the unnamed slot to add any content elements.
 */
@Directive({
  selector: 'sbb-icon-sidebar-content',
  exportAs: 'sbbIconSidebarContent',
})
export class SbbIconSidebarContent {
  static {
    SbbIconSidebarContentElement.define();
  }
}
