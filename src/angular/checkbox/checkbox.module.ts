import { NgModule } from '@angular/core';
import { SbbCheckboxGroup } from '@sbb-esta/lyne-angular/checkbox-group';

import { SbbCheckbox } from './checkbox';

const SBB_CHECKBOX_EXPORTED_DECLARATIONS = [SbbCheckbox, SbbCheckboxGroup];

@NgModule({
  imports: SBB_CHECKBOX_EXPORTED_DECLARATIONS,
  exports: SBB_CHECKBOX_EXPORTED_DECLARATIONS,
})
export class SbbCheckboxModule {}
