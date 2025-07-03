import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/sidebar/sidebar-content.js';

@Directive({
  selector: 'sbb-sidebar-content',
  exportAs: 'sbbSidebarContent',
})
export class SbbSidebarContent {}
