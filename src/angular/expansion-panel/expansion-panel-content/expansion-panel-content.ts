import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/expansion-panel/expansion-panel-content.js';

@Directive({
  selector: 'sbb-expansion-panel-content',
  exportAs: 'sbbExpansionPanelContent',
})
export class SbbExpansionPanelContent {}
