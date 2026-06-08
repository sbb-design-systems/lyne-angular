import { Directive } from '@angular/core';
import { SbbBreadcrumbGroupElement } from '@sbb-esta/lyne-elements/breadcrumb.pure.js';

/**
 * It can be used as a container for one or more `sbb-breadcrumb` component.
 *
 * @slot  - Use the unnamed slot to add `sbb-breadcrumb` elements.
 */
@Directive({
  selector: 'sbb-breadcrumb-group',
  exportAs: 'sbbBreadcrumbGroup',
})
export class SbbBreadcrumbGroup {
  static {
    SbbBreadcrumbGroupElement.define();
  }
}
