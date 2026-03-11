import { NgModule } from '@angular/core';

import { SbbVisualCheckbox } from './visual-checkbox';

const SBB_VISUAL_CHECKBOX_EXPORTED_DECLARATIONS = [SbbVisualCheckbox];

@NgModule({
  imports: SBB_VISUAL_CHECKBOX_EXPORTED_DECLARATIONS,
  exports: SBB_VISUAL_CHECKBOX_EXPORTED_DECLARATIONS,
})
export class SbbVisualCheckboxModule {}
