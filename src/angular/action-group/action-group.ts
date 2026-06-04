import { Directive } from '@angular/core';
import { SbbActionGroupElement } from '@sbb-esta/lyne-elements/action-group.pure.js';

/**
 * It can be used as a container for one or more action element, like `sbb-button` or `sbb-block-link`.
 *
 * @slot  - Use the unnamed slot to add `sbb-block-link` or `sbb-button` elements to the `sbb-action-group`.
 */
@Directive({
  selector: 'sbb-action-group',
  exportAs: 'sbbActionGroup',
})
export class SbbActionGroup {
  static {
    SbbActionGroupElement.define();
  }
}
