import { NgModule } from '@angular/core';

import { SbbLoadingIndicatorCircle } from './loading-indicator-circle';

const SBB_LOADING_INDICATOR_CIRCLE_EXPORTED_DECLARATIONS = [SbbLoadingIndicatorCircle];

@NgModule({
  imports: SBB_LOADING_INDICATOR_CIRCLE_EXPORTED_DECLARATIONS,
  exports: SBB_LOADING_INDICATOR_CIRCLE_EXPORTED_DECLARATIONS,
})
export class SbbLoadingIndicatorCircleModule {}
