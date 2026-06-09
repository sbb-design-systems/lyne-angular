import { NgModule } from '@angular/core';

import { SbbContainer } from './container/container';
import { SbbStickyBar } from './sticky-bar/sticky-bar';

const SBB_CONTAINER_EXPORTED_DECLARATIONS = [SbbContainer, SbbStickyBar];

@NgModule({
  imports: SBB_CONTAINER_EXPORTED_DECLARATIONS,
  exports: SBB_CONTAINER_EXPORTED_DECLARATIONS,
})
export class SbbContainerModule {}
