import { NgModule } from '@angular/core';

import { SbbToggleCheck } from './toggle-check';

const SBB_TOGGLE_CHECK_EXPORTED_DECLARATIONS = [SbbToggleCheck];

@NgModule({
  imports: SBB_TOGGLE_CHECK_EXPORTED_DECLARATIONS,
  exports: SBB_TOGGLE_CHECK_EXPORTED_DECLARATIONS,
})
export class SbbToggleCheckModule {}
