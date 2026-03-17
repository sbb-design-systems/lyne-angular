import { NgModule } from '@angular/core';

import { SbbLoadingIndicator } from './loading-indicator';

const SBB_LOADING_INDICATOR_EXPORTED_DECLARATIONS = [SbbLoadingIndicator];

@NgModule({
  imports: SBB_LOADING_INDICATOR_EXPORTED_DECLARATIONS,
  exports: SBB_LOADING_INDICATOR_EXPORTED_DECLARATIONS,
})
export class SbbLoadingIndicatorModule {}
