import { NgModule } from '@angular/core';

import { SbbSlider } from './slider';

const SBB_SLIDER_EXPORTED_DECLARATIONS = [SbbSlider];

@NgModule({
  imports: SBB_SLIDER_EXPORTED_DECLARATIONS,
  exports: SBB_SLIDER_EXPORTED_DECLARATIONS,
})
export class SbbSliderModule {}
