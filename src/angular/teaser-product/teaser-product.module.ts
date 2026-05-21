import { NgModule } from '@angular/core';

import { SbbTeaserProduct } from './teaser-product/teaser-product';
import { SbbTeaserProductStatic } from './teaser-product-static/teaser-product-static';

const SBB_TEASER_PRODUCT_EXPORTED_DECLARATIONS = [SbbTeaserProduct, SbbTeaserProductStatic];

@NgModule({
  imports: SBB_TEASER_PRODUCT_EXPORTED_DECLARATIONS,
  exports: SBB_TEASER_PRODUCT_EXPORTED_DECLARATIONS,
})
export class SbbTeaserProductModule {}
