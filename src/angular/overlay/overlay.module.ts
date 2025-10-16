import { NgModule } from '@angular/core';

import { SbbOverlay } from './overlay';
import { SbbOverlayContainer } from './overlay-container';

const EXPORTED_DECLARATIONS = [SbbOverlay, SbbOverlayContainer];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbOverlayModule {}
