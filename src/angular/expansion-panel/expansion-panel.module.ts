import { NgModule } from '@angular/core';

import { SbbExpansionPanel } from './expansion-panel/expansion-panel';
import { SbbExpansionPanelContent } from './expansion-panel-content/expansion-panel-content';
import { SbbExpansionPanelHeader } from './expansion-panel-header/expansion-panel-header';

const SBB_EXPANSION_PANEL_EXPORTED_DECLARATIONS = [
  SbbExpansionPanel,
  SbbExpansionPanelContent,
  SbbExpansionPanelHeader,
];

@NgModule({
  imports: SBB_EXPANSION_PANEL_EXPORTED_DECLARATIONS,
  exports: SBB_EXPANSION_PANEL_EXPORTED_DECLARATIONS,
})
export class SbbExpansionPanelModule {}
