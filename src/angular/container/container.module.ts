import { NgModule } from '@angular/core';
import { SbbContainer } from '@sbb-esta/lyne-angular/container/container';
import { SbbStickyBar } from '@sbb-esta/lyne-angular/container/sticky-bar';

const SBB_CONTAINER_EXPORTED_DECLARATIONS = [SbbContainer, SbbStickyBar];

@NgModule({
  imports: SBB_CONTAINER_EXPORTED_DECLARATIONS,
  exports: SBB_CONTAINER_EXPORTED_DECLARATIONS,
})
export class SbbContainerModule {}
