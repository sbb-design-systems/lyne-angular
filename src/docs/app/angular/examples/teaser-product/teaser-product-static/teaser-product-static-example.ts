import { Component } from '@angular/core';
import { SbbActionGroupModule } from '@sbb-esta/lyne-angular/action-group';
import { SbbButtonModule } from '@sbb-esta/lyne-angular/button';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbTeaserProductModule } from '@sbb-esta/lyne-angular/teaser-product';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title teaser-product-static basic example
 * @order 2
 */
@Component({
  selector: 'sbb-teaser-product-static-example',
  templateUrl: 'teaser-product-static-example.html',
  imports: [
    SbbTeaserProductModule,
    SbbImageModule,
    SbbActionGroupModule,
    SbbButtonModule,
    SbbTitleModule,
  ],
})
export class TeaserProductStaticExample {}
