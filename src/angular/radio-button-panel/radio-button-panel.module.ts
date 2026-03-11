import { NgModule } from '@angular/core';
import { SbbRadioButtonGroupModule } from '@sbb-esta/lyne-angular/radio-button-group';

import { SbbRadioButtonPanel } from './radio-button-panel';

const SBB_RADIO_BUTTON_PANEL_EXPORTED_DECLARATIONS = [
  SbbRadioButtonPanel,
  SbbRadioButtonGroupModule,
];

@NgModule({
  imports: SBB_RADIO_BUTTON_PANEL_EXPORTED_DECLARATIONS,
  exports: SBB_RADIO_BUTTON_PANEL_EXPORTED_DECLARATIONS,
})
export class SbbRadioButtonPanelModule {}
