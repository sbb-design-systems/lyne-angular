import { NgModule } from '@angular/core';

import { SbbCheckboxGroup } from './checkbox-group';

const SBB_CHECKBOX_GROUP_EXPORTED_DECLARATIONS = [SbbCheckboxGroup];

@NgModule({
  imports: SBB_CHECKBOX_GROUP_EXPORTED_DECLARATIONS,
  exports: SBB_CHECKBOX_GROUP_EXPORTED_DECLARATIONS,
})
export class SbbCheckboxGroupModule {}
