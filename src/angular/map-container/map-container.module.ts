import { NgModule } from '@angular/core';

import { SbbMapContainer } from './map-container';

const SBB_MAP_CONTAINER_EXPORTED_DECLARATIONS = [SbbMapContainer];

@NgModule({
  imports: SBB_MAP_CONTAINER_EXPORTED_DECLARATIONS,
  exports: SBB_MAP_CONTAINER_EXPORTED_DECLARATIONS,
})
export class SbbMapContainerModule {}
