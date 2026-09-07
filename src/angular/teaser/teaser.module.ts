import { NgModule } from '@angular/core';

import { SbbTeaser } from './teaser/teaser';
import { SbbTeaserStatic } from './teaser-static/teaser-static';

const SBB_TEASER_EXPORTED_DECLARATIONS = [SbbTeaser, SbbTeaserStatic];

@NgModule({
  imports: SBB_TEASER_EXPORTED_DECLARATIONS,
  exports: SBB_TEASER_EXPORTED_DECLARATIONS,
})
export class SbbTeaserModule {}
