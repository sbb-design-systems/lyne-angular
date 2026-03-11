import { NgModule } from '@angular/core';

import { SbbSelectionActionPanel } from './selection-action-panel';

const SBB_SELECTION_ACTION_PANEL_EXPORTED_DECLARATIONS = [SbbSelectionActionPanel];

@NgModule({
  imports: SBB_SELECTION_ACTION_PANEL_EXPORTED_DECLARATIONS,
  exports: SBB_SELECTION_ACTION_PANEL_EXPORTED_DECLARATIONS,
})
export class SbbSelectionActionPanelModule {}
