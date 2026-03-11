import { NgModule } from '@angular/core';

import { SbbCheckboxGroup } from '../checkbox-group';

import { SbbRadioButton } from './radio-button';

const SBB_RADIO_BUTTON_EXPORTED_DECLARATIONS = [SbbRadioButton, SbbCheckboxGroup];

@NgModule({
  imports: SBB_RADIO_BUTTON_EXPORTED_DECLARATIONS,
  exports: SBB_RADIO_BUTTON_EXPORTED_DECLARATIONS,
})
export class SbbCheckboxModule {}
