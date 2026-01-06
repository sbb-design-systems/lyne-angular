import { NgModule } from '@angular/core';
import { SbbFocusInitial } from '@sbb-esta/lyne-angular/core/overlay';

import { SbbOverlay } from './overlay';
import { SbbOverlayClose } from './overlay-close/overlay-close';
import { SbbOverlayContainer } from './overlay-container';

const SBB_OVERLAY_EXPORTED_DECLARATIONS = [
  SbbOverlay,
  SbbOverlayClose,
  SbbOverlayContainer,
  SbbFocusInitial,
];

@NgModule({
  imports: SBB_OVERLAY_EXPORTED_DECLARATIONS,
  exports: SBB_OVERLAY_EXPORTED_DECLARATIONS,
})
export class SbbOverlayModule {}
