import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/expansion-panel/expansion-panel-content.js';

/**
 * It can be used as a container for the content of the `sbb-expansion-panel` component.
 *
 * @slot  - Use the unnamed slot to add content to the `sbb-expansion-panel`.
 */
@Directive({
  selector: 'sbb-expansion-panel-content',
  exportAs: 'sbbExpansionPanelContent',
})
export class SbbExpansionPanelContent {}
