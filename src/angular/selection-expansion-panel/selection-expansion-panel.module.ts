import { NgModule } from '@angular/core';

import { SbbSelectionExpansionPanel } from './selection-expansion-panel';

const SBB_SELECTION_EXPANSION_PANEL_EXPORTED_DECLARATIONS = [SbbSelectionExpansionPanel];

@NgModule({
  imports: SBB_SELECTION_EXPANSION_PANEL_EXPORTED_DECLARATIONS,
  exports: SBB_SELECTION_EXPANSION_PANEL_EXPORTED_DECLARATIONS,
})
export class SbbSelectionExpansionPanelModule {}
