import { NgModule } from '@angular/core';
import { SbbCheckboxGroupModule } from '@sbb-esta/lyne-angular/checkbox-group';

import { SbbCheckboxPanel } from './checkbox-panel';

const SBB_CHECKBOX_PANEL_EXPORTED_DECLARATIONS = [SbbCheckboxPanel, SbbCheckboxGroupModule];

@NgModule({
  imports: SBB_CHECKBOX_PANEL_EXPORTED_DECLARATIONS,
  exports: SBB_CHECKBOX_PANEL_EXPORTED_DECLARATIONS,
})
export class SbbCheckboxPanelModule {}
