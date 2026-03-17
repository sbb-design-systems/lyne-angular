import { NgModule } from '@angular/core';

import { SbbLeadContainer } from './lead-container';

const SBB_LEAD_CONTAINER_EXPORTED_DECLARATIONS = [SbbLeadContainer];

@NgModule({
  imports: SBB_LEAD_CONTAINER_EXPORTED_DECLARATIONS,
  exports: SBB_LEAD_CONTAINER_EXPORTED_DECLARATIONS,
})
export class SbbLeadContainerModule {}
