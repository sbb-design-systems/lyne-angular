import { NgModule } from '@angular/core';

import { SbbOverlay } from './overlay';
import { SbbOverlayCloseDirective } from './overlay-close-directive/overlay-close-directive';
import { SbbOverlayContainer } from './overlay-container';

const SBB_OVERLAY_EXPORTED_DECLARATIONS = [
  SbbOverlay,
  SbbOverlayCloseDirective,
  SbbOverlayContainer,
];

@NgModule({
  imports: SBB_OVERLAY_EXPORTED_DECLARATIONS,
  exports: SBB_OVERLAY_EXPORTED_DECLARATIONS,
})
export class SbbOverlayModule {}
