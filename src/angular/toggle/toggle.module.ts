import { NgModule } from '@angular/core';

import { SbbToggle } from './toggle/toggle';
import { SbbToggleOption } from './toggle-option/toggle-option';

const SBB_TOGGLE_EXPORTED_DECLARATIONS = [SbbToggle, SbbToggleOption];

@NgModule({
  imports: SBB_TOGGLE_EXPORTED_DECLARATIONS,
  exports: SBB_TOGGLE_EXPORTED_DECLARATIONS,
})
export class SbbToggleModule {}
