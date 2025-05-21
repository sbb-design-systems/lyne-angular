import { Directive } from '@angular/core';

import '@sbb-esta/lyne-elements/breadcrumb/breadcrumb-group.js';

@Directive({
  selector: 'sbb-breadcrumb-group',
  exportAs: 'sbbBreadcrumbGroup',
})
export class SbbBreadcrumbGroup {}
