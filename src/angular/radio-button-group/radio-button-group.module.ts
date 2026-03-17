import { NgModule } from '@angular/core';

import { SbbRadioButtonGroup } from './radio-button-group';

const SBB_RADIO_BUTTON_GROUP_EXPORTED_DECLARATIONS = [SbbRadioButtonGroup];

@NgModule({
  imports: SBB_RADIO_BUTTON_GROUP_EXPORTED_DECLARATIONS,
  exports: SBB_RADIO_BUTTON_GROUP_EXPORTED_DECLARATIONS,
})
export class SbbRadioButtonGroupModule {}
