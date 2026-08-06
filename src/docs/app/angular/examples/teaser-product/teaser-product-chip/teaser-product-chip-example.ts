import { Component } from '@angular/core';
import { SbbChipLabelModule } from '@sbb-esta/lyne-angular/chip-label';
import { SbbImageModule } from '@sbb-esta/lyne-angular/image';
import { SbbTeaserProductModule } from '@sbb-esta/lyne-angular/teaser-product';
import { SbbTitleModule } from '@sbb-esta/lyne-angular/title';

/**
 * @title teaser-product with chip
 * @order 3
 */
@Component({
  selector: 'sbb-teaser-product-chip-example',
  templateUrl: 'teaser-product-chip-example.html',
  imports: [SbbTeaserProductModule, SbbImageModule, SbbTitleModule, SbbChipLabelModule],
})
export class TeaserProductChipExample {}
