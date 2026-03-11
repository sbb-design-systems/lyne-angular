import { NgModule } from '@angular/core';

import { SbbCheckboxGroup } from '../checkbox-group';

import { SbbRadioButtonPanel } from './radio-button-panel';

const SBB_RADIO_BUTTON_PANEL_EXPORTED_DECLARATIONS = [SbbRadioButtonPanel, SbbCheckboxGroup];

@NgModule({
  imports: SBB_RADIO_BUTTON_PANEL_EXPORTED_DECLARATIONS,
  exports: SBB_RADIO_BUTTON_PANEL_EXPORTED_DECLARATIONS,
})
export class SbbCheckboxModule {}
