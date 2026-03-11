import { NgModule } from '@angular/core';

import { SbbTeaser } from './teaser';

const SBB_TEASER_EXPORTED_DECLARATIONS = [SbbTeaser];

@NgModule({
  imports: SBB_TEASER_EXPORTED_DECLARATIONS,
  exports: SBB_TEASER_EXPORTED_DECLARATIONS,
})
export class SbbTeaserModule {}
