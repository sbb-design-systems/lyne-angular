import { NgModule } from '@angular/core';

import { SbbImage } from './image';

const SBB_IMAGE_EXPORTED_DECLARATIONS = [SbbImage];

@NgModule({
  imports: SBB_IMAGE_EXPORTED_DECLARATIONS,
  exports: SBB_IMAGE_EXPORTED_DECLARATIONS,
})
export class SbbImageModule {}
