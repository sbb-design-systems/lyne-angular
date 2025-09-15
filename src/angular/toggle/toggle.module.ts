import { NgModule } from '@angular/core';

import { SbbToggle } from './toggle/toggle';
import { SbbToggleOption } from './toggle-option/toggle-option';

const EXPORTED_DECLARATIONS = [SbbToggle, SbbToggleOption];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbToggleModule {}
