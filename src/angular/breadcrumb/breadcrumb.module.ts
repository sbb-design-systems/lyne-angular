import { NgModule } from '@angular/core';

import { SbbBreadcrumb } from './breadcrumb/breadcrumb';
import { SbbBreadcrumbGroup } from './breadcrumb-group/breadcrumb-group';

const SBB_BREADCRUMB_EXPORTED_DECLARATIONS = [SbbBreadcrumb, SbbBreadcrumbGroup];

@NgModule({
  imports: SBB_BREADCRUMB_EXPORTED_DECLARATIONS,
  exports: SBB_BREADCRUMB_EXPORTED_DECLARATIONS,
})
export class SbbBreadcrumbModule {}
