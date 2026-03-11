import { NgModule } from '@angular/core';

import { SbbTeaserHero } from './teaser-hero';

const SBB_TEASER_HERO_EXPORTED_DECLARATIONS = [SbbTeaserHero];

@NgModule({
  imports: SBB_TEASER_HERO_EXPORTED_DECLARATIONS,
  exports: SBB_TEASER_HERO_EXPORTED_DECLARATIONS,
})
export class SbbTeaserHeroModule {}
