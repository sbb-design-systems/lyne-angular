import { NgModule } from '@angular/core';
import { SbbRadioButtonGroupModule } from '@sbb-esta/lyne-angular/radio-button-group';

import { SbbRadioButton } from './radio-button';

const SBB_RADIO_BUTTON_EXPORTED_DECLARATIONS = [SbbRadioButton, SbbRadioButtonGroupModule];

@NgModule({
  imports: SBB_RADIO_BUTTON_EXPORTED_DECLARATIONS,
  exports: SBB_RADIO_BUTTON_EXPORTED_DECLARATIONS,
})
export class SbbRadioButtonModule {}
