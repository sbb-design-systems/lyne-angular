import { NgModule } from '@angular/core';

import { SbbCarousel } from './carousel/carousel';
import { SbbCarouselItem } from './carousel-item/carousel-item';
import { SbbCarouselList } from './carousel-list/carousel-list';

const SBB_CAROUSEL_EXPORTED_DECLARATIONS = [SbbCarousel, SbbCarouselItem, SbbCarouselList];

@NgModule({
  imports: SBB_CAROUSEL_EXPORTED_DECLARATIONS,
  exports: SBB_CAROUSEL_EXPORTED_DECLARATIONS,
})
export class SbbCarouselModule {}
