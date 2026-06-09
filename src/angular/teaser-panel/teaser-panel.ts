import { Directive } from '@angular/core';
import { SbbTeaserPanelElement } from '@sbb-esta/lyne-elements/teaser-panel.pure.js';

/**
 * It displays the content in a vertically centered trapezoidal shape.
 * The component matches the parent element size and positions the panel accordingly.
 *
 * @slot  - Use the unnamed slot to add text content to the panel
 */
@Directive({
  selector: 'sbb-teaser-panel',
  exportAs: 'sbbTeaserPanel',
})
export class SbbTeaserPanel {
  static {
    SbbTeaserPanelElement.define();
  }
}
