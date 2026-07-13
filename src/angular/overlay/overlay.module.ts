import { NgModule } from '@angular/core';
import { SbbFocusInitial } from '@sbb-esta/lyne-angular/core';

import { SbbOverlay } from './overlay';
import { SbbOverlayClose } from './overlay-close/overlay-close';
import { SbbOverlayContainer } from './overlay-container';
import { SbbOverlayTrigger } from './overlay-trigger';

const SBB_OVERLAY_EXPORTED_DECLARATIONS = [
  SbbOverlay,
  SbbOverlayTrigger,
  SbbOverlayClose,
  SbbOverlayContainer,
  SbbFocusInitial,
];

@NgModule({
  imports: SBB_OVERLAY_EXPORTED_DECLARATIONS,
  exports: SBB_OVERLAY_EXPORTED_DECLARATIONS,
})
export class SbbOverlayModule {}
