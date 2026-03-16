import { NgModule } from '@angular/core';
import { SbbRadioButtonGroup } from '@sbb-esta/lyne-angular/radio-button-group';

import { SbbRadioButton } from './radio-button';

const SBB_RADIO_BUTTON_EXPORTED_DECLARATIONS = [SbbRadioButton, SbbRadioButtonGroup];

@NgModule({
  imports: SBB_RADIO_BUTTON_EXPORTED_DECLARATIONS,
  exports: SBB_RADIO_BUTTON_EXPORTED_DECLARATIONS,
})
export class SbbCheckboxModule {}
