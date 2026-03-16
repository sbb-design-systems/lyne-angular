import { NgModule } from '@angular/core';
import { SbbCheckboxGroup } from '@sbb-esta/lyne-angular/checkbox-group';

import { SbbCheckboxPanel } from './checkbox-panel';

const SBB_CHECKBOX_PANEL_EXPORTED_DECLARATIONS = [SbbCheckboxPanel, SbbCheckboxGroup];

@NgModule({
  imports: SBB_CHECKBOX_PANEL_EXPORTED_DECLARATIONS,
  exports: SBB_CHECKBOX_PANEL_EXPORTED_DECLARATIONS,
})
export class SbbCheckboxModule {}
