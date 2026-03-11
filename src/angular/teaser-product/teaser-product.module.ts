import { NgModule } from '@angular/core';
import { SbbTeaserProduct } from '@sbb-esta/lyne-angular/teaser-product/teaser-product';
import { SbbTeaserProductStatic } from '@sbb-esta/lyne-angular/teaser-product/teaser-product-static';

const SBB_TEASER_PRODUCT_EXPORTED_DECLARATIONS = [SbbTeaserProduct, SbbTeaserProductStatic];

@NgModule({
  imports: SBB_TEASER_PRODUCT_EXPORTED_DECLARATIONS,
  exports: SBB_TEASER_PRODUCT_EXPORTED_DECLARATIONS,
})
export class SbbTeaserProductModule {}
