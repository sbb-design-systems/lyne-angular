import { NgModule } from '@angular/core';

import { SbbTeaserPanel } from './teaser-panel';

const SBB_TEASER_PANEL_EXPORTED_DECLARATIONS = [SbbTeaserPanel];

@NgModule({
  imports: SBB_TEASER_PANEL_EXPORTED_DECLARATIONS,
  exports: SBB_TEASER_PANEL_EXPORTED_DECLARATIONS,
})
export class SbbTeaserPanelModule {}
