import { NgModule } from '@angular/core';

import { SbbBreadcrumb } from './breadcrumb/breadcrumb';
import { SbbBreadcrumbGroup } from './breadcrumb-group/breadcrumb-group';

const EXPORTED_DECLARATIONS = [SbbBreadcrumb, SbbBreadcrumbGroup];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbBreadcrumbModule {}
