import { NgModule } from '@angular/core';

import { SbbCarousel } from './carousel/carousel';
import { SbbCarouselItem } from './carousel-item/carousel-item';
import { SbbCarouselList } from './carousel-list/carousel-list';

const EXPORTED_DECLARATIONS = [SbbCarousel, SbbCarouselItem, SbbCarouselList];

@NgModule({
  imports: EXPORTED_DECLARATIONS,
  exports: EXPORTED_DECLARATIONS,
})
export class SbbCarouselModule {}
