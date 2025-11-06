import { NgModule } from '@angular/core';

import { SbbOverlay } from './overlay';
import { SbbOverlayContainer } from './overlay-container';

const SBB_OVERLAY_EXPORTED_DECLARATIONS = [SbbOverlay, SbbOverlayContainer];

@NgModule({
  imports: SBB_OVERLAY_EXPORTED_DECLARATIONS,
  exports: SBB_OVERLAY_EXPORTED_DECLARATIONS,
})
export class SbbOverlayModule {}
